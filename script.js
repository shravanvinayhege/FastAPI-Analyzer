const DEFAULT_API_URL = "http://127.0.0.1:8000/analyze";

async function analyzeSpeed() {
    const urlInput = document.getElementById("apiUrl");
    const userInput = document.getElementById("userInput");
    const resultsDiv = document.getElementById("results");
    const statusDot = document.getElementById("statusDot");
    const btn = document.getElementById("analyzeBtn");

    const apiUrl = urlInput.value.trim() || DEFAULT_API_URL;
    const inputText = userInput.value.trim();

    if (!inputText) {
        showError("⚠️ Please enter some payload text before running the analysis.");
        return;
    }

    // Loading state
    btn.classList.add("loading");
    btn.querySelector(".btn-text").textContent = "Analysing...";
    statusDot.className = "dot active";
    resultsDiv.innerHTML = `<p class="placeholder-text">Sending request to <code style="color:var(--accent);background:rgba(0,229,160,0.07);padding:2px 6px;border-radius:4px;">${apiUrl}</code>...</p>`;

    const startTime = performance.now();

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: inputText })
        });

        const endTime = performance.now();
        const duration = Math.round(endTime - startTime);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status} — ${response.statusText}`);
        }

        const data = await response.json();

        // Determine speed tier
        const { color, label } = getSpeedTier(duration);
        const barWidth = Math.min(100, Math.round((duration / 2000) * 100));

        statusDot.className = "dot active";
        resultsDiv.innerHTML = `
            <div class="status-row">
                <div class="status-pill ok">✓ ${response.status} OK</div>
            </div>

            <div class="result-grid">
                <div class="metric-card">
                    <div class="metric-label">Response Time</div>
                    <div class="metric-value">${duration}<span class="metric-unit">ms</span></div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Speed Rating</div>
                    <div class="metric-value" style="font-size:1.1rem;color:${color};">${label}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Content-Type</div>
                    <div class="metric-value" style="font-size:0.75rem;color:var(--text);font-family:'JetBrains Mono'">${response.headers.get('content-type') || 'N/A'}</div>
                </div>
            </div>

            <div class="output-box">
                <div class="output-label">Server Response</div>
                ${JSON.stringify(data, null, 2).replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')}
            </div>

            <div class="speed-bar-wrap">
                <div class="speed-bar-label">
                    <span>SPEED METER</span>
                    <span>${duration}ms / 2000ms benchmark</span>
                </div>
                <div class="speed-bar-track">
                    <div class="speed-bar-fill" style="width: 0%; background: ${color};" id="speedBar"></div>
                </div>
            </div>
        `;

        // Animate bar
        requestAnimationFrame(() => {
            setTimeout(() => {
                const bar = document.getElementById("speedBar");
                if (bar) bar.style.width = barWidth + "%";
            }, 50);
        });

    } catch (err) {
        const endTime = performance.now();
        const duration = Math.round(endTime - startTime);

        statusDot.className = "dot error";
        resultsDiv.innerHTML = `
            <div class="status-row">
                <div class="status-pill err">✗ Request Failed</div>
            </div>
            <div class="error-box">
                <strong>Error:</strong> ${err.message}<br><br>
                <small style="opacity:0.7;">Failed after ${duration}ms. Ensure your FastAPI server is running at <code style="font-family:inherit">${apiUrl}</code></small>
            </div>
        `;
    } finally {
        btn.classList.remove("loading");
        btn.querySelector(".btn-text").textContent = "Run Analysis";
    }
}

function showError(msg) {
    const resultsDiv = document.getElementById("results");
    document.getElementById("statusDot").className = "dot error";
    resultsDiv.innerHTML = `<div class="error-box">${msg}</div>`;
}

function getSpeedTier(ms) {
    if (ms < 100) return { color: "#00e5a0", label: "⚡ Blazing" };
    if (ms < 300) return { color: "#00c896", label: "✦ Fast" };
    if (ms < 700) return { color: "#ffb347", label: "◎ Moderate" };
    if (ms < 1500) return { color: "#ff8c42", label: "▽ Slow" };
    return { color: "#ff4d6d", label: "✗ Very Slow" };
}

// Allow Enter key in textarea (Shift+Enter = new line, Enter alone = submit)
document.addEventListener("DOMContentLoaded", () => {
    const textarea = document.getElementById("userInput");
    textarea?.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            analyzeSpeed();
        }
    });
});
