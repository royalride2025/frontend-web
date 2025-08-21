

import React, { useEffect, useState, useMemo, useRef } from 'react';
import useTokenStore from '@/store';
import { io } from 'socket.io-client';
import { getSupportChats } from '../http/api';
import { useToast } from '@/hooks/use-toast';
import { User, ShieldCheck, UserCog, CarFront } from 'lucide-react';
import userImg from '@/assets/user.jpg';

interface SupportMessage {
  sender: 'user' | 'admin';
  senderId: string;
  text: string;
  timestamp: string;
}

interface SupportChat {
  _id: string;
  user: string;
  userRole: 'driver' | 'car_owner' | 'customer';
  userName: string;
  userPhone: string;
  messages: SupportMessage[];
  isOpen: boolean;
  lastUpdated: string;
}

const socket = io(import.meta.env.VITE_PUBLIC_BACKEND_URL, {
  transports: ['websocket'],
  withCredentials: true
});


const roleIcon = (role: string) => {
  switch (role) {
    case 'admin': return <ShieldCheck className="inline h-4 w-4 text-blue-600 mr-1" />;
    case 'driver': return <UserCog className="inline h-4 w-4 text-green-600 mr-1" />;
    case 'car_owner': return <CarFront className="inline h-4 w-4 text-yellow-600 mr-1" />;
    case 'customer': return <User className="inline h-4 w-4 text-purple-600 mr-1" />;
    default: return <User className="inline h-4 w-4 text-gray-400 mr-1" />;
  }
};

const getProfilePic = (role: string) => {
  // You can use different images per role if you want
  return userImg;
};

function formatTime(ts: string) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDate(ts: string) {
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

function isSameDay(ts1: string, ts2: string) {
  const d1 = new Date(ts1);
  const d2 = new Date(ts2);
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}

const SupportChatPage: React.FC = () => {
  const { toast } = useToast();
  const [chats, setChats] = useState<SupportChat[]>([]);
  const [activeChat, setActiveChat] = useState<SupportChat | null>(null);
  const [reply, setReply] = useState('');
  const user = useTokenStore((state) => state.user);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Track unread messages per chat by chatId
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    // Join admin room
    socket.emit('adminJoinSupport');
    // Fetch all open chats on mount
    (async () => {
      try {
        const data = await getSupportChats();
        const chatArr = Array.isArray(data) ? data : (data?.chats ?? []);
        setChats(chatArr);
        // Initialize unread counts to 0 for all chats
        const unread: Record<string, number> = {};
        chatArr.forEach((chat: SupportChat) => { unread[chat._id] = 0; });
        setUnreadCounts(unread);
      } catch (err) {
        toast({
          variant: 'destructive',
          title: 'Failed to load support chats',
        });
      }
    })();
    socket.on('supportNewQuery', (chat: SupportChat) => {
      setChats((prev) => {
        if (!Array.isArray(prev)) return [chat];
        const idx = prev.findIndex(c => c._id === chat._id);
        if (idx > -1) {
          const updated = [...prev];
          updated[idx] = chat;
          return updated;
        }
        return [chat, ...prev];
      });
      // Only increment unread if not viewing this chat
      setUnreadCounts(prev => {
        if (!activeChat || activeChat._id !== chat._id) {
          return { ...prev, [chat._id]: (prev[chat._id] || 0) + 1 };
        }
        return prev;
      });
      // If admin is viewing this chat, update activeChat
      setActiveChat((prev) => {
        if (prev && prev._id === chat._id) {
          return chat; // Update active chat if it's the same
        }
        return prev;
      });
    });
    return () => { socket.off('supportNewQuery'); };
  }, [toast, activeChat]);

  // When opening a chat, clear its unread count
  const handleOpenChat = (chat: SupportChat) => {
    setActiveChat(chat);
    setUnreadCounts(prev => ({ ...prev, [chat._id]: 0 }));
  };

  // Scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat?.messages.length]);


  const handleReply = () => {
    console.log('Sending reply:', reply);
    console.log('Active chat:', activeChat?._id);
    console.log('User:', user?.id);
    if (!activeChat || !reply.trim() || !user?.id){
        toast({
        variant: "destructive",
        
        title: "Reply failed",
      });
        return;
    };
    const adminId = user.id;
    socket.emit('adminSupportReply', {
      chatId: activeChat._id,
      text: reply,
      adminId
    });

    // Optimistically update the active chat
    setActiveChat((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        messages: [...prev.messages, { sender: 'admin', senderId: adminId, text: reply, timestamp: new Date().toISOString() }]
      };
    });
    setReply('');
  };

  return (
    <div className="flex flex-col h-[80vh] max-h-[700px] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto">
          <div className="p-4 font-bold text-lg border-b bg-white">Chats</div>
          {chats && chats.length > 0 ? chats.map(chat => (
            <div
              key={chat._id}
              onClick={() => handleOpenChat(chat)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b hover:bg-gray-100 transition ${activeChat?._id === chat._id ? 'bg-gray-100' : ''}`}
            >
              <img src={getProfilePic(chat.userRole)} alt="profile" className="h-10 w-10 rounded-full object-cover border" />
              <div className="flex-1">
                <div className="font-semibold flex items-center gap-1">
                  {roleIcon(chat.userRole)} {chat.userName}
                </div>
                <div className="text-xs text-gray-500">{chat.userPhone}</div>
                <div className="text-xs text-gray-400 truncate max-w-[180px]">{chat.messages[chat.messages.length - 1]?.text}</div>
              </div>
              <div className="text-xs text-gray-400 min-w-[60px] text-right flex flex-col items-end">
                <span>
                  {chat.messages.length > 0 ? formatTime(chat.messages[chat.messages.length - 1].timestamp) : ''}
                </span>
                {unreadCounts[chat._id] > 0 && (
                  <span className="mt-1 inline-block bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">
                    {unreadCounts[chat._id]}
                  </span>
                )}
              </div>
            </div>
          )) : (
            <div className="p-4 text-gray-400">No chats yet.</div>
          )}
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col h-full">
          {activeChat ? (
            <>
              {/* Header */}
              <div className="flex items-center gap-4 border-b px-6 py-4 bg-white shadow-sm">
                <img src={getProfilePic(activeChat.userRole)} alt="profile" className="h-12 w-12 rounded-full object-cover border" />
                <div className="flex-1">
                  <div className="font-semibold text-lg flex items-center gap-2">
                    {roleIcon(activeChat.userRole)} {activeChat.userName}
                  </div>
                  <div className="text-xs text-gray-500">{activeChat.userPhone}</div>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 font-medium capitalize">{activeChat.userRole.replace('_', ' ')}</span>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50" style={{ minHeight: 0 }}>
                {activeChat.messages.length === 0 && (
                  <div className="text-center text-gray-400 mt-10">No messages yet.</div>
                )}
                {activeChat.messages.map((msg, idx, arr) => {
                  // Show date separator if day changes
                  const showDate = idx === 0 || !isSameDay(msg.timestamp, arr[idx - 1].timestamp);
                  return (
                    <React.Fragment key={idx}>
                      {showDate && (
                        <div className="flex justify-center my-4">
                          <span className="text-xs bg-white px-3 py-1 rounded-full border text-gray-500 shadow-sm">{formatDate(msg.timestamp)}</span>
                        </div>
                      )}
                      <div className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'} mb-2`}>
                        <div className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-sm ${msg.sender === 'admin' ? 'bg-blue-100 text-blue-900' : 'bg-white text-gray-900 border'}`} style={{ wordBreak: 'break-word' }}>
                          <div className="flex items-center gap-2 mb-1">
                            <img src={msg.sender === 'admin' ? getProfilePic('admin') : getProfilePic(activeChat.userRole)} alt="profile" className="h-6 w-6 rounded-full object-cover border" />
                            <span className="font-medium text-xs">{msg.sender === 'admin' ? 'Admin' : activeChat.userName}</span>
                          </div>
                          <div className="text-sm">{msg.text}</div>
                          <div className="text-right text-[10px] text-gray-400 mt-1">{formatTime(msg.timestamp)}</div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t bg-white px-6 py-4 flex gap-2 items-center">
                <input
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Type your message..."
                  onKeyDown={e => { if (e.key === 'Enter') handleReply(); }}
                />
                <button
                  onClick={handleReply}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow transition"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <User className="h-16 w-16 mb-4 text-gray-300" />
              <div className="text-lg font-semibold">Select a chat to start</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportChatPage;