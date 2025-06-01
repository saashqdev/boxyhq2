import { headers } from "next/headers";

export const getBaseURL = async () => {
  const url = (await headers()).get("x-forwarded-host");
  if (url) {
    let protocol = (await headers()).get("x-forwarded-proto") || "http";
    return `${protocol}://${url}`;
  }

  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
};
