<template>
  <el-container direction="horizontal" style="height: 669px;">
    <!--<el-aside width="250px" class="aside">-->
      <!--<el-input placeholder="请输入网点名称" size="mini">-->
        <!--<el-button icon="el-icon-search" slot="append" size="mini">搜索</el-button>-->
      <!--</el-input>-->
      <!--<div class="tree-div">-->
        <!--<el-tree :data="resourceTree" node-key="resourceId" ref="tree"-->
                 <!--@check="changeResource" :props="defaultProps"-->
                 <!--highlight-current show-checkbox-->
        <!--&gt;</el-tree>-->
      <!--</div>-->
    <!--</el-aside>-->
    <!--<el-main style="padding: 0px;">-->
      <!--<iframe id="YwMap" name="YwMap" ref="YwMap"></iframe>-->
    <!--</el-main>-->
    <!--<el-aside width="256px" class="aside">-->
      <!--<div class="selectedResourceMain">-->
        <!--<el-row class="selectedResourceItem" v-for="(item, index) in selectedResource" :key="index">-->
          <!--<el-col :span="15" class="selectedResourceItemName">-->
            <!--<span class="selectedResourceItemNameText">{{ index + 1 }} &nbsp {{ item.resourceName }}</span>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-time-picker v-if="" size="small" style="width: 80px;"-->
                            <!--:picker-options="{selectableRange:-->
                              <!--$route.name==='送出路线' ? '00:00:00 - 11:59:59' : '12:00:00 - 23:59:59'}"-->
                            <!--prefix-icon="none" v-model="item.arrivalTime" format="HH:mm"-->
                            <!--@change="changeTime(item)"></el-time-picker>-->
          <!--</el-col>-->
        <!--</el-row>-->
      <!--</div>-->
    <!--</el-aside>-->
  </el-container>
</template>

<script>
  export default {
    name: "route"
  }
</script>

<style scoped>
  .tree-div {
    margin-top: 8px;
    height: 615px;
    overflow: auto;
  }
  
  .selectedResourceMain {
    height: 570px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  
  .selectedResourceItem {
    margin-bottom: 6px;
  }
  
  .selectedResourceItemName {
    display: inline-block;
    line-height: 32px;
    border: 1px solid #dcdfe6;
    border-right: 0;
    padding: 0px 8px;
    height: 32px;
    width: 142px;
    border-radius: 4px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  
  .selectedResourceItemNameText {
    width: 126px;
    overflow: hidden;
    height: 30px;
    display: inline-block;
  }
  
  .aside {
    padding: 8px;
    border: 1px solid #dcdfe6;
  }
</style>
