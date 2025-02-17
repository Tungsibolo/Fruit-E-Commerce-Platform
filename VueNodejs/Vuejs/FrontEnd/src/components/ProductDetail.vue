<template>
  <v-container v-if="product">
    <v-row>
      <!-- Ảnh sản phẩm -->
      <v-col cols="12" md="6">
        <v-img :src="product.imageUrl" height="400px" contain></v-img>
      </v-col>

      <!-- Thông tin sản phẩm -->
      <v-col cols="12" md="6">
        <h2>{{ product.name }}</h2>
        <h3 class="text-primary">{{ formatPrice(product.price) }}</h3>
        <p>{{ product.description }}</p>
        <v-btn color="primary" @click="addToCart">Add to Cart</v-btn>

        <!-- 🚀 UI Carousel Hiển Thị Sản Phẩm Gợi Ý -->
        <v-divider class="my-5"></v-divider>
        <h3>Recommended Products</h3>

        <v-carousel v-if="recommendations.length" hide-delimiters>
          <v-carousel-item v-for="item in recommendations" :key="item.objectID">
            <v-card class="pa-3 text-center">
              <v-img :src="item.imageUrl" height="200px" contain></v-img>
              <h4>{{ item.name }}</h4>
              <p class="text-primary">{{ formatPrice(item.price) }}</p>
              <v-btn color="success" small @click="addToCart1(item.objectID)">
                Add to cart
              </v-btn>
            </v-card>
          </v-carousel-item>
        </v-carousel>
        <p v-else class="text-grey">No recommendations available.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import productService from "../services/product.service";
import cartService from "../services/cart.service";
import recommendService from "../services/recommend.service"; // API Recommendation

export default {
  name: "ProductDetail",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    return {
      product: null,
      recommendations: [], // Danh sách sản phẩm gợi ý
    };
  },
  methods: {
    // Lấy thông tin sản phẩm chi tiết
    getProduct() {
      const productId = this.$route.params.id;
      productService
        .getProductById(productId)
        .then((response) => {
          this.product = response.data;
          this.getRecommendations(productId); // Fetch recommendations sau khi có sản phẩm
        })
        .catch((error) => {
          console.error("Lỗi khi lấy sản phẩm:", error);
        });
    },

    // Gọi API lấy danh sách sản phẩm gợi ý từ Algolia
    getRecommendations() {
      const productID = this.$route.params.id;
      console.log("product id: ", productID);
      recommendService
        .getSimilarProducts(productID)
        .then((response) => {
          console.log(response);
          this.recommendations = response.data.recommendations[0].hits;
        })
        .catch((error) => {
          console.error("Lỗi khi lấy sản phẩm gợi ý:", error);
        });
    },

    // Thêm vào giỏ hàng
    addToCart() {
      if (!this.currentUser) {
        this.$router.push({ name: "Login" });
        return;
      }
      const cartData = {
        userId: this.currentUser.id,
        productId: this.product.id,
        quantity: 1,
      };

      cartService
        .addToCart(cartData)
        .then(() => {
          console.log("Sản phẩm đã được thêm vào giỏ hàng!");
          this.$router.push({ name: "Checkout" });
        })
        .catch((error) => {
          console.error("Lỗi khi thêm vào giỏ hàng:", error);
        });
    },

    addToCart1(productID) {
      if (!this.currentUser) {
        this.$router.push({ name: "Login" });
        return;
      }
      const cartData = {
        userId: this.currentUser.id,
        productId: productID,
        quantity: 1,
      };

      cartService
        .addToCart(cartData)
        .then(() => {
          console.log("Sản phẩm đã được thêm vào giỏ hàng!");
          this.$router.push({ name: "Checkout" });
        })
        .catch((error) => {
          console.error("Lỗi khi thêm vào giỏ hàng:", error);
        });
    },

    // Định dạng giá tiền
    formatPrice(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
  },
  mounted() {
    this.getProduct();
    this.getRecommendations();
  },
};
</script>
