import React, { useState } from 'react';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCreditsHistoryAdmin, approveCreditTransaction } from '@/http/api';
import { useToast } from '@/hooks/use-toast';

const CreditsPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<'all' | 'pending'>('all');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Fetch credits
  const status = filter === 'all' ? undefined : 'pending';
  const { data, isLoading, isError } = useQuery({
    queryKey: ['credits', filter, page],
    queryFn: () => getCreditsHistoryAdmin({ status, page, limit }),
    // keepPreviousData: true,
  });

  // Approve mutation
  const { mutate: approve, isPending: approving } = useMutation({
    mutationFn: (id: string) => approveCreditTransaction(id),
    onSuccess: () => {
      toast({ title: 'Credit approved successfully' });
      queryClient.invalidateQueries({ queryKey: ['credits'] });
    },
    onError: (error: any) => {
      toast({ title: 'Failed to approve', description: error?.response?.data?.message || 'Error', variant: 'destructive' });
    },
  });

  const handleApprove = (id: string) => {
    approve(id);
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
                      <BreadcrumbPage>Credits</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
        
        <div className="flex gap-4 mb-4 mt-4">
          <Button onClick={() => setFilter('all')} variant={filter === 'all' ? 'default' : 'outline'}>All</Button>
          <Button onClick={() => setFilter('pending')} variant={filter === 'pending' ? 'default' : 'outline'}>Pending</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Credits Transaction Listing</CardTitle>
          <CardDescription>Manage and approve credits transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Failed to load credits</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Booking</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.length > 0 ? data.data.map((tx: any) => (
                  <TableRow key={tx._id}>
                    <TableCell>
                      <div className="font-semibold">{tx.user?.phone}</div>
                      <div className="text-xs text-gray-500">{tx.user?.role}</div>
                    </TableCell>
                    <TableCell>{tx.type}</TableCell>
                    <TableCell>{tx.amount}</TableCell>
                    <TableCell>{tx.status}</TableCell>
                    <TableCell>
                      {tx.booking ? (
                        <div>
                          <div className="text-xs">{tx.booking.pickup_location?.address} → {tx.booking.dropoff_location?.address}</div>
                          <div className="text-xs text-gray-500">{tx.booking.status}</div>
                        </div>
                      ) : '-'}
                    </TableCell>
                    <TableCell>{tx.createdAt ? new Date(tx.createdAt).toLocaleString() : '-'}</TableCell>
                    <TableCell>
                      {tx.status === 'pending' && (
                        <Button size="sm" onClick={() => handleApprove(tx._id)} disabled={approving}>
                          {approving ? 'Approving...' : 'Approve'}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">No credits found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter>
          <div className="flex justify-between w-full items-center">
            <div>Page {data?.currentPage} of {data?.totalPages}</div>
            <div className="flex gap-2">
              <Button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</Button>
              <Button onClick={() => setPage(p => (data?.totalPages && p < data.totalPages ? p + 1 : p))} disabled={data?.totalPages ? page >= data.totalPages : true}>Next</Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreditsPage;
