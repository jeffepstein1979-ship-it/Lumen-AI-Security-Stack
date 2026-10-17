export interface AIRequest {
    prompt: string;
    model?: string;
    temperature?: number;
}

export interface AIResponse {
    content: string;
}

export async function callSovereignAI(request: AIRequest): Promise<AIResponse> {
    const API_KEY = "krcGc77MNn11CNTRL"; 
    const API_URL = "https://knows-fellows-crop-rewards.trycloudflare.com/v1/chat/completions";

    const body = {
        model: request.model || "gpt-4o",
        messages: [
            { role: "system", content: "You are the Intelligence Engine for Lumen AI. You provide high-impact, sophisticated security insights for luxury clients. Be concise, mysterious, and devastatingly accurate." },
            { role: "user", content: request.prompt }
        ],
        temperature: request.temperature || 0.7
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error(`Sovereign AI Error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
        content: data.choices[0].message.content
    };
}