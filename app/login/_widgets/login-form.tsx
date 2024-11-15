"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useLoginMutation } from "../_hooks/useLoginMutation";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Must be 6 characters minimum" }),
});

export function LoginForm() {
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLoginMutation();

  function handleSubmit(value: z.infer<typeof loginSchema>) {
    loginMutation.mutate(value);
  }

  return (
    <div className="max-w-lg w-full">
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
          <div className="flex text-sm items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary/80 text-white w-9 h-9">
            <Logo />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">Login</h1>
            <p className="text-muted-foreground">Log in and start using app</p>
          </div>
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex">
                  <FormLabel className="flex items-center border border-e-0 rounded-s px-4 shadow-sm w-32">
                    Email
                  </FormLabel>
                  <FormControl className="flex items-center">
                    <Input
                      type="email"
                      className="rounded-s-none h-10"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex">
                  <FormLabel className="flex items-center border border-e-0 rounded-s px-4 shadow-sm w-32">
                    Password
                  </FormLabel>
                  <FormControl className="flex items-center">
                    <Input
                      type="password"
                      className="rounded-s-none h-10"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="transition-all ease-in-out " />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full"
          >
            {loginMutation.isPending ? (
              <Loader2 className="animate-spin duration-200" />
            ) : (
              "Login"
            )}
          </Button>
          <Button className="px-0" variant="link" type="button">
            Forgot your password?
          </Button>
        </form>
      </Form>
    </div>
  );
}
