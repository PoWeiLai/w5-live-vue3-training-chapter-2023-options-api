// import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

// createApp({
//   data() {
//     return {
//       user: {
//         username: '',
//         password: '',
//       },
//     }
//   },
//   methods: {
//     login() {
//       const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
//       axios.post(api, this.user).then((response) => {
//         const { token, expired } = response.data;
//         // 寫入 cookie token
//         // expires 設置有效時間
//         document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
//         window.location = 'products.html';
//       }).catch((err) => {
//         alert(err.response.data.message);
//       });
//     },
//   },
// }).mount('#app');

import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const app=createApp({
data(){
  return{
user:{
 username:"",
 password:""
}
}
},methods:{
login(){
  const api="https://vue3-course-api.hexschool.io/v2"
// const {expired,token}=res.data

//1.不知道api前面不能加this
axios.post(`${api}/admin/signin`,this.user).then((res)=>{
  // alert("登入成功")
//2.模糊取得cookies和執行cookies一次,忘了document.cookie裡面怎麼改形式

  const {token,expired}=res.data

 document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/`;

  window.location="products.html"
}).catch((error)=>{
console.log(error)
})


}


}


})

app.mount("#app")