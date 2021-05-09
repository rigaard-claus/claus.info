<template>
  <div class="main_tools_area">
    <div class="btn_area">
      <button class="btn_tool" id="btn_radiant_chart_demo">
        START CHART DEMO
      </button>
    </div>
  </div>
</template>

<script>
import {init_rad_chart} from '../scr/helper'
export default {
  mounted() {
    document.title = "Tools|RigaardArt";
    $("#btn_radiant_chart_demo").on("click", function() { init_rad_chart(); });
    // console.log("Tools component mounted.");
  },
};
</script>
