"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/app/store/auth-store";
import { authRequest } from "@/lib/api/auth-api";
import type { AuthLoginType } from "@/app/store/types/auth-typs";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LogIn } from "lucide-react";
import Link from "next/link";

const loginSchema = z.object({
  user_name: z.string().min(2, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const navigate = useRouter();
  const setTokens = useAuthStore((s) => s.setTokens);
  const { AUTH_LOGIN } = authRequest();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      user_name: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (payload: AuthLoginType) => AUTH_LOGIN(payload),
    onSuccess: (data) => {
      const { accessToken, refreshToken, existUser } = data.data;
      const roles = existUser?.roles || [];
      if (accessToken && refreshToken) {
        setTokens(accessToken, refreshToken, roles);

        // Redirect based on role
        if (roles.includes("user")) {
          navigate.push("/profile");
        } else {
          navigate.push("/login");
        }
      }
    },
    onError: (err) => {
      console.error("Login error:", err);
    },
  });
  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="mx-auto w-full max-w-md shadow-lg rounded-2xl p-4 mt-12 bg-gradient-to-br from-blue-100 via-purple-300 to-pink-300">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Heading */}
          <h1 className="text-2xl font-bold text-center text-black">
            Welcome Back
          </h1>
          <p className="text-sm text-center text-gray-800 mb-6">
            Sign in to access your digital ID card
          </p>
          <FormField
            control={form.control}
            name="user_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-md shadow-md hover:brightness-110 transition-all"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Signing In..." : "Sign In"}
          </Button>
          {/* Footer */}
          <p className="text-sm text-center text-gray-800 mt-4">
            Don’t have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Create Account
            </a>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default Login;
