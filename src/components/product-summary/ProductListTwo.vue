<template>
  <section v-loading="loading" :element-loading-text="loadingText">
    <!--工具条-->
    <el-col :span="24" class="toolbar" v-if="!loading">
      <el-form ref="epireadyRef" :inline="true" :model="filters" style="overflow: hidden;">
        <el-form-item label="客户编码" prop="clientCode">
          <el-input v-model="filters.clientCode" placeholder="请输入客户编码"></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="clientName">
          <el-input v-model="filters.clientName" placeholder="请输入客户编码"></el-input>
        </el-form-item>
        <el-form-item label="分发状态" v-hasPermission="'proQueryTwoHDis'" v-if="showDisCondition">
          <el-select v-model="filters.distributionCode" placeholder="请选择">
            <el-option
              v-for="item in filters.distributionList"
              :key="item.distributionCode"
              :label="item.label"
              :value="item.distributionCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="营销结果">
          <el-select v-model="filters.markStatusCode" placeholder="请选择">
            <el-option
              v-for="item in filters.markStatusList"
              :key="item.markStatusCode"
              :label="item.label"
              :value="item.markStatusCode"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品名称">
          <el-select v-model="filters.productOne" placeholder="请选择">
            <el-option
              v-for="item in productList"
              :key="item.label"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-button type="warning" v-on:click="getUsers" v-hasPermission="'proQueryTwoQuery'">查询</el-button>
        <el-button type="primary" v-on:click="resetData" v-hasPermission="'proQueryTwoQuery'">重置</el-button>
        <!-- </el-form-item> -->
      </el-form>
      <div class="margin-box">
        <el-row>
          <el-upload
            class="upload-box"
            action
            :limit="1"
            ref="upload"
            accept=".xlsx, .xls"
            :show-file-list="false"
            :http-request="uploadFileTwo"
            :on-remove="handleRemove2"
            :file-list="fileTwo"
          >
            <el-button type="primary" v-hasPermission="'proQueryTwoInput'">导入</el-button>
          </el-upload>
          <el-button
            type="success"
            @click="handleOutImport"
            class="margin-box"
            v-hasPermission="'proQueryTwoOutput'"
          >导出</el-button>

          <el-button
            type="danger"
            v-hasPermission="'proQueryTwoHDis'"
            @click="handleDistribution"
            class="margin-box"
          >手动分发</el-button>
          <el-button
            type="info"
            v-hasPermission="'proQueryTwoADis'"
            @click="handleAutoDistribution"
            class="margin-box"
          >自动分发</el-button>
          <el-button
            type="info"
            v-hasPermission="'batchDelProList'"
            @click="handleAllDelete"
            class="margin-box submit_color"
          >批量删除</el-button>
          <el-button
            type="warning"
            v-if="ifShowBtn"
            v-hasPermission="'takebackByPro'"
            @click="handleTakeBack"
            class="margin-box"
          >收回</el-button>
          <el-button
            @click="downFile('clientTemplate')"
            type="info"
            class="margin-box-float"
            v-hasPermission="'proQueryTwoTemplate'"
          >下载客户信息模板</el-button>
        </el-row>
      </div>
      <!-- 批量删除弹框 -->
      <el-dialog
        :visible.sync="dialogAllDelete"
        @close="handleAllNo"
        title="批量删除"
        width="30%"
        center
      >
        <el-form :model="allDeleteForm" ref="allDeleteForm" label-width="80px">
          <el-form-item label="时间点:">
            <el-date-picker
              v-model="allDeleteForm.lendTime"
              type="date"
              @change="handleLendTimeChange"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="产品名称:">
            <el-select v-model="allDeleteForm.productData" multiple placeholder="请选择">
              <el-option
                v-for="item in productDataList"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click.native="handleAllYes">确定</el-button>
          <el-button @click="handleAllNo">取消</el-button>
        </span>
      </el-dialog>
      <!-- 弹出自动分发框 -->
      <el-dialog
        :visible.sync="dialogAutoState"
        @close="handleClose"
        title="自动分发"
        width="30%"
        center
      >
        <el-form :model="distributionAutoForm" ref="distributionAutoForm" label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="反馈余期" prop="marketTime">
                <el-input
                  v-model="distributionAutoForm.marketTime"
                  class="input-box0"
                  @blur="handleBlur($event)"
                ></el-input>个自然日
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click.native="handleAutoYes">确定</el-button>
          <el-button @click="handleAutoNo('distributionAutoForm')">取消</el-button>
        </span>
      </el-dialog>
      <!-- 弹出手动分发框 -->
      <el-dialog
        :visible.sync="dialogDistributionState"
        @close="handleClose"
        title="手动分发"
        width="30%"
        center
      >
        <el-form :model="distributionForm" ref="distributionForm" label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="分发地址:" prop="distributionAddress">
                <el-cascader
                  ref="tree"
                  v-model="distributionForm.distributionAddress"
                  :options="distributionForm.distributionAddressList"
                  :props="defaultData"
                  style="width:100%"
                ></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="unitRank === 0">
            <el-col :span="24">
              <el-form-item label="反馈余期" prop="marketTime">
                <el-input
                  v-model="distributionForm.marketTime"
                  class="input-box0"
                  @blur="handleBlur($event)"
                ></el-input>个自然日
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click.native="handleYes">确定</el-button>
          <el-button @click="handleNo('distributionForm')">取消</el-button>
        </span>
      </el-dialog>
      <!--列表-->
      <el-table
        :data="tableData"
        v-loading="listLoading"
        :element-loading-text="loadingText"
        border
        style="width: 100%;"
        :header-cell-style="styleObj"
        highlight-current-row
        @expand-change="expandChange"
        @select="handleClickRow"
        @select-all="handleClickAllRow"
      >
        <el-table-column type="expand" prop="proDataList">
          <template slot-scope="scope">
            <el-table :data="scope.row.proDataList" align="center" border style="width: 100%">
              <el-table-column prop="number" label="序号" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column prop="productName" label="产品名称" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column prop="markStatus" label="营销结果" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column prop="remark" label="备注" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column prop="unitName" label="提交机构" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column prop="staffName" label="提交员工" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column prop="submitTime" label="提交时间" align="center" show-overflow-tooltip></el-table-column>
              <!-- <el-table-column label="操作" align="center" v-if="ifShow"> -->
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="small"
                    v-if="ifShow"
                    v-hasPermission="'proQueryTwoBack'"
                    @click="handleFeedBack(scope.row.productId)"
                  >反馈</el-button>
                  <el-button
                    type="danger"
                    size="small"
                    v-if="scope.row.isDelStatus ==='0'"
                    v-hasPermission="'delPro'"
                    @click="handleDeleteOne(scope.row.productId,scope.row.clientId)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="number" label="序号" align="center" width="55">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>
        <el-table-column prop="clientCode" label="客户编码" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column
          prop="clientName"
          label="客户名称"
          :width="labelWidth"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="原地址"
          :width="labelWidth"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="editAddress"
          label="修改后地址"
          :width="labelWidth"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column prop="contactTel" label="联系电话" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="contactName" label="联系人" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="label" label="标签" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="disStatusName" label="数据分发状态" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column
          prop="subName"
          label="分发支行名称"
          :width="labelWidth2"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column prop="unitName" label="分发网点名称" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="staffName" label="分发员工姓名" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="操作" align="center" :width="laberWidth2">
          <template slot-scope="scope">
            <el-button
              type="warning"
              v-hasPermission="'proQueryTwoAffirm'"
              v-if="scope.row.affirmStatus =='0'"
              size="small"
              @click="handleAffirm(scope.row.disId)"
            >确定认领</el-button>
            <el-button
              type="danger"
              v-if="scope.row.sendbackStatus === '0'"
              v-hasPermission="'proQueryTwoSend'"
              size="small"
              @click="handleBack(scope.row.clientId,scope.row.disId)"
            >退回</el-button>
            <el-button
              type="success"
              v-if="ifShowBtn"
              v-hasPermission="'editClientDataByProTwo'"
              size="small"
              @click="handleEdit(scope.row.clientId)"
            >编辑</el-button>
            <el-button
              type="primary"
              v-hasPermission="'proQueryTwoDetails'"
              size="small"
              @click="handleDetail(scope.row.clientId)"
              class="submit_color"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑弹框 -->
      <el-dialog :visible.sync="dialogEdit" title="编辑" width="30%" center>
        <el-form :model="editDataForm" ref="editDataForm" label-width="30%" class="el-form-box22">
          <el-form-item label="地址:" prop="markStatus">
            <el-input v-model="editDataForm.editAddress	" type="textarea" class="input-box66"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:" prop="contactTel">
            <el-input v-model="editDataForm.contactTel" class="input-box66"></el-input>
          </el-form-item>
          <el-form-item label="联系人:" prop="contactName">
            <el-input v-model="editDataForm.contactName" class="input-box66"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="success" @click.native="handleYesEdit">提交</el-button>
          <el-button @click="handleNoEdit('addFormRef')">取消</el-button>
        </span>
      </el-dialog>
      <!-- 弹出反馈框 -->
      <el-dialog
        :visible.sync="dialogState"
        title="反馈"
        width="30%"
        center
        @close="handleDialogClose"
      >
        <el-form :model="addForm" ref="addFormRef" label-width="30%" class="el-form-box22">
          <el-form-item label="营销结果:" prop="markStatus">
            <el-select v-model="addForm.markStatus" class="input-box4">
              <el-option
                v-for="(item,index) in this.addForm.markStatusList"
                :label="item.label"
                :value="item.markStatus"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注:" prop="remark">
            <el-input v-model="addForm.remark" type="textarea" class="input-box66"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="success" @click.native="handleSubmit">提交</el-button>
          <el-button @click="handleSubmitNo('addFormRef')">取消</el-button>
        </span>
      </el-dialog>
      <!-- 弹出退回反馈框 -->
      <el-dialog :visible.sync="dialogRejectedState" title="退回" width="30%" center>
        <el-form :model="rejectedForm" label-width="80px">
          <el-form-item label="撤回理由:">
            <el-input
              v-model="rejectedForm.counterReason"
              type="textarea"
              :rows="4"
              class="input-box5"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="success" @click.native="handleRejectedSubmit">提交</el-button>
          <el-button @click="dialogRejectedState = false">取消</el-button>
        </span>
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
        background
      ></el-pagination>
    </el-col>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      expends: [], //默认展开的ID数组
      rejectedForm: {
        counterReason: ""
      },
      dialogRejectedState: false,
      loading: "",
      loadingText: "拼命加载中",
      taxId: "",
      disId: "",
      dialogDistributionState: false,
      showDisCondition: false,
      ifShowButton: true,
      ifShowBtn: false,
      ifShowButtonTwo: false,
      dialogAllDelete: false,
      dialogEdit: false,
      clientId: "",
      editDataForm: {
        editAddress: "",
        contactTel: "",
        contactName: ""
      },
      allDeleteForm: {
        lendTime: "",
        productData: []
      },
      productDataList: [],
      distributionForm: {
        distributionAddress: [],
        distributionAddressList: [],
        marketTime: ""
      },
      dialogAutoState:false,
      distributionAutoForm: {
        marketTime: ""
      },
      defaultData: {
        //联级选择
        leafOnly: true,
        checkStrictly: true,
        value: "unitCode",
        label: "unitName",
        children: "children"
      },
      productList: [],
      filters: {
        productOne: "全部",
        clientCode: "",
        clientName: "",
        addTime: "",
        dataType: "",
        distributionCode: "",
        nodeNameCode: "",
        markStatusCode: "",
        distributionList: [],
        distributionList1: [
          {
            distributionCode: "",
            label: "全部"
          },
          {
            distributionCode: "0",
            label: "分发成功"
          },
          {
            distributionCode: "1",
            label: "分发失败"
          },
          {
            distributionCode: "2",
            label: "未分发"
          },
          {
            distributionCode: "3",
            label: "数据被退回"
          }
        ],
        distributionList2: [
          {
            distributionCode: "",
            label: "全部"
          },
          {
            distributionCode: "0",
            label: "分发成功"
          },
          {
            distributionCode: "1",
            label: "分发失败"
          },
          {
            distributionCode: "2",
            label: "未分发"
          }
        ],
        nodeNameList1: [
          {
            nodeNameCode: "",
            label: "全部"
          },
          {
            nodeNameCode: "1",
            label: "分发到支行"
          },
          {
            nodeNameCode: "2",
            label: "分发到网点"
          },
          {
            nodeNameCode: "3",
            label: "分发到员工"
          },
          {
            nodeNameCode: "999",
            label: "数据被退回"
          }
        ],
        nodeNameList2: [
          {
            nodeNameCode: "",
            label: "全部"
          },
          {
            nodeNameCode: "2",
            label: "分发到网点"
          }
        ],
        nodeNameList3: [
          {
            nodeNameCode: "",
            label: "全部"
          },
          {
            nodeNameCode: "3",
            label: "分发到员工"
          }
        ],
        markStatusList: [
          {
            markStatusCode: "",
            label: "全部"
          },
          {
            markStatusCode: "0",
            label: "未营销"
          },
          {
            markStatusCode: "1",
            label: "营销成功"
          },
          {
            markStatusCode: "2",
            label: "营销失败"
          },
          {
            markStatusCode: "3",
            label: "无法联系到客户"
          },
          {
            markStatusCode: "4",
            label: "待跟踪"
          }
        ]
      },
      unitRank: "",
      labelWidth: "250px",
      labelWidth2: "100px",
      laberWidth2: "250px",
      tableData: [],
      total: 0,
      pageSize: 10,
      propType: "1",
      page: 1,
      disIdList: [],
      ifShowCode: "",
      listLoading: false,
      dialogVisible: false,
      multipleSelection: [],
      checkId: [],

      imputForm: {
        dataType: "0"
      },
      dataTypeList: [
        {
          dataType: "0",
          label: "无效数据"
        },
        {
          dataType: "1",
          label: "营销成功数据"
        },
        {
          dataType: "2",
          label: "存在问题数据"
        }
      ],
      dataTypeListTwo: [
        {
          dataType: "0",
          label: "无效数据"
        },
        {
          dataType: "1",
          label: "营销成功数据"
        }
      ],
      addForm: {
        markStatus: "",
        remark: "",
        markStatusList: [
          {
            markStatus: "1",
            label: "营销成功"
          },
          {
            markStatus: "2",
            label: "营销失败"
          },
          {
            markStatus: "3",
            label: "无法联系到客户"
          },
          {
            markStatus: "4",
            label: "待跟踪"
          }
        ]
      },

      fileTwo: [],
      ifShow: false,
      dialogState: false,
      affirmStatus: "",
      productId: "",
      formData: "",
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },
  created() {
    this.getProductData();
    this.getUsers();
  },
  watch: {},
  mounted() {
    // this.getUsers();
    this.getIfShowBtn();
    this.getFeedBackCode();
    this.getEnterpriseCode();
    this.getactualOperationCode();
    this.handleDistributionAddress();
  },
  methods: {
    // 单条编辑
    handleEdit(clientId) {
      this.clientId = clientId;
      this.$axios
        .post("/banksys/productsend/queryclientdetails.do", {
          clientId: this.clientId
        })
        .then(res => {
          console.log(res);
          this.dialogEdit = true;
          this.editDataForm = res.data.data;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleYesEdit() {
      this.$axios
        .post("banksys/productsend/editclientdata.do", {
          clientId: this.clientId,
          editAddress: this.editDataForm.editAddress,
          contactTel: this.editDataForm.contactTel,
          contactName: this.editDataForm.contactName
        })
        .then(res => {
          this.dialogEdit = false;
          this.getUsers();
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleNoEdit() {
      this.dialogEdit = false;
    },
    //批量删除
    handleAllDelete() {
      this.dialogAllDelete = true;
    },
    handleLendTimeChange() {
      (this.allDeleteForm.productData = []),
        this.$axios
          .post("/banksys/productsend/queryproductlistbydate.do", {
            lendTime: this.allDeleteForm.lendTime
          })
          .then(res => {
            console.log(res);
            if (res.data.code === "1001") {
              this.productDataList = res.data.data;
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error("网络异常，请重试！！！");
          });
    },
    handleAllYes() {
      this.loading = true;
      this.loadingText = "删除中，请稍后！！！";
      this.$axios
        .post("/banksys/productsend/delproductlistbydate.do", {
          lendTime: this.allDeleteForm.lendTime,
          productNameList: this.allDeleteForm.productData
        })
        .then(res => {
          this.loading = false;
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.dialogAllDelete = false;
            this.allDeleteForm.lendTime = "";
            this.allDeleteForm.productData = [];
            this.productDataList = [];
            this.getUsers();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleAllNo() {
      this.dialogAllDelete = false;
      this.allDeleteForm.lendTime = "";
      this.allDeleteForm.productData = [];
    },
    handleDeleteOne(productId, clientId) {
      this.loading = true;
      this.loadingText = "删除中，请稍后！！！";
      this.$axios
        .post("/banksys/productsend/delproduct.do", {
          productId: productId,
          clientId: clientId
        })
        .then(res => {
          this.loading = false;
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.getUsers();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    // 获取产品名称条件
    getProductData() {
      this.$axios
        .post("/banksys/productsend/queryproductnamelist.do", { flag: "y" })
        .then(res => {
          console.log(res);
          this.productList = res.data.list;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleTakeBack() {
      if (this.multipleSelection.length == 0) {
        this.$message.error("请选择回收项！");
      } else {
        axios
          .post("/banksys/productsend/takebackclientdata.do", {
            clientDataList: this.multipleSelection
          })
          .then(res => {
            if (res.data.code == "1001") {
              this.getUsers();
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error("网络异常，请重试！！！");
          });
      }
    },
    getIfShow() {
      if (
        sessionStorage.getItem("unitRank") == "2" &&
        this.affirmStatus == "1"
      ) {
        this.ifShow = true;
      } else {
        this.ifShow = false;
      }
    },
    getIfShowBtn() {
      if (sessionStorage.getItem("unitRank") == "1") {
        this.ifShowBtn = true;
      }
    },
    expandChange(row) {
      this.affirmStatus = row.affirmStatus;
      this.getIfShow();
    },
    // 自动分发
    handleAutoDistribution() {
      this.dialogAutoState = true;
    },
    // 确认提交反馈
    handleRejectedSubmit() {
      let req = {};
      req = {
        disId: this.disId,
        taxId: this.taxId,
        counterReason: this.rejectedForm.counterReason
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/busimarket/countertaxdata.do"
      })
        .then(res => {
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.dialogRejectedState = false;
            this.$router.push({ path: "/ProductList" });
          } else {
            this.$message.error(res.data.msg);
            this.dialogRejectedState = false;
          }
          this.$refs.rejectedForm.resetFields();
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleBack(clientId, disId) {
      this.$confirm("是否确定退回该数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/banksys/productsend/sendbackclientdata.do", {
              clientId: clientId,
              disId: disId
            })
            .then(res => {
              if (res.data.code === "1001") {
                this.$message.success(res.data.msg);
                this.getUsers();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },

    handleAffirm(disId) {
      this.$confirm("是否确定认领?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/banksys/productsend/affirmclientdata.do", { disId: disId })
            .then(res => {
              if (res.data.code === "1001") {
                this.$message.success(res.data.msg);
                this.getUsers();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 取消反馈提交
    handleSubmitNo(formName) {
      this.dialogState = false;
      this.$refs[formName].resetFields();
    },
    handleDialogClose() {
      this.dialogState = false;
      this.$refs.addFormRef.resetFields();
    },
    //提交
    handleSubmit() {
      let req = {};
      req = {
        productId: this.productId,
        markStatus: this.addForm.markStatus,
        remark: this.addForm.remark
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/productsend/feedbackproductdata.do"
      })
        .then(res => {
          console.log(res);
          if (res.data.code == "1001") {
            this.dialogState = false;
            this.$message.success(res.data.msg);
            this.getUsers();
          } else {
            this.dialogState = false;
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    // 获取反馈内容
    getFeedBackCode() {
      let prop = {};
      prop = {
        codeTypes: "cus_feedback",
        needAll: "1"
      };
      axios({
        method: "post",
        data: prop,
        url: "/banksys/system/common/querycode.do"
      })
        .then(res => {
          this.addForm.backDetailsList = res.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 反馈按钮
    handleFeedBack(productId) {
      this.productId = productId;
      // this.propType = propType;
      //   this.taxId = taxId;
      //   this.disId = disId;
      this.dialogState = true;
    },
    //下载模板功能
    downFile(code) {
      this.loading = true;
      this.loadingText = "下载中，请稍后！！！";
      let req;
      req = {
        templateName: code
      };
      axios({
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
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$messgae.error("网络异常，请稍后重试！！！");
        });
    },
    //手动分发弹框输入是正整数
    handleBlur(e) {
      let boolean = new RegExp("^[1-9][0-9]*$").test(e.target.value);
      if (!boolean) {
        this.$message.warning("请输入正整数");
        e.target.value = "";
        this.distributionForm.marketTime = "";
      }
    },

    // 分发地址获取
    handleDistributionAddress() {
      axios
        .post("/banksys/productsend/querydisaddresslist.do", {})
        .then(res => {
          this.distributionForm.distributionAddressList = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 确定分发
    handleYes() {
      this.loading = true;
      this.loadingText = "分发中，请稍后！！！";
      let req = {};
      req = {
        clientIdList: this.disIdList,
        selectCode: this.distributionForm.distributionAddress,
        marketTime: Number(this.distributionForm.marketTime)
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/productsend/handdisclientdata.do"
      })
        .then(res => {
          this.loading = false;
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.disIdList = [];
            this.multipleSelection = [];
            this.distributionForm.distributionAddress = "";
            this.getUsers();
            this.dialogDistributionState = false;
          } else {
            this.$message.error(res.data.msg);
            this.dialogDistributionState = false;
            this.disIdList = [];
            this.multipleSelection = [];
            this.distributionForm.distributionAddress = "";
          }
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    // 取消分发
    handleNo(formName) {
      this.dialogDistributionState = false;
      this.$refs[formName].resetFields();
      this.disIdList = [];
    },
    // 确定自动分发
    handleAutoYes() {
      this.loading = true;
      this.loadingText = "自动分发中，请稍后！！！";
      let req = {};
      req = {
        marketTime: Number(this.distributionAutoForm.marketTime)
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/productsend/autodisclientdata.do"
      })
        .then(res => {
          
          if (res.data.code === "1001") {
            this.loading = false;
            this.$message.success(res.data.msg);
            this.getUsers();
            this.dialogAutoState = false;
          } else {
            this.loading = false;
            this.$message.error(res.data.msg);
            this.getUsers();
            this.dialogAutoState = false;
            this.distributionAutoForm.marketTime = "";
          }
        })
        .catch(err => {
          this.loading = false;
          this.dialogAutoState = false;
           this.$message.error('网络异常，请重试！！！')
        });
    },
    handleAutoNo(formName) {
      this.dialogAutoState = false;
      this.$refs[formName].resetFields();
    },
    // 分发处理拿到的各项的taxId
    handleDistribution() {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        var taxId = this.multipleSelection[i].clientId;
        this.disIdList.push(taxId);
      }
      if (this.disIdList.length == 0) {
        this.$message.error("请选择需分发的客户！");
        return;
      }
      this.dialogDistributionState = true;
    },
    // 导入文件
    uploadFileTwo(ele) {
      this.formData = new FormData();
      this.formData.append("file", ele.file);
      this.loading = true;
      this.loadingText = "导入中，请稍后！！！";
      axios({
        method: "post",
        data: this.formData,
        url: "/banksys/productsend/leadclientproductdata.do",
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(res => {
          this.loading = false;
          if (res.data.code == "1001") {
            this.$message.success(res.data.msg);
            this.formData = "";
            this.dialogVisible = false;
            this.getUsers();
          } else {
            this.$message.error(res.data.msg);
            this.formData = "";
            this.dialogVisible = false;
          }
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },

    // 获取点击的行
    handleClickRow(selection, row) {
      this.multipleSelection = selection;
    },
    handleClickAllRow(selection) {
      this.multipleSelection = selection;
    },
    // 取消
    handleCance() {
      this.dialogVisible = false;
      this.imputForm.dataType = "0";
      this.fileTwo = [];
    },
    handleClose() {
      this.fileTwo = [];
    },
    handleRemove2(file, fileList) {
      this.formData.set("file", "");
      this.fileTwo = [];
    },
    // 导出
    handleOutImport() {
      this.loading = true;
      this.loadingText = "导出中，请稍后！！！";
      let sef = this;
      let req = {};
      for (var i = 0; i < this.multipleSelection.length; i++) {
        var taxId = this.multipleSelection[i].clientId;
        this.checkId.push(taxId);
      }
      req = {
        clientIdList: this.checkId,
        clientCode: this.filters.clientCode,
        clientName: this.filters.clientName,
        markStatusCode: this.filters.markStatusCode,
        disStatusCode: this.filters.distributionCode,
        productName: this.filters.productOne
      };
      axios({
        method: "post",
        data: req,
        url: "/banksys/productsend/exportclientandproList.do",
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
          this.loading = false;
          this.checkId = [];
          this.multipleSelection = [];
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },

    // 实际经营地址条件
    getactualOperationCode() {
      axios({
        method: "post",
        data: "",
        url: "/banksys/datadistribute/queryrunaddresslist.do"
      })
        .then(res => {
          this.filters.actualOperationList = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 企业类型条件
    getEnterpriseCode() {
      let prop = {};
      prop = {
        codeTypes: "firm_type",
        needAll: "1"
      };
      axios({
        method: "post",
        data: prop,
        url: "/banksys/system/common/querycode.do"
      })
        .then(res => {
          this.filters.queryConTradingList = res.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //重置查询条件
    resetData() {
      this.filters.clientCode = "";
      this.filters.clientName = "";
      this.filters.distributionCode = "";
      this.filters.markStatusCode = "";
      this.filters.productOne = "全部";
    },
    //获取用户列表
    getUsers() {
      this.loading = true;
      this.loadingText = "拼命加载中";
      let para = {
        pagenum: this.page,
        rows: this.pageSize,
        clientCode: this.filters.clientCode,
        clientName: this.filters.clientName,
        markStatusCode: this.filters.markStatusCode,
        disStatusCode: this.filters.distributionCode,
        productName: this.filters.productOne
      };
      axios({
        method: "post",
        url: "/banksys/productsend/queryclientandprolist.do",
        data: para
      })
        .then(res => {
          this.loading = false;
          if (res.data.code === "1001") {
            if (res.data.unitRank === 0) {
              this.ifShowButtonTwo = true;
            } else if (res.data.unitRank === 2) {
              this.ifShowButton = false;
            }
            if (res.data.unitRank === 0 || res.data.unitRank === 1) {
              this.showDisCondition = true;
              this.filters.distributionList = this.filters.distributionList1;
            } else if (res.data.unitRank === 2) {
              this.showDisCondition = true;
              this.filters.distributionList = this.filters.distributionList2;
            } else {
              this.showDisCondition = false;
            }
            this.$message.success(res.data.msg);
            this.total = res.data.data.total;
            this.tableData = res.data.data.list;
            this.unitRank = res.data.unitRank;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message.error("网络异常，请重试！！！");
        });
    },
    // 详情
    handleDetail(clientId) {
      this.$router.push({
        path: "/ProductListDetailTwo",
        query: { clientId: clientId, codeType: "0" }
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUsers();
    }
  }
};
</script>

<style  scoped>
.input-box66 {
  width: 300px !important;
}
.el-input {
  width: 300px !important;
}
.set-up {
  margin-left: 50px;
}
.el-table td,
.el-table th.is-leaf,
.el-table--border,
.el-table--group {
  border-color: #dbdbdb;
}
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: #dbdbdb;
}
.el-form-item__label {
  width: 124px !important;
  font-size: 12px !important;
}
/* .el-form-item {
  float: left;
} */
.imput-box {
  text-align: center;
}
.submit_color {
  background-color: #858ffd;
  border-color: #858ffd;
}
.submit_color:hover {
  background-color: #a6acef;
  border-color: #a6acef;
}
.exportexcel_button {
  background-color: #7a94fd;
  color: white;
  border-color: #7a94fd;
}
.upload-box {
  display: inline;
}
</style>
