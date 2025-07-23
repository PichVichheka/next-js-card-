"use client";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDeviceStore } from "@/app/store/device-store";
import { useAuthStore } from "@/app/store/auth-store";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { AuthRegisterType } from "@/app/store/types/auth-typs";
import { authRequest } from "@/lib/api/auth-api";
import { useRouter } from "next/navigation";

const RegisterSchema = z.object({
  user_name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  full_name: z.string().min(2, {
    message: "Fullname must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

const Register = () => {
  const router = useRouter();
  const { AUTH_REGISTER } = authRequest();
  const setTokens = useAuthStore((s) => s.setTokens);
  const { device, fetchDeviceInfo } = useDeviceStore();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      user_name: "",
      password: "",
      email: "",
      full_name: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: (payload: AuthRegisterType) => AUTH_REGISTER(payload),
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data.data;
      if (accessToken && refreshToken) {
        setTokens(accessToken, refreshToken);
        router.push("/");
      }
    },
  });

  useEffect(() => {
    fetchDeviceInfo();
  }, [fetchDeviceInfo]);

  function onSubmit(data: z.infer<typeof RegisterSchema>) {
    mutate({
      ...data,
      device_name: device?.device_name,
      device_type: device?.device_type,
      os: device?.os,
      browser: device?.browser,
      ip_address: device?.ip_address,
    });
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl p-8 mt-16 shadow-2xl border border-gray-200 bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-6 drop-shadow-sm">
        Create an Account
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="user_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-700 font-semibold">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username"
                    {...field}
                    className="focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 placeholder-gray-400 border border-blue-200 rounded-lg shadow-sm"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-700 font-semibold">Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    {...field}
                    className="focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 placeholder-gray-400 border border-blue-200 rounded-lg shadow-sm"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-700 font-semibold">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 placeholder-gray-400 border border-blue-200 rounded-lg shadow-sm"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-700 font-semibold">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    className="focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 placeholder-gray-400 border border-blue-200 rounded-lg shadow-sm"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 shadow-md"
            disabled={isPending}
          >
            {isPending ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <span
          className="text-blue-600 hover:underline cursor-pointer font-medium"
          onClick={() => router.push("/login")}
        >
          Log in
        </span>
      </p>
    </div>
  );
};

export default Register;
