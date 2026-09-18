```markdown
# OpenAI Responses API — Course Demos

Demo code for the Pluralsight course on the OpenAI Responses API.

## Setup

1. Clone this repo and install dependencies:

   ```
   npm install
   ```

2. Create a `.env` file in the project root with your OpenAI API key:

   ```
   OPENAI_API_KEY=your-key-here
   ```

   Get a key from [platform.openai.com](https://platform.openai.com/api-keys) if you don't already have one.

3. Run any demo file directly with Node:

   ```
   node demos/01-basic-request.mjs
   ```

## Demos

| File | What it covers |
|---|---|
| `01-basic-request.mjs` | A basic request/response call |
| `02-reasoning-effort.mjs` | Controlling how much a model reasons before answering |
| `03-background-mode.mjs` | Running long requests in the background and polling for completion |
| `04-conversation-state.mjs` | Chaining and forking conversations, and deleting stored responses |
| `05-web-search.mjs` | Enabling the web search tool |
| `06-file-search.mjs` | Creating a vector store and searching an uploaded file |
| `07-computer-use.mjs` | The request/response shape for the computer-use tool |
| `08-combining-tools.mjs` | Using web search and file search together in one call |

## Requirements

- Node.js (with ES module support)
- An OpenAI API key

```
