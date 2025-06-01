// Dummy page to test protected routes
"use client";

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

export default function ProtectedPage() {
  const { data: session } = useSession()
  const [content, setContent] = useState()

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/protected")
      console.log(res)
      const json = await res.json()
      if (json.content) {
        setContent(json.content)
      }
    }
    fetchData()
  }, [session])

  // If no session exists, display access denied message and prompt to sign in
  if (!session) {
    return (
      <div>
        <h1>Protected Page</h1>
        <p>
          <strong>Access Denied</strong>
        </p>
        <p>
          <a href="/api/auth/signin">You must be signed in to view this page</a>
        </p>
      </div>
    )
  }

  // If session exists, display content
  return (
    <div>
      <h1>Protected Page</h1>
      <p>
        You are logged in.
      </p>
      <p><strong>{content ?? "\u00a0"}</strong></p>
    </div>
  )
}