"use client"
import { useMutation } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { toast } from "sonner"
import { z } from "zod"
import { useDeviceStore } from "../store/device-store"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AuthRegisterType } from "../store/types/auth-typs"
import { authRequest } from "@/lib/api/auth-api"

const RegisterSchema = z.object({
  user_name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  full_name: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Email must be a valid email address.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
})

const RegisterPage = () => {
  const AUTH_REGISTER = authRequest
  const { deviceId, fetchDeviceInfo } = useDeviceStore()
  console.log("Device Info:", deviceId)
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      user_name: "",
      full_name: "",
      email: "",
      password: "",
    },
  })
  useEffect(() => {
    fetchDeviceInfo()
  }, [fetchDeviceInfo])

  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn:(payload:AuthRegisterType) => AUTH_REGISTER(payload),
    onSuccess: (data) => {
      console.log("Response data:", data)
    }
  })

  function onSubmit(data: z.infer<typeof RegisterSchema>) {
    mutate({
      ...data,
      device_name: deviceId?.device_name,
      device_type: deviceId?.device_type,
      os: deviceId?.os,
      browser: deviceId?.browser,
      ip_address: deviceId?.ip_address,
    });
  }

  return (
    
    <div className="mx-auto w-full max-w-md shadow-lg mt-12 rounded-lg p-4">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="user_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="user_name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="full_name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
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
        <Button type="submit">{isPending ? "Submitting..." : "Submit"}</Button>
      </form>
      </Form>
    </div>
  
  )
}

export default  RegisterPage;