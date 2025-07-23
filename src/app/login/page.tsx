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
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

        if (roles.includes("user")) {
          navigate.push("/");
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
    <div className="mx-auto w-full max-w-md bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-8 mt-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Header */}
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
            Login
          </h1>

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
                    className="border border-blue-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
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
                <FormLabel className="text-blue-700 font-semibold">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    className="border border-blue-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Signing In..." : "Sign In"}
          </Button>

          <p className="text-center text-blue-700 mt-4">
            Don’t have an account?{" "}
            <a href="/register" className="underline hover:text-blue-900">
              Create Account
            </a>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default Login;
