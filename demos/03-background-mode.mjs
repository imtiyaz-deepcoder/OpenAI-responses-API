// Demo 3: Background mode for long-running requests, with polling
import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI();

let response = await client.responses.create({
    model: "gpt-5.1",
    reasoning: { effort: "high" },
    background: true,
    input: "Write a detailed 5-day itinerary for a first trip to Japan.",
});

console.log("Submitted. Initial status:", response.status);

while (response.status === "queued" || response.status === "in_progress") {
    console.log("Still working... status:", response.status);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    response = await client.responses.retrieve(response.id);
}

console.log("\nFinal status:", response.status);

if (response.status === "completed") {
    console.log("\n---- output_text ----");
    console.log(response.output_text);
} else {
    console.log("Response did not complete successfully:", response);
}
