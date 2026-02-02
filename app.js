let API_URL = "https://YOUR-BACKEND-URL/cmd"; // change this

const loginDiv = document.getElementById("login");
const output = document.getElementById("output");
const inputLine = document.querySelector(".input-line");
const commandInput = document.getElementById("command");
const connectBtn = document.getElementById("connect");
const playersBtn = document.getElementById("players");

let rconInfo = {};

// ======= CONNECT BUTTON =======
connectBtn.addEventListener("click", () => {
  const ip = document.getElementById("ip").value.trim();
  const port = document.getElementById("port").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!ip || !port || !password) {
    alert("Please fill in all fields.");
    return;
  }

  rconInfo = { ip, port, password };

  loginDiv.style.display = "none";
  output.style.display = "block";
  inputLine.style.display = "flex";

  printToTerminal("Connected to " + ip + ":" + port + "\n");
});

// ======= SEND COMMAND =======
commandInput.addEventListener("keydown", async (e) => {
  if (e.key !== "Enter") return;
  await sendCommand(commandInput.value);
  commandInput.value = "";
});

// ======= PLAYER LIST BUTTON =======
playersBtn.addEventListener("click", async () => {
  await sendCommand("list");
});

// ======= FUNCTION TO SEND COMMAND =======
async function sendCommand(cmd) {
  if (!cmd) return;
  printToTerminal("> " + cmd);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        command: cmd,
        rcon: rconInfo  // send user-provided IP/port/password to backend
      })
    });

    const data = await res.json();
    printToTerminal(data.output);
  } catch (err) {
    printToTerminal("[Error] Cannot reach backend");
    console.error(err);
  }
}

// ======= PRINT TO TERMINAL =======
function printToTerminal(text) {
  output.textContent += text + "\n";
  output.scrollTop = output.scrollHeight;
}
