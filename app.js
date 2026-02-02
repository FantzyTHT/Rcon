// =========================
// CONFIG
// =========================
const API_URL = "https://YOUR-BACKEND-URL/cmd"; // CHANGE this
const output = document.getElementById("output");
const input = document.getElementById("command");

// =========================
// AUTH (API KEY)
// =========================
let apiKey = localStorage.getItem("apiKey");
if (!apiKey) {
  apiKey = prompt("Enter your WebRCON API key:");
  localStorage.setItem("apiKey", apiKey);
}

// =========================
// COMMAND HANDLER
// =========================
input.addEventListener("keydown", async (e) => {
  if (e.key !== "Enter") return;

  const cmd = input.value.trim();
  if (!cmd) return;

  printToTerminal(`> ${cmd}`);
  input.value = "";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey
      },
      body: JSON.stringify({ command: cmd })
    });

    const data = await res.json();
    printToTerminal(data.output);
  } catch (err) {
    printToTerminal("[Error] Cannot reach backend");
    console.error(err);
  }
});

function printToTerminal(text) {
  output.textContent += text + "\n";
  output.scrollTop = output.scrollHeight;
}
