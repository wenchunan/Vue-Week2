import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";

createApp({
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      const api = "https://vue3-course-api.hexschool.io/v2/admin/signin";
      axios
        .post(api, this.user)
        .then((res) => {
          console.log(res.data);
          const { token, expired } = res.data;
          document.cookie = `annaToken=${token}; expires=new Date=${expired}`;
          window.location = "products.html";
        })
        .catch((err) => {
          // console.dir(err);
          alert(err.response.data.message);
        });
    },
  },
}).mount("#app");
