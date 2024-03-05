

const apiName="powei"
const apiUrl="https://vue3-course-api.hexschool.io/v2"

const app=createApp({
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
    }
}
})
app.mount("#app")



