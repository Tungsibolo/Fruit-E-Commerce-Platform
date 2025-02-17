<template>
  <div>
    <!-- Humberger Begin -->
    <!-- <div class="humberger__menu__overlay"></div>
    <div class="humberger__menu__wrapper">
      <div class="humberger__menu__logo">
        <a href="#"><img src="/src/assets/img/logo.png" alt="" /></a>
      </div>
      <div class="humberger__menu__cart">
        <ul>
          <li>
            <a href="#"><i class="fa fa-heart"></i> <span>1</span></a>
          </li>
          <li>
            <a href="#"><i class="fa fa-shopping-bag"></i> <span>3</span></a>
          </li>
        </ul>
        <div class="header__cart__price">item: <span>$150.00</span></div>
      </div>
      <div class="humberger__menu__widget">
        <div class="header__top__right__language">
          <img src="/src/assets/img/language.png" alt="" />
          <div>English</div>
          <span class="arrow_carrot-down"></span>
          <ul>
            <li><a href="#">Spanis</a></li>
            <li><a href="#">English</a></li>
          </ul>
        </div>
        <div class="header__top__right__auth">
          <a href="#"><i class="fa fa-user"></i> Login</a>
        </div>
      </div>
      <nav class="humberger__menu__nav mobile-menu">
        <ul>
          <li class="active"><a href="./index.html">Home</a></li>
          <li><a href="./shop-grid.html">Shop</a></li>
          <li>
            <a href="#">Pages</a>
            <ul class="header__menu__dropdown">
              <li><a href="./shop-details.html">Shop Details</a></li>
              <li><a href="./shoping-cart.html">Shoping Cart</a></li>
              <li><a href="./checkout.html">Check Out</a></li>
              <li><a href="./blog-details.html">Blog Details</a></li>
            </ul>
          </li>
          <li><a href="./blog.html">Blog</a></li>
          <li><a href="./contact.html">Contact</a></li>
        </ul>
      </nav>
      <div id="mobile-menu-wrap"></div>
      <div class="header__top__right__social">
        <a href="#"><i class="fa fa-facebook"></i></a>
        <a href="#"><i class="fa fa-twitter"></i></a>
        <a href="#"><i class="fa fa-linkedin"></i></a>
        <a href="#"><i class="fa fa-pinterest-p"></i></a>
      </div>
      <div class="humberger__menu__contact">
        <ul>
          <li><i class="fa fa-envelope"></i> hello@colorlib.com</li>
          <li>Free Shipping for all Order of $99</li>
        </ul>
      </div>
    </div> -->
    <!-- Humberger End -->

    <!-- Header Section Begin -->
    <header class="header">
      <div class="header__top">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-6">
              <div class="header__top__left">
                <ul>
                  <li><i class="fa fa-envelope"></i> hello@colorlib.com</li>
                  <li>Free Shipping for all Orders over $99</li>
                </ul>
              </div>
            </div>
            <div class="col-lg-6 col-md-6">
              <div class="header__top__right">
                <div v-if="!currentUser" class="header__top__right__language">
                  <router-link to="/signup"
                    ><i class="fa fa-user"></i> SignUp
                  </router-link>
                </div>
                <div v-if="!currentUser" class="header__top__right__auth">
                  <router-link to="/login"
                    ><i class="fa fa-user"></i> Login
                  </router-link>
                </div>
                <div v-if="currentUser" class="header__top__right__auth">
                  <a to="#" @click.prevent="logOut"
                    ><i class="fa fa-user"></i> Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <div class="header__logo">
              <router-link to="/"
                ><img src="/src/assets/img/Resized_Logo_119x50.png" alt="Logo"
              /></router-link>
            </div>
          </div>
          <div class="col-lg-9">
            <nav class="header__menu">
              <ul>
                <li class="active"><router-link to="/">Home</router-link></li>
                <li><router-link to="/Checkout">Checkout</router-link></li>
                <li v-if="showAdminBoard">
                  <a href="#">Management</a>
                  <ul class="header__menu__dropdown">
                    <li>
                      <router-link to="/addProduct">Add Product</router-link>
                    </li>

                    <li>
                      <router-link to="/account">Accounts</router-link>
                    </li>
                  </ul>
                </li>
                <li v-if="showUserBoard">
                  <a href="#">My account</a>
                  <ul class="header__menu__dropdown">
                    <li>
                      <router-link to="/Checkout">Cart</router-link>
                    </li>
                    <li>
                      <router-link to="/oderhistory">Order History</router-link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
    <!-- Header Section End -->
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_ADMIN");
      }

      return false;
    },
    showUserBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_USER");
      }

      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
ul[data-v-c970699f] {
  margin-bottom: 0 !important;
}
.header__menu {
  padding: 24px 0;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  /* height: 100vh; */
}
a {
  color: #1c1c1c;
}
.header {
  margin-bottom: 40px;
}
</style>
