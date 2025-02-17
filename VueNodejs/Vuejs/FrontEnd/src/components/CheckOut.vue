<template>
  <v-container>
    <h2 class="mb-4 text-center">Checkout</h2>

    <v-row>
      <!-- Danh sách sản phẩm trong giỏ hàng -->
      <v-col cols="12" md="8">
        <v-card v-if="cart.length > 0">
          <v-card-title> 🛒 Your Cart </v-card-title>
          <v-divider></v-divider>

          <v-table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart" :key="item.id">
                <td class="d-flex align-center">
                  <v-img
                    :src="item.product.imageUrl"
                    width="50"
                    height="50"
                    class="mr-2"
                  ></v-img>
                  {{ item.product.name }}
                </td>
                <td>{{ item.quantity }}</td>
                <td>${{ item.product.price }}</td>
                <td>${{ item.quantity * item.product.price }}</td>
                <td>
                  <v-btn
                    color="error"
                    small
                    @click="removeFromCart(item.product.id)"
                    >Remove</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>

        <v-alert v-else type="warning">Your cart is empty.</v-alert>
      </v-col>

      <!-- Form nhập địa chỉ & tổng tiền -->
      <v-col cols="12" md="4">
        <v-card class="pa-4">
          <v-card-title> 🚚 Shipping Details </v-card-title>
          <v-divider></v-divider>

          <v-form ref="form">
            <v-text-field
              v-model="shippingAddress.name"
              label="Full Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="shippingAddress.phone"
              label="Phone Number"
              required
            ></v-text-field>
            <v-textarea
              v-model="shippingAddress.address"
              label="Shipping Address"
              required
            ></v-textarea>
          </v-form>

          <v-divider class="my-4"></v-divider>

          <!-- Tổng thanh toán -->
          <v-card-subtitle class="text-h6 font-weight-bold"
            >Order Summary</v-card-subtitle
          >
          <v-row>
            <v-col cols="6">Subtotal:</v-col>
            <v-col cols="6" class="text-right">${{ totalAmount }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="6">Shipping Fee:</v-col>
            <v-col cols="6" class="text-right">${{ shippingFee }}</v-col>
          </v-row>
          <v-divider class="my-2"></v-divider>
          <v-row>
            <v-col cols="6" class="text-h6 font-weight-bold">Total:</v-col>
            <v-col cols="6" class="text-h6 font-weight-bold text-right"
              >${{ totalPayment }}</v-col
            >
          </v-row>

          <!-- Nút Đặt Hàng -->
          <v-btn
            color="primary"
            block
            class="mt-4"
            @click="placeOrder"
            :disabled="cart.length === 0"
          >
            🛍️ Place Order
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import cartService from "../services/cart.service";
import orderService from "../services/order.service";

export default {
  name: "Checkout",
  data() {
    return {
      cart: [],
      shippingAddress: {
        name: "",
        phone: "",
        address: "",
      },
      shippingFee: 5000, // Phí vận chuyển cố định
    };
  },
  computed: {
    totalAmount() {
      return this.cart.reduce(
        (total, item) =>
          total + (item.product.price || 0) * (item.quantity || 1),
        0
      );
    },
    totalPayment() {
      return this.totalAmount + this.shippingFee;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    fetchCart() {
      cartService
        .getCartItems(this.currentUser.id)
        .then((response) => {
          this.cart = response.data;
          console.log("Cart Data:", response.data);
        })
        .catch((error) => {
          console.error("Failed to load cart:", error);
        });
    },

    removeFromCart(productId) {
      cartService
        .removeFromCart(this.currentUser.id, productId)
        .then(() => {
          this.cart = this.cart.filter((item) => item.productId !== productId);
        })
        .catch((error) => {
          console.error("Failed to remove product:", error);
        });
    },

    placeOrder() {
      if (
        !this.shippingAddress.name ||
        !this.shippingAddress.phone ||
        !this.shippingAddress.address
      ) {
        alert("Please complete the shipping details.");
        return;
      }

      orderService
        .checkout(this.currentUser.id, this.shippingAddress)
        .then(() => {
          alert("Order placed successfully!");
          this.$router.push("/");
        });
    },
  },
  mounted() {
    this.fetchCart();
  },
};
</script>

<style scoped>
.text-right {
  text-align: right;
}
</style>
