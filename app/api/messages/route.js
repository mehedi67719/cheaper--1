import { createClient } from "@/lib/server";
import { NextResponse } from "next/server";


export async function POST(request) {
  try {
    const supabase = await createClient();

    const { conversation_id, sender_id, message } = await request.json();

    if (!conversation_id || !sender_id || !message) {
      return NextResponse.json(
        {
          message:
            "conversation_id, sender_id and message are required",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("messages")
      .insert({
        conversation_id,
        sender_id,
        message,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}



export async function GET(request) {
  try {
    const supabase = await createClient();

    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get("conversationId");

    if (!conversationId) {
      return NextResponse.json(
        { message: "conversationId is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}