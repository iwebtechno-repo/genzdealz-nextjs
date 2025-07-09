"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  ArrowRightIcon,
  EnvelopeIcon,
  LockIcon,
  UserIcon,
  PhoneIcon,
} from "@phosphor-icons/react";
import { useState, Suspense } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { FloatingInput } from "@/components/ui/floating-input";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { LoadingSpinner } from "@/components/ui/loading-bars";
import { GoogleIcon, AppleIcon } from "@/lib/morphy-ui/morphy";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().length(10, "Phone number must be 10 digits"),
  gender: z.string().optional(),
  birthDate: z.string().optional(),
  state: z.string().optional(),
  college: z.string().optional(),
  course: z.string().optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

// Separate component that uses useSearchParams
const LoginFormWithSearchParams = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onLoginSubmit = async (data: LoginForm) => {
    setIsLoggingIn(true);
    try {
      // Mock login - in a real app, this would be an API call
      console.log("Login data:", data);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Use the auth context to login
      login("mock_token_123");

      // Redirect to the original requested page or default to genzgpt
      const from = searchParams.get("from") || "/genzgpt";
      console.log("Regular login - Redirecting to:", from);
      console.log("Current URL before redirect:", window.location.href);

      // Use window.location for non-client/server redirect
      window.location.href = from;
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoggingIn(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const token = `mock_${provider}_token`;
      login(token);

      // Redirect to the original requested page or default to genzgpt
      const from = searchParams.get("from") || "/genzgpt";
      console.log("Social login - Redirecting to:", from);
      console.log("Current URL before redirect:", window.location.href);

      // Use window.location for non-client/server redirect
      window.location.href = from;
    } catch (error) {
      console.error(`${provider} login error:`, error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <form
      onSubmit={loginForm.handleSubmit(onLoginSubmit)}
      className="space-y-6"
    >
      <div className="space-y-2">
        <FloatingInput
          id="email"
          type="email"
          label="Email"
          icon={EnvelopeIcon}
          error={loginForm.formState.errors.email?.message}
          disabled={isLoggingIn}
          {...loginForm.register("email")}
        />
      </div>
      <div className="space-y-2">
        <FloatingInput
          id="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          icon={LockIcon}
          error={loginForm.formState.errors.password?.message}
          showPasswordToggle
          isPasswordVisible={showPassword}
          onPasswordToggle={() => setShowPassword(!showPassword)}
          disabled={isLoggingIn}
          {...loginForm.register("password")}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            className="border-[#d0427f]/20 data-[state=checked]:bg-[#d0427f] data-[state=checked]:border-[#d0427f] cursor-pointer"
            disabled={isLoggingIn}
          />
          <Label
            htmlFor="remember"
            className="text-sm text-muted-foreground cursor-pointer"
          >
            Remember me
          </Label>
        </div>
        <Link
          href="/forgot-password"
          className="text-sm text-[#d0427f] hover:underline cursor-pointer transition-colors"
        >
          Forgot password?
        </Link>
      </div>
      <Button
        type="submit"
        variant="gradient"
        effect="fill"
        size="default"
        showRipple={true}
        disabled={isLoggingIn}
        className="w-full"
        icon={!isLoggingIn ? { icon: ArrowRightIcon } : undefined}
      >
        {isLoggingIn ? (
          <div className="flex items-center justify-center space-x-2">
            <LoadingSpinner size="sm" variant="contrast" text="" />
            <span>Logging in...</span>
          </div>
        ) : (
          "Login"
        )}
      </Button>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-[#d0427f]/20" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-4 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="none"
          effect="glass"
          type="button"
          onClick={() => handleSocialLogin("google")}
          showRipple
          className="w-full"
          icon={undefined}
        >
          <span className="inline-flex items-center justify-center h-5 w-5 mr-2">
            <GoogleIcon className="h-5 w-5" />
          </span>
          Google
        </Button>
        <Button
          variant="none"
          effect="glass"
          type="button"
          onClick={() => handleSocialLogin("apple")}
          showRipple
          className="w-full"
          icon={undefined}
        >
          <AppleIcon className="h-5 w-5 text-black dark:text-white" />
          Apple
        </Button>
      </div>
    </form>
  );
};

// Wrapper component that provides Suspense boundary
const LoginForm = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginFormWithSearchParams />
    </Suspense>
  );
};

interface SignUpFormProps {
  onSuccess: () => void;
}

const SignUpForm = ({ onSuccess }: SignUpFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const { login } = useAuth();
  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onRegisterSubmit = async (data: RegisterForm) => {
    setIsRegistering(true);
    try {
      // Mock registration - in a real app, this would be an API call
      console.log("Register data:", data);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Use the auth context to login after registration
      login("mock_token_123");

      // Call success callback to show OTP modal
      onSuccess();
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <form
      onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
      className="space-y-6"
    >
      <div className="space-y-2">
        <FloatingInput
          id="name"
          type="text"
          label="Full Name"
          icon={UserIcon}
          error={registerForm.formState.errors.name?.message}
          disabled={isRegistering}
          {...registerForm.register("name")}
        />
      </div>
      <div className="space-y-2">
        <FloatingInput
          id="phone"
          type="tel"
          label="Phone Number"
          icon={PhoneIcon}
          error={registerForm.formState.errors.phone?.message}
          disabled={isRegistering}
          {...registerForm.register("phone")}
        />
      </div>
      <div className="space-y-2">
        <FloatingInput
          id="email"
          type="email"
          label="Email"
          icon={EnvelopeIcon}
          error={registerForm.formState.errors.email?.message}
          disabled={isRegistering}
          {...registerForm.register("email")}
        />
      </div>
      <div className="space-y-2">
        <FloatingInput
          id="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          icon={LockIcon}
          error={registerForm.formState.errors.password?.message}
          showPasswordToggle
          isPasswordVisible={showPassword}
          onPasswordToggle={() => setShowPassword(!showPassword)}
          disabled={isRegistering}
          {...registerForm.register("password")}
        />
      </div>
      <Button
        type="submit"
        variant="gradient"
        effect="fill"
        size="default"
        showRipple={true}
        className="w-full"
        icon={!isRegistering ? { icon: ArrowRightIcon } : undefined}
      >
        {isRegistering ? (
          <div className="flex items-center justify-center space-x-2">
            <LoadingSpinner size="sm" variant="contrast" text="" />
            <span>Creating account...</span>
          </div>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
};

const AnimatedTabs = ({
  onRegisterSuccess,
}: {
  onRegisterSuccess: () => void;
}) => {
  return (
    <Tabs defaultValue="login" className="w-full">
      <div className="relative">
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-transparent h-auto p-0">
          <TabsTrigger
            value="login"
            className="relative h-10 px-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 outline-none ring-0 ring-offset-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-0 data-[state=active]:text-[#d0427f] cursor-pointer transition-all duration-200 bg-transparent hover:bg-transparent data-[state=active]:transform-none data-[state=active]:translate-y-0 data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-[#d0427f]"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="register"
            className="relative h-10 px-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 outline-none ring-0 ring-offset-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-0 data-[state=active]:text-[#d0427f] cursor-pointer transition-all duration-200 bg-transparent hover:bg-transparent data-[state=active]:transform-none data-[state=active]:translate-y-0 data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-[#d0427f]"
          >
            Register
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="register">
        <SignUpForm onSuccess={onRegisterSuccess} />
      </TabsContent>
    </Tabs>
  );
};

const LoginPage = () => {
  const [showOtpModal, setShowOtpModal] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="container mx-auto flex max-w-4xl flex-col items-center justify-center px-4 md:flex-row">
        {/* Hero on the right (desktop) */}
        {/* Container reverses order on md to place hero on the right */}
        <div className="relative hidden w-full md:block md:w-1/2 overflow-hidden">
          {/* Spinning conic gradient */}
          <div
            className="absolute inset-0 animate-[spin_30s_linear_infinite]"
            style={{
              background:
                "conic-gradient(from 180deg at 50% 50%, #d0427f 0deg, #ff6fa7 90deg, #303293 180deg, #6a5efc 270deg, #d0427f 360deg)",
            }}
          />
          {/* Soft blur overlay */}
          <div className="absolute inset-0 backdrop-blur-2xl opacity-30" />
        </div>

        {/* Right Side: Form */}
        <div className="w-full max-w-md p-4 md:w-1/2 md:p-8">
          <AnimatedTabs onRegisterSuccess={() => setShowOtpModal(true)} />
        </div>
      </div>
      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card variant="purple" className="w-full max-w-md">
            <h2 className="mb-4 text-2xl font-bold">Enter OTP</h2>
            <p className="mb-6 text-muted-foreground">
              We&apos;ve sent a verification code to your email
            </p>
            <div className="space-y-4">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="h-12 w-12 text-center"
                  />
                ))}
              </div>
              <Button className="w-full">Verify</Button>
              <Button
                variant="none"
                effect="glass"
                className="w-full"
                onClick={() => setShowOtpModal(false)}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
