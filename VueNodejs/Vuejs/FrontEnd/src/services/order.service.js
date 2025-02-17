import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

class OrderService {
  checkout(userId, shippingAddress) {
    return axios.post(
      API_URL + "order/checkout",
      { userId, shippingAddress },
      { headers: authHeader() }
    );
  }
}

export default new OrderService();
