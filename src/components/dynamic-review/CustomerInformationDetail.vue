<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="success" @click="handleSwitch1">人行账户信息</el-button>
      <el-button type="danger" @click="handleSwitch2">新一代客户数据</el-button>
      <el-button type="primary" @click="handleSwitch3">工商数据</el-button>
      <!-- 三个详情表格切换 -->
      <div class="v_add" v-show="this.switchCode == '1'">
        <p>人行账户信息详情</p>
        <!-- <el-form :model="saveMoneyForm"> -->
        <table style="width: 100%" border="1">
          <tr>
            <td class="bg_color">账号:</td>
            <td>
              <el-input v-model="saveMoneyForm.accountNum" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">币别:</td>
            <td>
              <el-input v-model="saveMoneyForm.currenct" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">账户名称:</td>
            <td>
              <el-input v-model="saveMoneyForm.accountName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">账户性质:</td>
            <td>
              <el-input v-model="saveMoneyForm.accountNature" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">开户许可证号:</td>
            <td>
              <el-input v-model="saveMoneyForm.openAccNum" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">开户日期:</td>
            <td>
              <el-input v-model="saveMoneyForm.openAccDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">销户日期:</td>
            <td>
              <el-input v-model="saveMoneyForm.closeAccDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">睡眠状态:</td>
            <td>
              <el-input v-model="saveMoneyForm.sleepStatus" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">睡眠设置日期:</td>
            <td>
              <el-input v-model="saveMoneyForm.sleepDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">开户行:</td>
            <td>
              <el-input v-model="saveMoneyForm.openAccBank" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">地址:</td>
            <td>
              <el-input v-model="saveMoneyForm.address" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">资金用途:</td>
            <td>
              <el-input v-model="saveMoneyForm.useFund" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">账户终止状态:</td>
            <td>
              <el-input v-model="saveMoneyForm.accEndStatus" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">银行机构代码:</td>
            <td>
              <el-input v-model="saveMoneyForm.bankCode" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">银行机构名称:</td>
            <td>
              <el-input v-model="saveMoneyForm.bankName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">存款人名称:</td>
            <td>
              <el-input v-model="saveMoneyForm.depositorName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">存款人类别:</td>
            <td>
              <el-input v-model="saveMoneyForm.depositorType" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">注册地区代码:</td>
            <td>
              <el-input v-model="saveMoneyForm.redionCode" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">组织机构代码:</td>
            <td>
              <el-input v-model="saveMoneyForm.orgInsCode" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">工商营业执照:</td>
            <td>
              <el-input v-model="saveMoneyForm.busiLicense" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">法定代表人或负责人姓名:</td>
            <td>
              <el-input v-model="saveMoneyForm.legalName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">证件类型:</td>
            <td>
              <el-input v-model="saveMoneyForm.papersType" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">证件号码:</td>
            <td>
              <el-input v-model="saveMoneyForm.papersNumber" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">产业分类:</td>
            <td>
              <el-input v-model="saveMoneyForm.industryType" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">行业归属:</td>
            <td>
              <el-input v-model="saveMoneyForm.industryVest" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">国税登记证号:</td>
            <td>
              <el-input v-model="saveMoneyForm.irsNumber" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">地税登记证号:</td>
            <td>
              <el-input v-model="saveMoneyForm.landNumber" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">无需办理税务登记的证明文件编号:</td>
            <td>
              <el-input v-model="saveMoneyForm.notaxNumber" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">注册资金金额:</td>
            <td>
              <el-input v-model="saveMoneyForm.regCapitalTotal" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">经营范围:</td>
            <td>
              <el-input type="textarea" :rows="4" v-model="saveMoneyForm.busiScope" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">邮政编码:</td>
            <td>
              <el-input v-model="saveMoneyForm.postalCode" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">联系电话:</td>
            <td>
              <el-input v-model="saveMoneyForm.phone" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">存款人上级法人或主管单位名称:</td>
            <td>
              <el-input v-model="saveMoneyForm.superLegalName" readonly></el-input>
            </td>
          </tr>
          <!-- <tr>
            <td class="bg_color">不合格内容:</td>
            <td>
              <el-tag
                v-for="tag in tags"
                :key="tag.checkDetailsCode"
                type="danger"
                :title="tag.noPassReason"
              >{{tag.checkDetailsName}}</el-tag>
            </td>
          </tr> -->
        </table>

        <!-- </el-form> -->
      </div>
      <div class="v_add" v-show="this.switchCode == '2'">
        <p>新一代客户数据详情</p>
        <!-- <el-form :model="newForm"> -->
        <table style="width: 100%" border="1">
          <tr>
            <td class="bg_color">账号:</td>
            <td>
              <el-input v-model="newForm.accountNum" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">币别:</td>
            <td>
              <el-input v-model="newForm.currenct" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">账户名称:</td>
            <td>
              <el-input v-model="newForm.accountName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">账户性质:</td>
            <td>
              <el-input v-model="newForm.accountNature" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">开户许可证号:</td>
            <td>
              <el-input v-model="newForm.openAccNum" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">开户日期:</td>
            <td>
              <el-input v-model="newForm.openAccDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">销户日期:</td>
            <td>
              <el-input v-model="newForm.closeAccDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">睡眠状态:</td>
            <td>
              <el-input v-model="newForm.sleepStatus" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">睡眠设置日期:</td>
            <td>
              <el-input v-model="newForm.sleepDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">开户行:</td>
            <td>
              <el-input v-model="newForm.openAccBank" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">地址:</td>
            <td>
              <el-input v-model="newForm.address" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">资金用途:</td>
            <td>
              <el-input v-model="newForm.useFund" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">账户终止状态:</td>
            <td>
              <el-input v-model="newForm.accEndStatus" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">银行机构代码:</td>
            <td>
              <el-input v-model="newForm.bankCode" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">银行机构名称:</td>
            <td>
              <el-input v-model="newForm.bankName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">存款人名称:</td>
            <td>
              <el-input v-model="newForm.depositorName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">存款人类别:</td>
            <td>
              <el-input v-model="newForm.depositorType" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">注册地区代码:</td>
            <td>
              <el-input v-model="newForm.redionCode" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">组织机构代码:</td>
            <td>
              <el-input v-model="newForm.orgInsCode" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">工商营业执照:</td>
            <td>
              <el-input v-model="newForm.busiLicense" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">法定代表人或负责人姓名:</td>
            <td>
              <el-input v-model="newForm.legalName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">证件类型:</td>
            <td>
              <el-input v-model="newForm.papersType" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">证件号码:</td>
            <td>
              <el-input v-model="newForm.papersNumber" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">产业分类:</td>
            <td>
              <el-input v-model="newForm.industryType" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">行业归属:</td>
            <td>
              <el-input v-model="newForm.industryVest" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">国税登记证号:</td>
            <td>
              <el-input v-model="newForm.irsNumber" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">地税登记证号:</td>
            <td>
              <el-input v-model="newForm.landNumber" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">无需办理税务登记的证明文件编号:</td>
            <td>
              <el-input v-model="newForm.notaxNumber" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">注册资金金额:</td>
            <td>
              <el-input v-model="newForm.regCapitalTotal" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">经营范围:</td>
            <td>
              <el-input type="textarea" :rows="4" v-model="newForm.busiScope" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">邮政编码:</td>
            <td>
              <el-input v-model="newForm.postalCode" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">联系电话:</td>
            <td>
              <el-input v-model="newForm.phone" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">存款人上级法人或主管单位名称:</td>
            <td>
              <el-input v-model="newForm.superLegalName" readonly></el-input>
            </td>
          </tr>
          <!-- <tr>
            <td class="bg_color">不合格内容:</td>
            <td>
              <el-tag
                v-for="tag in tags"
                :key="tag.checkDetailsCode"
                type="danger"
                :title="tag.noPassReason"
              >{{tag.checkDetailsName}}</el-tag>
            </td>
          </tr> -->
        </table>

        <!-- </el-form> -->
      </div>
      <div class="v_add" v-show="this.switchCode == '3'">
        <p>工商数据详情</p>
        <!-- <el-form :model="saveMoneyForm"> -->
        <table style="width: 100%" border="1">
          <tr>
            <td class="bg_color">企业名称:</td>
            <td>
              <el-input v-model="busForm.firmName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">统一社会信用代码:</td>
            <td>
              <el-input v-model="busForm.creditCode" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">旧营业执照号码：</td>
            <td>
              <el-input v-model="busForm.oldBusiNum" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">法定代表人姓名：</td>
            <td>
              <el-input v-model="busForm.legalName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">法定代表人证件类型：</td>
            <td>
              <el-input v-model="busForm.legalIdType" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">法定代表人证件号码：</td>
            <td>
              <el-input v-model="busForm.legalIdNum" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">法定代表人证件有效期：</td>
            <td>
              <el-input v-model="busForm.legalIdDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">组织实收资本金额：</td>
            <td>
              <el-input v-model="busForm.orgAmount" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">注册资金金额：</td>
            <td>
              <el-input v-model="busForm.regAmount" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">注册资金币种代码：</td>
            <td>
              <el-input v-model="busForm.regCurCode" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">经营状态代码：</td>
            <td>
              <el-input v-model="busForm.opeStatusCode" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">组织性质代码：</td>
            <td>
              <el-input v-model="busForm.orgNatureCode" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">组织成立日期：</td>
            <td>
              <el-input v-model="busForm.orgSetDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">经营期限起始日期：</td>
            <td>
              <el-input v-model="busForm.busiStartDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">经营期限结束日期：</td>
            <td>
              <el-input v-model="busForm.busiEndDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">注册地址:</td>
            <td>
              <span style="font-size: 14px;color: #606266;">{{busForm.regAddress}}</span>
            </td>
          </tr>
          <tr>
            <td class="bg_color">实际经营地址：</td>
            <td>
              <span style="font-size: 14px;color: #606266;">{{busForm.busiAddress}}</span>
            </td>
          </tr>
          <tr>
            <td class="bg_color">经营范围：</td>
            <td>
              <span style="font-size: 14px;color: #606266;">{{busForm.busiScope}}</span>
            </td>
          </tr>
          <tr>
            <td class="bg_color">注销日期：</td>
            <td>
              <el-input v-model="busForm.outDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">吊销日期：</td>
            <td>
              <el-input v-model="busForm.revDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">股东姓名：</td>
            <td>
              <el-input v-model="busForm.shareName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">股东证件类型：</td>
            <td>
              <el-input v-model="busForm.shareIdType" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">股东证件号码：</td>
            <td>
              <el-input v-model="busForm.shareIdNum" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">股东证件有效期：</td>
            <td>
              <el-input v-model="busForm.shareIdDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">实际控制人姓名：</td>
            <td>
              <el-input v-model="busForm.controName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">实际控制人证件类型：</td>
            <td>
              <el-input v-model="busForm.controIdType" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">实际控制人证件号码：</td>
            <td>
              <el-input v-model="busForm.controIdNum" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">实际控制人证件有效期：</td>
            <td>
              <el-input v-model="busForm.controIdDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">收益所有人姓名：</td>
            <td>
              <el-input v-model="busForm.ownerName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">收益所有人证件类型：</td>
            <td>
              <el-input v-model="busForm.ownerIdType" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">收益所有人证件号码：</td>
            <td>
              <el-input v-model="busForm.ownerIdNum" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">收益所有人证件有效期：</td>
            <td>
              <el-input v-model="busForm.ownerIdDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">收益所有人地址：</td>
            <td>
              <span style="font-size: 14px;color: #606266;">{{busForm.ownerAddress}}</span>
            </td>
          </tr>
          <tr>
            <td class="bg_color">异常名录信息：</td>
            <td>
              <span style="font-size: 14px;color: #606266;">{{busForm.exceptionList}}</span>
            </td>
          </tr>
          <tr>
            <td class="bg_color">永久异常名录信息：</td>
            <td>
              <span style="font-size: 14px;color: #606266;">{{busForm.perExceptionList}}</span>
            </td>
          </tr>
          <tr>
            <td class="bg_color">被执行人行为描述：</td>
            <td>
              <span style="font-size: 14px;color: #606266;">{{busForm.enforBehavior}}</span>
            </td>
          </tr>
          <tr>
            <td class="bg_color">行政处罚结果代码：</td>
            <td>
              <el-input v-model="busForm.resultCode" readonly></el-input>
            </td>
          </tr>
          <!-- <tr>
            <td class="bg_color">不合格内容:</td>
            <td>
              <el-tag
                v-for="tag in tags"
                :key="tag.checkDetailsCode"
                type="danger"
                :title="tag.noPassReason"
              >{{tag.checkDetailsName}}</el-tag>
            </td>
          </tr> -->
        </table>
        <!-- </el-form> -->
      </div>

      <el-row>
        <el-button @click="backtrack">返回</el-button>
        <!-- <el-button
          type="warning"
          v-hasPermission="'accInforYearlyRecord'"
          v-if="ShowDistributionCode === 2 && DistributionCode !== ''"
          @click="dialogNewFormVisible = true"
        >新增年检记录</el-button>-->
        <el-button
          type="warning"
          v-hasPermission="'accInforYearlyRecord'"
          @click="dialogNewFormVisible = true"
        >新增记录</el-button>
      </el-row>

      <!-- 新增年检弹框 -->
      <el-dialog
        title="新增年检记录"
        :visible.sync="dialogNewFormVisible"
        @close="handleNewFormClosed"
        width="35%"
        center
      >
        <el-form
          :model="newCheckForm"
          ref="newCheckForm"
          :rules="newCheckFormRules"
          :label-width="labelWidth"
        >
          <el-form-item label="复核内容：" prop="checkOne">
            <el-select v-model="newCheckForm.checkOne" placeholder="请选择年检内容">
              <el-option
                v-for="item in newCheckForm.yearCheckList"
                :key="item.fieldDisId"
                :label="item.backAccField"
                :value="item.fieldDisId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="复核结果：" prop="checkResult">
            <el-select v-model="newCheckForm.checkResult" placeholder="请选择年检结果">
              <el-option
                v-for="item in newCheckForm.yearCheckResultList"
                :key="item.checkResult"
                :label="item.label"
                :value="item.checkResult"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="采取措施：" prop="takeSteps">
            <el-select v-model="newCheckForm.takeSteps" placeholder="请选择采取措施">
              <el-option
                v-for="item in takeStepsList"
                :key="item.code"
                :label="item.codeName"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="不合格原因：" prop="noPassReason">
            <el-input
              v-model="newCheckForm.noPassReason"
              class="input-box4"
              type="textarea"
              :rows="2"
            ></el-input>
          </el-form-item>
          <el-form-item label="人行账户信息：" prop="peopleAccData">
            <el-input
              v-model="newCheckForm.peopleAccData "
              class="input-box4"
              type="textarea"
              :rows="2"
            ></el-input>
          </el-form-item>
          <el-form-item label="新一代客户数据：" prop="newGenData">
            <el-input
              v-model="newCheckForm.newGenData"
              class="input-box4"
              type="textarea"
              :rows="2"
            ></el-input>
          </el-form-item>
          <el-form-item label="工商数据：" prop="busiData">
            <el-input v-model="newCheckForm.busiData" class="input-box4" type="textarea" :rows="2"></el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="remark">
            <el-input v-model="newCheckForm.remark" class="input-box4" type="textarea" :rows="2"></el-input>
          </el-form-item>
          <el-form-item label="添加附件：" prop="fileList">
            <el-upload
              :multiple="true"
              action
              ref="uploadFiles"
              :on-change="handleImport"
              :http-request="uploadFile"
              :file-list="newCheckForm.fileList"
              :on-remove="handleRemove"
            >
              <el-button v-loading.body.lock="fullscreenNewLoading">添加</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleNo('newCheckForm')">取 消</el-button>
          <el-button type="primary" @click="handleYes('newCheckForm')">确 定</el-button>
        </div>
      </el-dialog>

      <!--列表-->
      <div class="v_add2">
        <h5 class="h5-box">年检表</h5>
        <el-button type="danger" v-hasPermission="'bulkImportReason'" @click="handlePut()" class="h6-box" size="small">导入</el-button>
        <el-table
          :data="tableData"
          v-loading="listLoading"
          border
          style="width: 100%;"
          :header-cell-style="styleObj"
          highlight-current-row
          @select="handleClickRow"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="number" label="序号" align="center" width="55"></el-table-column>
          <el-table-column prop="detecData" label="复核内容" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="isPass" label="复核最终结果" align="center" show-overflow-tooltip>
            <!-- <template slot-scope="scope">
              <span v-if="scope.row.isPass ==='0'">
                <img src="../../assets/01.png" title="合格" />
              </span>
              <span v-if="scope.row.isPass ==='1'">
                <img src="../../assets/02.png" title="不合格" />
              </span>
              <span v-if="scope.row.isPass ===''">
                <img src="../../assets/03.png" title="未年检" />
              </span>
            </template>-->
          </el-table-column>
          <el-table-column prop="result" label="复核过程结果" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="noPassReason" label="不合格原因" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="remark" label="备注" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="detectionType" label="年检类型" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="takeSteps" label="采取措施" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="unitName" label="提交机构" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="accStaffName" label="账户专管员" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="staffName" label="动态复核经办员" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="feedbackTime" label="反馈时间" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click="handleDetail(scope.row.fieldDisId)"
                class="submit_color"
              >详情</el-button>
            </template>
          </el-table-column>
        </el-table>
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
      </div>
      <!-- 列表详情弹框 -->
      <el-dialog title="年检记录详情" :visible.sync="dialogTableDetailVisible" width="30%" center>
        <el-form :model="newCheckDetailForm" :label-width="labelWidth">
          <el-form-item label="复核过程结果">
            <el-input v-model="newCheckDetailForm.result" class="input-box4" readonly></el-input>
          </el-form-item>
          <el-form-item label="不合格原因">
            <el-input v-model="newCheckDetailForm.noPassReason" class="input-box4" readonly></el-input>
          </el-form-item>
          <el-form-item label="人行账户信息：">
            <el-input
              v-model="newCheckDetailForm.peopleAccData"
              type="textarea"
              :rows="2"
              class="input-box4"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="新一代客户数据：">
            <el-input
              v-model="newCheckDetailForm.newGenData"
              type="textarea"
              :rows="2"
              class="input-box4"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="工商数据：">
            <el-input
              v-model="newCheckDetailForm.busiData"
              type="textarea"
              :rows="2"
              class="input-box4"
              readonly
            ></el-input>
          </el-form-item>
         <el-form-item label="备注">
            <el-input v-model="newCheckDetailForm.remark" class="input-box4" readonly></el-input>
          </el-form-item>
         <el-form-item label="年检类型">
            <el-input v-model="newCheckDetailForm.detectionType" class="input-box4" readonly></el-input>
          </el-form-item>
         <el-form-item label="采取措施">
            <el-input v-model="newCheckDetailForm.takeSteps" class="input-box4" readonly></el-input>
          </el-form-item>
         <el-form-item label="提交机构">
            <el-input v-model="newCheckDetailForm.unitName" class="input-box4" readonly></el-input>
          </el-form-item>
         <el-form-item label="账户专管员">
            <el-input v-model="newCheckDetailForm.accStaffName" class="input-box4" readonly></el-input>
          </el-form-item>
         <el-form-item label="动态复核经办员">
            <el-input v-model="newCheckDetailForm.staffName" class="input-box4" readonly></el-input>
          </el-form-item>
         <el-form-item label="反馈时间">
            <el-input v-model="newCheckDetailForm.feedbackTime" class="input-box4" readonly></el-input>
          </el-form-item>
          
        
          <el-form-item label="附件列表：">
            <el-upload
              action
              disabled
              :on-preview="handlePreview"
              :file-list="newCheckDetailForm.attachmentList"
            ></el-upload>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-col>
  </section>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      labelWidth: "140px",
      fd: new FormData(),
      tags: [],
      ShowDistributionCode: "",
      DistributionCode: "",
      switchCode: "1",
      newForm: {},
      busForm: {},
      saveMoneyForm: {},
      gridData: [],
      takeStepsList: [],
      newCheckDetailForm: {},
      newCheckForm: {
        checkOne: "",
        takeSteps: "",
        checkResult: "",
        noPassReason: "",
        peopleAccData: "",
        newGenData: "",
        busiData: "",
        remark: "",
        yearCheckList: [],
        fileList: [],
        yearCheckResultList: [
          {
            checkResult: "0",
            label: "合格"
          },
          {
            checkResult: "1",
            label: "不合格"
          }
        ]
      },
      newCheckFormRules: {
        checkOne: [
          { required: true, message: "请选择年检内容", trigger: "change" }
        ],
        checkResult: [
          { required: true, message: "请选择年检结果", trigger: "change" }
        ]
      },
      // depositorId: "",
      dynamicrevAccId: "",
      multipleSelection: [],
      dataObj:{},
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10,
      listLoading: false,
      ifShowDistribution: false,
      dialogNewFormVisible: false,
      fullscreenNewLoading: false,
      dialogTableDetailVisible: false,
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },
  created() {
    this.dynamicrevAccId = this.$route.query.dynamicrevAccId;
    // this.depositorId = this.$route.query.newGenId;
    this.depositorName = this.$route.query.depositorName;
    this.handleContent();
    this.getTableDate();
    this.takeStepsListData();
    this.yearCheckListData();
  },
  methods: {
    handlePut() {
      let propData = this.multipleSelection;
      let dpropDataList = [];
      for (var i in propData) {
        dpropDataList.push(propData[i].fieldDisId);
      }
      if(dpropDataList.length == 0){
        this.$message.error("请选择要导出项！！")
        return
      }
      this.$confirm("确定导出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/banksys/dynamicrev/bulkimportreason.do", {
              dynamicrevAccId: this.dynamicrevAccId,
              operateType: "8",
              fieldDisIdList: dpropDataList,
              data:this.dataObj
            })
            .then(res => {
              if(res.data.code == '1001'){
                this.$message.success(res.data.msg)
              } else{
                this.$message.error(res.data.msg)
              }
            })
            .catch(err => {
              this.$message.error("网络异常，请重试！！！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 获取点击的行
    handleClickRow(selection, row) {
      this.multipleSelection = selection;
    },
    // 新增核查记录中核查内容数据
    yearCheckListData() {
      this.$axios
        .post("/banksys/dynamicrev/querybackaccfieldlist.do", {
          dynamicrevAccId: this.dynamicrevAccId,
          pageType: "8"
        })
        .then(res => {
          console.log(res);
          this.newCheckForm.yearCheckList = res.data.list;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    // 获取采取措施下拉数据
    takeStepsListData() {
      this.$axios
        .post("/banksys/system/common/querycode.do", {
          codeTypes: "take_steps"
        })
        .then(res => {
          this.takeStepsList = res.data.list;
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    // 详情文件展示点击下载相应文件
    handlePreview(file) {
      let prop = {};
      prop = { attachmentId: file.attachmentId };
      this.$axios({
        method: "post",
        data: prop,
        url: "/banksys/acccontrast/downloadattachment.do",
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
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    // 导入文件时将文件存入数组中

    handleImport(file, fileList) {
      // this.newCheckForm.fileList = fileList
      // console.log(this.newCheckForm.fileList)
    },
    handleNo(formName) {
      this.dialogNewFormVisible = false;
      this.$refs[formName].resetFields();
      this.fd.set("multipartFiles", "");
    },
    // 确定新增上传
    handleYes(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.fd.append("newGenId", this.dynamicrevAccId);
          this.fd.append("fieldDisId", this.newCheckForm.checkOne);
          this.fd.append("result", this.newCheckForm.checkResult);
          this.fd.append("takeSteps", this.newCheckForm.takeSteps);
          this.fd.append("noPassReason", this.newCheckForm.noPassReason);
          this.fd.append("remark", this.newCheckForm.remark);
          this.fd.append("peopleAccData", this.newCheckForm.peopleAccData);
          this.fd.append("newGenData", this.newCheckForm.newGenData);
          this.fd.append("busiData", this.newCheckForm.busiData);
          // for (let k = 0; k < this.newCheckForm.fileList.length; k++) {
          //   this.fd.append("multipartFiles", this.newCheckForm.fileList[k].raw);
          // }
          var that = this;
          axios({
            method: "post",
            data: that.fd,
            url: "/banksys/dynamicrev/feedbackaccfield.do",
            contentType: false, //这里不要落下
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
            .then(res => {
              // this.fullscreenNewLoading = false;
              if (res.data.code == "1001") {
                this.dialogNewFormVisible = false;
                this.$message.success("添加成功");
                this.getTableDate();
                this.fd = new FormData();
                this.newCheckForm.fileList = [];
                this.newCheckForm.takeSteps = "";
                this.newCheckForm.checkResult = "";
                this.newCheckForm.noPassReason = "";
                this.newCheckForm.peopleAccData = "";
                this.newCheckForm.newGenData = "";
                this.newCheckForm.busiData = "";
                this.newCheckForm.remark = "";
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              this.$message.error("网络异常，请重试！！！");
            });
        } else {
          return false;
        }
      });
    },
    // 点击删除时触发
    handleRemove(file, fileList) {
      this.newCheckForm.fileList = fileList;
    },
    handleNewFormClosed() {
      (this.newCheckForm.checkOne = ""),
        (this.newCheckForm.checkResult = ""),
        (this.newCheckForm.noPassReason = ""),
        (this.newCheckForm.remark = ""),
        (this.newCheckForm.fileList = []);
    },

    //导入文件功能
    uploadFile(ele) {
      this.fd.append("multipartFiles", ele.file);
    },
    // 获取table表格数据
    getTableDate() {
      let para = {
        dynamicrevAccId: this.dynamicrevAccId,
        operateType: "8",
        pagenum: this.page,
        rows: this.pageSize
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/dynamicrev/queryrevresultlist.do",
        data: para
      })
        .then(res => {
          if (res.data.unitRank === 0) {
            this.ifShowDistribution = true;
          }
          if (res.data.code === "1001") {
            this.$message.success(res.data.msg);
            this.total = res.data.data.total;
            this.tableData = res.data.data.list;
            this.listLoading = false;
          } else {
            this.$message.error(res.data.msg);
            this.listLoading = false;
          }
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleSwitch1() {
      this.switchCode = "1";
    },
    handleSwitch2() {
      this.switchCode = "2";
    },
    handleSwitch3() {
      this.switchCode = "3";
    },
    backtrack() {
      this.$router.push({ path: "/CustomerInformation" });
    },
    handleContent() {
      let req = {};
      req = {
        dynamicrevAccId: this.dynamicrevAccId,
        operateType: "8"
      };
      axios({
        method: "post",
        url: "/banksys/dynamicrev/querydynamicrevdetails.do",
        data: req
      })
        .then(res => {
          this.dataObj = res.data
          this.saveMoneyForm = res.data.peopleAcc;
          this.newForm = res.data.newGenAcc;
          this.busForm = res.data.busiInfo;
          //this.tags = res.data.data.noPassData;
          this.ShowDistributionCode = res.data.unitRank;
          //this.DistributionCode = res.data.staffName;
        })
        .catch(error => {
          this.$message.error("网络异常，请稍后重试！！！");
        });
    },
    handleDetail(id) {
      this.dialogTableDetailVisible = true;
      let req = {};
      req = { fieldDisId: id };
      axios({
        method: "post",
        url: "/banksys/dynamicrev/querybackaccfielddetails.do",
        data: req
      })
        .then(res => {
          this.newCheckDetailForm = res.data.data;
        })
        .catch(error => {
          this.$message.error("网络异常，请稍后重试！！！");
        });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getTableDate();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableDate();
    }
  }
};
</script>
<style scoped>
.h5-box {
  font-size: 17px;
  margin-bottom: 10px;
  text-align: center;
}
.h6-box {
  margin-bottom: 10px;
}
.v_add {
  width: 560px;
  margin: 0 auto;
  height: auto;
}
.v_add2 {
  width: 100%;
  margin: 10px auto;
  height: auto;
}
.v_add p {
  text-align: center;
  margin-bottom: 20px;
  font-size: 17px;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  text-align: center;
  border-top: #dbdbdb;
  border-left: #dbdbdb;
  border-right: #dbdbdb;
  border-bottom: #dbdbdb;
}
table td {
  padding: 6px;
}
.bg_color {
  background-color: #eef1f6;
  color: #333;
  width: 160px;
  font-size: 14px;
}
.el-row {
  text-align: center;
  padding-top: 20px;
}
.el-tag--light {
  margin: 5px;
}
</style>