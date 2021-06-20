<template>
  <table class="mainmenu">
    <tbody>
      <tr>
        <th>
          <a :href="'/claus.info' + (devmode ? '/dist' : '') + '/?page=home'">
            <div class="first_menu_element">Home</div>
          </a>
        </th>
        <th>
          <a :href="'/claus.info' + (devmode ? '/dist' : '') + '/?page=tools'">
            <div>Tools</div>
          </a>
        </th>
        <th>
          <a :href="'/claus.info' + (devmode ? '/dist' : '') + '/?page=about'">
            <div class="last_menu_element">About me</div>
          </a>
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script>
window.Event = new Vue();

export default {
  data() {
    return {
      devmode: this.$parent.maindev
    }
  },
  mounted() {
    // console.log("Menu component mounted.");
  },
};
</script>
