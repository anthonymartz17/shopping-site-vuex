<template>
<div>
   <p  class="cart">
      <i class="fas fa-shopping-cart"></i>  
           
       <span> {{$store.state.numItems.length}}</span>
   </p>
   
   
</div>
  
</template>

<script>
export default {
  props:{
    // numItems:{
    //   type: Array
    // },
    // modal:Boolean
  },
  data(){
    return {
      
    }


  },
  methods:{
   
   
    
  }
  
}
</script>

<style scoped>
*{
  margin: 0%;
  padding: 0%;
  box-sizing: border-box;
}

.cart{
  
 position: absolute; 
  top: 20px;
  right: 150px; 
 min-width: 5vw;
  display: flex;
  justify-content: space-evenly;
  align-items: baseline;
   border-bottom: 2px solid green;
   border-left: 2px solid green;
   padding: 0 0 .2em .5em;
   cursor: pointer;
   
}
.cart span{
  margin-left: 1em;
  min-width: 2vw;
  text-align: center;
 
  
  
  
}



</style>