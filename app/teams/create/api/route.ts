import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, description, img, members } = await request.json();
  const idToken = request.headers.get("Authorization")?.split(" ")[1];
  const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/teams/`;
  if (!idToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const res = await fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${idToken}`,
    },
    body: JSON.stringify({ name, description, img, members }),
  });

  if (!res.ok) {
    return NextResponse.json({ success: false, error: "Failed to create team" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json({ success: true, data }, { status: 201 });
}
