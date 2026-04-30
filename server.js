import express from "express";
import cors from "cors";
import { Groq } from "groq-sdk";

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: "API_KEY_AQUI"
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const chatCompletion = await groq.chat.completions.create({
        messages: [
    {
      role: "system",
      content: `
Eres un tutor de educación vial en Costa Rica.
Responde en máximo 3-4 líneas, claro y directo.
Si no es del tema: "Solo educación vial"
`
    },
    {
      role: "user",
      content: message
    }
  ],
  model: "openai/gpt-oss-120b",
  max_tokens: 100,
  temperature: 0.3
    });

    res.json({
      reply: chatCompletion.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al consultar Groq" });
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});