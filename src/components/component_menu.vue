<template>
  <table class="mainmenu">
    <tbody>
      <tr>
        <th>
          <a @click="swap_component('main-component')">
            <div class="first_menu_element">Home</div>
          </a>
        </th>
        <th>
          <a @click="swap_component('tools-component')">
            <div>Tools</div>
          </a>
        </th>
        <th>
          <a @click="swap_component('about-component')">
            <div class="last_menu_element">About me</div>
          </a>
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  mounted() {
    console.log("Menu component mounted.");
  },
  props: ['swap_component']
};
</script>
