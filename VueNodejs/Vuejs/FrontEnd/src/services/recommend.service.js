import axios from "axios";

const API_URL = "http://localhost:8080/api/"; // Thay bằng URL backend của bạn

class RecommendService {
  getSimilarProducts(productID) {
    return axios.get(`${API_URL}recommend/getRecommend/${productID}`);
  }
  syncProduct() {
    return axios.post(`${API_URL}recommend/sync-products`);
  }
}

export default new RecommendService();
