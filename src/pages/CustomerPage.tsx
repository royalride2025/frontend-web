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

const fakeCustomers = [
  { _id: "c1", name: "Ayesha Khan", dob: "1995-05-21", gender: "female", address: "Lahore", createdAt: "2024-06-01" },
  { _id: "c2", name: "Muhammad Bilal", dob: "1992-03-15", gender: "male", address: "Karachi", createdAt: "2024-06-02" },
  { _id: "c3", name: "Sadia Rauf", dob: "1990-08-12", gender: "female", address: "Islamabad", createdAt: "2024-06-03" },
  { _id: "c4", name: "Ahmed Saleem", dob: "1988-10-01", gender: "male", address: "Multan", createdAt: "2024-06-04" },
  { _id: "c5", name: "Hira Naveed", dob: "1994-12-25", gender: "female", address: "Faisalabad", createdAt: "2024-06-05" },
  { _id: "c6", name: "Omar Shah", dob: "1993-04-19", gender: "male", address: "Rawalpindi", createdAt: "2024-06-06" },
  { _id: "c7", name: "Mahnoor Tariq", dob: "1996-07-10", gender: "female", address: "Peshawar", createdAt: "2024-06-07" },
  { _id: "c8", name: "Zain Raza", dob: "1991-11-30", gender: "male", address: "Quetta", createdAt: "2024-06-08" },
  { _id: "c9", name: "Nimra Saeed", dob: "1997-01-05", gender: "female", address: "Sialkot", createdAt: "2024-06-09" },
  { _id: "c10", name: "Asad Mehmood", dob: "1989-09-17", gender: "male", address: "Bahawalpur", createdAt: "2024-06-10" },
];


const CustomersPage = () => {
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
                <BreadcrumbPage>Customers</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {/* <Link to="/customer/create">
            <Button>
              <CirclePlus size={20} />
              <span className="ml-2">Add Customers</span>
            </Button>
          </Link> */}
        </div>

        <Card className="mt-6">
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
                  {/* <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead> */}
                  <TableHead>Name</TableHead>
                  <TableHead>Dob</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Gender
                  </TableHead>
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
                {fakeCustomers.map((driver) => (
                  <TableRow key={driver._id}>
                    {/* <TableCell className="hidden sm:table-cell">
                      <img
                        alt={driver.name}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        width="64"
                        src={driver.profile_img}
                      />
                    </TableCell> */}
                    <TableCell className="font-medium">{driver.name}</TableCell>
                    <TableCell>{driver.dob}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {driver.gender}
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
              Showing <strong>1-10</strong> of <strong>32</strong> Customers
            </div>
          </CardFooter>
        </Card>
      </div>
    );
};

export default CustomersPage;
