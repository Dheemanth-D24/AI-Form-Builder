const axios = require("axios");

exports.generateForm = async (req, res) => {
  try {
    const { prompt } = req.body;

    const fullPrompt = `
Generate a form schema in JSON format ONLY.

Format:
{
  "title": "Form Title",
  "fields": [
    { "type": "text", "label": "Name", "required": true }
  ]
}

User Prompt: ${prompt}
`;

    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3",
      prompt: fullPrompt,
      stream: false
    });

    const text = response.data.response;

    console.log("OLLAMA RAW:", text);

    const start = text.indexOf("{");
    const end = text.lastIndexOf("}") + 1;

    if (start === -1 || end === -1) {
      return res.status(500).json({ error: "Invalid AI response" });
    }

    const jsonString = text.slice(start, end);
    const parsed = JSON.parse(jsonString);

    res.json(parsed);

  } catch (err) {
    console.error("OLLAMA ERROR:", err.message);

    // fallback
    res.json({
      title: "Sample Form",
      fields: [
        { type: "text", label: "Name", required: true },
        { type: "email", label: "Email", required: true },
        { type: "textarea", label: "Message" }
      ]
    });
  }
};