import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { PasswordInput } from "@/components/ui/password-input";

const ChangePasswordPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast({
        className: "text-black border-2 border-green-600 shadow-lg rounded-lg h-16",
        title: "Password changed successfully",
      });
      navigate("/dashboard");
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || "Something went wrong";
      toast({
        variant: "destructive",
        title: "Failed to change password",
        description: msg,
      });
    },
  });

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    const oldPassword = oldPasswordRef.current?.value;
    const newPassword = newPasswordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (!oldPassword) {
      newErrors.oldPassword = "Old password is required";
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters long";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const oldPassword = oldPasswordRef.current?.value;
    const newPassword = newPasswordRef.current?.value;

    if (oldPassword && newPassword) {
      mutation.mutate({ oldPassword, newPassword });
    }
  };

  return (
    <section className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Change Password</CardTitle>
          <CardDescription>
            Enter your old password and choose a new password.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="oldPassword">Old Password</Label>
            <PasswordInput
              ref={oldPasswordRef}
              id="oldPassword"
              placeholder="Enter current password"
              required
            />
            {errors.oldPassword && (
              <span className="text-red-500 text-sm">{errors.oldPassword}</span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="newPassword">New Password</Label>
            <PasswordInput
              ref={newPasswordRef}
              id="newPassword"
              placeholder="Enter new password"
              required
            />
            {errors.newPassword && (
              <span className="text-red-500 text-sm">{errors.newPassword}</span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <PasswordInput
              ref={confirmPasswordRef}
              id="confirmPassword"
              placeholder="Confirm new password"
              required
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending && <LoaderCircle className="animate-spin mr-2" />}
            Change Password
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default ChangePasswordPage; 