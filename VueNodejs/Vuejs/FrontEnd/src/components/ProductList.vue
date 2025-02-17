<template>
  <section class="featured spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <v-container>
            <div class="section-title">
              <h2>Products</h2>
            </div>
            <v-row>
              <v-col
                v-for="product in products"
                :key="product.id"
                cols="12"
                sm="6"
                md="4"
              >
                <v-card
                  @click="
                    $router.push({
                      name: 'ProductDetail',
                      params: { id: product.id },
                    })
                  "
                >
                  <v-img :src="product.imageUrl" height="200px"></v-img>
                  <v-card-title>{{ product.name }}</v-card-title>
                  <v-card-subtitle>${{ product.price }}</v-card-subtitle>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import productService from "../services/product.service";

export default {
  name: "ProductList",
  data() {
    return {
      products: [],
      message: "",
    };
  },
  methods: {
    getProducts() {
      productService
        .getAllProducts()
        .then((response) => {
          this.products = response.data;
          console.log("Fetched products:", response.data);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        });
    },

    viewProduct(id) {
      this.$router.push({ name: "ProductDetail", params: { id } });
    },
  },
  mounted() {
    this.message = "";
    this.getProducts();
  },
};
</script>
<style scoped>
.hero__item {
  height: 460px;
}
.featured {
  padding-top: 40px;
}
</style>
