"use client";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import AuthenticationAPI from "@/data/AuthenticationAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  npk: z.string().min(1, {
    message: "npk cannot be empty",
  }),
  password: z.string().min(1, {
    message: "password cannot be empty",
  }),
});
export default function Home() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      npk: "",
      password: "",
    },
  });

  const route = useRouter();

  const Submit = async (data) => {
    const response = await AuthenticationAPI.Login({
      npk: data.npk,
      password: data.password,
    });
    if (response.status == 200) {
      route.push("/dashboard");
    } else {
      toast("Failed", {
        title: response?.message,
      });
    }
  };
  return (
    <div>
      <main className="w-screen h-screen flex justify-center items-center bg-gray-100">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>
              <h1 className="font-bold text-6xl  text-center">HRIS</h1>
              <p className="text-sm  text-center my-4">
                Login with your account.
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(Submit)}>
                <div className="flex flex-col gap-6">
                  <CustomInput
                    control={form.control}
                    name="npk"
                    label="NPK"
                    type="text"
                  />
                  <CustomInput
                    control={form.control}
                    name="password"
                    label="Password"
                    type="password"
                  />
                  <Button type="submit">Sign in</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
