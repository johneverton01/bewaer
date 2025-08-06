
import { Header } from "@/components/common/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SignInForm } from "./components/signInForm";
import { SignUpForm } from "./components/signUpForm";

export default function AuthenticationPages() {
  return (
    <>
    <Header />
    <div className="flex flex-col gap-4 h-screen w-full items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs defaultValue="sign-in">
          <TabsList>
            <TabsTrigger value="sign-in">Entrar</TabsTrigger>
            <TabsTrigger value="sign-up">Registrar</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <SignInForm />
          </TabsContent>
          <TabsContent value="sign-up">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </>
  );
}
