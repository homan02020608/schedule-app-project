import { NextResponse } from "next/server";

export async function POST(req: Request) {
    let requestBody;
    try {
        requestBody = await req.json();
    } catch (error) {
        console.error('Invalid JSON in request body:', error);
        return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 })
    }

    const { lineUserId, messageText }: { lineUserId?: string; messageText?: string } = requestBody;


    if (!lineUserId || !messageText) {
        return NextResponse.json({ error: 'lineUserId and messageText are required in the request body' }, { status: 400 });
    }

    const pushApiUrl = 'https://api.line.me/v2/bot/message/push';

    const channelAccessToken = process.env.NEXT_PUBLIC_LINE_CHANNEL_ACCESS_TOKEN as string;

    if (!channelAccessToken) {
        console.error('LINE_CHANNEL_ACCESS_TOKEN is not set in environment variables');
        return NextResponse.json({ error: 'Server configuration error : LINE_CHANNEL_ACCESS_TOKEN is missing' }, { status: 500 });
    }

    const payload = {
        to: lineUserId,
        messages: [
            {
                type: 'text',
                text: messageText,
            },
        ],
    };

    try {
        const lineApiResponse = await fetch(pushApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${channelAccessToken}`,
            },
            body: JSON.stringify(payload)
        });

        if (lineApiResponse.ok) {
            console.log(`Successfully sent message to LINE User ID: ${lineUserId}`);
            return NextResponse.json({ success: true, message: 'Message sent Successfully!' });
        } else {
            const errorData = await lineApiResponse.json();
            console.error(`Failed to send message to LINE User ID: ${lineUserId}`, errorData);
            return NextResponse.json({
                success: false,
                error: 'Failed to send message via LINE API',
                details: errorData,
                status: lineApiResponse.status,
            }, { status: lineApiResponse.status });
        }
    } catch (error: any) {
        console.error(`An unexpected error occurred while sending message to LINE User ID : ${lineUserId}`, error);
        return NextResponse.json({
            success: false,
            error: 'An unexpected error accurred',
            details: error.message,
        }, { status: 500 });
    }
}