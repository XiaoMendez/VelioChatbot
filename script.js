async function sendMessage() {
  const input = document.getElementById("userInput").value;
  const responseBox = document.getElementById("responseBox");

  responseBox.innerHTML = "Cargando...";

  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: input
      })
    });

    const data = await response.json();
    responseBox.innerHTML = data.reply;

  } catch (error) {
    responseBox.innerHTML = "Error: " + error.message;
  }
}