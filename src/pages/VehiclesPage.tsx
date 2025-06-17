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

const fakeVehicles = [
  { _id: "v1", make: "Toyota", model: "Corolla", year: 2020, plate_number: "LEC-1234", status: "available", createdAt: "2024-06-01" },
  { _id: "v2", make: "Honda", model: "Civic", year: 2021, plate_number: "KHI-5678", status: "assigned", createdAt: "2024-06-02" },
  { _id: "v3", make: "Suzuki", model: "Alto", year: 2019, plate_number: "ISB-4321", status: "maintenance", createdAt: "2024-06-03" },
  { _id: "v4", make: "Kia", model: "Sportage", year: 2022, plate_number: "MLT-9876", status: "available", createdAt: "2024-06-04" },
  { _id: "v5", make: "Hyundai", model: "Tucson", year: 2020, plate_number: "FSD-3344", status: "assigned", createdAt: "2024-06-05" },
  { _id: "v6", make: "MG", model: "HS", year: 2023, plate_number: "RWP-7788", status: "available", createdAt: "2024-06-06" },
  { _id: "v7", make: "Toyota", model: "Yaris", year: 2021, plate_number: "PSH-4455", status: "available", createdAt: "2024-06-07" },
  { _id: "v8", make: "Honda", model: "City", year: 2022, plate_number: "QTTA-5522", status: "assigned", createdAt: "2024-06-08" },
  { _id: "v9", make: "Daihatsu", model: "Mira", year: 2018, plate_number: "SLKT-9001", status: "maintenance", createdAt: "2024-06-09" },
  { _id: "v10", make: "Suzuki", model: "WagonR", year: 2020, plate_number: "BWP-3210", status: "available", createdAt: "2024-06-10" },
];


const VehiclesPage = () => {
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
                <BreadcrumbPage>Vehicles</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Link to="/vehicle/create">
            <Button>
              <CirclePlus size={20} />
              <span className="ml-2">Add Vehicles</span>
            </Button>
          </Link>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Vehicles</CardTitle>
            <CardDescription>
              Manage your Vehicles and view their sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {/* <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead> */}
                  <TableHead>Make</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Year
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Plate Number
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  {/* <TableHead>Status</TableHead> */}
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fakeVehicles.map((driver) => (
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
                    <TableCell className="font-medium">{driver.make}</TableCell>
                    <TableCell>{driver.model}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {driver.year}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {driver.plate_number}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {driver.status}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {driver.createdAt}
                    </TableCell>
                    {/* <TableCell>
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
                    </TableCell> */}
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
              Showing <strong>1-10</strong> of <strong>32</strong> Vehicles
            </div>
          </CardFooter>
        </Card>
      </div>
    );
};

export default VehiclesPage;
