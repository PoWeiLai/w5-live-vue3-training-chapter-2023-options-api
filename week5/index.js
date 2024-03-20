
const apiName="powei"
const apiUrl="https://vue3-course-api.hexschool.io/v2"
const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;
//1.驗證可以改成import ... from ，我看文件是這樣寫，而且還發現import ...from後面還需要單引號?
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);
// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});
const { createApp } = Vue

const app=createApp({
data(){
 return{
    products:[],
    form:{
        email:'',
        name:'',
        tel:'',
        address:'',
    },
    message:''
 }
},

methods:{
    getProduct(){
        axios.get(`${apiUrl}/api/${apiName}/products`).then(res=>{
     this.products=res.data.products
        }).catch(error=>{
            console.log(error)
        })
    },
    isPhone(value) {
        const phoneNumber = /^(09)[0-9]{8}$/
        return phoneNumber.test(value) ? true : '需要正確的電話號碼'
      },
    sendTo(){
        axios.post(`${apiUrl}/api/${apiName}/order`,{data:this.form}).then(res=>{
            console.log(res)
        }).catch(error=>{
            console.log(error)
        })
    }
},
mounted(){
    this.getProduct()
}
})
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);
app.mount("#app")



