<template>
  <div class="top">

    
    
    <ul class="ul-container">
       <li class="item"  v-for="m in $store.state.merch" :key="m.id">
         
         <img width="400px"   :src="image" alt="tshirt">
        
         <div class="details">
         
         <p>{{m.item}}</p>
         <p>{{material}}</p>
         <p :class="{discount:m.show}">${{m.price}}</p> 
         <p v-show="m.show">${{m.discount}}</p> 
         <span>size: </span>
        

          
             <!-- when you add a v-model to a select tag, the value of the option tags become the value of the variable used as value for the v-model -->

                    <!-- the selected attribute allows you to select the option you want to show by default. if you use v-model, you have to add the value attribute to the option tag so that the selected attribute could work-->

                    <!-- ------------------------------------------------------ -->
         
         <!-- in this select tag, im using the computed property "sizeChoice" as the value of the v-model.
         
         im using a computed property because i want to assign the value of the option tag selected to the 'selectedSize' property that each individual item has.
         -->


         <select v-model="sizeChoice">
           <option disabled selected value="">Please select</option>

           <!-- here im using the computed property (selectSize) which contains the array (sizes) of each individual tshirt -->
           <option v-for="option in selectSize" :key= "option.id">{{option.size}}</option>
         </select>
         <div>
           
          <label >Quantity:</label>
         <input ref="Qty" type="number" value="1" min="1" :max="$store.state.merch[0].variants[$store.state.merch[0].selectedVariant].inventory">
         </div>
          <div class="variant-container">
         
         <div
          v-for="(variant, index) in m.variants" :key="variant.varaintId"
          :style="{backgroundColor:variant.variantColorCode}"
          class="variantColor" 
           @click="updateProduct(index)" >

         </div>

         </div>
          <div class="btns">
            <button :disabled='!$store.state.instock'  @click="addToCart" class="btn add-btn">Add to cart</button>
           

            
            
          </div>

         </div>

        
       </li>
    </ul>
  </div>
</template>

<script>

export default {
  
 props:{
       
      //  numItems: Array
      //  merch:{
      //    type: Array
      //  }
       
     },
 data(){
   return{

    
      
    
 
   }

 },
 computed:{
   
   image(){
       return this.$store.state.merch[0].variants[this.$store.state.merch[0].selectedVariant].variantImg
     
   },
   material(){
     return this.$store.state.merch[0].variants[this.$store.state.merch[0].selectedVariant].variantMaterial
   },
   availableItems(){
     return this.$store.state.merch[0].variants[this.$store.state.merch[0].selectedVariant].inventory
   },   

  // here i created my computed property 'sizeChoice' that will be the value of the v-model assign to the select tag for the selection of the sizes of the t-shirts. 
  // computed properties by default only help you get values, you can not reactvely assign one to them. in order to do that you need to use getters and setters in the computed property. 
//in this case, the computed property will be an object, not a function.

   sizeChoice: {

     get(){
       return this.$store.state.merch[0].variants[this.$store.state.merch[0].selectedVariant].selectedSize
     },

     set(value){

     this.$store.state.merch[0].variants[this.$store.state.merch[0].selectedVariant].selectedSize = value
     }
   },   

  //  i created the computed property (selectSize) to find the array (sizes) which is inside the (variant array) which in time is inside the (merch array). by using a computed property in this case, allows me to just loop through(selectSize) since the array is now in this property.  

   selectSize(){
     return this.$store.state.merch[0].variants[this.$store.state.merch[0].selectedVariant].sizes
   },   

 },
 methods:{

   
  updateProduct(index){
    
    this.$store.commit('updateProduct',index)
    
    

  },
 
   addToCart(){

     this.$store.commit('addToCart',this.$refs.Qty[0].value)

     

    //  this.merch[0].variants[this.merch[0].selectedVariant].howMany = this.$refs.Qty[0].value
     
    //  this.$emit('addToCartEvent',this.merch[0].variants[this.merch[0].selectedVariant])


    
  
    //  $store.state.merch[0].inventory--

    //  if(this.merch[0].inventory === 0){
    //    this.instock = false
    //  }
    //  if(this.numItems > 3){
    //    this.merch[0].show = true
    //  }
   },

  //  removeItemEvent(){

  //    this.$emit('removeFromCart')

      
  //   if(this.numItems > 0){
  //     this.merch[0].inventory++
  //   }
  //      if(this.merch[0].inventory > 0){
  //      this.instock = true
  //    }
  //   if(this.numItems < 3 ){
  //      this.merch[0].show = false
  //    }
  //  }
   
 }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.disabledBtn{
  opacity: .4;
}

.top,.ul-container{
  width: 60vw;
  height: 70vh;
}


.item{
  box-shadow: 0 0 10px rgb(238, 233, 233);
  font-size: 1.2em;
  text-transform: capitalize;
  list-style: none;
  display: flex;
  align-items: center;

  
  

}
.details{
  display: flex;
  flex-direction: column;
  gap: 1em;
    
}


.btns{
  display: flex;
  gap: 1em;
}

.btn{
  padding: 1em 1em;
  cursor: pointer;
}

.variant-container{
  display: flex;
  gap: 1em;
  
}
.variantColor{
  border: 1px solid;
  width: 2em;
  height: 2em;
  cursor: pointer;
  
}

.tshirts-colors{
  display: flex;
  justify-content: space-evenly;
  width: 20%;


}
.color{
 width: 20px;
 height: 20px;
 cursor: pointer;
  
}
.color:hover{
  opacity: .7;
}
.blue{
  background: rgb(72, 200, 243);
}
.black{
  background: black;
}

.pupu{
  background: rgb(255, 144, 99);
}


@media (max-width:1080px){
  .item{
    flex-direction: column;
  }
}


</style>
