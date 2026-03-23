import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const primaryKey = process.env.GROQ_PRIMARY_KEY;
    const backupKey = process.env.GROQ_BACKUP_KEY;

    if (!primaryKey && !backupKey) {
      return NextResponse.json(
        { message: "API Keys not configured. Please add GROQ_PRIMARY_KEY to your .env.local file." },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    // Map UI messages to OpenAI structure
    const mappedMessages = messages.map((m: any) => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    }));

    const systemPrompt = {
      role: 'system',
      content: `You are the UrbanArch Mumbai Intelligent Real Estate Concierge. Your primary goal is to help users discover luxury properties and REDIRECT them to the property pages.
      
      STRICT RULE: When you mention or recommend any property from the list below, you MUST append the exact tag [PROPERTY:id] at the very end of your response. 
      Do NOT just describe the property; you MUST provide the link tag so the system can render a "View Property" button.
      
      Valid Property IDs (Use these exactly):
      - Lodha World View: [PROPERTY:lodha-world-view] (Worli, ₹12.4 Cr)
      - Oberoi Sky City: [PROPERTY:oberoi-sky-city] (Borivali East, ₹3.85 Cr)
      - Piramal Aranya: [PROPERTY:piramal-aranya] (Byculla, ₹5.2 Cr)
      - Rustomjee Crown: [PROPERTY:rustomjee-crown] (Prabhadevi, ₹18.5 Cr)
      - Hiranandani Gardens: [PROPERTY:hiranandani-powai] (Powai, ₹2.9 Cr)
      - Godrej BKC: [PROPERTY:godrej-bkc] (BKC, ₹7.5 Cr)
      
      Tone: Ultra-professional, high-end luxury, concise.
      
      Interaction Example:
      User: "Anything in Worli?"
      Assistant: "Lodha World View in Worli offers breathtaking sea views and ultra-luxury 4-5 BHK residences. [PROPERTY:lodha-world-view]"`
    };

    const runCompletion = async (apiKey: string) => {
      const client = new OpenAI({
        apiKey: apiKey,
        baseURL: "https://api.groq.com/openai/v1",
      });

      return await client.chat.completions.create({
        messages: [systemPrompt, ...mappedMessages],
        model: "llama-3.1-8b-instant",
        temperature: 0.5,
      });
    };

    let completion;
    try {
      if (primaryKey) {
        completion = await runCompletion(primaryKey);
      } else {
        throw new Error("Primary key not found");
      }
    } catch (primaryError) {
      console.warn('Primary Groq API failed, attempting backup:', primaryError);
      if (backupKey) {
        completion = await runCompletion(backupKey);
      } else {
        throw new Error("Backup key not found and Primary failed");
      }
    }

    const responseText = completion?.choices[0]?.message?.content || "I apologize, our AI systems are temporarily engaged. Please reach our via WhatsApp.";

    return NextResponse.json({ message: responseText });

  } catch (error: any) {
    console.error('Groq API Error (both keys failed):', error);
    
    return NextResponse.json(
      { message: "Both Primary and Backup AI servers are offline. We are looking into this." },
      { status: 500 }
    );
  }
}
