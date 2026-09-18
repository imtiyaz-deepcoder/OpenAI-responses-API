import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
    model: "gpt-5.1",
    input: "In one sentence, explain what a REST API is to a beginner.",
});

console.log("----- output_text -----");
console.log(response.output_text);

console.log("\n----- useful fields -----");
console.log("response id:", response.id);
console.log("model used:", response.model);
console.log("status:", response.status);
console.log("input tokens:", response.usage?.input_tokens);
