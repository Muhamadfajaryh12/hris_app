"use client";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";

export default function Home() {
  const form = useForm({
    defaultValues: {
      npk: "",
      password: "",
    },
  });

  const route = useRouter();

  const Submit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ npk: data.npk, password: data.password }),
      });

      route.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <main className="w-screen h-screen flex justify-center items-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(Submit)}>
                <div className="flex flex-col gap-6">
                  <CustomInput
                    control={form.control}
                    name="npk"
                    label="NPK"
                    placeholder="0000"
                    type="number"
                  />
                  <CustomInput
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="***"
                    type="password"
                  />
                  <Button type="submit">Login</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
