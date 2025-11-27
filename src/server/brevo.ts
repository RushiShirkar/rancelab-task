export async function sendOtpEmail(to: string, code: string) {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            accept: "application/json",
            "api-key": process.env.BREVO_API_KEY!, // secret key from .env
            "content-type": "application/json",
        },
        body: JSON.stringify({
            sender: {
                name: "Rancelab",
                email: "no-reply@test.local", // free testing email, no real sending domain needed
            },
            to: [
                {
                    email: to
                },
            ],
            subject: "Your verification code",
            htmlContent: `
                <main style="font-family: system-ui, sans-serif; text-align:center; padding:20px;">
                <h1>Your Login Code</h1>
                <p style="font-size:32px; font-weight:bold; letter-spacing:5px;">${code}</p>
                <p>Valid for 10 minutes (Test email)</p>
                </main>
            `,
        }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to send OTP");
    return data;
}