<template>
    <div id="main" class="app-main">
        <router-view></router-view>
    </div>
</template>

<script>
import store from "./store";
import axios from "axios";
export default {
  data() {
    return {
      theme: this.$store.state.app.themeColor
    };
  },
  created() {
    let permission = store.state.app.permissionData;
    var nes = JSON.parse(localStorage.getItem("ROLEINFO"));
    /*var permissionTemp = nes;
    permissionTemp.forEach((item, index) => {
      permission[item.name] = item.access;
    });*/
  },
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  overflow: hidden;
}
.app-main {
  width: 100%;
  height: 100%;
}
.clearfix{
  overflow: auto;
  zoom: 1;
}
</style>
