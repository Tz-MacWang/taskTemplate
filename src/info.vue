<template>
<div>
  <el-row style="margin-top: 20px">
    <el-col :span="2" class="searchBarItem">任务名称</el-col>
    <el-col :span="3">
      <el-input placeholder="任务名称" size="small" v-model="taskCondition.taskTempletName"></el-input>
    </el-col>
    <el-col :span="2" class="searchBarItem" style="margin-left: 16px">任务编号</el-col>
    <el-col :span="3">
      <el-input placeholder="任务编号" size="small" v-model="taskCondition.taskTempletNo"></el-input>
    </el-col>
    <el-col :span="3" style="margin-left: 8px">
      <el-button type="primary" size="mini" style="width: 90px;" @click="getTaskTemplateList(1)">查询</el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-col style="padding: 15px 0">
      <el-button type="primary" plain size="mini" icon="el-icon-plus" @click="showEditRoute('添加任务')">添加</el-button>
    </el-col>
  </el-row>
  <el-table :data="taskTemplateList" size="mini" highlight-current-row height="500" v-loading="isLoading">
    <el-table-column prop="taskTempletNo" label="任务编号" align="center"></el-table-column>
    <el-table-column prop="taskTempletName" label="任务名称" align="center"></el-table-column>
    <el-table-column prop="taskLevel" label="任务强度" align="center"></el-table-column>
    <el-table-column prop="beginTimeAM" label="上午执行时间" align="center"></el-table-column>
    <el-table-column prop="beginTimePM" label="下午执行时间" align="center"></el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="showEditRoute('修改任务', scope.row)">查看</el-button>
        <el-button type="text" size="small" @click="delTask(scope.row)" class="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination @current-change="handleCurrentChange" :current-page="listPage.currentPage"
                 background :page-size="listPage.perPageRows" layout="total, prev, pager, next, jumper"
                 :total="listPage.totalRows"
                 style="float: right;">
  </el-pagination>
</div>
</template>

<script>
  import axios from 'axios'
  import urls from './urls.js'
  export default {
    name: "info",
    data() {
      return {
        taskTemplateList: [],
        isLoading: false,
        taskCondition: {
          taskTempletNo: "",
          taskTempletName: "",
        },
        listPage: {
          currentPage: 1,
          perPageRows: 20,
          totalRows: 0,
          totalPages: 0
        },
        // taskTemplateList: this.taskTemplateList,
      };
    },
    methods: {
      getTaskTemplateList(current=null) {
        if (current) {this.listPage.currentPage = current}
        const param = {
          condition: this.taskCondition,
          page: this.listPage,
        };
        this.isLoading = true;
        axios.post(urls.getTaskTemplateListUrl, param)
          .then(response => {
            if (response.data.code == 200) {
              this.taskTemplateList = response.data.result.list;
              this.listPage = response.data.result.page;
            }
          }).finally(() => {
            this.isLoading = false;
        });
      },
      showEditRoute(pathName, data=null) {
        // this.$emit("showEdit", pathName, data);
        console.log(data);
        if (data) {
          this.$router.push({
            name: '修改任务',
            params: {
              id: data.taskTempletId,
              path: pathName,
              data: data,
            },
            query: {
              data: JSON.stringify(data),
            }
          })
        } else {
          this.$router.push({
            name: '添加任务',
            params: {
              path: pathName,
            }
          });
        }
        
      },
      delTask(data) {
        this.$confirm("确认要删除 " + data.taskTempletName + " 任务模板？", "删除确认", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: 'error'
        }).then(() => {
          console.log(data.taskTempletId);
          const p = this.delTaskById(data.taskTempletId);
          console.log(typeof p);
          console.log(p);
          return p;
        }).then(response => {
          if (response.data.code == 200) {
            this.$alert(response.data.message, "成功", {
              confirmButtonText: "确定",
              callback: this.getTaskTemplateList(this.getCurrentPage())
            })
          } else {
            throw new Error(response.data.message);
          }
        }).catch(error => {
          this.$alert(error==="cancel" ? "放弃删除" : error.message, "失败", {
            confirmButtonText: "确定",
            callback: this.getTaskTemplateList(this.getCurrentPage())
          })
        });
      },
      getCurrentPage() {
        return Math.min(Math.ceil(
          (this.listPage.totalRows-1)/this.listPage.perPageRows)
          , this.listPage.currentPage);
      },
      delTaskById(templateId) {
        return axios.get(urls.delTemplateByIdUrl + templateId);
      },
      handleCurrentChange(data) {
        this.listPage.currentPage = data;
        this.getTaskTemplateList();
      },
    },
    created() {
      this.getTaskTemplateList();
    },
    watch: {
      '$route'(to, from) {
        console.log('info start', to);
        console.log('info end', from);
      }
    },
  }
</script>

<style scoped>
.danger {
  color: red;
}
.searchBarItem {
  text-align: right;
  line-height: 32px;
  margin-right: 8px;
  width: 60px;
}
</style>
