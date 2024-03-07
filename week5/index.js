
    const apiName="powei"
const apiUrl="https://vue3-course-api.hexschool.io/v2"
const { defineRule } = veeValidate;
const { Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'),
    validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
  });
  const {createApp}=Vue
  const app = Vue.createApp({
    data() {
      return {
        products: [],
      };
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
    },
    mounted() {
      this.getProduct();
    },
  });

// app.component('VForm', VeeValidate.Form);
// app.component('VField', VeeValidate.Field);
// app.component('ErrorMessage', VeeValidate.ErrorMessage);
app.mount("#app")



