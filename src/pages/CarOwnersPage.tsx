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
import { useSearchResults } from '@/hooks/use-search-results';
import { getCarOwners, searchEntities, updateUserStatus, updateCarOwnerProfileStatus } from "@/http/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CirclePlus, MoreHorizontal } from "lucide-react";
import React, { useState, useEffect } from "react";
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
    X,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import carImg1 from '../assets/carImg1.webp'
import userImg from '../assets/user.jpg';
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const CarOwnersPage = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [currentPage, setCurrentPage] = useState(1);
    const [filterStatus, setFilterStatus] = useState<'accepted' | 'requested'>('accepted');
    const [searchQuery, setSearchQuery] = useState('');
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [selectedOwner, setSelectedOwner] = useState<any>(null);
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [rejectMessage, setRejectMessage] = useState('');
    const [selectedOwnerId, setSelectedOwnerId] = useState<string | null>(null);

    const { data: carOwnersData = { carOwners: [], totalPages: 0, currentPage: 1, totalCount: 0 }, isLoading, isError } = useQuery({
        queryKey: ["carOwners", currentPage, filterStatus],
        queryFn: () => getCarOwners({ page: currentPage, filterStatus }),
        staleTime: 10 * 1000,
    });

    console.log("selectedOwner:", selectedOwner);
    const { mutate: search, isPending: searchLoading } = useMutation({
        mutationFn: searchEntities,
        onSuccess: (data) => {
            queryClient.setQueryData(["carOwners", currentPage, filterStatus], data);
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Search failed",
                description: error.message
            });
        }
    });

    const { mutate: changeStatus, isPending: statusLoading } = useMutation({
        mutationFn: updateUserStatus,
        onSuccess: () => {
            toast({
                title: "Status updated",
                className: "text-black border-2 border-green-600 shadow-lg rounded-lg h-16",
            });
            queryClient.invalidateQueries({ queryKey: ["carOwners"] });
        },
        onError: () => {
            toast({
                title: "Failed to update status",
                variant: "destructive",
                className: "bg-red-600 text-white shadow-md",
            });
        },
    });

    const { mutate: changeProfileStatus, isPending: profileStatusLoading } = useMutation({
        mutationFn: updateCarOwnerProfileStatus,
        onSuccess: () => {
            toast({
                title: "Profile status updated",
                className: "text-black border-2 border-green-600 shadow-lg rounded-lg h-16",
            });
            queryClient.invalidateQueries({ queryKey: ["carOwners"] });
        },
        onError: () => {
            toast({
                title: "Failed to update profile status",
                variant: "destructive",
                className: "bg-red-600 text-white shadow-md",
            });
        },
    });

    // Handle search
    useEffect(() => {
        if (!searchQuery.trim()) {
            queryClient.invalidateQueries({ queryKey: ["carOwners", currentPage, filterStatus] });
            return;
        }

        search({ 
            entity: 'carOwners', 
            searchQuery, 
            page: currentPage, 
            filterStatus 
        });
    }, [searchQuery, currentPage, filterStatus]);

    // Reset to first page when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filterStatus]);

    const { carOwners, totalPages, totalCount } = carOwnersData;

    // Use the search results hook
    useSearchResults('carOwners', currentPage, filterStatus);

    const handleReject = (ownerId: string) => {
        setSelectedOwnerId(ownerId);
        setIsRejectModalOpen(true);
    };

    const handleRejectSubmit = () => {
        if (!selectedOwnerId) return;

        changeProfileStatus({
            userId: selectedOwnerId,
            status: "rejected",
            message: rejectMessage
        });

        setIsRejectModalOpen(false);
        setRejectMessage('');
        setSelectedOwnerId(null);
    };

    if (isLoading || statusLoading || profileStatusLoading) return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40">
            <LineWave
                visible={true}
                height="100"
                width="100"
                color="#000"
                ariaLabel="line-wave-loading"
            />
        </div>
    );

    if (isError) return <div>Failed to load car owners</div>;

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
                            <BreadcrumbPage>Car Owners</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-4">
                    <Input
                        type="search"
                        placeholder="Search by name, phone, or national ID..."
                        className="w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
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

            <Card className="mt-6 max-h-[64vh] thin-scrollbar overflow-y-auto">
                <CardHeader>
                    <CardTitle>Car Owners</CardTitle>
                    <CardDescription>
                        Manage your car owners and their vehicles.
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
                                <TableHead>Phone</TableHead>
                                <TableHead className="hidden md:table-cell">Vehicle</TableHead>
                                <TableHead className="hidden md:table-cell">Created At</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {carOwners && carOwners.map((owner: any) => (
                                <TableRow key={owner._id}>
                                    <TableCell>
                                        <img
                                            alt={owner.owner_name}
                                            className="aspect-square rounded-md object-cover"
                                            height="40"
                                            width="40"
                                            src={owner.profile_img || userImg}
                                        />
                                    </TableCell>
                                    <TableCell
                                        className="font-medium cursor-pointer"
                                        onClick={() => {
                                            setSelectedOwner(owner);
                                            setOpenDrawer(true);
                                        }}
                                    >
                                        {owner.owner_name}
                                    </TableCell>
                                    <TableCell>{owner.user_details.phone}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {owner.vehicle_details ? 
                                            `${owner.vehicle_details.car_make} ${owner.vehicle_details.car_model} ${owner.vehicle_details.car_year}` 
                                            : "No vehicle"}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {new Date(owner.user_details.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {filterStatus === "requested" ? (
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        changeProfileStatus({
                                                            userId: owner._id,
                                                            status: "accepted",
                                                        })
                                                    }
                                                >
                                                    Accept
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleReject(owner._id)}
                                                >
                                                    Change Request
                                                </Button>
                                            </div>
                                        ) : (
                                            <Switch
                                                checked={owner.user_details.status === "active"}
                                                onCheckedChange={() => {
                                                    const newStatus = owner.user_details.status === "active" ? "inactive" : "active";
                                                    changeStatus({
                                                        userId: owner.user_details._id,
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
                        Showing <strong>{((currentPage - 1) * 5) + 1}-{Math.min(currentPage * 5, totalCount)}</strong> of <strong>{totalCount}</strong> car owners
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
            <Drawer direction="right" open={openDrawer}>
                <DrawerContent className="h-screen max-w-2xl ml-auto overflow-y-auto overflow-x-hidden thin-scrollbar">
                    <DrawerHeader className="border-b bg-[#FBFBFB]">
                        <div className="flex items-center justify-between">
                            <DrawerTitle className="font-bold text-gray-900 flex items-center gap-2">
                                <User className="h-6 w-6 text-blue-600" />
                                Car Owner & Vehicle Details
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
                                <div className="flex items-center gap-2 mb-8">
                                    <User className="h-5 w-5 text-purple-600" />
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Owner Information
                                    </h2>
                                </div>
                                {selectedOwner?.profile_img && (
                                    <div className="w-1/3 mb-4 rounded-full">
                                        <img
                                            src={selectedOwner.profile_img || userImg}
                                            alt="Owner"
                                            className="w-full h-40 object-cover rounded-full cursor-pointer"
                                            onClick={() => setLightboxImage(selectedOwner.profile_img)}
                                        />
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InfoBox icon={<User />} label="Owner Name" value={selectedOwner?.owner_name} />
                                    <InfoBox icon={<Phone />} label="Phone Number" value={selectedOwner?.user_details?.phone} />
                                    <InfoBox icon={<CreditCard />} label="National ID" value={selectedOwner?.owner_national_id} />
                                    <InfoBox icon={<MapPin />} label="Address" value={selectedOwner?.owner_address} colSpan={2} />
                                </div>
                            </CardContent>
                        </Card>

                         {/* Captain Information */}
                        <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-2 mb-8">
                                    <User className="h-5 w-5 text-purple-600" />
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Captain Information
                                    </h2>
                                </div>
                                {selectedOwner?.profile_img && (
                                    <div className="w-1/3 mb-4 rounded-full">
                                        <img
                                            src={selectedOwner.profile_img || userImg}
                                            alt="Owner"
                                            className="w-full h-40 object-cover rounded-full cursor-pointer"
                                            onClick={() => setLightboxImage(selectedOwner.profile_img)}
                                        />
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InfoBox icon={<User />} label="Owner Name" value={selectedOwner?.owner_name} />
                                    <InfoBox icon={<Phone />} label="Phone Number" value={selectedOwner?.user_details?.phone} />
                                    <InfoBox icon={<CreditCard />} label="National ID" value={selectedOwner?.owner_national_id} />
                                    <InfoBox icon={<MapPin />} label="Address" value={selectedOwner?.owner_address} colSpan={2} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Vehicle Information */}
                        {selectedOwner?.vehicle_details && (
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
                                            value={`${selectedOwner.vehicle_details.car_make} ${selectedOwner.vehicle_details.car_model}`}
                                        />
                                        <InfoBox
                                            icon={<Calendar />}
                                            label="Year"
                                            value={selectedOwner.vehicle_details.car_year}
                                        />
                                        <InfoBox
                                            icon={<FileText />}
                                            label="Type"
                                            value={selectedOwner.vehicle_details.vehicle_type}
                                        />
                                        <InfoBox
                                            icon={<Palette />}
                                            label="Color"
                                            value={selectedOwner.vehicle_details.vehicle_color}
                                        />
                                        <InfoBox
                                            icon={<Hash />}
                                            label="License Plate"
                                            value={selectedOwner.vehicle_details.license_plate}
                                            isMono
                                            bg
                                        />
                                        <InfoBox
                                            icon={<FileText />}
                                            label="Registration No."
                                            value={selectedOwner.vehicle_details.vehicle_registration_no}
                                            isMono
                                        />
                                    </div>

                                    {/* Vehicle Documents */}
                                    <Separator className="my-6" />
                                    <div className="space-y-4">
                                        <p className="text-sm font-medium text-gray-600 mb-2">Vehicle Documents</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <DocLink
                                                label="Vehicle Registration"
                                                url={selectedOwner.vehicle_details.vehicle_registration_file}
                                            />
                                            <DocLink
                                                label="Insurance File"
                                                url={selectedOwner.vehicle_details.insurance_file}
                                            />
                                            <DocLink
                                                label="Vehicle Inspection"
                                                url={selectedOwner.vehicle_details.periodic_vehicle_inspection_file}
                                            />
                                        </div>
                                    </div>

                                    {/* Vehicle Pictures */}
                                    {selectedOwner.vehicle_details.vehicle_pictures?.length > 0 && (
                                        <>
                                            <Separator className="my-6" />
                                            <p className="text-sm font-medium text-gray-600 mb-2">Vehicle Pictures</p>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                {selectedOwner.vehicle_details.vehicle_pictures.map((pic: string, idx: number) => (
                                                    <img
                                                        key={idx}
                                                        src={pic || carImg1}
                                                        onClick={() => setLightboxImage(pic)}
                                                        alt={`Vehicle ${idx + 1}`}
                                                        className="w-full h-40 object-cover rounded shadow border cursor-pointer"
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        )}
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

            {/* Lightbox */}
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

            {/* Reject Modal */}
            <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Change Request Feedback</DialogTitle>
                        <DialogDescription>
                            Please provide feedback about what information needs to be corrected or added.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Textarea
                            placeholder="Enter your feedback here..."
                            value={rejectMessage}
                            onChange={(e) => setRejectMessage(e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsRejectModalOpen(false);
                                setRejectMessage('');
                                setSelectedOwnerId(null);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleRejectSubmit}
                            disabled={!rejectMessage.trim()}
                        >
                            Send Feedback
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CarOwnersPage;

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