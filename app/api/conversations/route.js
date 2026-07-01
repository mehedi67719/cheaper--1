import { createClient } from "@/lib/server";
import { NextResponse } from "next/server";



export async function POST(request) {
  try {
    const supabase = await createClient();

    const { buyer_id, seller_id, product_id } = await request.json();

    if (!buyer_id || !seller_id || !product_id) {
      return NextResponse.json(
        { message: "buyer_id, seller_id and product_id are required" },
        { status: 400 }
      );
    }


    const { data: existingConversation, error: findError } = await supabase
      .from("conversations")
      .select("*")
      .eq("buyer_id", buyer_id)
      .eq("seller_id", seller_id)
      .eq("product_id", product_id)
      .maybeSingle();

    if (findError) {
      return NextResponse.json(
        { message: findError.message },
        { status: 500 }
      );
    }

    if (existingConversation) {
      return NextResponse.json(existingConversation, { status: 200 });
    }

    // Create new conversation
    const { data: newConversation, error: createError } = await supabase
      .from("conversations")
      .insert({
        buyer_id,
        seller_id,
        product_id,
      })
      .select()
      .single();

    if (createError) {
      return NextResponse.json(
        { message: createError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(newConversation, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}