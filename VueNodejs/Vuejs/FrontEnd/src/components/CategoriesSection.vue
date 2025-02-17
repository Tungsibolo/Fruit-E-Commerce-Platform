<template>
  <!-- Categories Section Begin -->
  <section class="categories">
    <div class="container">
      <div class="row">
        <div class="categories__slider owl-carousel">
          <!-- Render danh sách categories từ dữ liệu -->
          <div
            class="col-lg-3"
            v-for="(category, index) in categories"
            :key="index"
          >
            <div
              class="categories__item set-bg"
              :style="{ backgroundImage: `url(${category.image})` }"
            >
              <h5>
                <a href="#">{{ category.name }}</a>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CategoriesSection",
  data() {
    return {
      categories: [
        { name: "Fresh Fruit", image: "/src/assets/img/categories/cat-1.jpg" },
        { name: "Dried Fruit", image: "/src/assets/img/categories/cat-2.jpg" },
        { name: "Vegetables", image: "/src/assets/img/categories/cat-3.jpg" },
        { name: "Drink Fruits", image: "/src/assets/img/categories/cat-4.jpg" },
        { name: "Drink Fruits", image: "/src/assets/img/categories/cat-5.jpg" },
      ],
    };
  },
  mounted() {
    this.$nextTick(() => {
      $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        items: 3,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
      });
    });
  },
};
</script>

<style scoped>
.categories {
  padding: 20px 0;
}
.categories__item {
  text-align: center;
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  padding: 20px;
}
.categories__item h5 {
  color: #fff;
  bottom: 0px;
}
</style>
