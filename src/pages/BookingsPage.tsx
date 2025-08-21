import React, { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBookings, getAvailableDriversForBooking, assignDriverToBooking } from '@/http/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import profileImg from '../assets/user.jpg'

const BOOKING_TYPE = 'rent,book,airport';

const BookingsPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<'all' | 'pending'>('all');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [availableDrivers, setAvailableDrivers] = useState<any[]>([]);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [loadingDrivers, setLoadingDrivers] = useState(false);

  // Fetch bookings
  const status = filter === 'all' ? 'pending,scheduled,accepted,rejected,driver_on_the_way,driver_arrived,started,completed,cancelled' : 'pending';
  const { data, isLoading, isError } = useQuery({
    queryKey: ['bookings', filter],
    queryFn: () => getBookings({ status, booking_type: BOOKING_TYPE }),
    staleTime: 10000,
  });

  // Assign driver mutation
  const { mutate: assignDriver, isPending: assigning } = useMutation({
    mutationFn: ({ bookingId, driverId }: { bookingId: string, driverId: string }) => assignDriverToBooking({ bookingId, driverId }),
    onSuccess: () => {
      toast({ title: 'Driver assigned successfully' });
      setAssignModalOpen(false);
      setSelectedDriverId(null);
      setSelectedBooking(null);
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (error: any) => {
      // console.log(error)
      toast({ title: 'Failed to assign driver', description: error?.response?.data?.message || 'Error', variant: 'destructive' });
    },
  });

  // Open assign driver modal and fetch drivers
  const handleAssignDriver = async (booking: any) => {
    setSelectedBooking(booking);
    setAssignModalOpen(true);
    setLoadingDrivers(true);
    try {
      const res = await getAvailableDriversForBooking(booking._id);
      console.log(res.data);
      setAvailableDrivers(res.data || []);
    } catch (e) {
      setAvailableDrivers([]);
      toast({ title: 'Failed to fetch drivers', variant: 'destructive' });
    } finally {
      setLoadingDrivers(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Bookings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex gap-4 mb-4 mt-4">
        <Button
          onClick={() => setFilter('all')}
          variant={filter === 'all' ? 'default' : 'outline'}
        >
          All
        </Button>
        <Button
          onClick={() => setFilter('pending')}
          variant={filter === 'pending' ? 'default' : 'outline'}
        >
          Pending
        </Button>
      </div>
      <Card className="mt-6 max-h-[64vh] thin-scrollbar overflow-y-auto ">
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
          <CardDescription>
            Manage your bookings and assign drivers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Failed to load bookings</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pickup</TableHead>
                  <TableHead>Dropoff</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Duration (hrs)</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Assign Driver</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.length > 0 ? data.data.map((booking: any) => (
                  <TableRow key={booking._id}>
                    <TableCell>{booking.pickup_location?.address || '-'}</TableCell>
                    <TableCell>{booking.dropoff_location?.address || '-'}</TableCell>
                    <TableCell>{booking.booking_type}</TableCell>
                    <TableCell>{booking.status}</TableCell>
                    <TableCell>{booking.price}</TableCell>
                    <TableCell>{booking.booking_type == 'rent' ? booking.duration_for_rent : '12'}</TableCell>
                    <TableCell>{booking.date ? new Date(booking.date).toLocaleString() : booking?.start_time ? new Date(booking.start_time).toLocaleString() :  '-'}</TableCell>
                    <TableCell>
                      {booking.status === 'pending' && (
                        <Button size="sm" onClick={() => handleAssignDriver(booking)}>
                          Assign Driver
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">No bookings found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>

      {/* Assign Driver Modal */}
      <Dialog open={assignModalOpen} onOpenChange={setAssignModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Driver</DialogTitle>
          </DialogHeader>
          {loadingDrivers ? (
            <div>Loading drivers...</div>
          ) : availableDrivers.length === 0 ? (
            <div>No available drivers found for this booking area.</div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {availableDrivers.map((driver: any) => (
                <div
                  key={driver.driver_details?._id}
                  className={`flex items-center gap-4 p-2 border rounded cursor-pointer ${selectedDriverId === driver.driver_details?._id ? 'bg-blue-100' : ''}`}
                  onClick={() => setSelectedDriverId(driver.driver_details?._id)}
                >
                  <img
                    src={driver.driver_details?.driver_img || profileImg}
                    alt={driver.driver_details?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">{driver.driver_details?.name}</div>
                    <div className="text-xs text-gray-500">{driver.user_info?.phone}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedBooking && selectedDriverId) {
                  assignDriver({ bookingId: selectedBooking._id, driverId: selectedDriverId });
                }
              }}
              disabled={!selectedDriverId || assigning}
            >
              {assigning ? 'Assigning...' : 'Confirm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingsPage; 