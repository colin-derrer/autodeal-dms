"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import DevSelectUser from "./DevSelectUser";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/actions/auth";

type LoginFormTypes = {
  users: {
    id: string;
    email: string;
    name: string;
    role: string;
    profileImage: string | null;
  }[];
};

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export default function LoginForm({ users }: LoginFormTypes) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const result = await login(values);
    if (result && result.error) {
      if (result.error === "Invalid password") {
        form.setError("password", {
          type: "manual",
          message: "Invalid password",
        });
      }
      if (result.error === "User not found") {
        form.setError("email", {
          type: "manual",
          message: "User not found",
        });
      }
    }
  }
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <p>Please log into your account</p>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
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
                    <Input placeholder="********" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <DevSelectUser users={users} />
            <Button>Login</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
