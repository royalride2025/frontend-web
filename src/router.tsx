import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import HomePage from '@/pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './layouts/DashboardLayout';
// import BooksPage from './pages/BooksPage';
import AuthLayout from './layouts/AuthLayout';
// import CreateBook from './pages/CreateBook';
import CreateDriver from './pages/CreateDriver';
import DriversPage from './pages/DriversPage';
import CarOwnersPage from './pages/CarOwnersPage';
import CreateCarOwners from './pages/CreateCarOwners';
import Admins from './pages/Admins';
import CreateAdmin from './pages/CreateAdmin';
import CustomersPage from './pages/CustomerPage';
import VehiclesPage from './pages/VehiclesPage';
import VerifyOtpPage from './pages/VerifyOtp';
import ForgetPasswordPage from './pages/ForgetPassword';
import ChangePasswordPage from './pages/ChangePasswordPage';
import LandingPage from './pages/Landing.jsx';
import BookingsPage from './pages/BookingsPage.tsx';
import RegisterDriver from './pages/RegisterDriver';
import CreditsPage from './pages/CreditsPage.tsx';
import SupportChatPage from './pages/SupportChatPage';


const router = createBrowserRouter([
    // {
    //     path: '/',
    //     element: <Navigate to="/dashboard" />,
    // },
    
    {
            path: '/',
            // element: <Navigate to="/landing" />,
            element: <LandingPage />,
    },
    {
        // path: '/landing',
        // element: <LandingPage />,
},
    {
        path: '',
        element: <DashboardLayout />,
        children: [
            {
                path: 'dashboard',
                element: <HomePage />,
            },
            {
                path: 'change-password',
                element: <ChangePasswordPage />,
            },
            {
                path: 'drivers',
                element: <DriversPage />,
            },
            {
                path: 'driver/create',
                element: <CreateDriver />,
            },
            {
                path: 'car-owners',
                element: <CarOwnersPage />,
            },
            {
                path: 'car-owner/create',
                element: <CreateCarOwners />,
            },
            
            {
                path: 'admins',
                element: <Admins />,
            },
            {
                path: 'admin/create',
                element: <CreateAdmin />,
            },
            {
                path: 'customers',
                element: <CustomersPage />,
            },
            
            {
                path: 'vehicles',
                element: <VehiclesPage />,
            },
            {
                path: 'vehicle/create',
                element: <VehiclesPage />,
            },
            {
                path: 'bookings',
                element: <BookingsPage />,
            },
            {
                path: 'register-driver',
                element: <RegisterDriver />,
            },
            {
                path: 'credits',
                element: <CreditsPage />,
            },
            {
                path: 'chat-support',
                element: <SupportChatPage />,
            },

            // {
            //     path: 'books',
            //     element: <BooksPage />,
            // },
            // {
            //     path: 'books/create',
            //     element: <CreateBook />,
            // },
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
            {
                path: 'forget-password',
                element: <ForgetPasswordPage />,
            },
            {
                path: 'verify-otp',
                element: <VerifyOtpPage />,
            },
            {
                path: 'register-driver',
                element: <RegisterDriver />,
            },
        ],
    },
], 
{
    basename: '/',  // ✅ set basename here, as the second argument
});

export default router;
