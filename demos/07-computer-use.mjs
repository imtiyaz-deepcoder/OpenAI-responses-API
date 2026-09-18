// Demo 7: Computer-use tool — showing the request/response shape
import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
    model: "gpt-5.6",
    tools: [{ type: "computer" }],
    input:
        "Open the Filters panel if it's not already open, then search for " +
        "penguin. Use the computer tool for UI interaction.",
});

console.log("---- raw output ----");
console.log(JSON.stringify(response.output, null, 2));

const computerCall = response.output.find((item) => item.type === "computer_call");

if (computerCall) {
    console.log("\n---- model requested a computer_call ----");
    console.log("call_id:", computerCall.call_id);
    console.log("actions requested:", computerCall.actions);
} else {
    console.log("\nNo computer_call in this response — check output above.");
}
