<template>
  <div>
    <el-tabs type="card" v-model="taskSupervise">
      <el-tab-pane label="固定任务" name="stationaryTask" style="margin: 0 20px">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in pathItems" :to="{path: item.path}">{{ item.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view name="stationaryTask"></router-view>
      </el-tab-pane>
      <el-tab-pane label="相对固定任务" name="relativeTask" style="margin: 0 20px">
        <router-view name="relativeTask"></router-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "taskTemplate",
    data() {
      return {
        taskSupervise: "stationaryTask",
        pathItems: [
          {
            name: "任务模板",
            path: "/"
          }, {
            name: "固定任务",
            path: "/info"
          },],
        nowPath: "固定任务"
      };
    },
    methods: {},
    components: {
    
    },
    watch: {
      "$route"(to, from) {
        console.log(to)
        console.log(from)
        let item = this.pathItems.filter((item) => {
          return item.path === to.path;
        });
        if (item.length > 0) {
          for (let i = this.pathItems.length - 1;
               i > this.pathItems.indexOf(item[0]); i--) {
            this.pathItems.pop();
          }
        } else {
          this.pathItems.push({
            path: to.path,
            name: to.name
          })
        }
      },
    }
  }
</script>

<style scoped>

</style>
