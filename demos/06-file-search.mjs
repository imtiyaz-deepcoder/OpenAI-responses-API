// Demo 6: File search — create a vector store, upload a file, query it
import "dotenv/config";
import fs from "node:fs";
import OpenAI from "openai";

const client = new OpenAI();

const vectorStore = await client.vectorStores.create({
    name: "support-docs-demo",
});
console.log("Vector store created:", vectorStore.id);

await client.vectorStores.files.uploadAndPoll(
    vectorStore.id,
    fs.createReadStream("sample-docs/return-policy.txt")
);
console.log("File uploaded and indexed.");

const response = await client.responses.create({
    model: "gpt-5.1",
    tools: [
        {
            type: "file_search",
            vector_store_ids: [vectorStore.id],
        },
    ],
    input: "How many days do customers have to return an item, and are sale items included?",
});

console.log("\n---- output_text ----");
console.log(response.output_text);
