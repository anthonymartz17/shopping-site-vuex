<template>
  <div id="app">
  
  

<!-- ------------------------------------------------------------------------ -->
<!--
  ***this div contains the error msg when trying to add to the cart without selecting a size.

  ***I used a v-show here so I can make the div display and display none.

  *** the boolean property 'error' works for both, the v-show and the bounded class ' errorMsg'.
 -->
 <!-- by default, the errorMsg class has a red background, however, in order to use the same class but with a different background, im binding a style attribute. inside the style attribute im setting the value of the background property, to a computed property that determines which color will be given to the background  -->
<div v-show="$store.state.error" :class="{errorMsg:$store.state.error}" :style="{background: backgroundForMsg}">
  <p>{{$store.state.msg}}</p>
</div>
<!-- ------------------------------------------------------------------------- -->
    <!-- :modal="modal" -->
    <cart-comp
      
     @click.native="showCart"
     
       @click="showCart"
    ></cart-comp>
 <!-- :numItems='numItems' -->
    <div class="cartModal" v-show="$store.state.modal" >

   

   <!-------------------The code below is  content that shows when you click on the cart --------------------------------------->

      <div class="cartContent">
        <i @click="showCart" class="fa-2x far fa-window-close"></i>
              <P class="empty-cart" v-show="$store.state.numItems.length == 0">Your cart is empty</P>

        <div class="cartContentItem" v-for="(item, index) in $store.state.numItems" :key="item.id">

          <div class="cartContentItemImg">
          <img width="150px" :src="item.img" alt="tshirt">
          </div>
          <div class="cartContentItemDescription">
         <p>{{item.item}}</p>
        <span>Size: {{item.sizeSelected}}</span>

         <p > Material: {{item.material}}</p>

<!-- ----------------prices and discounts-------------------------------------------------- -->
<!-- 
  ***in order to show the price for each item, the computed property 'itemprice' was used 
  
  *** in order to show a discounted price and put a linethrough through the regular price, two p tags were used with conditional renderings. this allows me to show the regular price or the regular price with a linethrough and the discounted price, depending on the amount of items of the same kind added to the cart.
  -->

        
         <p v-if="item.amount >= 3 " class="discountedPrice" > price: ${{item.priceRegular}}</p>
         

         <p v-else > price: ${{itemPrice}}</p>

         <p v-if="item.amount >= 3 "> Discounted price: ${{item.discountedPrice}}</p>
<!-- -------------------------------------------------------------------------------------------- -->
          <div>
          <label >Quantity: </label>
          <!-- to be able to access the current target and current iteration, I sent both as arguments of the function i want to excute -->

          <!-- the function 'trackQty()' keeps track of the value of this input element. this is to know whether 3 or more items are being added so the discount could be activated. -->
         <input @click="trackQty($event,index)" type="number" :value="item.amount" min="1" :max="$store.state.merch[0].variants[$store.state.merch[0].selectedVariant].inventory">
         

         </div>
        <p>{{showDiscount}}</p>



           <button @click="delItemFromCart(index)" class="del-item-btn">Delete</button>
        
          </div>
          
          </div>

      </div>
<!-- ------------------------------------------------------------------------------------------------------------------------ -->


    </div>

    <h1 class="store-name">Martz Store</h1>

   <top-com

    @addToCartEvent='addItemsCart($event)' 
   
 
  
     
     ></top-com>
      
   <!-- :numItems='numItems' -->

  </div>
</template>

<script>


export default {


  name: 'App',
  
  data(){
    return{

    //  numItems: [],
    //  numId:10,
    //  modal:false,
    //  msg:'Please select a size',
    //  whichMsg:0,
    //  error:false,

  //       merch:[

  //   {item:"Men's Carefree Unshrinkable Tee, Traditional Fit Short-Sleeve",
  //   id:1,
  //   price:19.95, 
  //   salePrice:11.99,
  //   show:false,
  //   selectedVariant:0,
  //   TheSize:'',
  //   variants:[

  //     {
  //       item:"Men's Carefree Unshrinkable Tee, Traditional Fit Short-Sleeve",
  //       variantId:2234,
  //       variantColorCode:'#a4ebf3',
  //       variantImg: 'https://cdni.llbean.net/is/image/wim/240624_4094_41?hei=764&wid=665&resMode=sharp2&defaultImage=llbstage/A0211793_2',
  //       variantMaterial:'Cotton',
  //       howMany: 0,
  //       inventory: 10,
  //       variantPrice:19.95, 
  //        discount:16.99,
  //        variantBool: false,
  //        selectedSize:'',
  //        sizes:[
  //     {size:'Small', id: 1,},
  //     {size:'Medium', id: 2,},
  //     {size:'Large', id: 3,}
  //   ],
  //     },
  //     {
  //       item:"Men's Carefree Unshrinkable Tee, Traditional Fit Short-Sleeve",
  //       variantId:2235,
  //       variantColorCode:'#000000',
  //       variantImg: 'https://cdni.llbean.net/is/image/wim/240624_1_41?hei=764&wid=665&resMode=sharp2&defaultImage=llbstage/A0211793_2',
  //       variantMaterial:'silk',
  //       inventory:15,
  //       howMany: 0,
  //        variantPrice:19.95, 
  //        discount:16.99,
  //        variantBool: false,
  //        selectedSize:'',
  //        sizes:[
  //     {size:'Small', id: 1,},
  //     {size:'Medium', id: 2,},
  //     {size:'Large', id: 3,},
      
  //   ],

  //     },
  //     {
  //       item:"Men's Carefree Unshrinkable Tee, Traditional Fit Short-Sleeve",
  //       variantId:2236,
  //       variantColorCode:'#ffac41',
  //       variantImg: 'https://cdni.llbean.net/is/image/wim/240624_33409_41?hei=764&wid=665&resMode=sharp2&defaultImage=llbstage/A0211793_2',
  //       variantMaterial:'wool',
  //       inventory:20,
  //       howMany: 0,
  //       variantPrice:19.95, 
  //        discount:16.99,
  //        variantBool: false,
  //        selectedSize:'',
  //        sizes:[
  //     {size:'Small', id: 1,},
  //     {size:'Medium', id: 2,},
  //     {size:'Large', id: 3,}
  //   ],

  //     },
   
  //   ],

  //   },

   
  // ]
     
    }
  },



// ---------------------------------------------------------------------------------------------------------------------------
  // in order to access the current iteration of a loop, you have to send it as a parametter in the function you want to excute, just like you would send current index or the $event. You do not have to use a for each loop or anything like that.

// through the use of $event you can access a lot of usefull information like path, target, etc...

  methods:{

    trackQty(event,index){
  
      this.$store.commit('trackQty',event,index)
    // this line updates the value of the property 'amount' of the objects pushed to the 'numItems' array so that the discounted price could show from the cart when the quantity input value is changed.
    // this.numItems[index].amount = event.target.value
      
      
    },
  //  -------------------------------------------------------------------------------------------------------
   
//     addItemsCart(item){
//  // the conditional 'If' of  this funtion 'addItemsCart(item)' keeps track of whether a size was selected or not in order to show the error msg that a size must be selected.
//     // the parameter it receives, is the selected variant or item which is an object with all the properties of the variant or item.
     
//       // the else part, adds an object with the values of the properties of the current iteration for the item to be added to the cart. This way, in each iteration, each item will have their own unique property values.
//       // if(item.selectedSize === ''){
//       //  this.error = true

//       //  setTimeout(() => {
//       //    this.error = false
//       //  }, 4000);
//       // }



//       // else{
        
//       //   let newObject = {
           
//       //     item: this.merch[0].variants[this.merch[0].selectedVariant].item,

//       //     colorCode: this.merch[0].variants[this.merch[0].selectedVariant].variantColorCode,
          
//       //     img: this.merch[0].variants[this.merch[0].selectedVariant].variantImg,

//       //     material: this.merch[0].variants[this.merch[0].selectedVariant].variantMaterial,

//       //     priceRegular: this.merch[0].variants[this.merch[0].selectedVariant].variantPrice,

//       //     discountedPrice: this.merch[0].variants[this.merch[0].selectedVariant].discount,

//       //     amount: +this.merch[0].variants[this.merch[0].selectedVariant].howMany,

//       //     sizeSelected:this.merch[0].variants[this.merch[0].selectedVariant].selectedSize,   
          
//       //     color: this.merch[0].variants[this.merch[0].selectedVariant].variantColorCode,

//       //     objExits: false
//       //   }

// // here im looping through the existing objects in the array 'numItems' whenever there are any in it. this in order to validate whether the object with the same size and color alreay exists. if it exists, im taking the newObject amount and just adding is to the existing object amount. this is to not have duplicate objects with the same color and size. 

  
        
//       //     if(this.numItems.length != 0){

//       //  this.numItems.forEach(one =>{
         
//       //    if(one.color === this.merch[0].variants[this.merch[0].selectedVariant].variantColorCode && one.sizeSelected === this.merch[0].variants[this.merch[0].selectedVariant].selectedSize){

         

//       //       one.amount = one.amount + newObject.amount

//       //        newObject.objExits = true

//       //       //  using the which msg property to determing the color of the background and the msg that will be used with the class error to show a msg alert. in this case, im changing the value of 'which msg ' to 1 to later say, if whichMsg is equal to 1 then the background color will be such.

//       //        this.whichMsg = 1

//       //        this.msg = 'Added to Existing Item'

//       //        this.error = true
//       //         setTimeout(() => {
//       //    this.error = false
//       //  }, 4000);

             

//       //    }
          

         
//       //  })}
       
//     //    if(newObject.objExits === false || this.numItems.length === 0){

//     //  this.numItems.push(newObject)

//     //         this.whichMsg = 2

//     //          this.msg = 'New Item Added'

//     //          this.error = true
//     //           setTimeout(() => {
//     //      this.error = false
//     //    }, 4000);


//     //    }        

      
//       }

     
     

//     },

  

    showCart(){

      this.$store.commit('showCart')

     
    
      
    },

//     delItemFromCart(index){

//       $store.commit('delItemFromCart',index)

      
//     }
  },
    computed:{
// this computed property 'backgroundForMsg, helps me determine the color of the background for my style binding. in this case, if I want the background of the msg that drops down orange, i have to make whichMsg equals 1. on the other hand, if I want the background to be green then the property whichMsg has to be equal to 2'
    backgroundForMsg(){
      if(this.$store.state.whichMsg === 1){
        return 'orange'
      }
      if(this.$store.state.whichMsg === 2){
        return 'green'
      }
    },
    showDiscount:{
      discount: 0,
      get(){
        return this.discount
      },
      set(newVal){
         return this.discount = newVal
      }
    },

    

    itemPrice(){
       return this.$store.state.merch[0].variants[this.$store.state.merch[0].selectedVariant].variantPrice
    },
    itemDiscount(){
      return this.$store.state.merch[0].variants[this.$store.state.merch[0].selectedVariant].discount
    }
  },
}
</script>

<style scoped>

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  
  
}

.errorMsg{

  width: 100%;
  height: 15vh;
  background: red;
  position: absolute;
  top: 0;
  display: grid;
  place-items: center;
  color: white;
  font-size: 1.5em;
  font-weight: 700;
  animation: error .5s ease-in;
   
}
@keyframes error {

  0% {
  transform: translateY(-1000px);
  opacity: 0;
}
100% {
  transform: translateY(0) ;
  opacity: 1;
}
  
}
                                       
.store-name{
  font-size: 3em;
  font-family: 'Poppins', sans-serif;
}
.store-name::before{
  content: "-";
  color: red;
  width: 1em;
}

#app{
  height: 100vh;
  display: grid;
  place-items: center;
  position: relative;
 
  
}

.cartModal{
  position: absolute;
  top: 0%;
  bottom: 0%;
  background:rgba(12, 12, 12, 0.226);
  width: 100%;
  display: grid;
  place-items: center;
}

.cartContent{
  width: 70%;
  height: 80vh;
   background: white;
   padding: 1em;
   overflow-y: auto;
   display:grid;
   place-items: center;
   gap: .2em;
   position: relative;
   
  
}
.cartContentItem{
 
   border: 1px solid rgba(0, 0, 0, 0.089);
  display: flex;
  justify-content: space-evenly;
  width: 70%;
  
  
}

.cartContentItemDescription{

display: flex;
flex-direction: column;
gap: .5em;
justify-content: center;
}
.discountedPrice{
  text-decoration: line-through;
  
}

.del-item-btn{
align-self: flex-end;
margin: .5em 2em;
cursor: pointer;

}

.empty-cart{

 text-transform: capitalize;
 font-size: 1.5em;

}

.fa-window-close{
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
}

@media (max-width:1080px){
  .cartContentItem{
    flex-direction: column;
  }
}
</style>
