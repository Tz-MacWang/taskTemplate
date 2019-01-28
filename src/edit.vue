<template>
  <div v-loading="isAllLoading">
    <el-container>
      <el-main>
        <el-form :model="taskInfo" :rules="taskInfoRules" label-width="120px" ref="taskInfo">
          <el-row>
            <el-col :span="13">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="任务名称" prop="taskTempletName">
                    <el-input v-model="taskInfo.taskTempletName"
                              size="small" class="inputWidth"
                              :maxlength="10"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="任务编号" prop="taskTempletNo">
                    <el-input v-model="taskInfo.taskTempletNo"
                              size="small" class="inputWidth"
                              :maxlength="10"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="任务强度" prop="taskLevel">
                    <el-select v-model="taskInfo.taskLevel" size="small" class="inputWidth">
                      <el-option v-for="(item, index) in levelList" :label="item"
                                 :value="index+1" :key="item"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="上午执行时间" prop="beginTimeAM">
                    <el-time-picker v-model="taskInfo.beginTimeAM" format="HH:mm" size="small"
                                    :picker-options="{ selectableRange: '00:00:00 - 11:59:59' }"
                                    align="center" class="timePickerWidth"></el-time-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="下午执行时间" prop="beginTimePM">
                    <el-time-picker v-model="taskInfo.beginTimePM" format="HH:mm" size="small"
                                    :picker-options="{ selectableRange: '12:00:00 - 23:59:00' }"
                                    align="center" class="timePickerWidth"></el-time-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="11">
              <el-form-item label="任务备注" prop="mark">
                <el-input type="textarea" :rows="4" v-model="taskInfo.mark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="line"></div>
          <div v-loading="isRouteLoading">
            <el-row :gutter="20" style="line-height: 32px; margin: 20px 0;">
              <img src="../../tool/images/index_27.png" class="taskPathIcon">送出路线
              <el-button v-if="sendRoute.length===0" size="mini" type="primary" icon="el-icon-plus" plain
                         @click="addRoute('送出路线')">添加
              </el-button>
              <el-button v-else size="mini" type="primary" icon="el-icon-plus" plain
                         @click="addRoute('送出路线', sendRoute, taskInfo.pathAM)">修改路线
              </el-button>
            </el-row>
            <template-route :route="sendRoute"></template-route>
            <el-row :gutter="20" style="line-height: 32px; margin: 0;">
              <img src="../../tool/images/index_27.png" class="taskPathIcon">接收路线
              <el-button v-if="receiveRoute.length===0" size="mini" type="primary" icon="el-icon-plus" plain
                         @click="addRoute('接收路线')">添加
              </el-button>
              <el-button v-else size="mini" type="primary" icon="el-icon-plus" plain
                         @click="addRoute('接收路线', receiveRoute, taskInfo.pathPM)">修改路线
              </el-button>
            </el-row>
            <template-route :route="receiveRoute"></template-route>
          </div>
        </el-form>
      </el-main>
      <el-footer>
        <el-row :gutter="20">
          <el-col :span="7" :offset="9">
            <el-button type="primary" @click="addTask" v-show="$route.name==='添加任务'">添加</el-button>
            <el-button type="primary" @click="saveTask" v-show="$route.name==='修改任务'">保存</el-button>
            <el-button type="primary" @click="saveTaskAs" v-show="$route.name==='修改任务'">另存为</el-button>
            <el-button @click="goBackHome">取消</el-button>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import templateRoute from './templateRoute.vue'
  import axios from 'axios'
  import urls from './urls.js'
  import {ObjectToString, StringToObject, TimeStringToDateObject, DateObjectToTimeString} from './utils.js'
  
  export default {
    name: "edit",
    props: ["path", "id", "data"],
    data() {
      return {
        isAllLoading: false,
        isRouteLoading: false,
        resource: [],
        taskInfo: {
          taskTempletId: "",
          taskTempletName: "",
          taskTempletNo: "",
          beginTimeAM: "",
          beginTimePM: "",
          taskLevel: "",
          mark: "",
          pathAM: [],
          pathPM: [],
        },
        sendRoute: [],
        receiveRoute: [],
        taskInfoRules: {
          taskTempletName: [
            {required: true, message: '请输入任务名称', trigger: 'blur'},
          ],
          taskTempletNo: [
            {required: true, message: '请输入任务编号', trigger: 'blur'},
            {
              validator: (role, value, callback) => {
                let patter = /^[0-9]*$/;
                // if (!patter.test(value)) {   // 判断是否纯数字
                if (this.taskInfo.taskTempletId !== 0) {
                  callback();
                }
                if (false) {
                  return callback(new Error("任务编号必须为数字！"))
                } else {
                  axios.post(urls.isAvailableUrl, {
                    tabName: "tasktemplet",
                    colName: "taskTempletNo",
                    value: value
                  }).then(response => {
                    if (response.data.code != "200") {
                      throw new Error("发起校验唯一性网络请求失败")
                    }
                    if (response.data.result !== true) {
                      return callback(new Error("已存在该编号！"))
                    }
                    else {
                      callback();
                    }
                  });
                }
              }
            }
          ],
        },
        levelList: ['一级', '二级', '三级', '四级', '五级', '六级', '七级', '八级', '九级'],
      };
    },
    methods: {
      addRoute(path, selectedResource = [], way = "[]") {
        this.$router.push({
          name: path,
          params: {
            path: '/route'
          }
        })
      },
      getResource() {
        return axios.get(urls.getResourceUrl).then(response => {
          if (response.data.code == 200) {
            this.resource = response.data.result;
          }
        });
      },
      getTaskTemplateById(taskTemplateId) {
        return axios.get(urls.getTaskTemplateByIdUrl + taskTemplateId);
      },
      getRoute(templateId) {
        this.isRouteLoading = true;
        axios.get(urls.getTaskTemplateRouteUrl + templateId).then(response => {
          if (response.data.code == 200) {
            response.data.result.forEach(item => {
              item.arrivalTimeFormat = item.arrivalTime;
              item.arrivalTime = new Date("0001-01-01T" + item.arrivalTime);
              let resource = this.resource.filter((resourceItem, index) => {
                return resourceItem.resourceId === item.resourceId;
              });
              if (resource.length > 0) {
                resource = resource[0];
                item.resourceName = resource.resourceName;
                item.resourceType = resource.resourceType;
                // item.lng = resource.lng;
                // item.lat = resource.lat;
                let point = JSON.parse(resource.points)[0];
                item.lng = point.lng;
                item.lat = point.lat;
              }
              if (item.timePeriod === 'AM') {
                this.sendRoute.push(item);
              }
              else if (item.timePeriod === 'PM') {
                this.receiveRoute.push(item);
              }
            });
            this.sendRoute.sort((a, b) => {
              return a.orderBy > b.orderBy;
            });
            this.receiveRoute.sort((a, b) => {
              return a.orderBy > b.orderBy;
            })
          }
        }).finally(() => {
          this.isRouteLoading = false;
        });
      },
      getParamResourceList(routeList, resourceList) {
        routeList.forEach((item, index) => {
          resourceList.push({
            taskTempletResourceId: 0,
            taskTempletId: 0,
            resourceId: item.resourceId,
            arrivalTime: DateToString(item.arrivalTime),
            orderBy: index,
            timePeriod: "AM"
          })
        })
      },
      getParamTemplate() {
        return {
          taskTempletId: 0,
          taskTempletNo: this.taskInfo.taskTempletNo,
          taskTempletName: this.taskInfo.taskTempletName,
          taskType: 1,
          taskLevel: this.taskInfo.taskLevel === "" ? 0 : this.taskInfo.taskLevel,
          beginTimeAM: DateObjectToTimeString(this.taskInfo.beginTimeAM),
          endTimeAM: "",
          pathAM: ObjectToString(this.taskInfo.pathAM),
          beginTimePM: DateObjectToTimeString(this.taskInfo.beginTimePM),
          endTimePM: "",
          pathPM: ObjectToString(this.taskInfo.pathPM),
          mark: this.taskInfo.mark,
          status: 1
        };
      },
      addTemplateResource(resourceList, templateId, AMOrPM) {
        return Promise.all(resourceList.forEach((item, index) => {
          return axios.post(urls.addTemplateResourceUrl, {
            taskTempletResourceId: 0,
            taskTempletId: templateId,
            resourceId: item.resourceId,
            arrivalTime: DateObjectToTimeString(item.arrivalTime),
            orderBy: index,
            timePeriod: AMOrPM
          })
        }))
      },
      addTask() {
        this.$refs.taskInfo.validate(valid => {
          if (valid) {
            const template = this.getParamTemplate();
            let resourceList = [];
            this.getParamResourceList(this.sendRoute, resourceList);
            this.getParamResourceList(this.receiveRoute, resourceList);
            this.isAllLoading = true;
            axios.post(urls.addTaskTemplateUrl, {
              templet: template,
              resourceList: resourceList
            }).then(response => {
              if (response.data.code == 200) {
                this.$alert(response.data.message, "成功", {
                  confirmButtonText: "确定",
                  callback: action => {
                    this.goBackHome();
                  }
                })
              } else {
                throw new Error(response.data.message);
              }
            }).catch(error => {
              this.$alert(error.message, "失败", {
                confirmButtonText: "确定",
                callback: action => {
                  this.isAllLoading = false;
                }
              })
            })
          }
        })
      },
      saveTask() {
        this.$refs.taskInfo.validate(valid => {
          if (valid) {
            this.isAllLoading = true;
            axios.get(urls.delTaskTemplateResourceByIdUrl + this.taskInfo.taskTempletId)
              .then(response => {
                console.log(response);
                if (this.taskInfo.sendRoute.length > 0) {
                  this.addTemplateResource(this.sendRoute, this.taskInfo.taskTempletId, "AM");
                }
                if (this.taskInfo.receiveRoute.length > 0) {
                  this.addTemplateResource(this.receiveRoute, this.taskInfo.taskTempletId, "PM");
                }
              });
            let param = this.getParamTemplate();
            param.taskTempletId = this.taskInfo.taskTempletId;
            this.$http.post(urls.updateTaskTemplateUrl, param)
              .then(response => {
                if (response.data.code == 200) {
                  this.$alert(response.data.message, "成功", {
                    confirmButtonText: "确定",
                    callback: action => {
                      this.goBackHome();
                    }
                  });
                } else {
                  throw new Error(response.data.message);
                }
              }).catch(error => {
              this.$alert(error.message, "失败", {
                confirmButtonText: "确定",
                callback: action => {
                  this.isAllLoading = false;
                }
              });
            });
          }
        });
      },
      saveTaskAs() {
        this.$prompt('请输入新的任务编号', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /^[0-9]{1,10}$/,
          // inputErrorMessage: '任务编号只能为数字，且长度小于10位'
        }).then(({value}) => {
          this.taskInfo.taskTempletNo = value;
          this.addTask();
        });
      },
      goBackHome() {
        this.$router.push({
          name: "固定任务",
          params: {
            path: '/info'
          }
        })
      },
    },
    created() {
      console.log("this.$route", this.$route);
      this.isAllLoading = true;
      this.getResource().then(() => {
        if ('id' in this.$route.params) {
          return this.getTaskTemplateById(this.$route.params.id)
        } else throw new Error()
      }).then(response => {
        if (response.data.code == 200) {
          this.taskInfo = response.data.result;
          this.taskInfo.beginTimeAM = new Date("0001-01-01T" + this.taskInfo.beginTimeAM);
          this.taskInfo.beginTimePM = new Date("0001-01-01T" + this.taskInfo.beginTimePM);
          this.isRouteLoading = true;
        } else throw new Error(response.data.message);
      }).then(() => {
        this.getRoute(this.taskInfo.taskTempletId);
      }).finally(() => {
        this.isAllLoading = false;
      });
      
    },
    watch: {
      // '$route'(to, from) {
      //   console.log("edit.$route start");
      //   console.log(to);
      //   console.log(from);
      //   console.log(to.params.data);
      //   // this.taskInfo = to.params.data;
      //   console.log("edit.$route finish")
      // }
    },
    components: {
      templateRoute
    }
  }
</script>

<style scoped>
  .inputWidth {
    width: 150px;
  }
  
  .timePickerWidth {
    width: 259px;
  }
  
  .textareaStyle {
    width: 495px;
    height: 96px;
    border-radius: 5px;
    padding: 8px 15px;
    border: 1px solid #dcdfe6;
  }
  
  .line {
    border-top: solid 0.5px #dcdfe6;
    margin: 0 -20px;
  }
  
  .taskPathIcon {
    width: 13px;
    height: 15px;
  }
</style>
