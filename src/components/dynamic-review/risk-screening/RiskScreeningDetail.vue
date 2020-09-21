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
            <td class="bg_color">企业名称:</td>
            <td>
              <el-input v-model="saveMoneyForm.firmName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">存款人名称:</td>
            <td>
              <el-input v-model="saveMoneyForm.depositorName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">账户名称:</td>
            <td>
              <el-input v-model="saveMoneyForm.accName" readonly></el-input>
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
              <el-input v-model="saveMoneyForm.legalPerName" readonly></el-input>
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
              <el-input v-model="saveMoneyForm.legalPerNumber" readonly></el-input>
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
              <el-input v-model="saveMoneyForm.noTaxNumber" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">注册资金金额:</td>
            <td>
              <el-input v-model="saveMoneyForm.regiAmount" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">注册资金币种:</td>
            <td>
              <el-input v-model="saveMoneyForm.regiCurrency" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">经营范围:</td>
            <td>
              <el-input type="textarea" :rows="4" v-model="saveMoneyForm.busiScope" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">地址:</td>
            <td>
              <el-input type="textarea" :rows="2" v-model="saveMoneyForm.address" readonly></el-input>
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
          <tr>
            <td class="bg_color">基本存款账户开户许可证核准号:</td>
            <td>
              <el-input v-model="saveMoneyForm.besicAccNumber" readonly></el-input>
            </td>
          </tr>
          <tr v-if="ShowDistributionCode === 0">
            <td class="bg_color">分发支行名称:</td>
            <td>
              <el-input v-model="saveMoneyForm.subName" readonly></el-input>
            </td>
          </tr>
          <tr v-if="ShowDistributionCode === 0 || ShowDistributionCode === 1">
            <td class="bg_color">分发网点名称:</td>
            <td>
              <el-input v-model="saveMoneyForm.disUnitName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">账户专管员:</td>
            <td>
              <el-input v-model="saveMoneyForm.staffName" readonly></el-input>
            </td>
          </tr>

          <tr>
            <td class="bg_color">不合格内容:</td>
            <td>
              <el-tag
                v-for="tag in tags"
                :key="tag.checkDetailsCode"
                type="danger"
                :title="tag.noPassReason"
              >{{tag.checkDetailsName}}</el-tag>
            </td>
          </tr>
        </table>

        <!-- </el-form> -->
      </div>
      <div class="v_add" v-show="this.switchCode == '2'">
        <p>新一代客户数据详情</p>
        <!-- <el-form :model="newForm"> -->
        <table style="width: 100%" border="1">
          <tr>
            <td class="bg_color">企业名称:</td>
            <td>
              <el-input v-model="newForm.firmName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">存款人名称:</td>
            <td>
              <el-input v-model="newForm.depositorName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">账户名称:</td>
            <td>
              <el-input v-model="newForm.accName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">客户编号:</td>
            <td>
              <el-input v-model="newForm.clientId" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">信贷客户标志位:</td>
            <td>
              <el-input v-model="newForm.loanClientFlag" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">法定名称语种:</td>
            <td>
              <el-input v-model="newForm.legalNameLang" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">法定名称:</td>
            <td>
              <el-input v-model="newForm.legalName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">对公客户类型:</td>
            <td>
              <el-input v-model="newForm.publicClientType" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">客户管理部门:</td>
            <td>
              <el-input v-model="newForm.clientMangeDept" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">客户主办机构:</td>
            <td>
              <el-input v-model="newForm.clientSponsor" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">客户状态:</td>
            <td>
              <el-input v-model="newForm.clientStatus" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">是否具备法人资格:</td>
            <td>
              <el-input v-model="newForm.legalStatus" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">是否外地常设机构:</td>
            <td>
              <el-input v-model="newForm.nonlocalStatus" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">行业类型:</td>
            <td>
              <el-input v-model="newForm.industryType" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">企业规模（四部委标准）:</td>
            <td>
              <el-input v-model="newForm.scale" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">客户规模（行内标准）:</td>
            <td>
              <el-input v-model="newForm.clientSize" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">企业出资人经济成分:</td>
            <td>
              <el-input v-model="newForm.investorCon" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">国民经济部门:</td>
            <td>
              <el-input v-model="newForm.national" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">注册国家/地区:</td>
            <td>
              <el-input v-model="newForm.regiGegion" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">组织机构代码:</td>
            <td>
              <el-input v-model="newForm.organiCode" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">颁发单位:</td>
            <td>
              <el-input v-model="newForm.issuedBy" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">有效期起始日期:</td>
            <td>
              <el-input v-model="newForm.validStartDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">有效期到期日期:</td>
            <td>
              <el-input v-model="newForm.validEndDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">证件影像:</td>
            <td>
              <el-input v-model="newForm.insDocuImage" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">登记注册证件类型:</td>
            <td>
              <el-input v-model="newForm.regiType" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">登记注册证件号码（统一社会信用代码）:</td>
            <td>
              <el-input v-model="newForm.socialCode" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">注册资本币种:</td>
            <td>
              <el-input v-model="newForm.regiCurrency" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">注册资本金额（元）:</td>
            <td>
              <el-input v-model="newForm.regiAmount" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">实收资本金额（元）:</td>
            <td>
              <el-input v-model="newForm.paidInCapital" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">注册资本到位率（%）:</td>
            <td>
              <el-input v-model="newForm.regiRate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">股份总数（份）:</td>
            <td>
              <el-input v-model="newForm.sharesNum" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">经营范围:</td>
            <td>
              <el-input type="textarea" :rows="4" v-model="newForm.busiScope" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">成立日期:</td>
            <td>
              <el-input v-model="newForm.setDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">是否永久营业执照:</td>
            <td>
              <el-input v-model="newForm.perpeLicenseStatus" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">经营期限起始日期:</td>
            <td>
              <el-input v-model="newForm.operStartDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">经营期限终止日期:</td>
            <td>
              <el-input v-model="newForm.operEndDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">发证机关名称:</td>
            <td>
              <el-input v-model="newForm.issuingName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">发证日期:</td>
            <td>
              <el-input v-model="newForm.issuingDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">证件有效期起始日期:</td>
            <td>
              <el-input v-model="newForm.papersStartDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">证件有效期终止日期:</td>
            <td>
              <el-input v-model="newForm.papersEndDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">证件影像:</td>
            <td>
              <el-input v-model="newForm.regiDocuImage" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">变更类型:</td>
            <td>
              <el-input v-model="newForm.changeType" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">国税登记证号:</td>
            <td>
              <el-input v-model="newForm.irsNumber" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">国税发证机关名称:</td>
            <td>
              <el-input v-model="newForm.irsIssuName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">国税发证日期:</td>
            <td>
              <el-input v-model="newForm.irsIssuDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">地税登记证号:</td>
            <td>
              <el-input v-model="newForm.landNumber" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">地税发证机关名称:</td>
            <td>
              <el-input v-model="newForm.landIssuName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">地税发证日期:</td>
            <td>
              <el-input v-model="newForm.landIssuDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">基本存款账户可开户银行:</td>
            <td>
              <el-input v-model="newForm.basicAccMayBank" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">基本存款账户开户许可证核准号:</td>
            <td>
              <el-input v-model="newForm.basicAccPerNumber" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">基本存款账户开户银行名称:</td>
            <td>
              <el-input v-model="newForm.basicAccBank" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">基本存款账户账号:</td>
            <td>
              <el-input v-model="newForm.basicAccNumber" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">法定代表人/单位负责人姓名:</td>
            <td>
              <el-input v-model="newForm.legalPerName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">身份证件类型:</td>
            <td>
              <el-input v-model="newForm.legalPerType" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">身份证件号码:</td>
            <td>
              <el-input v-model="newForm.legalPerNumber" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">证件到期日:</td>
            <td>
              <el-input v-model="newForm.legalPerEndDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">登记注册地址:</td>
            <td>
              <el-input v-model="newForm.address" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">分发支行名称:</td>
            <td>
              <el-input v-model="saveMoneyForm.subName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">分发网点名称:</td>
            <td>
              <el-input v-model="saveMoneyForm.disUnitName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">账户专管员:</td>
            <td>
              <el-input v-model="saveMoneyForm.staffName" readonly></el-input>
            </td>
          </tr>

          <tr>
            <td class="bg_color">不合格内容:</td>
            <td>
              <el-tag
                v-for="tag in tags"
                :key="tag.checkDetailsCode"
                type="danger"
                :title="tag.noPassReason"
              >{{tag.checkDetailsName}}</el-tag>
            </td>
          </tr>
        </table>

        <!-- </el-form> -->
      </div>
      <div class="v_add" v-show="this.switchCode == '3'">
        <p>工商数据详情</p>
        <!-- <el-form :model="saveMoneyForm"> -->
        <table style="width: 100%" border="1">
          <tr>
            <td class="bg_color">统一社会信用代码:</td>
            <td>
              <el-input v-model="busForm.socialCode" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">企业名称:</td>
            <td>
              <el-input v-model="busForm.firmName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">法人姓名：</td>
            <td>
              <el-input v-model="busForm.legalName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">企业类型编码：</td>
            <td>
              <el-input v-model="busForm.firmTypeCode" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">企业类型中文：</td>
            <td>
              <el-input v-model="busForm.firmTypeChn" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">注册资金：</td>
            <td>
              <el-input v-model="busForm.regiAmount" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">币种编码：</td>
            <td>
              <el-input v-model="busForm.regiCurrencyCode" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">币种中文：</td>
            <td>
              <el-input v-model="busForm.regiCurrency" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">成立日期：</td>
            <td>
              <el-input v-model="busForm.setTime" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">营业期限自：</td>
            <td>
              <el-input v-model="busForm.operStartDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">营业期限至：</td>
            <td>
              <el-input v-model="busForm.operEndDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">登记机关：</td>
            <td>
              <el-input v-model="busForm.regOfficeCode" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">登记机关中文：</td>
            <td>
              <el-input v-model="busForm.regOfficeChn" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">核准日期：</td>
            <td>
              <el-input v-model="busForm.appDate" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">住所（注册地址）：</td>
            <td>
              <!-- <el-input v-model="busForm.regAddress" readonly></el-input> -->
              <span style="font-size: 14px;color: #606266;">{{busForm.regAddress}}</span>
            </td>
          </tr>
          <tr>
            <td class="bg_color">经营范围:</td>
            <td>
              <span style="font-size: 14px;color: #606266;">{{busForm.busiScope}}</span>
            </td>
          </tr>
          <tr>
            <td class="bg_color">登记状态：</td>
            <td>
              <el-input v-model="busForm.checkStatus" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">法定代表人姓名：</td>
            <td>
              <el-input v-model="busForm.legalPerName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">法定代表人固定电话：</td>
            <td>
              <el-input v-model="busForm.legalPhn" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">法定代表人移动电话：</td>
            <td>
              <el-input v-model="busForm.legalMoPhn" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">法定代表人证件类型代码：</td>
            <td>
              <el-input v-model="busForm.legalPerTypeCode" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">法定代表人证件类型名称：</td>
            <td>
              <el-input v-model="busForm.legalPerTypeChn" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">法定代表人证件号码：</td>
            <td>
              <el-input v-model="busForm.legalPerNumber" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">财务负责人姓名：</td>
            <td>
              <el-input v-model="busForm.financeName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">财务负责人证件类型_代码：</td>
            <td>
              <el-input v-model="busForm.financePerTypeCode" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">财务负责人证件类型_名称：</td>
            <td>
              <el-input v-model="busForm.financePerTypeChn" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">财务负责人证件号码：</td>
            <td>
              <el-input v-model="busForm.financeNumber" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">财务负责人固定电话：</td>
            <td>
              <el-input v-model="busForm.financePhn" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">财务负责人移动电话：</td>
            <td>
              <el-input v-model="busForm.financeMoPhn" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">实际经营地址：</td>
            <td>
              <span style="font-size: 14px;color: #606266;">{{busForm.address}}</span>
            </td>
          </tr>
          <tr v-if="ShowDistributionCode === 0">
            <td class="bg_color">分发支行名称:</td>
            <td>
              <el-input v-model="saveMoneyForm.subName" readonly></el-input>
            </td>
          </tr>
          <tr v-if="ShowDistributionCode === 0 || ShowDistributionCode === 1">
            <td class="bg_color">分发网点名称:</td>
            <td>
              <el-input v-model="saveMoneyForm.disUnitName" readonly></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg_color">账户专管员:</td>
            <td>
              <el-input v-model="saveMoneyForm.staffName" readonly></el-input>
            </td>
          </tr>

          <tr>
            <td class="bg_color">不合格内容:</td>
            <td>
              <el-tag
                v-for="tag in tags"
                :key="tag.label"
                type="danger"
                :title="tag.noPassReason"
              >{{tag.label}}</el-tag>
            </td>
          </tr>
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
        title="新增风险筛查记录"
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
          <el-form-item label="筛查内容：" prop="checkOne">
            <el-select v-model="newCheckForm.checkOne" placeholder="请选择筛查内容">
              <el-option
                v-for="item in newCheckForm.yearCheckList"
                :key="item.key"
                :label="item.label"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="筛查结果：" prop="checkResult">
            <el-select v-model="newCheckForm.checkResult" placeholder="请选择筛查结果">
              <el-option
                v-for="item in newCheckForm.yearCheckResultList"
                :key="item.checkResult"
                :label="item.label"
                :value="item.checkResult"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="采取措施：">
            <el-select v-model="newCheckForm.takeSteps" placeholder="请选择采取措施">
              <el-option
                v-for="item in takeStepsList"
                :key="item.code"
                :label="item.codeName"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="不合格原因：">
            <el-input
              v-model="newCheckForm.noPassReason"
              class="input-box4"
              type="textarea"
              :rows="2"
            ></el-input>
          </el-form-item>
          <el-form-item label="人行账户信息：">
            <el-input
              v-model="newCheckForm.peopleAccData "
              class="input-box4"
              type="textarea"
              :rows="2"
            ></el-input>
          </el-form-item>
          <el-form-item label="新一代客户数据：">
            <el-input
              v-model="newCheckForm.newGenData"
              class="input-box4"
              type="textarea"
              :rows="2"
            ></el-input>
          </el-form-item>
          <el-form-item label="工商数据：">
            <el-input v-model="newCheckForm.busiData" class="input-box4" type="textarea" :rows="2"></el-input>
          </el-form-item>
          <el-form-item label="年检经办员：" prop="staffName">
            <el-input v-model="newCheckForm.staffName" class="input-box4"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="newCheckForm.remark" class="input-box4" type="textarea" :rows="2"></el-input>
          </el-form-item>
          <el-form-item label="添加附件：">
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
          <el-button @click="dialogNewFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleYes('newCheckForm')">确 定</el-button>
        </div>
      </el-dialog>

      <!--列表-->
      <div class="v_add2">
        <h5 class="h5-box">风险筛查表</h5>
        <el-table
          :data="tableData"
          v-loading="listLoading"
          border
          style="width: 100%;"
          :header-cell-style="styleObj"
          highlight-current-row
        >
          <el-table-column prop="number" label="序号" align="center" width="55"></el-table-column>
          <el-table-column prop="detecData" label="筛查内容" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="ifPass" label="筛查结果" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.ifPass ==='0'">
                <img src="../../../assets/01.png" title="合格" />
              </span>
              <span v-if="scope.row.ifPass ==='1'">
                <img src="../../../assets/02.png" title="不合格" />
              </span>
              <span v-if="scope.row.ifPass ===''">
                <img src="../../../assets/03.png" title="未年检" />
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="noPassReason" label="不合格原因" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="remark" label="备注" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="detectionType" label="筛查类型" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="takeSteps" label="采取措施" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="unitName" label="提交机构" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="staffName" label="动态复核经办员" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="submitTime" label="提交时间" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click="handleDetail(scope.row.detecId)"
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
      <el-dialog title="风险筛查详情" :visible.sync="dialogTableDetailVisible" width="40%" center>
        <el-form :model="newCheckDetailForm" :label-width="labelWidth">
          <el-form-item label="筛查内容：">
            <el-input v-model="newCheckDetailForm.detecData" class="input-box4" readonly></el-input>
          </el-form-item>
          <el-form-item label="筛查结果：">
            <el-input v-model="newCheckDetailForm.ifPass" class="input-box4" readonly></el-input>
          </el-form-item>
          <el-form-item label="不合格原因：">
            <el-input
              v-model="newCheckDetailForm.noPassReason"
              type="textarea"
              :rows="2"
              class="input-box4"
              readonly
            ></el-input>
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
          <el-form-item label="采取措施：">
            <el-input v-model="newCheckDetailForm.takeSteps" class="input-box4" readonly></el-input>
          </el-form-item>
          <el-form-item label="动态复核经办员：">
            <el-input v-model="newCheckDetailForm.staffName" class="input-box4" readonly></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="newCheckDetailForm.remark" class="input-box4" readonly></el-input>
          </el-form-item>
          <el-form-item label="筛查类型：">
            <el-input v-model="newCheckDetailForm.detectionType" class="input-box4" readonly></el-input>
          </el-form-item>
          <el-form-item label="提交机构：">
            <el-input v-model="newCheckDetailForm.unitName" class="input-box4" readonly></el-input>
          </el-form-item>
          <el-form-item label="提交时间：">
            <el-input v-model="newCheckDetailForm.submitTime" class="input-box4" readonly></el-input>
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
        checkResult: "",
        takeSteps: "",
        noPassReason: "",
        peopleAccData: "",
        newGenData: "",
        busiData: "",
        staffName: "",
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
        ],
        staffName: [
          { required: true, message: "请填写年检经办员", trigger: "blur" }
        ]
      },
      depositorId: "",
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
    this.depositorId = this.$route.query.newGenId;
    this.depositorName = this.$route.query.depositorName;
    this.handleContent();
    this.getTableDate();
    this.takeStepsListData();
    this.yearCheckListData();
  },
  methods: {
     // 新增核查记录中核查内容数据
    yearCheckListData() {
      this.$axios
        .post("/banksys/acccontrast/querycheckdatalist.do", {
          depositorId: this.depositorId,
          pageType: "7"
        })
        .then(res => {
          this.newCheckForm.yearCheckList = res.data.checkList;
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
    // 确定新增上传
    handleYes(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.fd.append("newGenId", this.depositorId);
          this.fd.append("detecData", this.newCheckForm.checkOne);
          this.fd.append("ifPass", this.newCheckForm.checkResult);
          this.fd.append("noPassReason", this.newCheckForm.noPassReason);
          this.fd.append("remark", this.newCheckForm.remark);
          this.fd.append("staffName", this.newCheckForm.staffName);
          this.fd.append("peopleAccData", this.newCheckForm.peopleAccData);
          this.fd.append("newGenData", this.newCheckForm.newGenData);
          this.fd.append("busiData", this.newCheckForm.busiData);
          for (let k = 0; k < this.newCheckForm.fileList.length; k++) {
            this.fd.append("files", this.newCheckForm.fileList[k].raw);
          }
          var that = this;
          axios({
            method: "post",
            data: that.fd,
            url: "/banksys/acccontrast/saveyearlydetec.do",
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
        (this.newCheckForm.staffName = ""),
        (this.newCheckForm.remark = ""),
        (this.newCheckForm.fileList = []);
    },

    //导入文件功能
    uploadFile(ele) {},
    // 获取table表格数据
    getTableDate() {
      let para = {
        depositorId: this.depositorId,
        pageType: "7",
        pagenum: this.page,
        rows: this.pageSize
      };
      this.listLoading = true;
      axios({
        method: "post",
        url: "/banksys/acccontrast/queryyearlydeteclist.do",
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
      this.$router.push({ path: "/RiskScreen" });
    },
    handleContent() {
      let req = {};
      req = {
        depositorId: this.depositorId,
        pageType: "7",
        depositorName: this.depositorName
      };
      axios({
        method: "post",
        url: "/banksys/acccontrast/querycheckdatadetails.do",
        data: req
      })
        .then(res => {
          this.saveMoneyForm = res.data.data.peopleAccData;
          this.newForm = res.data.data.newGenData;
          this.busForm = res.data.data.busiDataMap;
          this.tags = res.data.data.noPassData;
          this.ShowDistributionCode = res.data.unitRank;
          this.DistributionCode = res.data.staffName;
        })
        .catch(error => {
          this.$message.error("网络异常，请稍后重试！！！");
        });
    },
    handleDetail(id) {
      this.dialogTableDetailVisible = true;
      let req = {};
      req = { detecId: id };
      axios({
        method: "post",
        url: "/banksys/acccontrast/queryyearlydetecdetails.do",
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
  margin-bottom: 20px;
  text-align: center;
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