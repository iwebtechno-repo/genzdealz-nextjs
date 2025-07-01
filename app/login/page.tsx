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
import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { FloatingInput } from "@/components/ui/floating-input";
import { useRouter, useSearchParams } from "next/navigation";
import { GradientText } from "@/components/ui/gradient-text";
import { useAuth } from "@/lib/auth-context";
import { LoadingSpinner } from "@/components/ui/loading-bars";
import { GoogleIcon, AppleIcon } from "@/lib/morphy-ui/morphy";
import { toast } from "sonner";

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
  const router = useRouter();
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

      toast.success("Login successful! Welcome back.");

      // Redirect to the original requested page or default to genzgpt
      const from = searchParams.get("from") || "/genzgpt";
      console.log("Regular login - Redirecting to:", from);
      router.push(from);
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
      toast.success("Login successful! Welcome back.");

      // Redirect to the original requested page or default to genzgpt
      const from = searchParams.get("from") || "/genzgpt";
      console.log("Social login - Redirecting to:", from);
      router.push(from);
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

      toast.success("Account created! Welcome to GenZDealZ.");

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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              <GradientText variant="gradient">
                Your AI-powered shopping journey begins here
              </GradientText>
            </h1>
          </div>
          <Card
            variant="none"
            showRipple={false}
            className="bg-transparent border-0 shadow-none"
          >
            <AnimatedTabs onRegisterSuccess={() => setShowOtpModal(true)} />
          </Card>
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#d0427f]/30 to-[#303293]/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            {/* <h2 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
              GenZDealZ.ai
            </h2>
            <p className="text-white/90 text-xl font-medium">
              Your AI-powered deals platform
            </p> */}
          </div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='800' height='600' viewBox='0 0 800 600' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='600' fill='url(%23a)'/%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='800' y2='600' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23d0427f' stop-opacity='0.12'/%3E%3Cstop offset='1' stop-color='%23303293' stop-opacity='0.12'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M120 120l40-40c5-5 13-5 18 0l42 42c5 5 5 13 0 18l-40 40c-5 5-13 5-18 0l-42-42c-5-5-5-13 0-18z' fill='%23fff' fill-opacity='0.18'/%3E%3Cellipse cx='140' cy='140' rx='6' ry='6' fill='%23d0427f' fill-opacity='0.5'/%3E%3Ctext x='130' y='155' font-size='18' fill='%23d0427f' fill-opacity='0.7'%3E%25%3C/text%3E%3Crect x='600' y='100' width='60' height='60' rx='10' fill='%23fff' fill-opacity='0.18'/%3E%3Crect x='610' y='120' width='40' height='30' rx='6' fill='%23d0427f' fill-opacity='0.15'/%3E%3Cpath d='M620 120v-10a10 10 0 0120 0v10' stroke='%23d0427f' stroke-width='3' stroke-opacity='0.5'/%3E%3Ccircle cx='700' cy='500' r='36' fill='%23fff' fill-opacity='0.18'/%3E%3Ctext x='678' y='510' font-size='28' fill='%23d0427f' fill-opacity='0.7'%3E50%25%3C/text%3E%3Crect x='320' y='400' width='120' height='60' rx='12' fill='%23fff' fill-opacity='0.18'/%3E%3Crect x='340' y='420' width='80' height='30' rx='6' fill='%23303293' fill-opacity='0.15'/%3E%3Crect x='350' y='410' width='60' height='10' rx='3' fill='%23d0427f' fill-opacity='0.25'/%3E%3Ccircle cx='200' cy='500' r='8' fill='%23d0427f' fill-opacity='0.18'/%3E%3Ccircle cx='750' cy='200' r='8' fill='%23303293' fill-opacity='0.18'/%3E%3C/svg%3E")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.7,
            }}
          />
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card variant="purple" className="max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
            <p className="text-muted-foreground mb-6">
              We&apos;ve sent a verification code to your email
            </p>
            <div className="space-y-4">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="text-center h-12 w-12"
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
