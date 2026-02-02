const API_URL = "https://YOUR-BACKEND-URL/cmd"; // change this

const input = document.getElementById("command");
const output = document.getElementById("output");

input.addEventListener("keydown", async (e) => {
  if (e.key !== "Enter") return;

  const cmd = input.value.trim();
  if (!cmd) return;

  output.textContent += `> ${cmd}\n`;
  input.value = "";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command: cmd })
    });

    const data = await res.json();
    output.textContent += data.output + "\n";
  } catch {
    output.textContent += "[Error] Backend unreachable\n";
  }

  output.scrollTop = output.scrollHeight;
});
