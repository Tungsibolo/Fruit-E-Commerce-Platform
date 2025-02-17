const { algoliasearch } = require("algoliasearch"); // ✅ Sử dụng require()
const db = require("../models"); // ✅ Require database
const Product = db.product;
const config = require("../config/algolia.config");

// ✅ Khởi tạo Algolia Client
const client = algoliasearch(config.ALGOLIA_APP_ID, config.ALGOLIA_API_KEY);
// 📌 Đồng bộ sản phẩm từ database lên Algolia
const syncProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    const algoliaRecords = products.map((product) => ({
      objectID: product.id.toString(),
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
    }));
    // console.log(algoliaRecords);
    await client.saveObjects({
      indexName: "test-index",
      objects: algoliaRecords,
    });
    res.json({ message: "✅ Products synced successfully with Algolia!" });
  } catch (error) {
    console.error(
      "❌ Error syncing products or getting recommendations:",
      error
    );
    res.status(500).json({
      error: "❌ Failed to sync products & get recommendations",
      details: error.message,
    });
  }
};

module.exports = { syncProducts };

// const objectId = req.id;
//     const response = await client.getRecommendations({
//       requests: [
//         {
//           indexName: "test-index",
//           objectID: objectId,
//           model: "looking-similar",
//           threshold: 42.1,
//         },
//       ],
//     });
//     console.log("ktttttt", response);
