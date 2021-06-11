import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    instock: true,
    numItems: [],
    numId:10,
    modal:false,
    msg:'Please select a size',
    whichMsg:0,
    error:false,

    merch:[

      {item:"Men's Carefree Unshrinkable Tee, Traditional Fit Short-Sleeve",
      id:1,
      price:19.95, 
      salePrice:11.99,
      show:false,
      selectedVariant:0,
      TheSize:'',
      variants:[
  
        {
          item:"Men's Carefree Unshrinkable Tee, Traditional Fit Short-Sleeve",
          variantId:2234,
          variantColorCode:'#a4ebf3',
          variantImg: 'https://cdni.llbean.net/is/image/wim/240624_4094_41?hei=764&wid=665&resMode=sharp2&defaultImage=llbstage/A0211793_2',
          variantMaterial:'Cotton',
          howMany: 0,
          inventory: 10,
          variantPrice:19.95, 
           discount:16.99,
           variantBool: false,
           selectedSize:'',
           sizes:[
        {size:'Small', id: 1,},
        {size:'Medium', id: 2,},
        {size:'Large', id: 3,}
      ],
        },
        {
          item:"Men's Carefree Unshrinkable Tee, Traditional Fit Short-Sleeve",
          variantId:2235,
          variantColorCode:'#000000',
          variantImg: 'https://cdni.llbean.net/is/image/wim/240624_1_41?hei=764&wid=665&resMode=sharp2&defaultImage=llbstage/A0211793_2',
          variantMaterial:'silk',
          inventory:15,
          howMany: 0,
           variantPrice:19.95, 
           discount:16.99,
           variantBool: false,
           selectedSize:'',
           sizes:[
        {size:'Small', id: 1,},
        {size:'Medium', id: 2,},
        {size:'Large', id: 3,},
        
      ],
  
        },
        {
          item:"Men's Carefree Unshrinkable Tee, Traditional Fit Short-Sleeve",
          variantId:2236,
          variantColorCode:'#ffac41',
          variantImg: 'https://cdni.llbean.net/is/image/wim/240624_33409_41?hei=764&wid=665&resMode=sharp2&defaultImage=llbstage/A0211793_2',
          variantMaterial:'wool',
          inventory:20,
          howMany: 0,
          variantPrice:19.95, 
           discount:16.99,
           variantBool: false,
           selectedSize:'',
           sizes:[
        {size:'Small', id: 1,},
        {size:'Medium', id: 2,},
        {size:'Large', id: 3,}
      ],
  
        },
     
      ],
  
      },
  
     
    ]
  },
  mutations: {

  trackQty(state,event,index) {

    state.numItems[index].amount = event.target.value
   },

    updateProduct(state,index){

      state.merch[0].selectedVariant = index
    },

    addToCart(state,qtyVal){
      state.merch[0].variants[state.merch[0].selectedVariant].howMany = qtyVal

     
      if(state.merch[0].variants[state.merch[0].selectedVariant].selectedSize === ''){

        state.error = true
 
        setTimeout(() => {
          state.error = false
        }, 4000);
       }
 
 
 
       else{
         
         let newObject = {
            
           item: state.merch[0].variants[state.merch[0].selectedVariant].item,
 
           colorCode: state.merch[0].variants[state.merch[0].selectedVariant].variantColorCode,
           
           img: state.merch[0].variants[state.merch[0].selectedVariant].variantImg,
 
           material: state.merch[0].variants[state.merch[0].selectedVariant].variantMaterial,
 
           priceRegular: state.merch[0].variants[state.merch[0].selectedVariant].variantPrice,
 
           discountedPrice: state.merch[0].variants[state.merch[0].selectedVariant].discount,
 
           amount: +state.merch[0].variants[state.merch[0].selectedVariant].howMany,
 
           sizeSelected:state.merch[0].variants[state.merch[0].selectedVariant].selectedSize,   
           
           color: state.merch[0].variants[state.merch[0].selectedVariant].variantColorCode,
 
           objExists: false
         }
    }

    if(state.numItems.length != 0){

      state.numItems.forEach(one =>{
        
        if(one.color === state.merch[0].variants[stare.merch[0].selectedVariant].variantColorCode && one.sizeSelected === state.merch[0].variants[state.merch[0].selectedVariant].selectedSize){

        

           one.amount = one.amount + this.newObject.amount

            this.newObject.objExists = true

           //  using the which msg property to determing the color of the background and the msg that will be used with the class error to show a msg alert. in this case, im changing the value of 'which msg ' to 1 to later say, if whichMsg is equal to 1 then the background color will be such.

            state.whichMsg = 1

            state.msg = 'Added to Existing Item'

            state.error = true
             setTimeout(() => {
        state.error = false
      }, 4000);

            

        }
         

        
      })}

      if(this.newObject.objExists === false || state.numItems.length === 0){

        state.numItems.push(this.newObject)
   
               state.whichMsg = 2
   
                state.msg = 'New Item Added'
   
                state.error = true
                 setTimeout(() => {
            state.error = false
          }, 4000);
   
   
          }    





  },

  showCart(state){
    state.modal = !state.modal
  },

  delItemFromCart(state,index){

    state.numItems.splice(index,1)

  }

},
  actions: {
  },
  modules: {
  }
})
