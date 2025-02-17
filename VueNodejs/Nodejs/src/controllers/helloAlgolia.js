// File: helloAlgolia.js
const { algoliasearch } = require("algoliasearch"); // ✅ Dùng require() cho CommonJS

const appID = "I4GVOQODEC";
// API key with `addObject` and `editSettings` ACL
const apiKey = "e30d77427a25825be8b9432dddcf106f";
const indexName = "new";

const client = algoliasearch(appID, apiKey);

const record = { objectID: "object-1", name: "test record" };

async function run() {
  try {
    const { taskID } = await client.saveObject({
      indexName,
      body: record,
    });

    // Wait until indexing is done
    await client.waitForTask({
      indexName,
      taskID,
    });

    // Search for "test"
    const { results } = await client.search({
      requests: [
        {
          indexName,
          query: "test",
        },
      ],
    });

    console.log(JSON.stringify(results));
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

run();
