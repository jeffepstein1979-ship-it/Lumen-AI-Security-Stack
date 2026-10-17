import { getTeaser } from "./osint/teaser";

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        
        if (url.pathname === "/" || url.pathname === "/index.html") {
            return new Response(await env.LUMEN_KV.get("LANDING_PAGE") || "Welcome to Lumen AI", {
                headers: { "content-type": "text/html" },
            });
        }

        if (url.pathname === "/teaser") {
            if (request.method !== "POST") {
                return new Response("Method Not Allowed", { status: 405 });
            }

            const { email, domain } = await request.json();
            if (!email || !domain) {
                return new Response(JSON.stringify({ error: "Email and Domain required" }), { status: 400 });
            }
            
            const leadId = btoa(email);
            await env.LUMEN_KV.put(`lead_${leadId}`, JSON.stringify({ email, domain, date: new Date().toISOString() }));
            
            const botToken = env.TELEGRAM_BOT_TOKEN;
            const chatId = env.TELEGRAM_CHAT_ID;
            const msg = `🚨 NEW LEAD CAPTURED

Email: ${email}
Target: ${domain}
Status: Teaser Triggered`;
            
            ctx.waitUntil(
                fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ chat_id: chatId, text: msg })
                })
            );

            const result = await getTeaser(domain);
            return new Response(JSON.stringify(result), {
                headers: { "content-type": "application/json" },
            });
        }

        return new Response("Not Found", { status: 404 });
    },
};