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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
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
import { getVehicles, updateVehicleStatus, searchEntities } from '@/http/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LineWave } from 'react-loader-spinner';
import {
  User,
  CreditCard,
  MapPin,
  Phone,
  Shield,
  Activity,
  Car,
  Calendar,
  Hash,
  Palette,
  FileText,
  UserCheck,
  X,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from '@/components/ui/badge';
import carImg1 from '../assets/carImg1.webp'
import userImg from '../assets/user.jpg'
import { Input } from '@/components/ui/input';

// const fakeVehicles = [
//   { _id: "v1", make: "Toyota", model: "Corolla", year: 2020, plate_number: "LEC-1234", status: "available", createdAt: "2024-06-01" },
//   { _id: "v2", make: "Honda", model: "Civic", year: 2021, plate_number: "KHI-5678", status: "assigned", createdAt: "2024-06-02" },
//   { _id: "v3", make: "Suzuki", model: "Alto", year: 2019, plate_number: "ISB-4321", status: "maintenance", createdAt: "2024-06-03" },
//   { _id: "v4", make: "Kia", model: "Sportage", year: 2022, plate_number: "MLT-9876", status: "available", createdAt: "2024-06-04" },
//   { _id: "v5", make: "Hyundai", model: "Tucson", year: 2020, plate_number: "FSD-3344", status: "assigned", createdAt: "2024-06-05" },
//   { _id: "v6", make: "MG", model: "HS", year: 2023, plate_number: "RWP-7788", status: "available", createdAt: "2024-06-06" },
//   { _id: "v7", make: "Toyota", model: "Yaris", year: 2021, plate_number: "PSH-4455", status: "available", createdAt: "2024-06-07" },
//   { _id: "v8", make: "Honda", model: "City", year: 2022, plate_number: "QTTA-5522", status: "assigned", createdAt: "2024-06-08" },
//   { _id: "v9", make: "Daihatsu", model: "Mira", year: 2018, plate_number: "SLKT-9001", status: "maintenance", createdAt: "2024-06-09" },
//   { _id: "v10", make: "Suzuki", model: "WagonR", year: 2020, plate_number: "BWP-3210", status: "available", createdAt: "2024-06-10" },
// ];


const VehiclesPage = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const { data: vehiclesData = { vehicles: [], totalPages: 0, currentPage: 1, totalCount: 0 }, isLoading, isError} = useQuery({
      queryKey: ["vehicles", currentPage],
      queryFn: () => getVehicles({ page: currentPage }),
      staleTime: 10 * 1000,
    });

    const { mutate: search, isPending: searchLoading } = useMutation({
      mutationFn: searchEntities,
      onSuccess: (data) => {
        // Update the query cache with search results
        queryClient.setQueryData(["vehicles", currentPage], data);
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
        queryClient.invalidateQueries({ queryKey: ["vehicles", currentPage] });
        return;
      }

      search({ entity: 'vehicles', searchQuery, page: currentPage });
    }, [searchQuery, currentPage]);

    const { vehicles, totalPages, totalCount } = vehiclesData;

    const { mutate: changeStatus, isPending: statusLoading } = useMutation({
      mutationFn: updateVehicleStatus,
      onSuccess: () => {
        toast({
          title: "Status updated",
          className:
            "text-black border-2 border-green-600 shadow-lg rounded-lg h-16",
        });
        queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      },
      onError: () => {
        toast({
          title: "Failed to update status",
          variant: "destructive",
          className: "bg-red-600 text-white shadow-md",
        });
      },
    });

    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
    const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
    const {
      user_details,
      owner_name,
      owner_address,
      owner_national_id,
      profile_status,
      terms_accepted,
      language_preference,
      is_driver,
      profile_img,
      vehicle_details,
      driver_details,
    } = selectedVehicle || {};

    useEffect(() => {
      if (vehicles && !isLoading && !isError) {
        console.log("Vehicles fetched successfully", vehicles);
        toast({
          className:
            "text-black border-2 border-green-600 shadow-lg rounded-lg h-16",
          title: "Vehicles fetched successfully.",
          // description: "Customer data fetched successfully.",
        });
      }
    }, [vehicles, isLoading, isError]);

    if (isLoading || statusLoading)
      return (
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
    if (isError) return <div>Failed to load vehicles</div>;

    const getStatusColor = (status: string) => {
      switch (vehicle_details?.status?.toLowerCase()) {
        case "active":
          return "bg-green-100 text-green-800 border-green-200"
        case "inactive":
          return "bg-red-100 text-red-800 border-red-200"
        case "pending":
          return "bg-yellow-100 text-yellow-800 border-yellow-200"
        default:
          return "bg-gray-100 text-gray-800 border-gray-200"
      }
    }
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
          <div className="flex items-center gap-4">
            <Input
              type="search"
              placeholder="Search vehicles..."
              className="w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card className="mt-6 max-h-[74vh] thin-scrollbar overflow-y-auto ">
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
                  <TableHead className="w-[80px]">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Driver</TableHead>

                  <TableHead>Make/Model</TableHead>
                  <TableHead className="hidden md:table-cell">Year</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Plate Number
                  </TableHead>
                  <TableHead>Status</TableHead>
                  {/* <TableHead>Status</TableHead> */}
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles?.length > 0 && vehicles.map((vehicle: any) => (
                  <TableRow key={vehicle?._id}>
                    <TableCell>
                      <img
                        alt={`${vehicle?.vehicle_details?.car_make} ${vehicle?.vehicle_details?.car_model}`}
                        className="aspect-square rounded-md object-cover"
                        height="40"
                        width="40"
                        src={vehicle?.vehicle_details?.vehicle_pictures?.[0] || carImg1}
                      />
                    </TableCell>
                    <TableCell
                      className="font-medium cursor-pointer"
                      onClick={() => {
                        setSelectedVehicle(vehicle);
                        console.log("vehicle", vehicle);
                        setOpenDrawer(true);
                      }}
                    >
                      {vehicle?.owner_name}
                    </TableCell>
                    <TableCell className="font-medium">
                      {vehicle?.is_driver ? "Self" : "Not assigned"}
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      {vehicle?.vehicle_details?.car_make &&
                      vehicle?.vehicle_details?.car_model
                        ? `${vehicle.vehicle_details.car_make} ${vehicle.vehicle_details.car_model}`
                        : "no car"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {vehicle?.vehicle_details?.car_year}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {vehicle?.vehicle_details?.license_plate}
                    </TableCell>
                    {/* <TableCell className="hidden md:table-cell">
                      {vehicle.status}
                    </TableCell> */}
                    {/* <TableCell className="hidden md:table-cell">
                      {vehicle.createdAt}
                    </TableCell> */}
                    <Switch
                      className="mt-3"
                      checked={vehicle?.vehicle_details?.status === "active"}
                      onCheckedChange={() => {
                        const newStatus =
                          vehicle?.vehicle_details?.status === "active"
                            ? "inactive"
                            : "active";
                        changeStatus({
                          id: vehicle?.vehicle_details?._id,
                          status: newStatus,
                        });
                      }}
                    />
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
              Showing <strong>{((currentPage - 1) * 5) + 1}-{Math.min(currentPage * 5, totalCount)}</strong> of <strong>{totalCount}</strong> Vehicles
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

        {/* drawer right */}
        <Drawer direction="right" open={openDrawer}>
          <DrawerContent className="h-screen max-w-2xl ml-auto overflow-y-auto overflow-x-hidden thin-scrollbar">
            <DrawerHeader className="border-b  bg-[#FBFBFB]">
              <div className="flex items-center justify-between">
                <DrawerTitle className="font-bold text-gray-900 flex items-center gap-2">
                  <User className="h-6 w-6 text-blue-600" />
                  Owner & Vehicle Details
                </DrawerTitle>
                <DrawerClose asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setOpenDrawer(false)}
                    className="h-8 w-8 p-0 hover:bg-white/50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </DrawerClose>
              </div>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto thin-scrollbar p-6 space-y-6">
              {/* Owner Information */}
              <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      Owner Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100">
                      <User className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Full Name
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {owner_name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100">
                      <CreditCard className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          National ID
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {owner_national_id}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100">
                      <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Address
                        </p>
                        <p className="text-sm text-gray-900">{owner_address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100">
                      <Phone className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Phone Number
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {user_details?.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Role
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {user_details?.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-gray-500" />
                      <Badge
                        className={`${getStatusColor(
                          user_details?.status || ""
                        )} font-medium`}
                      >
                        {user_details?.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vehicle Information */}
              <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Car className="h-5 w-5 text-green-600" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      Vehicle Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100">
                      <Car className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Make & Model
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {vehicle_details?.car_make}{" "}
                          {vehicle_details?.car_model}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100">
                      <Calendar className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Year
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {vehicle_details?.car_year}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100">
                      <FileText className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Type
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {vehicle_details?.vehicle_type}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100">
                      <Palette className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Color
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {vehicle_details?.vehicle_color}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100">
                      <Hash className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          License Plate
                        </p>
                        <p className="text-sm font-semibold text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                          {vehicle_details?.license_plate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100">
                      <FileText className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Registration No.
                        </p>
                        <p className="text-sm font-semibold text-gray-900 font-mono">
                          {vehicle_details?.vehicle_registration_no}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Driver Information */}
              {is_driver && driver_details && (
                <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <UserCheck className="h-5 w-5 text-purple-600" />
                      <h2 className="text-lg font-semibold text-gray-900">
                        Driver Information
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100">
                        <User className="h-4 w-4 text-gray-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Driver Name
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {driver_details.name}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100">
                        <CreditCard className="h-4 w-4 text-gray-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            License Number
                          </p>
                          <p className="text-sm font-semibold text-gray-900 font-mono">
                            {driver_details.license_no}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100">
                        <Calendar className="h-4 w-4 text-gray-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            License Expiry
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {new Date(
                              driver_details.license_expiry
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100">
                        <Calendar className="h-4 w-4 text-gray-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Date of Birth
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {new Date(driver_details.dob).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100 md:col-span-2">
                        <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Address
                          </p>
                          <p className="text-sm text-gray-900">
                            {driver_details.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Documents & Media */}
                            {
                              <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50">
                              <CardContent className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                  <FileText className="h-5 w-5 text-indigo-600" />
                                  <h2 className="text-lg font-semibold text-gray-900">Documents & Media</h2>
                                </div>
              
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  
                                  {/* Driving License PDF */}
                                  {driver_details?.driving_license_file && (
                                    <DocLink
                                      label="Driving License File"
                                      url={driver_details.driving_license_file}
                                    />
                                  )}
              
                                  {/* Criminal Record Certificate PDF */}
                                  {driver_details?.criminal_record_certificate && (
                                    <DocLink
                                      label="Criminal Record Certificate"
                                      url={driver_details.criminal_record_certificate}
                                    />
                                  )}
              
                                  {/* Medical Fitness Report PDF */}
                                  {driver_details?.medical_fitness_report && (
                                    <DocLink
                                      label="Medical Fitness Report"
                                      url={driver_details.medical_fitness_report}
                                    />
                                  )}
              
                                  {/* Vehicle Registration File */}
                                  {vehicle_details?.vehicle_registration_file && (
                                    <DocLink
                                      label="Vehicle Registration File"
                                      url={vehicle_details.vehicle_registration_file}
                                    />
                                  )}
              
                                  {/* Insurance File */}
                                  {vehicle_details?.insurance_file && (
                                    <DocLink
                                      label="Insurance File"
                                      url={vehicle_details.insurance_file}
                                    />
                                  )}
              
                                  {/* Periodic Vehicle Inspection File */}
                                  {vehicle_details?.periodic_vehicle_inspection_file && (
                                    <DocLink
                                      label="Vehicle Inspection File"
                                      url={vehicle_details.periodic_vehicle_inspection_file}
                                    />
                                  )}
                                </div>
              
                                {/* Vehicle Pictures */}
                                {vehicle_details?.vehicle_pictures?.length > 0 && (
                                  <>
                                    <Separator className="my-6" />
                                    <p className="text-sm font-medium text-gray-600 mb-2">Vehicle Pictures</p>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                      {vehicle_details.vehicle_pictures.map((pic: string, idx: number) => (
                                        <img
                                          key={idx}
                                          // src={pic || carImg1}
                                          src={carImg1}
                                          // onClick={() => setLightboxImage(selectedDriver?.driver_img || carImg1)}
                                          onClick={() => setLightboxImage(carImg1)}
              
                                          alt={`Vehicle ${idx + 1}`}
                                          className="w-full h-40 object-cover rounded shadow border cursor-pointer"
                                        />
                                      ))}
                                    </div>
                                  </>
                                )}
                              </CardContent>
                            </Card>}
            </div>

            <DrawerFooter className="border-t bg-gray-50/50">
              <div className="flex gap-2 justify-end">
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    onClick={() => setOpenDrawer(false)}
                    className="min-w-[100px]"
                  >
                    Close
                  </Button>
                </DrawerClose>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

         {/*shoe image */}
          {lightboxImage && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
              onClick={() => setLightboxImage(null)}
            >
              <img
                src={lightboxImage}
                alt="Preview"
                className="max-w-full max-h-full object-contain p-4"
              />
              <button
                className="absolute top-4 right-4 text-white text-3xl font-bold"
                onClick={() => setLightboxImage(null)}
              >
                &times;
              </button>
            </div>
          )}
      </div>
    );
};

export default VehiclesPage;

const DocLink = ({ label, url }: { label: string; url: string }) => (
  <div>
    <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block text-blue-600 hover:underline text-sm truncate max-w-full"
    >
      {url}
    </a>
  </div>
);