// An example of a protected API route

import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    return NextResponse.json(
      { error: 'You must be signed in to view the protected content on this page.' },
      { status: 401 }
    );
  }
  return NextResponse.json({
    id: 1,
    content: 'Hello from a protected endpoint! You must be signed in to see this.'
  });
}