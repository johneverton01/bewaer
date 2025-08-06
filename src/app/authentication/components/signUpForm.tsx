"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório"),
  email: z.email("E-mail inválido").trim().min(1, "E-mail é obrigatório"),
  password: z
    .string("Senha é obrigatória")
    .min(8, "Senha deve ter pelo menos 8 caracteres"),
  passwordConfirmation: z
    .string("Senha é obrigatória")
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    ,
}).refine((data) => data.password === data.passwordConfirmation, {
  error: "As senhas não coincidem",
  path: ["passwordConfirmation"],
});

type FormValues = z.infer<typeof formSchema>;

export function SignUpForm() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Conta criada com sucesso!");
          router.push("/");
        },
        onError: (ctx) => {
          const errorMessage = "E-mail já cadastrado";
          if (ctx.error.code === "USER_ALREADY_EXISTS") {
            toast.error(errorMessage);
            return form.setError("email", { message: errorMessage });
          }

          toast.error("Erro ao criar conta", {
            description: ctx.error.message
          });
        },

      }
     })
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar Conta</CardTitle>
        <CardDescription>Crie uma nova conta para continuar.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="grid gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Digite seu nome" {...field} />
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
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input id="email" placeholder="Digite seu e-mail" {...field} />
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
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input id="password" type="password" placeholder="Digite sua senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmação de Senha</FormLabel>
                  <FormControl>
                    <Input id="passwordConfirmation" type="password" placeholder="Digite sua senha novamente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full">Criar Conta</Button>
            <Button className="w-full" variant="outline">
              Criar Conta com Google
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
