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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useSearchResults } from '@/hooks/use-search-results';
import { getAdmins, updateUserStatus, searchEntities } from '@/http/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CirclePlus, MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LineWave } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import userImg from '../assets/user.jpg';
import { Input } from '@/components/ui/input';

const adminsList = [
  { _id: "a1", name: "Admin One", email: "admin1@royalride.com", role: "super-admin", createdAt: "2024-06-01" },
  { _id: "a2", name: "Admin Two", email: "admin2@royalride.com", role: "support", createdAt: "2024-06-02" },
  { _id: "a3", name: "Admin Three", email: "admin3@royalride.com", role: "compliance", createdAt: "2024-06-03" },
  { _id: "a4", name: "Admin Four", email: "admin4@royalride.com", role: "manager", createdAt: "2024-06-04" },
  { _id: "a5", name: "Admin Five", email: "admin5@royalride.com", role: "finance", createdAt: "2024-06-05" },
  { _id: "a6", name: "Admin Six", email: "admin6@royalride.com", role: "support", createdAt: "2024-06-06" },
  { _id: "a7", name: "Admin Seven", email: "admin7@royalride.com", role: "compliance", createdAt: "2024-06-07" },
  { _id: "a8", name: "Admin Eight", email: "admin8@royalride.com", role: "finance", createdAt: "2024-06-08" },
  { _id: "a9", name: "Admin Nine", email: "admin9@royalride.com", role: "support", createdAt: "2024-06-09" },
  { _id: "a10", name: "Admin Ten", email: "admin10@royalride.com", role: "manager", createdAt: "2024-06-10" },
];

const Admins = () => {
    const { toast } = useToast()
    const queryClient = useQueryClient();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    
    const { data: adminsData = { adminsAndCompliance: [], totalPages: 0, currentPage: 1, totalCount: 0 }, isLoading, isError } = useQuery({
      queryKey: ['admins', currentPage],
      queryFn: () => getAdmins({ page: currentPage }),
      staleTime: 10 * 1000,
    });

    const { mutate: search, isPending: searchLoading } = useMutation({
      mutationFn: searchEntities,
      onSuccess: (data) => {
        // Update the query cache with search results
        queryClient.setQueryData(['admins', currentPage], data);
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
        queryClient.invalidateQueries({ queryKey: ['admins', currentPage] });
        return;
      }

      search({ entity: 'admins', searchQuery, page: currentPage });
    }, [searchQuery, currentPage]);

    const { adminsAndCompliance: admins, totalPages, totalCount } = adminsData;

    const { mutate: changeStatus, isPending: statusLoading } = useMutation({
      mutationFn: updateUserStatus,
      onSuccess: () => {
        toast({
          title: "Status updated",
          className:
            "text-black border-2 border-green-600 shadow-lg rounded-lg h-16",
        });
        queryClient.invalidateQueries({ queryKey: ["admins"] });
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
    if (admins && !isLoading && !isError) {
      console.log("Admins fetched successfully:", admins);
      toast({
        className: "text-black border-2 border-green-600 shadow-lg rounded-lg h-16",
        title: "Admins fetched successfully.",
      });
    }
  }, [admins, isLoading, isError]);

  if (isLoading || statusLoading) return (
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
                <BreadcrumbPage>Admins</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-4">
            <Input
              type="search"
              placeholder="Search admins..."
              className="w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Link to="/admin/create">
              <Button>
                <CirclePlus size={20} />
                <span className="ml-2">Add Admin</span>
              </Button>
            </Link>
          </div>
        </div>

        <Card className="mt-6 max-h-[74vh] thin-scrollbar overflow-y-auto ">
          <CardHeader>
            <CardTitle>Admins</CardTitle>
            <CardDescription>
              Manage your Admins and view their sales performance.
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
                  <TableHead>Email</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Role
                  </TableHead>
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
                {admins && admins.map((admin : any) => (
                  <TableRow key={admin._id}>
                    <TableCell>
                      <img
                        alt={admin?.profile?.name}
                        className="aspect-square rounded-md object-cover"
                        height="40"
                        width="40"
                        src={admin?.profile_img || userImg}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{admin?.profile?.name || '-'}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {admin.email}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {admin.role}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(admin.createdAt).toLocaleDateString()}

                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={admin?.status === "active"}
                        onCheckedChange={() => {
                        const newStatus =
                          admin?.status === "active"
                            ? "inactive"
                            : "active";
                        changeStatus({
                          userId: admin?._id,
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
              Showing <strong>{((currentPage - 1) * 5) + 1}-{Math.min(currentPage * 5, totalCount)}</strong> of <strong>{totalCount}</strong> admins
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

export default Admins;
