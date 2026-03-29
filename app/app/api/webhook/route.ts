import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
const secret = req.headers.get("x-webhook-secret");
if (!process.env.WEBHOOK_SECRET || secret !== process.env.WEBHOOK_SECRET) {
return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
}

const body = await req.json().catch(() => ({}));
const text =
body?.message ||
`🚨 Meme Radar Alert
Token: ${body?.token ?? "unknown"}
Chain: ${body?.chain ?? "unknown"}
Score: ${body?.score ?? "n/a"}`;

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

if (!token || !chatId) {
return NextResponse.json({ ok: false, error: "missing telegram env vars" }, { status: 500 });
}

const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
chat_id: chatId,
text,
}),
});

const tgJson = await tg.json().catch(() => ({}));

if (!tg.ok) {
return NextResponse.json({ ok: false, error: "telegram send failed", telegram: tgJson }, { status: 500 });
}

return NextResponse.json({ ok: true, telegram: tgJson });
}
