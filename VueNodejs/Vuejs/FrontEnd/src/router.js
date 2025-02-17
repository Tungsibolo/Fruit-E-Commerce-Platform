import { createWebHistory, createRouter } from "vue-router";
import Home from "../src/components/HomePage.vue";
import LoginPage from "./components/LoginPage.vue";
import RegisterPage from "./components/RegisterPage.vue";
import AccountManagement from "./components/AccountManagement.vue";
import EditAccount from "./components/EditAccount.vue";
import CheckOut from "./components/CheckOut.vue";
import ProductDetail from "./components/ProductDetail.vue";
import AddProduct from "./components/AddProduct.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/signup",
    component: RegisterPage,
  },
  {
    path: "/account",
    name: "Account-list",
    component: AccountManagement,
  },
  {
    path: "/editaccount/:id",
    name: "Account-details",
    component: EditAccount,
  },
  { path: "/product/:id", component: ProductDetail, name: "ProductDetail" },
  { path: "/checkout", component: CheckOut, name: "Checkout" },
  { path: "/addProduct", component: AddProduct, name: "addProduct" },
  // {
  //   path: "/productdetail",
  //   name: "Product-detail",
  //   component: ProductList,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
