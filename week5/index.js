

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
const userModal = {
    props: ['tempProduct', 'addToCart'],
    data() {
        return {
            modalProduct: null,
            qty: 1
        }
    },
    methods: {
        open() {
            this.modalProduct.show()
        },
        close() {
            this.modalProduct.hide()
        }
    },
    watch: {
        tempProduct() {
            this.qty = 1
        }
    },
    template: "#userProductModal"
    , mounted() {
        this.modalProduct = new bootstrap.Modal(this.$refs.modal)

    }
}
const app = createApp({
    data() {
        return {
            products: [],
            form: {
                email: '',
                name: '',
                tel: '',
                address: '',
            },
            message: '',
            apiName: "powei",
            apiUrl: "https://vue3-course-api.hexschool.io/v2",
            tempProduct: {},
            status: {
                cartLoading: "",
                changeLoading:""
            },
            carts: {}
        }

    },
    components: {
        userModal
    },
    methods: {
        getProduct() {
            axios.get(`${this.apiUrl}/api/${this.apiName}/products`).then(res => {
                this.products = res.data.products
            }).catch(error => {
                console.log(error)
            })
        },
        isPhone(value) {
            const phoneNumber = /^(09)[0-9]{8}$/
            return phoneNumber.test(value) ? true : '需要正確的電話號碼'
        },
        sendTo() {
            axios.post(`${this.apiUrl}/api/${this.apiName}/order`, { data: this.form }).then(res => {

            }).catch(error => {
                console.log(error)
            })
        },
        openModal(product) {
            this.tempProduct = product
            this.$refs.userModal.open()
        },
        //addToCart(qty=1,product_id){const order={ product_id,
        //   qty}......}
        addToCart(product_id, qty = 1) {
            const order = {
                product_id,
                qty
                //2.為何複製到這裡order裡屬性需要把雙引號刪掉?
            }
            this.status.cartLoading = product_id
            axios.post(`${this.apiUrl}/api/${this.apiName}/cart`, { data: order }).then((res) => {
            this.status.cartLoading = ""
            this.getCart()  
                this.$refs.userModal.close()
            }).catch((error) => {
                alert("顯示錯誤")
            })
        },
        getCart() {
            axios.get(`${this.apiUrl}/api/${this.apiName}/cart`).then((res) => {
                this.carts = res.data.data
                // console.log(this.carts)
            })

        },
        changeCart(item,qty=1){
            const modify={
                product_id:item.product_id,//4.這個item是怎麼來?
                qty
              }
              this.status.changeLoading = item.id  //6.為何事item.id
            axios.put(`${this.apiUrl}/api/${this.apiName}/cart/${item.id}`,{data:modify}).then(res=>{
                console.log(res)
                this.status.changeLoading = ""
                this.getCart()
            })
        }

    },

    mounted() {
        this.getProduct()
        this.getCart()
    }
})
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);




app.mount("#app")



