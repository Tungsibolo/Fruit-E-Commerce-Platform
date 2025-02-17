const { algoliasearch } = require("algoliasearch"); // ✅ Sử dụng require() đúng cách
const config = require("../config/algolia.config");
const client = algoliasearch(config.ALGOLIA_APP_ID, config.ALGOLIA_API_KEY);
const recommendClient = client.initRecommend();

const recommendation = async (req, res) => {
  try {
    // const no = await client.listIndices();
    // console.log(no);
    console.log(req.body);
    const objectID = req.params.productID;

    if (!objectID) {
      return res
        .status(400)
        .json({ error: "❌ Object ID is required for recommendations." });
    }

    // const object = await client.getObject({
    //   indexName: "test-index",
    //   objectID: objectID,
    // });
    // if (!object) {
    //   return res.status(404).json({
    //     error: `❌ Object  not found in index 'test-index'.`,
    //   });
    // }
    // console.log("kt:", object);

    const response = await recommendClient.getRecommendations({
      requests: [
        {
          indexName: "test-index",
          objectID: objectID,
          model: "looking-similar",
          threshold: 42.1,
        },
      ],
    });
    console.log("eeeeeeeeeeeeeeeeee", response);

    console.log("✅ Recommendation Response:", response.results);

    res.json({
      message: "✅ Recommendations retrieved successfully!",
      recommendations: response.results,
    });
  } catch (error) {
    console.error("❌ Error getting recommendations:", error);
    res.status(500).json({
      error: "❌ Failed to get recommendations",
      details: error.message,
    });
  }
};

// ✅ Dùng CommonJS export đúng cách
module.exports = { recommendation };
