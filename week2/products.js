// import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

// createApp({
//   data() {
//     return {
//       apiUrl: 'https://vue3-course-api.hexschool.io/v2',
//       apiPath: 'hexschoolvue',
//       products: [],
//       tempProduct: {},
//     }
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
//       const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
//       axios.get(url)
//         .then((response) => {
//           this.products = response.data.products;
//         })
//         .catch((err) => {
//           alert(err.response.data.message);
//         })
//     },
//     openProduct(item) {
//       this.tempProduct = item;
//     }
//   },
//   mounted() {
//     // 取出 Token
//     const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
//     axios.defaults.headers.common.Authorization = token;

//     this.checkAdmin()
//   }
// }).mount('#app');
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
const app=createApp({
  data(){
    return{
    
      apiUrl:"https://vue3-course-api.hexschool.io/v2",
      apiName:"powei",
     tempProduct:{},
     products:[],
    }
  },
  methods:{
    checkAdmin(){
    axios.post(`${this.apiUrl}/api/user/check`).then(res=>{
      console.log(res)
      this.getData()
    }).catch((error)=>{
      console.log(error)
    })
    },
  getData(){
   axios.get(`${this.apiUrl}/api/${apiName}/admin/products/all`).then((res)=>{
    console.log(res)
   }).catch((error)=>{
    console.log(error)
   })
  }
  },
  openProduct(item){
  this.tempProduct=item
  },
  mounted(){
  
const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
  "$1",

);
console.log(token)
axios.defaults.headers.common.Authorization=token
this.getData()
  }
})
app.mount("#app")
