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

const DriversList = [
  {
    _id: "1",
    name: "Azam Khan",
    license_no: "LIC-9283",
    vehicle_assigned: "Toyota Prius",
    profile_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAfzEdNxQG6-ZImpr7bPAeD-nWoXgXs8qQ&s",
    status: "active",
    createdAt: "2024-06-01",
  },
  {
    _id: "2",
    name: "Sana Malik",
    license_no: "LIC-1123",
    vehicle_assigned: "Honda Civic",
    profile_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAfzEdNxQG6-ZImpr7bPAeD-nWoXgXs8qQ&s",
    status: "inactive",
    createdAt: "2024-06-05",
  },
  {
    _id: "3",
    name: "Ahmed Raza",
    license_no: "LIC-3344",
    vehicle_assigned: "Suzuki Alto",
    profile_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAfzEdNxQG6-ZImpr7bPAeD-nWoXgXs8qQ&s",
    status: "active",
    createdAt: "2024-06-03",
  },
  {
    _id: "4",
    name: "Zainab Shah",
    license_no: "LIC-5566",
    vehicle_assigned: "Kia Sportage",
    profile_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAfzEdNxQG6-ZImpr7bPAeD-nWoXgXs8qQ&s",
    status: "inactive",
    createdAt: "2024-06-04",
  },
  {
    _id: "5",
    name: "Bilal Arshad",
    license_no: "LIC-7788",
    vehicle_assigned: "Hyundai Tucson",
    profile_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAfzEdNxQG6-ZImpr7bPAeD-nWoXgXs8qQ&s",
    status: "active",
    createdAt: "2024-06-02",
  },
  {
    _id: "6",
    name: "Maham Yousaf",
    license_no: "LIC-9911",
    vehicle_assigned: "Suzuki Cultus",
    profile_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAfzEdNxQG6-ZImpr7bPAeD-nWoXgXs8qQ&s",
    status: "inactive",
    createdAt: "2024-06-06",
  },
  {
    _id: "7",
    name: "Usman Tariq",
    license_no: "LIC-2233",
    vehicle_assigned: "Toyota Corolla",
    profile_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAfzEdNxQG6-ZImpr7bPAeD-nWoXgXs8qQ&s",
    status: "active",
    createdAt: "2024-06-01",
  },
  {
    _id: "8",
    name: "Hina Aslam",
    license_no: "LIC-4455",
    vehicle_assigned: "MG HS",
    profile_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAfzEdNxQG6-ZImpr7bPAeD-nWoXgXs8qQ&s",
    status: "inactive",
    createdAt: "2024-06-07",
  },
  {
    _id: "9",
    name: "Talha Sheikh",
    license_no: "LIC-6677",
    vehicle_assigned: "Daihatsu Mira",
    profile_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAfzEdNxQG6-ZImpr7bPAeD-nWoXgXs8qQ&s",
    status: "active",
    createdAt: "2024-06-08",
  },
  {
    _id: "10",
    name: "Nimra Iqbal",
    license_no: "LIC-8899",
    vehicle_assigned: "Suzuki WagonR",
    profile_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAfzEdNxQG6-ZImpr7bPAeD-nWoXgXs8qQ&s",
    status: "inactive",
    createdAt: "2024-06-09",
  },
];

const DriversPage = () => {
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
                <BreadcrumbPage>Drivers</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Link to="/driver/create">
            <Button>
              <CirclePlus size={20} />
              <span className="ml-2">Add Drivers</span>
            </Button>
          </Link>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Drivers</CardTitle>
            <CardDescription>
              Manage your Drivers and view their sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>License No</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Vehicle Assigned
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
                {DriversList.map((driver) => (
                  <TableRow key={driver._id}>
                    <TableCell className="hidden sm:table-cell">
                      <img
                        alt={driver.name}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        width="64"
                        src={driver.profile_img}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{driver.name}</TableCell>
                    <TableCell>{driver.license_no}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {driver.vehicle_assigned}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {driver.createdAt}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={driver.status === "active"}
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
              Showing <strong>1-10</strong> of <strong>32</strong> drivers
            </div>
          </CardFooter>
        </Card>
      </div>
    );
};

export default DriversPage;
