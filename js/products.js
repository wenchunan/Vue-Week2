import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2", // 請加入站點
      apiPath: "annawen", // 請加入個人 API Path
      products: [],
      temp: {},
    };
  },
  methods: {
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios
        .post(url)
        .then(() => {
          this.getProducts();
        })
        .catch((err) => {
          alert(err.data.message);
          window.location = "index.html";
        });
    },
    getProducts() {
      // #5 取得後台產品列表
      axios
        .get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
        .then((res) => {
          console.log(res.data);
          this.products = res.data.products;
        })
        .catch((error) => {
          console.dir(error);
          alert(error.data.message);
        });
    },
    openProduct(item) {
      this.temp = item;
    },
  },

  //類似init();
  created() {
    // 取出 Token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)annaToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    //token存到Authorization
    //在每一次打API時，會預設帶入token
    axios.defaults.headers.common["Authorization"] = token;

    this.checkAdmin();
  },
}).mount("#app");
