function analyzeMessage() {
    const message = document.getElementById("message").value.trim();
    const result = document.getElementById("result");

    const riskyWords = [
        "won",
        "winner",
        "prize",
        "urgent",
        "click here",
        "verify now",
        "otp",
        "free money",
        "claim"
    ];

    const lowerMessage = message.toLowerCase();

    const matches = riskyWords.filter(word =>
        lowerMessage.includes(word)
    );

    // Suspicious link detection
    const hasLink =
        lowerMessage.includes("http://") ||
        lowerMessage.includes("https://") ||
        lowerMessage.includes("www.");

    const suspiciousLink =
        hasLink &&
        (
            lowerMessage.includes("bit.ly") ||
            lowerMessage.includes("tinyurl") ||
            lowerMessage.includes("login") ||
            lowerMessage.includes("verify")
        );

    if (!message) {
        result.innerHTML = `
            <div style="padding:20px; background:#f1f5f9; border-radius:12px;">
                <h3>⚠️ Please enter a message or link.</h3>
            </div>
        `;
        return;
    }

    let risk;
    let score;
    let color;
    let icon;
    let action;

    if (matches.length >= 2 || suspiciousLink) {
        risk = "HIGH RISK";
        score = suspiciousLink ? 90 : 80;
        color = "#dc2626";
        icon = "🔴";
        action = "Do not click the link or share OTP, passwords or bank details.";
    }
    else if (matches.length === 1 || hasLink) {
        risk = "SUSPICIOUS";
        score = 45;
        color = "#d97706";
        icon = "🟡";
        action = "Verify the sender and website before taking any action.";
    }
    else {
        risk = "NO OBVIOUS WARNING SIGNS";
        score = 10;
        color = "#16a34a";
        icon = "🟢";
        action = "No common warning patterns were detected. Still stay careful.";
    }

    const reasons = [];

    matches.forEach(word => {
        reasons.push(`<li>Suspicious word detected: <b>${word}</b></li>`);
    });

    if (suspiciousLink) {
        reasons.push(`<li>Suspicious link pattern detected.</li>`);
    }

    if (reasons.length === 0) {
        reasons.push("<li>No common scam warning patterns detected.</li>");
    }

    result.innerHTML = `
        <div style="
            margin-top:20px;
            padding:22px;
            border-radius:15px;
            background:#f8fafc;
            border-left:6px solid ${color};
        ">

            <h2 style="color:${color}; margin-bottom:10px;">
                ${icon} ${risk}
            </h2>

            <p style="font-size:18px;">
                <b>Prototype Risk Score:</b> ${score}/100
            </p>

            <h3 style="margin-top:18px;">🔎 Why?</h3>

            <ul style="margin-top:8px; line-height:1.8;">
                ${reasons.join("")}
            </ul>

            <h3 style="margin-top:18px;">🛡️ What should I do?</h3>

            <p style="margin-top:8px;">
                ${action}
            </p>

            <p style="
                margin-top:18px;
                font-size:12px;
                color:#64748b;
            ">
                Prototype keyword and link-based analysis. This result does not guarantee that a message is safe or fraudulent.
            </p>

        </div>
    `;
}