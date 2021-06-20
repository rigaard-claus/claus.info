<template>
  <div class="header">
    <a :href="'/claus.info' + ( devmode ? '/dist' : '' )  
    + '/?page=home'"><img src="/claus.info/img/logo.png" alt="riggard art"/></a>
    <div class="language_float_btn"></div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      devmode: this.$parent.maindev
    }
  },
  mounted() {
    // console.log("Header component mounted.");
  },
};
</script>
