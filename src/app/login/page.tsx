"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useMutation } from "@tanstack/react-query";
import { authRequest } from "@/lib/api/auth-api";
import { AuthLoginType } from "@/app/store/types/auth-typs";
import { useRouter } from "next/navigation";

const LoginSchema = z.object({
  user_name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

const Login = () => {
  const navigate = useRouter();
  const { AUTH_LOGIN } = authRequest();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      user_name: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (payload: AuthLoginType) => AUTH_LOGIN(payload),
    onSuccess: (data) => {
      if (data) {
        navigate.push("/profile");
      }
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    console.log(data, "===data login");
    mutate(data);
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
            disabled={isPending}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90"
          >
            {isPending ? "Submitting..." : "Sign In"}
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
