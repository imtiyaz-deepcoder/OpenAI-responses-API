// Demo 2: Reasoning-model support + the reasoning.effort parameter
import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI();

const prompt =
    "A train travels 180 km in 2.5 hours, then speeds up and covers the " +
    "next 120 km in 1 hour. What is its average speed for the whole trip? " +
    "Show your reasoning briefly, then give the final answer on its own line.";

for (const effort of ["low", "high"]) {
    const start = Date.now();

    const response = await client.responses.create({
        model: "gpt-5.1",
        reasoning: { effort },
        input: prompt,
    });

    const seconds = ((Date.now() - start) / 1000).toFixed(1);

    console.log(`\n==== reasoning.effort = "${effort}" ====`);
    console.log(response.output_text);
    console.log(`(took ${seconds}s, output tokens: ${response.usage?.output_tokens})`);
}
