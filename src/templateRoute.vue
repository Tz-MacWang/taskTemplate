<template id="template-route">
  <div :gutter="20" style="margin: 10px 140px">
    <div v-for="(r,index) in route" :span="2" style="display: inline-block;" :key="index">
      <div style="text-align: center;">{{ r.arrivalTimeFormat }}</div>
      <div>
        <img src="../../tool/images/1_03.png" v-if="index===0">
        <img src="../../tool/images/1_02.png" v-else-if="index===route.length - 1">
        <img src="../../tool/images/1_04.png" v-else>
      </div>
      <div class="resourceName">{{ r.resourceName }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "templateRoute",
    props: {'route': Array},
  }
</script>

<style scoped>
.resourceName {
  text-align: center;
  width: 102px;
  height: 38px;
  overflow: hidden;
}
</style>
