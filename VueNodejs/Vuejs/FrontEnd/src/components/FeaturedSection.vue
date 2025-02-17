<template>
  <section class="featured spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="section-title">
            <h2>Featured Product</h2>
          </div>
          <div class="featured__controls">
            <ul>
              <li
                :class="{ active: activeFilter === '*' }"
                @click="setFilter('*')"
              >
                All
              </li>
              <li
                v-for="category in categories"
                :key="category"
                :class="{ active: activeFilter === category }"
                @click="setFilter(category)"
              >
                {{ category }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row featured__filter">
        <div
          v-for="(product, index) in filteredProducts"
          :key="index"
          :class="`col-lg-3 col-md-4 col-sm-6 mix ${product.categories.join(
            ' '
          )}`"
        >
          <div class="featured__item">
            <div
              class="featured__item__pic"
              :style="{ backgroundImage: `url(${product.image})` }"
            >
              <ul class="featured__item__pic__hover">
                <li>
                  <a href="#"><i class="fa fa-heart"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-retweet"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-shopping-cart"></i></a>
                </li>
              </ul>
            </div>
            <div class="featured__item__text">
              <h6>
                <a href="#">{{ product.name }}</a>
              </h6>
              <h5>{{ product.price }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeFilter: "*",
      categories: ["Oranges", "Fresh Meat", "Vegetables", "Fastfood"],
      products: [
        {
          name: "Crab Pool Security",
          price: "$30.00",
          image: "/src/assets/img/featured/feature-1.jpg",
          categories: ["oranges", "fresh-meat"],
        },
        {
          name: "Crab Pool Security",
          price: "$30.00",
          image: "/src/assets/img/featured/feature-2.jpg",
          categories: ["vegetables", "fastfood"],
        },
        {
          name: "Crab Pool Security",
          price: "$30.00",
          image: "/src/assets/img/featured/feature-3.jpg",
          categories: ["vegetables", "fresh-meat"],
        },
        {
          name: "Crab Pool Security",
          price: "$30.00",
          image: "/src/assets/img/featured/feature-4.jpg",
          categories: ["fastfood", "oranges"],
        },
        {
          name: "Crab Pool Security",
          price: "$30.00",
          image: "/src/assets/img/featured/feature-5.jpg",
          categories: ["fresh-meat", "vegetables"],
        },
        {
          name: "Crab Pool Security",
          price: "$30.00",
          image: "/src/assets/img/featured/feature-6.jpg",
          categories: ["oranges", "fastfood"],
        },
        {
          name: "Crab Pool Security",
          price: "$30.00",
          image: "/src/assets/img/featured/feature-7.jpg",
          categories: ["fresh-meat", "vegetables"],
        },
        {
          name: "Crab Pool Security",
          price: "$30.00",
          image: "/src/assets/img/featured/feature-8.jpg",
          categories: ["fastfood", "vegetables"],
        },
      ],
    };
  },
  computed: {
    filteredProducts() {
      if (this.activeFilter === "*") {
        return this.products;
      }
      return this.products.filter((product) =>
        product.categories.includes(this.activeFilter)
      );
    },
  },
  methods: {
    setFilter(filter) {
      this.activeFilter = filter;
    },
  },
};
</script>

<style scoped></style>
