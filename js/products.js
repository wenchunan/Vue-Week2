import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "annawen",
      products: [],
      temp: {},
    };
  },
  methods: {
    checkLogin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios
        .post(url)
        .then((res) => {
          //   console.log(res.data);
          this.getProducts();
        })
        .catch((err) => {
          console.dir(err);
          window.location = "index.html";
        });
    },
    getProducts() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          this.products = res.data.products;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    openProduct(item) {
      this.temp = item;
    },
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)annaToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    this.checkLogin();
  },
}).mount("#app");
