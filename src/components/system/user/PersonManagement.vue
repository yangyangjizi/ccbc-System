<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="filters" v-if="!listLoading">
        <el-form-item class="el-forms" label="添加时间">
          <el-date-picker
            v-model="filters.addTime"
            placeholder="请输入添加时间"
            type="daterange"
            clearable
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="el-forms" label="员工编号">
          <el-input v-model="filters.staffNo" clearable placeholder="请输入员工编号" class="input-box7"></el-input>
        </el-form-item>
        <el-form-item class="el-forms" label="员工姓名">
          <el-input v-model="filters.staffName" clearable placeholder="请输入员工姓名" class="input-box7"></el-input>
        </el-form-item>
        <el-form-item class="el-forms" label="联系电话">
          <el-input v-model="filters.tel" clearable placeholder="请输入联系电话" class="input-box7"></el-input>
        </el-form-item>
        <el-form-item label="所属机构">
          <el-cascader
            ref="tree"
            placeholder="请选择所属机构"
            clearable
            v-model="filters.unitCode"
            :options="options"
            :props="defaultData1"
            class="cascader-box"
            collapse-tags
          ></el-cascader>
        </el-form-item>
        <el-button
          type="warning"
          class="margin-box33"
          @click="handleCheck"
          v-hasPermission="'staffManageQuery'"
        >查询</el-button>
      </el-form>
      <el-row class="margin-box" v-if="!listLoading">
        <el-col>
          <el-button
            type="success"
            style="margin-left:14px"
            @click="handleExport"
            v-hasPermission="''"
          >导出</el-button>
          <el-button
            type="primary"
            style="margin-left:10px"
            @click="handleAddUser"
            v-hasPermission="'staffManageAdd'"
          >新增</el-button>
          <el-button
            type="danger"
            @click="handleDeleteUsers"
            v-hasPermission="'staffManageDel'"
          >批量删除</el-button>
          <!-- <el-button type="info" @click="handleInput">导入</el-button> -->
          <div style="float:left">
            <el-upload
              action
              :limit="1"
              accept=".xlsx, .xls"
              :show-file-list="false"
              :http-request="uploadFile"
              :file-list="fileList"
              :before-upload="beforeExcelUpload"
            >
              <el-button type="info" v-hasPermission="'staffManageLead'">导入</el-button>
            </el-upload>
          </div>

          <el-button
            class="check-button"
            @click="downFile('staffTemplate')"
            v-hasPermission="'staffTamplateDown'"
          >下载导入模版</el-button>
        </el-col>
      </el-row>
      <!--列表-->
      <el-table
        :data="tableData"
        v-loading="listLoading"
        :element-loading-text="loadingText"
        border
        style="width: 100%;"
        :header-cell-style="styleObj"
        highlight-current-row
        @selection-change="handleClickRow"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="number" label="序号" align="center" width="55"></el-table-column>
        <el-table-column prop="staffNo" label="员工编号" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="staffName" label="员工姓名" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="unitName" label="所属机构" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="bankLevel" label="机构级别" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="deptName" label="部门" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="postName" label="岗位" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="tel" label="联系电话" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createName" label="添加操作员" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="添加时间" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="modifyName" label="修改操作员" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="modifyTime" label="最新修改时间" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center" min-width="120px">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              v-hasPermission="'staffManageUpdate'"
              @click="handleEdite(scope.row.staffId,scope.row.unitCodes)"
              class="submit_color"
            >编辑</el-button>

            <el-button
              type="danger"
              v-hasPermission="''"
              size="small"
              @click="handleDelete(scope.row.staffId)"
              class="submit_color"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增弹框 -->
      <el-dialog title="新增员工" :visible.sync="dialogAddUserFormVisible" width="30%">
        <el-form
          :model="addUserForm"
          ref="addUserForm"
          :rules="addUserRules"
          :label-width="labelWidth"
        >
          <el-form-item label="员工编号" prop="staffNo" class="add-style">
            <el-input
              v-model="addUserForm.staffNo"
              autocomplete="off"
              placeholder="请输入员工编号"
              style="width:50%"
            ></el-input>
          </el-form-item>
          <el-form-item label="员工姓名" prop="staffName" class="add-style">
            <el-input
              v-model="addUserForm.staffName"
              autocomplete="off"
              placeholder="请输入员工姓名"
              style="width:50%"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="tel" class="add-style">
            <el-input
              v-model="addUserForm.tel"
              autocomplete="off"
              placeholder="请输入联系电话"
              style="width:50%"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属机构" prop="unitCode" class="add-style">
            <el-cascader
              ref="tree"
              placeholder="请选择所属机构"
              v-model="addUserForm.unitCode"
              :options="options"
              @change="handleChange1"
              :props="defaultData"
              collapse-tags
              style="width:100%"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="部门名称" prop="deptName" class="add-style">
            <el-select v-model="addUserForm.deptName" placeholder="请选择部门名称" @change="handleChange">
              <el-option
                v-for="item in deptNameList1"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位名称" prop="postName" class="add-style">
            <el-select v-model="addUserForm.postName" placeholder="请选择岗位名称">
              <el-option
                v-for="item in postNameList"
                :key="item.postId"
                :label="item.postName"
                :value="item.postId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleNoAdd('addUserForm')">取 消</el-button>
          <el-button type="primary" @click="handleSureAdd('addUserForm')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑弹框 -->
      <el-dialog title="修改员工资料" :visible.sync="dialogEditUserFormVisible" width="30%">
        <el-form
          :model="editUserForm"
          :rules="addUserRules"
          ref="editUserForm"
          :label-width="labelWidth"
        >
          <el-form-item label="员工编号" prop="staffNo" class="add-style">
            <el-input v-model="editUserForm.staffNo" readonly autocomplete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="员工姓名" prop="staffName" class="add-style">
            <el-input v-model="editUserForm.staffName" autocomplete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="tel" class="add-style">
            <el-input
              v-model="editUserForm.tel"
              autocomplete="off"
              placeholder="请输入联系电话"
              style="width:50%"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属机构" prop="unitCode" class="add-style">
            <el-cascader
              ref="tree"
              v-model="editUserForm.unitCode"
              :options="options"
              @change="handleWorkData3"
              :props="defaultData"
              style="width:100%"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="部门名称" prop="deptId" class="add-style">
            <el-select v-model="editUserForm.deptId" @change="handleChange4">
              <el-option
                v-for="item in deptNameList"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位名称" prop="postId" class="add-style">
            <el-select v-model="editUserForm.postId">
              <el-option
                v-for="item in postNameListThree"
                :key="item.postId"
                :label="item.postName"
                :value="item.postId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleNoEdit('editUserForm')">取 消</el-button>
          <el-button type="primary" @click="handleSureEdit">确 定</el-button>
        </div>
      </el-dialog>
      <!--页码-->
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page.sync="page"
        :page-sizes="[10, 15, 20, 30]"
        :page-size="pageSize"
        :total="total"
        style="float:right;padding-top: 10px;"
        background
      ></el-pagination>
    </el-col>
  </section>
</template>
<script>
import AES from "@/utils/aes.js";
export default {
  inject: ["reload"],
  data() {
    return {
      checkId: [],
      loadingText: "拼命加载中",
      listLoading: true,
      addUserRules: {
        staffNo: [
          { required: true, message: "请输入员工编号", trigger: "blur" },
          {
            pattern: /^[0-9a-zA-Z]{1,}$/,
            message: "员工编号不规范，请重新输入!"
          }
        ],
        staffName: [
          { required: true, message: "请输入员工姓名", trigger: "blur" },
          {
            pattern: /^([A-Za-z]|[\u4E00-\u9FA5])+$/,
            message: "姓名不规范，请重新输入!"
          }
        ],
        tel: [
          {
            pattern: /^[0-9]*$/,
            message: "号码不规范，请重新输入!"
          }
        ],
        unitCode: [
          { required: true, message: "请选择所属机构", trigger: "change" }
        ]
      },
      filters: {
        addTime: "",
        staffNo: "",
        staffName: "",
        tel: "",
        unitCode: []
      },

      options: [],
      defaultData: {
        //联级选择
        leafOnly: true,
        checkStrictly: true,
        value: "unitCode",
        label: "unitName",
        children: "children"
      },
      defaultData1: {
        //联级选择
        leafOnly: true,
        multiple: true,
        checkStrictly: true,
        value: "unitCode",
        label: "unitName",
        children: "children"
      },
      addUserForm: {
        staffNo: "",
        staffName: "",
        tel: "",
        postName: "",
        deptName: "",
        unitCode: []
      },
      postNameList: [],
      deptNameList: [],
      deptNameList1: [],
      postNameListThree: [],
      editUserForm: {
        staffNo: "",
        staffName: "",
        tel: "",
        // postName: "",
        // deptName: "",
        deptId: "",
        postId: "",
        unitCode: []
      },
      multipleSelection: [],
      staffId: "",
      tableData: [],
      fileList: [],
      total: 0,
      page: 1,
      pageSize: 10,
      dialogAddUserFormVisible: false,
      dialogEditUserFormVisible: false,
      labelWidth: "20%",
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },
  created() {
    this.getBankList();
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    // 新增部门数据接口
    handleChange1(e) {
      this.$axios
        .post("/banksys/system/dept/querydeptbyunit.do", {
          unitCode: e
        })
        .then(res => {
          this.deptNameList1 = res.data.data;
          this.addUserForm.postName = "";
          this.addUserForm.deptName = "";
          this.postNameList = [];
        });
    },
    //导出
    handleExport() {
      this.listLoading = true;
      this.loadingText = "导出中，请稍后！！！";
      let req = {};
      for (var i = 0; i < this.multipleSelection.length; i++) {
        var staffId = this.multipleSelection[i].staffId;
        this.checkId.push(staffId);
      }
      req = {
        staffIdList: this.checkId,
        addTime: this.filters.addTime,
        staffNo: this.filters.staffNo,
        staffName: this.filters.staffName,
        unitCodes: this.filters.unitCode,
        tel: this.filters.tel
      };
      this.$axios({
        method: "post",
        data: req,
        url: "/banksys/system/staff/exportstaffdatalist.do",
        responseType: "blob",
        headers: {
          "Content-Type": "application/json; application/octet-stream"
        }
      })
        .then(res => {
          this.listLoading = false;
          const type = "application/zip";
          const blob = new Blob([res.data], { type: type });
          const downloadElement = document.createElement("a");
          const href = window.URL.createObjectURL(blob);
          const name = decodeURI(
            res.headers["content-disposition"].split("=")[1]
          );
          downloadElement.href = href;
          downloadElement.download = name;
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
          window.URL.revokeObjectURL(href);
          this.checkId = [];
        })
        .catch(err => {
          console.log(err);
        });
    },
    //导入
    uploadFile(ele) {
      this.listLoading = true;
      this.loadingText = "导入中，请稍后！！！";
      const fd = new FormData();
      fd.append("file", ele.file);
      this.$axios({
        method: "post",
        data: fd,
        url: "/banksys/system/staff/recstaffdata.do",
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        this.listLoading = false;
        if (res.data.code == "1001") {
          this.$message.success(res.data.msg);
          this.reload();
        } else if (res.data.code === "1007") {
          this.$confirm("此操作将覆盖当日文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.listLoading = true;
              this.loadingText = "导入中，请稍后！！！";
              this.$axios({
                method: "post",
                data: fd,
                url: "/banksys/acccontrast/recdepositordata.do",
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              })
                .then(res => {
                  this.listLoading = false;
                  if (res.data.code == "1001") {
                    this.$message.success(res.data.msg);
                    this.reload();
                  } else {
                    this.$message.error(res.data.msg);
                    this.reload();
                  }
                })
                .catch(err => {
                  this.listLoading = false;
                  console.log(err);
                });
            })
            .catch(() => {
              this.listLoading = false;
              this.$message({
                type: "info",
                message: "已取消覆盖"
              });
            });
        } else {
          this.listLoading = false;
          this.$message.error(res.data.msg);
          this.reload();
        }
      });
    },
    // 上传文件之前的钩子,上传前对文件的大小和类型进行判断
    beforeExcelUpload(file) {
      const isExcel =
        file.name.split(".")[1] === "xlsx" || file.name.split(".")[1] === "xls";
      if (!isExcel) {
        this.$message({
          message: "只能上传xls或xlsx文件!",
          type: "error"
        });
      }
      return isExcel;
    },
    // 下载导入模版
    downFile(code) {
      this.listLoading = true;
      this.loadingText = "下载中，请稍后！！！";
      let req;
      req = {
        templateName: code
      };
      this.$axios({
        method: "post",
        data: req,
        url: "/banksys/acccontrast/downloadexporttemplate.do",
        responseType: "blob",
        headers: {
          "Content-Type": "application/json; application/octet-stream"
        }
      })
        .then(res => {
          const type = "application/zip";
          const blob = new Blob([res.data], { type: type });
          const downloadElement = document.createElement("a");
          const href = window.URL.createObjectURL(blob);
          const name = decodeURI(
            res.headers["content-disposition"].split("=")[1]
          );
          downloadElement.href = href;
          downloadElement.download = name;
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
          window.URL.revokeObjectURL(href);
          this.listLoading = false;
        })
        .catch(err => {
          this.listLoading = false;
          this.$messgae.error("网络异常，请稍后重试！！！");
        });
    },
    // 新增岗位数据接口
    handleChange() {
      this.addUserForm.postName = "";
      this.$axios
        .post("/banksys/system/post/querypostbyunitcode.do ", {
          unitCodes: this.addUserForm.unitCode,
          deptName: this.addUserForm.deptName
        })
        .then(res => {
          this.postNameList = res.data.data;
        });
    },
    // 编辑岗位数据接口
    handleChange3(e1, e2) {
      this.$axios
        .post("/banksys/system/post/querypostbyunitcode.do", {
          unitCodes: e1,
          deptName: e2
        })
        .then(res => {
          this.postNameListThree = res.data.data;
        });
    },
    handleChange4(e) {
      this.$axios
        .post("/banksys/system/post/querypostbyunitcode.do", {
          unitCodes: this.editUserForm.unitCode,
          deptName: e
        })
        .then(res => {
          this.editUserForm.postId = "";
          this.postNameListThree = res.data.data;
        });
    },
    //编辑回显
    handleEdite(id, udList) {
      this.staffId = id;
      let prop = {};
      prop = {
        staffId: id,
        unitCodes: udList
      };
      this.$axios({
        method: "post",
        url: "/banksys/system/staff/querystaffdetails.do",
        data: prop
      })
        .then(res => {
          this.dialogEditUserFormVisible = true;
          // this.editUserForm = JSON.parse(AES.decrypt(res.data.data));
          this.editUserForm.staffNo = AES.decrypt(res.data.data.staffNo)
          this.editUserForm.staffName = AES.decrypt(res.data.data.staffName)
          this.editUserForm.tel = AES.decrypt(res.data.data.tel)
          this.editUserForm.unitCode = res.data.data.unitCode
          this.editUserForm.deptId = res.data.data.deptId
          this.editUserForm.postId = res.data.data.postId
          this.handleWorkData(this.editUserForm.unitCode);
          this.handleChange3(
            this.editUserForm.unitCode,
            this.editUserForm.deptId
          );
          
        })
        .catch(err => {
          this.$message.error("网路异常，请重试！！！");
        });
    },
    // 获取对应机构的下属部门岗位
    handleWorkData(v) {
      this.$axios
        .post("/banksys/system/dept/querydeptbyunit.do", {
          unitCode: v
        })
        .then(res => {
          this.deptNameList = res.data.data;
        });
    },
    // 机构改变触发查询部门
    handleWorkData3(e) {
      this.$axios
        .post("/banksys/system/dept/querydeptbyunit.do", {
          unitCode: e
        })
        .then(res => {
          this.editUserForm.deptId = "";
          this.editUserForm.postId = "";
          this.postNameListThree = [];
          this.deptNameList = res.data.data;
        });
    },
    // 获取所属机构
    getBankList() {
      this.$axios
        .post("/banksys/system/post/queryunitcodebyrole.do", {})
        .then(res => {
          this.options = res.data.list;
        })
        .catch(err => {
          this.$message.error("网络异常，请重新尝试！！！");
        });
    },
    handleCheck() {
      this.getTableData();
    },
    //批量删除
    handleDeleteUsers() {
      let deleteUsersData = this.multipleSelection;
      let deleteUsersList = [];
      for (var i in deleteUsersData) {
        deleteUsersList.push(deleteUsersData[i].staffId);
      }
      if (deleteUsersList.length === 0) {
        this.$message.error("请选中要删除数据项！");
        return;
      }

      this.$confirm("此操作将删除选中项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          this.loadingText = "删除中，请稍后！！！";
          this.$axios
            .post("/banksys/system/staff/delstaffbyid.do", {
              staffIdList: deleteUsersList
            })
            .then(res => {
              this.listLoading = false;
              this.multipleSelection = [];
              if (res.data.code === "1001") {
                this.$message.success(res.data.msg);
                this.getTableData();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              this.listLoading = false;
              this.$message.error("网络异常，请重试！！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 获取点击的行
    handleClickRow(selection, row) {
      this.multipleSelection = selection;
    },
    //确定新增模块
    handleSureAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let prop = {};
          prop = {
            staffNo: AES.encrypt(this.addUserForm.staffNo),
            staffName: AES.encrypt(this.addUserForm.staffName),
            tel: AES.encrypt(this.addUserForm.tel),
            unitCode: this.addUserForm.unitCode,
            deptId: this.addUserForm.deptName,
            postId: this.addUserForm.postName
          };
          this.listLoading = true;
          this.loadingText = "保存中，请稍后！！！";
          this.$axios({
            method: "post",
            url: "/banksys/system/staff/addstaff.do",
            data: prop
          })
            .then(res => {
              this.listLoading = false;
              this.dialogAddUserFormVisible = false;
              if (res.data.code == "1001") {
                this.$message.success(res.data.msg);
                this.getTableData();
                (this.addUserForm.staffNo = ""),
                  (this.addUserForm.staffName = ""),
                  (this.addUserForm.tel = ""),
                  (this.addUserForm.postName = ""),
                  (this.addUserForm.deptName = ""),
                  (this.addUserForm.unitCode = []);
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              this.listLoading = false;
              this.dialogAddUserFormVisible = false;
              this.$message.error("网络异常，请重试！！！");
            });
        } else {
          return false;
        }
      });
    },
    handleAddUser() {
      this.dialogAddUserFormVisible = true;
    },
    handleNoAdd(formName) {
      this.dialogAddUserFormVisible = false;
      this.$refs[formName].resetFields();
      this.deptNameList1 = [];
      this.postNameList = [];
    },
    //确定编辑部分
    handleSureEdit() {
      let prop = {};
      prop = {
        staffNo: AES.encrypt(this.editUserForm.staffNo),
        staffName: AES.encrypt(this.editUserForm.staffName),
        tel: AES.encrypt(this.editUserForm.tel),
        unitCode: this.editUserForm.unitCode,
        deptId: this.editUserForm.deptId,
        postId: this.editUserForm.postId,
        staffId: this.staffId
      };
      this.listLoading = true;
      this.loadingText = "保存中，请稍后！！！";
      this.$axios({
        method: "post",
        url: "/banksys/system/staff/editstaffdata.do",
        data: prop
      })
        .then(res => {
          this.listLoading = false;
          this.dialogEditUserFormVisible = false;
          if (res.data.code == "1001") {
            this.$message.success(res.data.msg);
            this.getTableData();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.listLoading = false;
          this.dialogEditUserFormVisible = false;
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleNoEdit(formName) {
      this.dialogEditUserFormVisible = false;
    },

    handleDelete(id) {
      let prop = {};
      let propData = [];
      propData.push(id);
      prop = {
        staffIdList: propData
      };
      this.$confirm("此操作将删除角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          this.loadingText = "删除中，请稍后！！！";
          this.$axios({
            method: "post",
            url: "/banksys/system/staff/delstaffbyid.do",
            data: prop
          })
            .then(res => {
              this.listLoading = false;
              if (res.data.code === "1001") {
                this.$message.success(res.data.msg);
                this.getTableData();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              this.listLoading = false;
              this.$message.error("网络异常，请重试！！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //页面列表展示
    getTableData() {
      let para = {
        addTime: this.filters.addTime,
        staffNo: this.filters.staffNo,
        staffName: this.filters.staffName,
        unitCodes: this.filters.unitCode,
        tel: this.filters.tel,
        pagenum: this.page,
        rows: this.pageSize
      };
      this.listLoading = true;
      this.loadingText = "拼命加载中";
      this.$axios({
        method: "post",
        url: "/banksys/system/staff/querystafflist.do",
        data: para
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.total = res.data.data.total;
            this.tableData = JSON.parse(AES.decrypt(res.data.data.list));
            this.listLoading = false;
            this.$message.success(res.data.msg);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getTableData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableData();
    }
  }
};
</script>
<style scoped>
.margin-box33 {
  margin-bottom: 10px;
}
.check-button {
  color: #fff;
  background-color: #eb42e2;
  float: right;
}
.check-button:hover {
  opacity: 0.7;
}
.input-box18 {
  width: 460px;
}
.add-style {
  margin-bottom: 20px !important;
}
.cascader-box {
  width: 300px !important;
}
</style>