"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  useEffect(() => {
    if (!searchParams) return;
    const code = searchParams.get("code");
    signIn("boxyhq-saml", { callbackUrl: "/", code: code });
  }, [searchParams]);

  return null;
}
