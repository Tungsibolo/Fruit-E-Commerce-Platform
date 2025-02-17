import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/";

class ProductService {
  getAllProducts() {
    return axios.get(API_URL + "getallproducts");
  }
  getProductById(id) {
    return axios.get(API_URL + "getproductbyid/" + id);
  }

  addProduct(product, userId) {
    return axios.post(
      `${API_URL}addProduct`,
      { product, userId },
      {
        headers: authHeader(),
      }
    );
  }
}

export default new ProductService();
