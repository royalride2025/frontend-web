import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { getCustomers, updateUserStatus, searchEntities } from "@/http/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { LineWave } from "react-loader-spinner";
import userImg from '../assets/user.jpg';

// const fakeCustomers = [
//   { _id: "c1", name: "Ayesha Khan", dob: "1995-05-21", gender: "female", address: "Lahore", createdAt: "2024-06-01" },
//   { _id: "c2", name: "Muhammad Bilal", dob: "1992-03-15", gender: "male", address: "Karachi", createdAt: "2024-06-02" },
//   { _id: "c3", name: "Sadia Rauf", dob: "1990-08-12", gender: "female", address: "Islamabad", createdAt: "2024-06-03" },
//   { _id: "c4", name: "Ahmed Saleem", dob: "1988-10-01", gender: "male", address: "Multan", createdAt: "2024-06-04" },
//   { _id: "c5", name: "Hira Naveed", dob: "1994-12-25", gender: "female", address: "Faisalabad", createdAt: "2024-06-05" },
//   { _id: "c6", name: "Omar Shah", dob: "1993-04-19", gender: "male", address: "Rawalpindi", createdAt: "2024-06-06" },
//   { _id: "c7", name: "Mahnoor Tariq", dob: "1996-07-10", gender: "female", address: "Peshawar", createdAt: "2024-06-07" },
//   { _id: "c8", name: "Zain Raza", dob: "1991-11-30", gender: "male", address: "Quetta", createdAt: "2024-06-08" },
//   { _id: "c9", name: "Nimra Saeed", dob: "1997-01-05", gender: "female", address: "Sialkot", createdAt: "2024-06-09" },
//   { _id: "c10", name: "Asad Mehmood", dob: "1989-09-17", gender: "male", address: "Bahawalpur", createdAt: "2024-06-10" },
// ];

const CustomersPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: customersData = { customers: [], totalPages: 0, currentPage: 1, totalCount: 0 }, isLoading, isError} = useQuery({
    queryKey: ["customers", currentPage],
    queryFn: () => getCustomers({ page: currentPage }),
    staleTime: 10 * 1000,
  });

  const { mutate: search, isPending: searchLoading } = useMutation({
    mutationFn: searchEntities,
    onSuccess: (data) => {
      // Update the query cache with search results
      queryClient.setQueryData(["customers", currentPage], data);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Search failed",
        description: error.message
      });
    }
  });

  // Handle search
  useEffect(() => {
    if (!searchQuery.trim()) {
      // If search is empty, refetch the regular data
      queryClient.invalidateQueries({ queryKey: ["customers", currentPage] });
      return;
    }

    search({ entity: 'customers', searchQuery, page: currentPage });
  }, [searchQuery, currentPage]);

  const { customers, totalPages, totalCount } = customersData;

  const { mutate: changeStatus, isPending: statusLoading } = useMutation({
    mutationFn: updateUserStatus,
    onSuccess: () => {
      toast({
        title: "Status updated",
        className:
          "text-black border-2 border-green-600 shadow-lg rounded-lg h-16",
      });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: () => {
      toast({
        title: "Failed to update status",
        variant: "destructive",
        className: "bg-red-600 text-white shadow-md",
      });
    },
  });

  useEffect(() => {
    if (customers && !isLoading && !isError) {
      console.log("Customers fetched successfully", customers);
      toast({
        className:
          "text-black border-2 border-green-600 shadow-lg rounded-lg h-16",
        title: "Customers fetched successfully.",
      });
    }
  }, [customers, isLoading, isError]);

  if (isLoading || statusLoading ) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 ">
            <LineWave
              visible={true}
              height="100"
              width="100"
              color="#000"
              ariaLabel="line-wave-loading"
              wrapperStyle={{}}
              wrapperClass=""
              firstLineColor=""
              middleLineColor=""
              lastLineColor=""
            />
          </div>
  );
  if (isError) return <div>Failed to load customers</div>;

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
              <BreadcrumbPage>Customers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-4">
          <Input
            type="search"
            placeholder="Search customers..."
            className="w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card className="mt-6 max-h-[74vh] thin-scrollbar overflow-y-auto ">
        <CardHeader>
          <CardTitle>Customers</CardTitle>
          <CardDescription>
            Manage your Customers and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Dob</TableHead>
                <TableHead className="hidden md:table-cell">Gender</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="hidden md:table-cell">
                  Created At
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers?.map((customer: any) => (
                <TableRow key={customer?._id}>
                  <TableCell>
                    <img
                      alt={customer?.name}
                      className="aspect-square rounded-md object-cover"
                      height="40"
                      width="40"
                      src={customer?.profile_img || userImg}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {customer?.name}
                  </TableCell>
                  <TableCell>
                    {customer?.dob
                      ? new Date(customer?.dob).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {customer.gender || "-"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {customer?.address || "-"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(customer?.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={customer?.user_id?.status === "active"}
                      onCheckedChange={() => {
                        const newStatus =
                          customer?.user_id?.status === "active"
                            ? "inactive"
                            : "active";
                        changeStatus({
                          userId: customer?.user_id?._id,
                          status: newStatus,
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Showing <strong>{((currentPage - 1) * 5) + 1}-{Math.min(currentPage * 5, totalCount)}</strong> of <strong>{totalCount}</strong> Customers
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomersPage;
