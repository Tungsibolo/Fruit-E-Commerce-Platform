import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

class UserService {
  getAllAccount() {
    return axios.get(API_URL + "users", { headers: authHeader() });
  }

  getAccountById(id) {
    return axios.get(`${API_URL}getaccountbyid/${id}`, {
      headers: authHeader(),
    });
  }

  updateAccountById(id, data) {
    return axios.put(`${API_URL}updateaccountbyid/${id}`, data, {
      headers: authHeader(),
    });
  }

  delete(id) {
    return axios.delete(`${API_URL}userdeletebyid/${id}`, {
      headers: authHeader(),
    });
  }

  findByEmail(email) {
    return axios.get(`${API_URL}usersbyemail?email=${email}`, {
      headers: authHeader(),
    });
  }
}

export default new UserService();
