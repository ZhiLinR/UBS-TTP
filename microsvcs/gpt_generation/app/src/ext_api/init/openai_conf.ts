import OpenAI from "openai";
import { OPENAI_API_KEY } from '../../var/variables.js';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function connectOpenAI(content: string) {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: content }],
        model: "gpt-3.5-turbo",
       response_format: { type: "json_object" }
    });

    return completion.choices[0].message.content;
}


