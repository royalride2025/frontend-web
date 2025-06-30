import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
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
import { getDrivers, updateDriverProfileStatus, updateUserStatus } from "@/http/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { LineWave } from "react-loader-spinner";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  User,
  CreditCard,
  MapPin,
  Phone,
  Car,
  Calendar,
  Hash,
  Palette,
  FileText,
  UserCheck,
  X,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import carImg1 from '../assets/carImg1.webp'
import userImg from '../assets/user.jpg'


// const DriversList = [
//   {
//     _id: "1",
//     name: "Azam Khan",
//     license_no: "LIC-9283",
//     vehicle_assigned: "Toyota Prius",
//     profile_img:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAfzEdNxQG6-ZImpr7bPAeD-nWoXgXs8qQ&s",
//     status: "active",
//     createdAt: "2024-06-01",
//   },
//   {
//     _id: "2",
//     name: "Sana Malik",
//     license_no: "LIC-1123",
//     vehicle_assigned: "Honda Civic",
//     profile_img:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAfzEdNxQG6-ZImpr7bPAeD-nWoXgXs8qQ&s",
//     status: "inactive",
//     createdAt: "2024-06-05",
//   },
//   {
//     _id: "3",
//     name: "Ahmed Raza",
//     license_no: "LIC-3344",
//     vehicle_assigned: "Suzuki Alto",
//     profile_img:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAfzEdNxQG6-ZImpr7bPAeD-nWoXgXs8qQ&s",
//     status: "active",
//     createdAt: "2024-06-03",
//   },
//   {
//     _id: "4",
//     name: "Zainab Shah",
//     license_no: "LIC-5566",
//     vehicle_assigned: "Kia Sportage",
//     profile_img:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAfzEdNxQG6-ZImpr7bPAeD-nWoXgXs8qQ&s",
//     status: "inactive",
//     createdAt: "2024-06-04",
//   },
//   {
//     _id: "5",
//     name: "Bilal Arshad",
//     license_no: "LIC-7788",
//     vehicle_assigned: "Hyundai Tucson",
//     profile_img:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAfzEdNxQG6-ZImpr7bPAeD-nWoXgXs8qQ&s",
//     status: "active",
//     createdAt: "2024-06-02",
//   },
//   {
//     _id: "6",
//     name: "Maham Yousaf",
//     license_no: "LIC-9911",
//     vehicle_assigned: "Suzuki Cultus",
//     profile_img:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAfzEdNxQG6-ZImpr7bPAeD-nWoXgXs8qQ&s",
//     status: "inactive",
//     createdAt: "2024-06-06",
//   },
//   {
//     _id: "7",
//     name: "Usman Tariq",
//     license_no: "LIC-2233",
//     vehicle_assigned: "Toyota Corolla",
//     profile_img:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAfzEdNxQG6-ZImpr7bPAeD-nWoXgXs8qQ&s",
//     status: "active",
//     createdAt: "2024-06-01",
//   },
//   {
//     _id: "8",
//     name: "Hina Aslam",
//     license_no: "LIC-4455",
//     vehicle_assigned: "MG HS",
//     profile_img:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAfzEdNxQG6-ZImpr7bPAeD-nWoXgXs8qQ&s",
//     status: "inactive",
//     createdAt: "2024-06-07",
//   },
//   {
//     _id: "9",
//     name: "Talha Sheikh",
//     license_no: "LIC-6677",
//     vehicle_assigned: "Daihatsu Mira",
//     profile_img:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAfzEdNxQG6-ZImpr7bPAeD-nWoXgXs8qQ&s",
//     status: "active",
//     createdAt: "2024-06-08",
//   },
//   {
//     _id: "10",
//     name: "Nimra Iqbal",
//     license_no: "LIC-8899",
//     vehicle_assigned: "Suzuki WagonR",
//     profile_img:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAfzEdNxQG6-ZImpr7bPAeD-nWoXgXs8qQ&s",
//     status: "inactive",
//     createdAt: "2024-06-09",
//   },
// ];

const DriversPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [filterStatus, setFilterStatus] = useState<'accepted' | 'requested'>('accepted');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: driversData = { drivers: [], totalPages: 0, currentPage: 1, totalCount: 0 }, isLoading, isError} = useQuery({
    queryKey: ["drivers", currentPage, filterStatus],
    queryFn: () => getDrivers({ page: currentPage, filterStatus }),
    staleTime: 10 * 1000,
  });

  const { drivers, totalPages, totalCount } = driversData;

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus]);

  const { mutate: changeProfileStatus, isPending: profileStatusLoading } = useMutation({
    mutationFn: updateDriverProfileStatus,
    onSuccess: () => {
      toast({
        title: "Profile accepted",
        className:
          "text-black border-2 border-green-600 shadow-lg rounded-lg h-16",
      });
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
    onError: () => {
      toast({
        title: "Failed to accept profile",
        variant: "destructive",
        className: "bg-red-600 text-white shadow-md",
      });
    },
  });

  const { mutate: changeStatus, isPending: statusLoading } = useMutation({
    mutationFn: updateUserStatus,
    onSuccess: () => {
      toast({
        title: "Status updated",
        className:
          "text-black border-2 border-green-600 shadow-lg rounded-lg h-16",
      });
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
    onError: () => {
      toast({
        title: "Failed to update status",
        variant: "destructive",
        className: "bg-red-600 text-white shadow-md",
      });
    },
  });

  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [selectedDriver, setSelectedDriver] = useState<any>(null);
    const {
  user_id,
  car_owner_details,
  vehicle_details,
  name,
  natioanl_id,
  address,
  license_no,
  license_expiry,
  dob,
  
  is_car_owner,
} = selectedDriver || {};

  useEffect(() => {
    if (drivers && !isLoading && !isError) {
      console.log("Drivers fetched successfully", drivers);
      toast({
        className:
          "text-black border-2 border-green-600 shadow-lg rounded-lg h-16",
        title: "Drivers fetched successfully.",
        // description: "Customer data fetched successfully.",
      });
    }
  }, [drivers, isLoading, isError]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus]);

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

  if (isLoading || statusLoading || profileStatusLoading) return (
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
              <BreadcrumbPage>Drivers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* <Link to="/driver/create">
          <Button>
            <CirclePlus size={20} />
            <span className="ml-2">Add Driver</span>
          </Button>
        </Link> */}
      </div>
      <div className="flex gap-4 mb-4 mt-4">
        <Button
          onClick={() => setFilterStatus("accepted")}
          variant={filterStatus === "accepted" ? "default" : "outline"}
        >
          All
        </Button>
        <Button
          onClick={() => setFilterStatus("requested")}
          variant={filterStatus === "requested" ? "default" : "outline"}
        >
          Requests
        </Button>
      </div>
      <Card className="mt-6  max-h-[64vh] thin-scrollbar overflow-y-auto ">
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
                <TableHead className="w-[80px]">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>License No</TableHead>
                <TableHead className="hidden md:table-cell">Vehicle</TableHead>
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
              {drivers.map((driver: any) => (
                <TableRow key={driver?._id}>
                  <TableCell>
                    <img
                      alt={driver?.name}
                      className="aspect-square rounded-md object-cover"
                      height="40"
                      width="40"
                      src={driver?.driver_img || userImg}
                    />
                  </TableCell>
                  <TableCell
                    className="font-medium cursor-pointer"
                    onClick={() => {
                      setSelectedDriver(driver);
                      console.log("driver", driver);
                      setOpenDrawer(true);
                    }}
                  >
                    {driver?.name}
                  </TableCell>
                  <TableCell>{driver?.license_no}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {driver?.vehicle_details?.car_make &&
                    driver?.vehicle_details?.car_model &&
                    driver?.vehicle_details?.car_year
                      ? `${driver.vehicle_details.car_make} ${driver.vehicle_details.car_model} ${driver.vehicle_details.car_year}`
                      : "no car"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {driver.createdAt}
                  </TableCell>
                  <TableCell>
                    {filterStatus === "requested" ? (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            changeProfileStatus({
                              userId: driver._id,
                              status: "accepted",
                            })
                          }
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            changeProfileStatus({
                              userId: driver._id,
                              status: "rejected",
                            })
                          }
                        >
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <Switch
                        checked={driver?.user_id?.status === "active"}
                        onCheckedChange={() => {
                          const newStatus =
                            driver?.user_id?.status === "active"
                              ? "inactive"
                              : "active";
                          changeStatus({
                            userId: driver?.user_id?._id,
                            status: newStatus,
                          });
                        }}
                      />
                    )}
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
            Showing <strong>{((currentPage - 1) * 5) + 1}-{Math.min(currentPage * 5, totalCount)}</strong> of <strong>{totalCount}</strong> drivers
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

      {/* Drawer */}
      {/* drawer right */}
      <Drawer direction="right" open={openDrawer}>
        <DrawerContent className="h-screen max-w-2xl ml-auto overflow-y-auto overflow-x-hidden thin-scrollbar">
          <DrawerHeader className="border-b  bg-[#FBFBFB]">
            <div className="flex items-center justify-between">
              <DrawerTitle className="font-bold text-gray-900 flex items-center gap-2">
                <User className="h-6 w-6 text-blue-600" />
                Driver, Owner & Vehicle Details
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
            {/* Driver Information */}
            <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-8">
                  <UserCheck className="h-5 w-5 text-purple-600" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Driver Information
                  </h2>
                </div>
                {/* Driver Profile Image */}
                    {(selectedDriver?.driver_img || userImg) && (
                      <div className="w-1/3 mb-4 rounded-full">
                        <img
                          // src={selectedDriver?.driver_img || userImg}
                          src={userImg}

                          alt="Driver"
                          className="w-full h-40 object-cover rounded-full cursor-pointer"
                          onClick={() => setLightboxImage(selectedDriver?.driver_img || userImg)}

                        />
                      </div>
                    )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <InfoBox icon={<User />} label="Driver Name" value={name} />
                  <InfoBox
                      icon={<User />}
                      label="Is Car Owner"
                      value={is_car_owner ? 'Yes' : 'No'}
                    />
                  <InfoBox
                      icon={<Phone />}
                      label="Phone Number"
                      value={user_id?.phone}
                    />
                    <InfoBox
                      icon={<CreditCard />}
                      label="National Id"
                      value={natioanl_id}
                    />
                  <InfoBox
                    icon={<CreditCard />}
                    label="License Number"
                    value={license_no}
                  />
                  <InfoBox
                    icon={<Calendar />}
                    label="License Expiry"
                    value={new Date(license_expiry).toLocaleDateString()}
                  />
                  <InfoBox
                    icon={<Calendar />}
                    label="Date of Birth"
                    value={new Date(dob).toLocaleDateString()}
                  />
                  <InfoBox
                    icon={<MapPin />}
                    label="Address"
                    value={address}
                    colSpan={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Owner Information (Only if is_car_owner is true) */}
            {car_owner_details &&  (
              <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      Owner Information
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoBox
                      icon={<User />}
                      label="Full Name"
                      value={car_owner_details?.name}
                    />
                    <InfoBox
                      icon={<CreditCard />}
                      label="National ID"
                      value={car_owner_details?.natioanl_id}
                    />
                    <InfoBox
                      icon={<MapPin />}
                      label="Address"
                      value={car_owner_details?.address}
                    />
                    
                  </div>

                  <Separator className="my-4" />

                  
                </CardContent>
              </Card>
            )}

            {/* Vehicle Information (Only if vehicle_details exists) */}
            {vehicle_details && (
              <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Car className="h-5 w-5 text-green-600" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      Vehicle Information
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InfoBox
                      icon={<Car />}
                      label="Make & Model"
                      value={`${vehicle_details.car_make} ${vehicle_details.car_model}`}
                    />
                    <InfoBox
                      icon={<Calendar />}
                      label="Year"
                      value={vehicle_details.car_year}
                    />
                    <InfoBox
                      icon={<FileText />}
                      label="Type"
                      value={vehicle_details.vehicle_type}
                    />
                    <InfoBox
                      icon={<Palette />}
                      label="Color"
                      value={vehicle_details.vehicle_color}
                    />
                    <InfoBox
                      icon={<Hash />}
                      label="License Plate"
                      value={vehicle_details.license_plate}
                      isMono
                      bg
                    />
                    <InfoBox
                      icon={<FileText />}
                      label="Registration No."
                      value={vehicle_details.vehicle_registration_no}
                      isMono
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Documents & Media */}
              {is_car_owner &&
                <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-5 w-5 text-indigo-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Documents & Media</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    

                    {/* Driving License PDF */}
                    {selectedDriver?.driving_license_file && (
                      <DocLink
                        label="Driving License File"
                        url={selectedDriver.driving_license_file}
                      />
                    )}

                    {/* Criminal Record Certificate PDF */}
                    {selectedDriver?.criminal_record_certificate && (
                      <DocLink
                        label="Criminal Record Certificate"
                        url={selectedDriver.criminal_record_certificate}
                      />
                    )}

                    {/* Medical Fitness Report PDF */}
                    {selectedDriver?.medical_fitness_report && (
                      <DocLink
                        label="Medical Fitness Report"
                        url={selectedDriver.medical_fitness_report}
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

export default DriversPage;


const InfoBox = ({ icon, label, value, colSpan = 1, isMono = false, bg = false }: { icon: React.ReactElement; label: string; value: string; colSpan?: number; isMono?: boolean; bg?: boolean }) => (
  <div className={`flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100 ${colSpan === 2 ? 'md:col-span-2' : ''}`}>
    {React.cloneElement(icon, { className: "h-4 w-4 text-gray-500 mt-1" })}
    <div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className={`text-sm font-semibold text-gray-900 ${isMono ? 'font-mono' : ''} ${bg ? 'bg-gray-100 px-2 py-1 rounded' : ''}`}>
        {value || "N/A"}
      </p>
    </div>
  </div>
);

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
