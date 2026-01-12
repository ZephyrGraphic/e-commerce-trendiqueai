import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json({ 
            content: "Maaf, fitur Chat AI sedang dalam perbaikan (API Key missing)." 
        });
    }

    // 1. Fetch Products for Context
    const products = await prisma.product.findMany({
        take: 20, // Limit context window usage
        select: {
            id: true,
            name: true,
            price: true,
            category: { select: { name: true } },
            // slug: true, -> Removed
            description: true
        }
    });

    // 2. Format Product Context
    const productContext = products.map(p => 
        `- ${p.name} (${p.category.name}): Rp ${p.price.toLocaleString('id-ID')} | Link: /products/${p.id} | Desc: ${p.description?.substring(0, 50)}...`
    ).join("\n");

    // 3. System Prompt
    const systemPrompt = `
    You are 'Query', the intelligent fashion assistant for Trendique e-commerce.
    Your persona: Friendly, trendy, Gen-Z friendly, uses emojis, speaks Indonesian (Bahasa Indonesia).

    Goal: Help users find products based on their needs (price, style, occasion).
    
    CRITICAL INSTRUCTION:
    - You have access to the store's inventory below. 
    - When recommending a product, YOU MUST provide a clickable Markdown link in this format: [Product Name](/products/ID).
    - Do not invent products that are not in the list.
    - If no product matches perfectly, suggest the closest one or ask for more details.
    
    STORE INVENTORY:
    ${productContext}
    
    User Query: ${message}
    `;

    // 4. Call Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    // Or "gemini-flash-latest" if preferred, but explicit version is safer
    const result = await model.generateContent(systemPrompt);
    const responseText = result.response.text();

    return NextResponse.json({ content: responseText });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ content: "Maaf, aku lagi pusing nih. Coba tanya lagi nanti ya! 😵‍💫" }, { status: 500 });
  }
}
