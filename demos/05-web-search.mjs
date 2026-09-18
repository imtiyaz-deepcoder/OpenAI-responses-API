// Demo 5: Enabling web search within a Responses API call
import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
    model: "gpt-5.1",
    tools: [{ type: "web_search" }],
    input: "What's one notable AI news story from this week? Keep it to 2-3 sentences.",
});

console.log("---- output_text ----");
console.log(response.output_text);

console.log("\n---- sources cited ----");
for (const item of response.output) {
    if (item.type !== "message") continue;
    for (const part of item.content) {
        for (const ann of part.annotations ?? []) {
            if (ann.type === "url_citation") {
                console.log(`- ${ann.title}: ${ann.url}`);
            }
        }
    }
}
