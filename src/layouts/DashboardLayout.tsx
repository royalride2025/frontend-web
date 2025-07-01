import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import useTokenStore from '@/store';
import {
    Bell,
    CircleUser,
    Home,
    LineChart,
    Menu,
    Package,
    Package2,
    Search,
    ShoppingCart,
    Users,
    Car,
    UserCog,
    Building2,
    ShieldCheck,
    CarFront,
    Loader2
} from 'lucide-react';
import { Link, Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/blackLogo.svg'; 
import { useToast } from '@/hooks/use-toast';
import { searchEntities } from '@/http/api';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

const DashboardLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    
    const { 
        token, 
        setToken } = useTokenStore((state) => state);

    // Get current entity based on route
    const getCurrentEntity = () => {
        const path = location.pathname;
        if (path.includes('vehicles')) return 'vehicles';
        if (path.includes('admins')) return 'admins';
        if (path.includes('customers')) return 'customers';
        if (path.includes('drivers')) return 'drivers';
        return null;
    };

    // Clear search when route changes
    useEffect(() => {
        setSearchQuery('');
    }, [location.pathname]);

    const { mutate: search, isPending } = useMutation({
        mutationFn: searchEntities,
        onSuccess: (data) => {
            // Handle search results based on entity
            const entity = getCurrentEntity();
            if (!entity) return;

            // Get filterStatus from URL params if it exists
            const urlParams = new URLSearchParams(location.search);
            const filterStatus = urlParams.get('filterStatus') || 'accepted';

            // Emit a custom event with search results
            const event = new CustomEvent('searchResults', {
                detail: { entity, data, filterStatus }
            });
            window.dispatchEvent(event);
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Search failed",
                description: error.message
            });
        }
    });

    // Debounce search
    useEffect(() => {
        const entity = getCurrentEntity();
        if (!entity) return;

        const urlParams = new URLSearchParams(location.search);
        const filterStatus = urlParams.get('filterStatus') || 'accepted';

        // If search is empty, emit event with null data to trigger showing complete listing
        if (!searchQuery.trim()) {
            const event = new CustomEvent('searchResults', {
                detail: { entity, data: null, filterStatus }
            });
            window.dispatchEvent(event);
            return;
        }

        console.log('searchQuery , entity', searchQuery, entity);
        search({ entity, searchQuery, page: 1, filterStatus });
    }, [searchQuery, location.pathname]);

    if (token === '') {
        return <Navigate to={'/auth/login'} replace />;
    }

    const logout = () => {
        console.log('Logging out!');
        setToken('');
        navigate('/auth/login');
        toast({
          className: "text-black border-2 border-green-600 shadow-lg rounded-lg h-16",  
          title: "Logout successful",
        //   description: "Welcome back!",
        });
    };

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link to="/" className="flex items-center gap-2 font-semibold">
                            <img 
                                src={logo} 
                                alt="Royal Ride"
                                className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12"
                                />
                        </Link>
                        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                            <Bell className="h-4 w-4" />
                            <span className="sr-only">Toggle notifications</span>
                        </Button>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) => {
                                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                                        isActive && 'bg-gray-100 text-primary'
                                    }`;
                                }}>
                                <Home className="h-4 w-4" />
                                Home
                            </NavLink>
                            
                            <NavLink
                                to="/drivers"
                                className={({ isActive }) => {
                                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                                        isActive && 'bg-gray-100 text-primary'
                                    }`;
                                }}>
                                <UserCog className="h-4 w-4" />
                                Drivers{' '}
                            </NavLink>

                            <NavLink
                                to="/car-owners"
                                className={({ isActive }) => {
                                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                                        isActive && 'bg-gray-100 text-primary'
                                    }`;
                                }}>
                                <Building2 className="h-4 w-4" />
                                Car Owners{' '}
                            </NavLink>

                            <NavLink
                                to="/customers"
                                className={({ isActive }) => {
                                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                                        isActive && 'bg-gray-100 text-primary'
                                    }`;
                                }}>
                                <Users className="h-4 w-4" />
                                Customers{' '}
                            </NavLink>
                            <NavLink
                                to="/admins"
                                className={({ isActive }) => {
                                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                                        isActive && 'bg-gray-100 text-primary'
                                    }`;
                                }}>
                                <ShieldCheck className="h-4 w-4" />
                                Admins{' '}
                            </NavLink>
                            <NavLink
                                to="/vehicles"
                                className={({ isActive }) => {
                                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                                        isActive && 'bg-gray-100 text-primary'
                                    }`;
                                }}>
                                <CarFront className="h-4 w-4" />
                                Vehicles{' '}
                            </NavLink>
                            
                            
                            {/* <NavLink
                                to="/books"
                                className={({ isActive }) => {
                                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                                        isActive && 'bg-muted'
                                    }`;
                                }}>
                                <Package className="h-4 w-4" />
                                Books{' '}
                            </NavLink> */}
                        </nav>
                    </div>
                    
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                <Link
                                    to="#"
                                    className="flex items-center gap-2 text-lg font-semibold">
                                    <Package2 className="h-6 w-6" />
                                    <span className="sr-only">Acme Inc</span>
                                </Link>
                                <Link
                                    to="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                                    <Home className="h-5 w-5" />
                                    Dashboard
                                </Link>
                                <Link
                                    to="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground">
                                    <ShoppingCart className="h-5 w-5" />
                                    Orders
                                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                        6
                                    </Badge>
                                </Link>
                                <Link
                                    to="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                                    <Package className="h-5 w-5" />
                                    Products
                                </Link>
                                <Link
                                    to="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                                    <Users className="h-5 w-5" />
                                    Customers
                                </Link>
                                <Link
                                    to="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                                    <LineChart className="h-5 w-5" />
                                    Analytics
                                </Link>
                            </nav>
                            <div className="mt-auto">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Upgrade to Pro</CardTitle>
                                        <CardDescription>
                                            Unlock all features and get unlimited access to our
                                            support team.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button size="sm" className="w-full">
                                            Upgrade
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                {isPending && (
                                    <Loader2 className="absolute right-2.5 top-2.5 h-4 w-4 animate-spin" />
                                )}
                                <Input
                                    type="search"
                                    placeholder={getCurrentEntity() ? `Search ${getCurrentEntity()}...` : 'Search...'}
                                    className="w-full appearance-none bg-background pl-8 pr-8 shadow-none md:w-2/3 lg:w-1/3"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    disabled={!getCurrentEntity()}
                                /> */}
                            </div>
                        </form>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link to="/change-password" className="w-full cursor-pointer">
                                    Change Password
                                </Link>
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
                            {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Button onClick={logout} variant={'link'}>
                                    Logout
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
