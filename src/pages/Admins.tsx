import { Badge } from '@/components/ui/badge';
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
import { getBooks } from '@/http/api';
import { Book } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { CirclePlus, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    // todo: add loading spinner, and error message
    // @ts-ignore

    const { data, isLoading, isError } = useQuery({
        queryKey: ['books'],
        queryFn: getBooks,
        staleTime: 10000, // in Milli-seconds
    });

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
          <Link to="/admin/create">
            <Button>
              <CirclePlus size={20} />
              <span className="ml-2">Add Admin</span>
            </Button>
          </Link>
        </div>

        <Card className="mt-6">
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
                  {/* <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead> */}
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
                {adminsList.map((driver) => (
                  <TableRow key={driver._id}>
                    
                    <TableCell className="font-medium">{driver.name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {driver.email}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {driver.role}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {driver.createdAt}
                    </TableCell>
                    <TableCell>
                      <Switch
                        // checked={driver.status === "active"}
                        onCheckedChange={(val) =>
                          console.log(
                            "Toggled",
                            driver.name,
                            val ? "active" : "inactive"
                          )
                        }
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
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>32</strong> admins
            </div>
          </CardFooter>
        </Card>
      </div>
    );
};

export default Admins;
