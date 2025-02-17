<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title
        >Add Product and sync-product in database and Alogolia</v-card-title
      >
      <v-card-text>
        <v-form @submit.prevent="addProduct">
          <v-text-field
            label="Name"
            v-model="product.name"
            required
          ></v-text-field>
          <v-text-field
            label="Price"
            v-model="product.price"
            type="number"
            required
          ></v-text-field>
          <v-text-field
            label="Link image "
            v-model="product.image"
          ></v-text-field>
          <v-text-field
            label="Category"
            v-model="product.category"
            required
          ></v-text-field>
          <v-textarea
            label="Description"
            v-model="product.description"
          ></v-textarea>
          <v-btn color="primary" type="submit">Add Product</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import productService from "../services/product.service";
import recommendService from "../services/recommend.service";

export default {
  data() {
    return {
      product: {
        name: "",
        price: "",
        image: "",
        description: "",
        category: "",
      },
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    addProduct() {
      productService
        .addProduct(this.product, this.currentUser.id)
        .then(() => {
          console.log("Sản phẩm đã được thêm vào database ");
          this.product = {
            name: "",
            price: "",
            image: "",
            description: "",
            category: "",
          };
          recommendService.syncProduct().then(() => {
            console.log("Sản phẩm đã được thêm vào database và đồng bộ ");
            this.$router.push("/");
          });
        })
        .catch((error) => {
          console.error("Lỗi khi thêm sản phẩm:", error);
        });
    },
    // async addProduct() {
    //   try {
    //     await axios.post("http://localhost:5000/api/products", this.product);
    //     this.$toast.success("Sản phẩm đã được thêm!");
    //     this.product = {
    //       name: "",
    //       price: "",
    //       image: "",
    //       description: "",
    //       category: "",
    //     };
    //   } catch (error) {
    //     console.error("Lỗi:", error);
    //     this.$toast.error("Thêm sản phẩm thất bại!");
    //   }
    // },
  },
};
</script>
