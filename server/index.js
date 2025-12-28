const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { OpenAI } = require('openai');
const pdf = require('pdf-parse');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const upload = multer({ storage: multer.memoryStorage() });

// --- API Endpoint for PDF Processing ---
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).send('No file uploaded.');

        // 1. Extract text from PDF
        const data = await pdf(req.file.buffer);
        const rawText = data.text;
        const targetLang = req.query.lang || 'English';

        // 2. AI Prompting based on the "Bureaucracy Translator" logic
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { 
                    role: "system", 
                    content: `You are a Bureaucracy Translator. Convert complex government text into simple, actionable steps. 
                    Target Language: ${targetLang}. 
                    If the user is blind, provide a script for a voice reader. 
                    If they have low literacy, use very simple words.` 
                },
                { role: "user", content: `Simplify this document text: ${rawText.substring(0, 4000)}` }
            ],
        });

        res.json({ 
            success: true, 
            summary: completion.choices[0].message.content 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Processing failed." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));