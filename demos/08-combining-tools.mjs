// Demo 8: Combining multiple built-in tools in a single workflow
import "dotenv/config";
import fs from "node:fs";
import OpenAI from "openai";

const client = new OpenAI();

const vectorStore = await client.vectorStores.create({
    name: "combined-tools-demo",
});
await client.vectorStores.files.uploadAndPoll(
    vectorStore.id,
    fs.createReadStream("sample-docs/return-policy.txt")
);
console.log("Vector store ready:", vectorStore.id);

const response = await client.responses.create({
    model: "gpt-5.1",
    tools: [
        { type: "web_search" },
        { type: "file_search", vector_store_ids: [vectorStore.id] },
    ],
    input:
        "Using our return policy document, tell me how many days customers " +
        "have to return an item. Separately, what's one general best practice " +
        "companies follow for return policies, based on current thinking?",
});

console.log("\n---- output_text ----");
console.log(response.output_text);

console.log("\n---- tools actually invoked ----");
for (const item of response.output) {
    if (item.type === "file_search_call" || item.type === "web_search_call") {
        console.log("-", item.type);
    }
}
