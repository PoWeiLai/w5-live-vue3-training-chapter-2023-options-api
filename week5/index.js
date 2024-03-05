
    const apiName="powei"
const apiUrl="https://vue3-course-api.hexschool.io/v2"
import { defineRule } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('min', min);
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'),
    validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
  });
createApp({
data(){
 return{
    products:[],
 }
},
methods:{
    getProduct(){
        axios.get(`${apiUrl}/api/${apiName}/products`).then(res=>{
       console.log(res)
        }).catch(error=>{
            console.log(error)
        })
    },
    sendTo(){
        
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



