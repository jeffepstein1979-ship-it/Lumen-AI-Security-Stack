import { callSovereignAI } from "../intelligence/client";

export async function getTeaser(domain: string): Promise<{status: string, finding: string}> {
    try {
        const prompt = `Analyze the domain ${domain} and generate a one-sentence, high-impact vulnerability "teaser". 
        It should sound like a professional security audit finding (e.g., exposed directories, outdated TLS, AI endpoint leaks). 
        Make it sound mysterious and urgent for a luxury client. Do not explain yourself, just give the finding.`;

        const aiResponse = await callSovereignAI({
            prompt: prompt,
            model: "gpt-4o"
        });

        return {
            status: "Vulnerable",
            finding: aiResponse.content
        };
    } catch (e) {
        console.error("Sovereign AI Failure:", e);
        return {
            status: "Vulnerable",
            finding: "Critical systemic gap detected in the perimeter. Immediate review required."
        };
    }
}