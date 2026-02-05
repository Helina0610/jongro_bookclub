"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const [addUser, setAddUser] = React.useState<boolean>(false);

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {addUser ? <NewSignUpDiv setAddUser={setAddUser} /> : <LoginFormDiv setAddUser={setAddUser} />}
          <div className="bg-muted relative hidden md:block">
            <Image
              // src="/main_image2.png"
              src="/main_image.jpeg"
              alt="Image"
              // className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              className="absolute inset-0 h-full w-full"
              width="180"
              height="180"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">방장에서 문의 바람</FieldDescription>
    </div>
  );
}

type loginDivType = {
  setAddUser: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginFormDiv = ({ setAddUser }: loginDivType) => {
  return (
    <form className="p-6 md:p-8">
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">종로책방</h1>
          <p className="text-muted-foreground text-balance">Login to your account</p>
        </div>
        <Field>
          <FieldLabel htmlFor="userId">ID</FieldLabel>
          <Input id="userId" type="text" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="user_pw">Password</FieldLabel>
          </div>
          <Input id="user_pw" type="password" required />
        </Field>
        <Field>
          <Button type="submit">Login</Button>
        </Field>
        <FieldDescription className="text-center">
          계정이 없으신가요?
          <Button variant={"link"} onClick={() => setAddUser(true)}>
            가입하기
          </Button>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
};

const NewSignUpDiv = ({ setAddUser }: loginDivType) => {
  return (
    <form className="p-6 md:p-8">
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">종로책방</h1>
          <p className="text-muted-foreground text-balance">Sing Up your account</p>
        </div>
        <Field>
          <FieldLabel htmlFor="userId">ID</FieldLabel>
          <Input id="userId" type="text" required />
        </Field>
        <Field>
          <Field className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
              <Input id="confirm-password" type="password" required />
            </Field>
          </Field>
        </Field>
        <Field>
          <Button type="submit">Create Account</Button>
        </Field>
        <FieldDescription className="text-center">
          이미 계정이 있으신가요?
          <Button variant={"link"} onClick={() => setAddUser(false)}>
            로그인 하기
          </Button>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
};
