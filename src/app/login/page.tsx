"use client";

import { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { Label } from "radix-ui";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Login() {
  const router = useRouter();
  const { status } = useSession();
  const [mode] = useState<"light" | "dark">("dark");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [router, status]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
  };

  if (status === "authenticated") {
    return <div>Redirecting...</div>;
  }

  const ssoSignIn = async () => {
    await signIn("boxyhq-saml");
  };

  return (
      <div className="w-screen h-screen grid login-main-div place-content-center">
        <div className="login-main-box flex flex-col items-center p-5">
          <div className="title ml-1 px-3 py-6">
            <span>Intake</span>
          </div>
          <form onSubmit={handleSubmit} className="w-full mt-2">
            <Label.Root className="LabelRoot" htmlFor="userName">
			        Username
		        </Label.Root>            
            <Input
              placeholder="Enter username"
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setUsername(e.target.value)}
              required
            />
            <Label.Root className="LabelRoot" htmlFor="password">
			        Password
		        </Label.Root>
            <Input
              className="mt-2"
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)}
              placeholder="Enter password"
              type="password"
              required
            />
          {/* Button to submit form */}
          <div className="w-full mt-4">
          <Button
            type="submit"
            className="mt-4"
          >
            Sign-in
          </Button>
          </div>
          </form>
          <div className="login-sso-or">
            <div></div>
            <br></br>OR
            <div></div>
          </div>
          <div className="w-full mt-4">
            <Button
              color="blue"
              onClick={ssoSignIn}
            >
              Sign-in with SSO
            </Button>
          </div>
        </div>
      </div>
  );
}
