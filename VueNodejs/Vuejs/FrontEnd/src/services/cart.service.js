import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

class CartService {
  getCartItems(userId) {
    return axios.get(API_URL + "cart/" + userId, { headers: authHeader() });
  }

  addToCart(cartData) {
    return axios.post(
      API_URL + "cart/add",
      cartData, // Dữ liệu gửi đúng format JSON
      { headers: authHeader() } // Headers kèm JWT Token
    );
  }

  removeFromCart(userId, productId) {
    return axios.delete(`${API_URL}cart/${userId}/${productId}`, {
      headers: authHeader(),
    });
  }
}

export default new CartService();
