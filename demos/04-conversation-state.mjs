// Demo 4: Chaining turns with previous_response_id, and forking
// a conversation from an earlier point.

import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI();

const first = await client.responses.create({
    model: "gpt-5.1",
    input: "Suggest one name for a coffee shop. Just the name, nothing else.",
});
console.log("Turn 1:", first.output_text);

const second = await client.responses.create({
    model: "gpt-5.1",
    previous_response_id: first.id,
    input: "Now suggest a tagline for that name.",
});
console.log("Turn 2 (chained):", second.output_text);

const forked = await client.responses.create({
    model: "gpt-5.1",
    previous_response_id: first.id,
    input: "Actually, suggest a different name in the same style instead.",
});
console.log("Fork (from turn 1, ignoring turn 2):", forked.output_text);

const deleted = await client.responses.delete(first.id);
console.log("\nDeleted:", deleted);

try {
    await client.responses.create({
        model: "gpt-5.1",
        previous_response_id: first.id,
        input: "This should fail now.",
    });
} catch (err) {
    console.log("\nExpected failure after deletion:", err.status, "-", err.message);
}
