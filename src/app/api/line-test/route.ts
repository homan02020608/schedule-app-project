
export async function POST(request: Request) {
    const req = await request.json();
    console.log(req);
    try {
        const LINE_ACCESS_TOKEN = process.env.NEXT_PUBLIC_LINE_CHANNEL_ACCESS_TOKEN;
        const LINE_API_PATH = "https://api.line.me/v2/bot/message/broadcast";

        const requestHeader = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${LINE_ACCESS_TOKEN}`
        }
        const requestBody = await JSON.stringify({
            messages: [
                {
                    type: 'text',
                    text: "締め切り",
                },
            ],
        });
        const response = await fetch(LINE_API_PATH, {
            method: "POST",
            headers: requestHeader,
            body: requestBody,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`APIエラー:${errorData}`);
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 })
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : "よくわからないエラー"
        return new Response(
            JSON.stringify({success : false ,error : errorMessage}), {status : 500}
        )
    }
}