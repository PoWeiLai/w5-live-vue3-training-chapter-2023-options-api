
    const apiName="powei"
const apiUrl="https://vue3-course-api.hexschool.io/v2"

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

configure({
  generateMessage: localize('zh_TW'),
});
  const {createApp}=Vue
  const app = Vue.createApp({
    data() {
      return {
        products: [],
        form:{
         email:"",
         name:"",
         tel:"",
         address:"",
        },
        message:""
      };
    },
    components: {
      VForm: Form,
      VField: Field,
      ErrorMessage: ErrorMessage,
    },
    methods: {
      getProduct() {
        axios
          .get(`${apiUrl}/api/${apiName}/products`)
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
      },
      sendTo(){
        const order=this.form
    axios.post(`${apiUrl}/api/${apiName}/order`,{data:order}).then((res)=>{
      console.log(res)
    })
 
      }
    },
    mounted() {
      this.getProduct();
    },
  });


app.mount("#app")



