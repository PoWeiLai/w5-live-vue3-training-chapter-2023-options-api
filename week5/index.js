
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
const apiUrl="https://vue3-course-api.hexschool.io/v2"
const apiName="powei"
const app=createApp({
data(){
    return{
   products:[]
    }
},
methods:{
    getProducts(){
        axios.get(`${apiUrl}/api/${apiName}/products/all`).then(res=>{
            console.log(res)
            
        }).catch(error=>{
            alert("錯誤")
        })
    }
},
mounted(){
 this.getProducts()
}
})

app.mount("#app")