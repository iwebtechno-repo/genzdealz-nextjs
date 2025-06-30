import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    // Get the message from the request body
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      );
    }

    // Get user ID from headers (you can implement proper auth here)
    const userId = request.headers.get("user-id") || "";

    // Prepare the request to the external API
    const urlencoded = new URLSearchParams();
    urlencoded.append("message", message);

    // Make the request to the external API
    const response = await fetch(
      "https://flashweb.iweberp.com/api/genzgpt_new",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          user_id: userId,
        },
        body: urlencoded,
        redirect: "follow",
      }
    );

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }

    const data = await response.json();

    // Return the response from the external API
    return NextResponse.json(data);
  } catch (error) {
    console.error("GenZGPT API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
