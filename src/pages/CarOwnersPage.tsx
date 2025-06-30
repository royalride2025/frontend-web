// import { Badge } from '@/components/ui/badge';
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
// import { Book } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { CirclePlus, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import userImg from '../assets/user.jpg';

const carOwnersList = [
  { _id: "co1", name: "Ali Rehman", company_name: "Rehman Transport", address: "Lahore", license_no: "CO-1111", profile_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL7vXXOC__EODFPAoLotYwePZfR9PQIQ8ILg&s", createdAt: "2024-06-01" },
  { _id: "co2", name: "Fatima Riaz", company_name: "FR Cabs", address: "Karachi", license_no: "CO-2222", profile_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL7vXXOC__EODFPAoLotYwePZfR9PQIQ8ILg&s", createdAt: "2024-06-02" },
  { _id: "co3", name: "Zeeshan Tariq", company_name: "ZT Logistics", address: "Islamabad", license_no: "CO-3333", profile_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL7vXXOC__EODFPAoLotYwePZfR9PQIQ8ILg&s", createdAt: "2024-06-03" },
  { _id: "co4", name: "Hina Qureshi", company_name: "HQ Rides", address: "Multan", license_no: "CO-4444", profile_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL7vXXOC__EODFPAoLotYwePZfR9PQIQ8ILg&s", createdAt: "2024-06-04" },
  { _id: "co5", name: "Umer Asif", company_name: "Asif Transport", address: "Faisalabad", license_no: "CO-5555", profile_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL7vXXOC__EODFPAoLotYwePZfR9PQIQ8ILg&s", createdAt: "2024-06-05" },
  { _id: "co6", name: "Areeba Ahmed", company_name: "AA Cars", address: "Rawalpindi", license_no: "CO-6666", profile_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL7vXXOC__EODFPAoLotYwePZfR9PQIQ8ILg&s", createdAt: "2024-06-06" },
  { _id: "co7", name: "Tariq Khan", company_name: "TK Mobility", address: "Peshawar", license_no: "CO-7777", profile_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL7vXXOC__EODFPAoLotYwePZfR9PQIQ8ILg&s", createdAt: "2024-06-07" },
  { _id: "co8", name: "Mehwish Iqbal", company_name: "MI Cabs", address: "Quetta", license_no: "CO-8888", profile_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL7vXXOC__EODFPAoLotYwePZfR9PQIQ8ILg&s", createdAt: "2024-06-08" },
  { _id: "co9", name: "Kamran Javed", company_name: "Javed Movers", address: "Sialkot", license_no: "CO-9999", profile_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL7vXXOC__EODFPAoLotYwePZfR9PQIQ8ILg&s", createdAt: "2024-06-09" },
  { _id: "co10", name: "Sadia Nawaz", company_name: "SN Cars", address: "Bahawalpur", license_no: "CO-0000", profile_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL7vXXOC__EODFPAoLotYwePZfR9PQIQ8ILg&s", createdAt: "2024-06-10" },
];


const CarOwnersPage = () => {
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
                <BreadcrumbPage>CarOwners</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {/* <Link to="/car-owner/create">
            <Button>
              <CirclePlus size={20} />
              <span className="ml-2">Add CarOwners</span>
            </Button>
          </Link> */}
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>CarOwners</CardTitle>
            <CardDescription>
              Manage your CarOwners and view their sales performance.
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
                  <TableHead>Company Name</TableHead>
                  <TableHead>License No</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Address
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
                {carOwnersList.map((driver) => (
                  <TableRow key={driver._id}>
                    <TableCell>
                      <img
                        alt={driver.name}
                        className="aspect-square rounded-md object-cover"
                        height="40"
                        width="40"
                        src={driver.profile_img || userImg}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{driver.name}</TableCell>
                    <TableCell>{driver.company_name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {driver.license_no}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {driver.address}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {driver.createdAt}
                    </TableCell>
                    <TableCell>
                      <Switch
                        // checked={driver?.status === "active"}
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
              Showing <strong>1-10</strong> of <strong>32</strong> CarOwners
            </div>
          </CardFooter>
        </Card>
      </div>
    );
};

export default CarOwnersPage;
