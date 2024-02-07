// import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

// let productModal = null;
// let delProductModal = null;

// createApp({
//   data() {
//     return {
//       apiUrl: 'https://vue3-course-api.hexschool.io/v2',
//       apiPath: 'powei',
//       products: [],
//       isNew: false,
//       tempProduct: {
//         imagesUrl: [],
//       },
//     }
//   },
//   mounted() {
//     productModal = new bootstrap.Modal(document.getElementById('productModal'), {
//       keyboard: false
//     });

//     delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
//       keyboard: false
//     });

//     // 取出 Token
//     const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
//     axios.defaults.headers.common.Authorization = token;

//     this.checkAdmin();
//   },
//   methods: {
//     checkAdmin() {
//       const url = `${this.apiUrl}/api/user/check`;
//       axios.post(url)
//         .then(() => {
//           this.getData();
//         })
//         .catch((err) => {
//           alert(err.response.data.message)
//           window.location = 'login.html';
//         })
//     },
//     getData() {
//       const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
//       axios.get(url).then((response) => {
//         this.products = response.data.products;
//       }).catch((err) => {
//         alert(err.response.data.message);
//       })
//     },
//     updateProduct() {
//       let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
//       let http = 'post';

//       if (!this.isNew) {
//         url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
//         http = 'put'
//       }

//       axios[http](url, { data: this.tempProduct }).then((response) => {
//         alert(response.data.message);
//         productModal.hide();
//         this.getData();
//       }).catch((err) => {
//         alert(err.response.data.message);
//       })
//     },
//     openModal(isNew, item) {
//       if (isNew === 'new') {
//         this.tempProduct = {
//           imagesUrl: [],
//         };
//         this.isNew = true;
//         productModal.show();
//       } else if (isNew === 'edit') {
//         this.tempProduct = { ...item };
//         this.isNew = false;
//         productModal.show();
//       } else if (isNew === 'delete') {
//         this.tempProduct = { ...item };
//         delProductModal.show()
//       }
//     },
//     delProduct() {
//       const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;

//       axios.delete(url).then((response) => {
//         alert(response.data.message);
//         delProductModal.hide();
//         this.getData();
//       }).catch((err) => {
//         alert(err.response.data.message);
//       })
//     },
//     createImages() {
//       this.tempProduct.imagesUrl = [];
//       this.tempProduct.imagesUrl.push('');
//     },
//   },
// }).mount('#app');

import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js"

// import pagination from "./pagination.js"
// import productModal from "./productModal.js"
// import delProductModal from "./delProductModal.js"

let modalProduct = null
let productDel = null

const app = createApp({
  data() {
    return {
      url: "https://vue3-course-api.hexschool.io/v2",
      path: "powei",
      tempProduct: {
        imagesUrl: []
      },
      products: [],
      //  pages:{},
      isNew: false,

    }
  },
  mounted() { //元件週期，token可以進入到cookie紀錄裡，然後也可以取出cookie紀錄

    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hasVueToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin()
    modalProduct = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false
    });

    productDel = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false
    });

  }
  // ,components:{
  //   pagination,
  //   // productModal,
  //   // delProductModal,
  //  }
  ,
  methods: {
    checkAdmin() {
      axios.post(`${this.url}/api/user/check`).then((res) => {//驗證產品如果成功就會進入getProduct產品訂購畫面，如果驗證不成功跳回原來登入畫面
        this.getProduct()

      })
        .catch((error) => {
          console.log(error)
          window.location = "login.html"
        }

        )
    }, delProductModal() {
      axios.delete(`${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`).then((res) => {
        console.log(res)

        this.getProduct()
        productDel.hide()
        // this.$refs.dModal.closeModal()
        this.tempProduct = {}
      }).catch((error) => { console.log(error) })
    }, updateProduct() {

      let http = "post"
      let web = `${this.url}/api/${this.path}/admin/product`

      if (!this.isNew) {
        http = "put"
        web = `${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`
      }

      axios[http](web, { data: this.tempProduct }).then((res) => {
        console.log(res)

        this.getProduct()
        modalProduct.hide()
        // this.$refs.pModal.closeModal()
        this.tempProduct = {}
      }).catch((error) => {
        console.log(error)
      })
    }, createImages() {
      this.tempProduct.imagesUrl = []
      this.tempProduct.imagesUrl.push("")
    },


    getProduct(page = 1) {
      axios.get(`${this.url}/api/${this.path}/admin/products?page=${page}`).then((res) => {
        this.products = res.data.products
        this.pages = res.data.pagination
        console.log(res.data)
      }).catch((error) => { console.log(error) })
    }
    ,

    openModal(isNew, item) {
      if (isNew == "new") {

        this.tempProduct = {
          imagesUrl: []
        }
        this.isNew = true
        modalProduct.show()
        // this.$refs.pModal.openModal()

      } else if (isNew == "edit") {
        this.tempProduct = { ...item }
        this.isNew = false
        modalProduct.show()
        // this.$refs.pModal.openModal()
      } else if (isNew == "delete") {
        this.tempProduct = { ...item }
        productDel.show()
        // this.$refs.dModal.openModal()
      }
    },


  },




})
app.mount("#app")