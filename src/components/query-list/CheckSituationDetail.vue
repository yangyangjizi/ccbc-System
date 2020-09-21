<template>
  <el-card class="box-card head-top">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="人行账户信息" name="first">
        <div class="head_box">
          <p>人行账户信息详情</p>
          <table style="width: 100%" border="1">
            <tr>
              <td class="bg_color">账号:</td>
              <td class="td_inner">
                <el-input readonly v-model="saveMoneyForm.accountNum" size="mini"></el-input>
              </td>
              <td class="bg_color">币别:</td>
              <td class="td_inner">
                <el-input readonly v-model="saveMoneyForm.currenct" size="mini"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">账户名称:</td>
              <td class="td_inner">
                <el-input readonly v-model="saveMoneyForm.accountName" size="mini"></el-input>
              </td>
              <td class="bg_color">账户性质:</td>
              <td class="td_inner">
                <el-input readonly v-model="saveMoneyForm.accountNature" size="mini"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">开户许可证号:</td>
              <td class="td_inner">
                <el-input readonly v-model="saveMoneyForm.openAccNum" size="mini"></el-input>
              </td>
              <td class="bg_color">开户日期:</td>
              <td class="td_inner">
                <el-input readonly v-model="saveMoneyForm.openAccDate" size="mini"></el-input>
              </td>
            </tr>
            <template v-if="isShow">
              <tr>
                <td class="bg_color">销户日期:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.closeAccDate" size="mini"></el-input>
                </td>
                <td class="bg_color">睡眠状态:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.sleepStatus" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">睡眠设置日期:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.sleepDate" size="mini"></el-input>
                </td>
                <td class="bg_color">开户行:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.openAccBank" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">地址:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.address" size="mini"></el-input>
                </td>
                <td class="bg_color">资金用途:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.useFund" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">账户终止状态:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.accEndStatus" size="mini"></el-input>
                </td>
                <td class="bg_color">银行机构代码:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.bankCode" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">银行机构名称:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.accEndStatus" size="mini"></el-input>
                </td>
                <td class="bg_color">银行机构代码:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.bankName" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">存款人名称:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.depositorName" size="mini"></el-input>
                </td>
                <td class="bg_color">存款人类别:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.depositorType" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">注册地区代码:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.redionCode" size="mini"></el-input>
                </td>
                <td class="bg_color">组织机构代码:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.orgInsCode" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">工商营业执照:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.busiLicense" size="mini"></el-input>
                </td>
                <td class="bg_color">法定代表人或负责人姓名:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.legalName" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">证件类型:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.papersType" size="mini"></el-input>
                </td>
                <td class="bg_color">证件号码:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.papersNumber" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">产业分类:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.industryType" size="mini"></el-input>
                </td>
                <td class="bg_color">行业归属:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.industryVest" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">国税登记证号:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.irsNumber" size="mini"></el-input>
                </td>
                <td class="bg_color">地税登记证号:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.landNumber" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">无需办理税务登记的证明文件编号:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.notaxNumber" size="mini"></el-input>
                </td>
                <td class="bg_color">注册资金金额:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.regCapitalTotal" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">无需办理税务登记的证明文件编号:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.notaxNumber" size="mini"></el-input>
                </td>
                <td class="bg_color">注册资金金额:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.regCapitalTotal" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">经营范围:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.busiScope" size="mini"></el-input>
                </td>
                <td class="bg_color">邮政编码:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.postalCode" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">联系电话:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.phone" size="mini"></el-input>
                </td>
                <td class="bg_color">存款人上级法人或主管单位名称:</td>
                <td class="td_inner">
                  <el-input readonly v-model="saveMoneyForm.superLegalName" size="mini"></el-input>
                </td>
              </tr>
            </template>
          </table>
          <div class="hover-font-box" @click="handleShowBox">
            <i class="el-icon-caret-bottom" v-if="!isShow"></i>
            <span class="hover-font" v-if="!isShow">查看更多</span>
            <i class="el-icon-caret-top" v-if="isShow"></i>
            <span class="hover-font" v-if="isShow">隐藏</span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="新一代客户数据" name="second">
        <div class="head_box">
          <p>新一代客户数据详情</p>
          <table style="width: 100%" border="1">
            <tr>
              <td class="bg_color">账号:</td>
              <td class="td_inner">
                <el-input readonly v-model="newForm.accountNum" size="mini"></el-input>
              </td>
              <td class="bg_color">币别:</td>
              <td class="td_inner">
                <el-input readonly v-model="newForm.currenct" size="mini"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">账户名称:</td>
              <td class="td_inner">
                <el-input readonly v-model="newForm.accountName" size="mini"></el-input>
              </td>
              <td class="bg_color">账户性质:</td>
              <td class="td_inner">
                <el-input readonly v-model="newForm.accountNature" size="mini"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">开户许可证号:</td>
              <td class="td_inner">
                <el-input readonly v-model="newForm.openAccNum" size="mini"></el-input>
              </td>
              <td class="bg_color">开户日期:</td>
              <td class="td_inner">
                <el-input readonly v-model="newForm.openAccDate" size="mini"></el-input>
              </td>
            </tr>
            <template v-if="isShow2">
              <tr>
                <td class="bg_color">销户日期:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.closeAccDate" size="mini"></el-input>
                </td>
                <td class="bg_color">睡眠状态:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.sleepStatus" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">睡眠设置日期:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.sleepDate" size="mini"></el-input>
                </td>
                <td class="bg_color">开户行:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.openAccBank" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">地址:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.address" size="mini"></el-input>
                </td>
                <td class="bg_color">资金用途:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.useFund" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">账户终止状态:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.accEndStatus" size="mini"></el-input>
                </td>
                <td class="bg_color">银行机构代码:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.bankCode" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">银行机构名称:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.accEndStatus" size="mini"></el-input>
                </td>
                <td class="bg_color">银行机构代码:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.bankName" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">存款人名称:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.depositorName" size="mini"></el-input>
                </td>
                <td class="bg_color">存款人类别:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.depositorType" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">注册地区代码:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.redionCode" size="mini"></el-input>
                </td>
                <td class="bg_color">组织机构代码:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.orgInsCode" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">工商营业执照:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.busiLicense" size="mini"></el-input>
                </td>
                <td class="bg_color">法定代表人或负责人姓名:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.legalName" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">证件类型:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.papersType" size="mini"></el-input>
                </td>
                <td class="bg_color">证件号码:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.papersNumber" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">产业分类:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.industryType" size="mini"></el-input>
                </td>
                <td class="bg_color">行业归属:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.industryVest" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">国税登记证号:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.irsNumber" size="mini"></el-input>
                </td>
                <td class="bg_color">地税登记证号:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.landNumber" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">无需办理税务登记的证明文件编号:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.notaxNumber" size="mini"></el-input>
                </td>
                <td class="bg_color">注册资金金额:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.regCapitalTotal" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">无需办理税务登记的证明文件编号:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.notaxNumber" size="mini"></el-input>
                </td>
                <td class="bg_color">注册资金金额:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.regCapitalTotal" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">经营范围:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.busiScope" size="mini"></el-input>
                </td>
                <td class="bg_color">邮政编码:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.postalCode" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">联系电话:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.phone" size="mini"></el-input>
                </td>
                <td class="bg_color">存款人上级法人或主管单位名称:</td>
                <td class="td_inner">
                  <el-input readonly v-model="newForm.superLegalName" size="mini"></el-input>
                </td>
              </tr>
            </template>
          </table>
          <div class="hover-font-box" @click="handleShowBox2">
            <i class="el-icon-caret-bottom" v-if="!isShow2"></i>
            <span class="hover-font" v-if="!isShow2">查看更多</span>
            <i class="el-icon-caret-top" v-if="isShow2"></i>
            <span class="hover-font" v-if="isShow2">隐藏</span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="工商数据" name="third">
        <div class="head_box">
          <p>工商数据详情</p>
          <table style="width: 100%" border="1">
            <tr>
              <td class="bg_color">企业名称:</td>
              <td class="td_inner">
                <el-input readonly v-model="busForm.firmName" size="mini"></el-input>
              </td>
              <td class="bg_color">统一社会信用代码:</td>
              <td class="td_inner">
                <el-input readonly v-model="busForm.creditCode" size="mini"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">旧营业执照号码：:</td>
              <td class="td_inner">
                <el-input readonly v-model="busForm.oldBusiNum" size="mini"></el-input>
              </td>
              <td class="bg_color">法定代表人姓名：:</td>
              <td class="td_inner">
                <el-input readonly v-model="busForm.legalName" size="mini"></el-input>
              </td>
            </tr>
            <tr>
              <td class="bg_color">法定代表人证件类型：:</td>
              <td class="td_inner">
                <el-input readonly v-model="busForm.legalIdType" size="mini"></el-input>
              </td>
              <td class="bg_color">法定代表人证件号码：:</td>
              <td class="td_inner">
                <el-input readonly v-model="busForm.legalIdNum" size="mini"></el-input>
              </td>
            </tr>
            <template v-if="isShow3">
              <tr>
                <td class="bg_color">法定代表人证件有效期：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.legalIdDate" size="mini"></el-input>
                </td>
                <td class="bg_color">组织实收资本金额：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.orgAmount" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">注册资金金额：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.regAmount" size="mini"></el-input>
                </td>
                <td class="bg_color">注册资金币种代码：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.regCurCode" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">经营状态代码：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.opeStatusCode" size="mini"></el-input>
                </td>
                <td class="bg_color">组织性质代码：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.orgNatureCode" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">组织成立日期：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.orgSetDate" size="mini"></el-input>
                </td>
                <td class="bg_color">经营期限起始日期：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.busiStartDate" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">经营期限结束日期：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.busiEndDate" size="mini"></el-input>
                </td>
                <td class="bg_color">注册地址:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.regAddress" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">实际经营地址：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.busiAddress" size="mini"></el-input>
                </td>
                <td class="bg_color">经营范围：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.busiScope" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">注销日期：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.outDate" size="mini"></el-input>
                </td>
                <td class="bg_color">吊销日期：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.revDate" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">股东姓名：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.shareName" size="mini"></el-input>
                </td>
                <td class="bg_color">股东证件类型：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.shareIdType" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">股东证件号码：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.shareIdNum" size="mini"></el-input>
                </td>
                <td class="bg_color">股东证件有效期：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.shareIdDate" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">实际控制人姓名：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.controName" size="mini"></el-input>
                </td>
                <td class="bg_color">实际控制人证件类型：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.controIdType" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">实际控制人证件号码：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.controIdNum" size="mini"></el-input>
                </td>
                <td class="bg_color">实际控制人证件有效期：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.controIdDate" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">收益所有人姓名：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.ownerName" size="mini"></el-input>
                </td>
                <td class="bg_color">收益所有人证件类型：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.ownerIdType" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">收益所有人证件号码：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.ownerIdNum" size="mini"></el-input>
                </td>
                <td class="bg_color">收益所有人证件有效期：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.ownerIdDate" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">收益所有人地址：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.ownerAddress" size="mini"></el-input>
                </td>
                <td class="bg_color">异常名录信息：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.exceptionList" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">永久异常名录信息：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.perExceptionList" size="mini"></el-input>
                </td>
                <td class="bg_color">被执行人行为描述：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.enforBehavior" size="mini"></el-input>
                </td>
              </tr>
              <tr>
                <td class="bg_color">行政处罚结果代码：:</td>
                <td class="td_inner">
                  <el-input readonly v-model="busForm.resultCode" size="mini"></el-input>
                </td>
                <td class="bg_color"></td>
                <td class="td_inner">
                  <el-input readonly size="mini"></el-input>
                </td>
              </tr>
            </template>
          </table>
          <div class="hover-font-box" @click="handleShowBox3">
            <i class="el-icon-caret-bottom" v-if="!isShow3"></i>
            <span class="hover-font" v-if="!isShow3">查看更多</span>
            <i class="el-icon-caret-top" v-if="isShow3"></i>
            <span class="hover-font" v-if="isShow3">隐藏</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-divider></el-divider>
    <div class="center_box">
      <p>账户动态复核情况登记表</p>
      <el-table
        :data="tableData2"
        max-height="600"
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
        <el-table-column prop="dataType" label="动态复核方式" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="detectionType" label="复核类型" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="isPass" label="复核最终结果" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="unitName" label="提交机构" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="accStaffName" label="账户专管员" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="staffName" label="动态复核经办员" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="result" label="复核过程结果" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="noPassReason" label="不合格原因" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="takeSteps" label="采取措施" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="remark" label="备注" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="nextStaffName" label="下一环节处理人" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="nextResult" label="下一环节复核过程结果" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="nextTakeSteps" label="下一环节采取措施" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="nextRemark" label="下一环节备注" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="feedbackTime" label="反馈时间" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center" fixed="right">
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
      <div class="hover-font-box" @click="handleMoreBox2">
        <i class="el-icon-caret-bottom"></i>
        <span class="hover-font">查看更多</span>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="bottom_box">
      <el-timeline>
        <el-timeline-item
          v-for="val in timeData"
          :key="val.key"
          :timestamp="val.operateTime"
          placement="top"
        >
          <el-card>
            <h4>操作内容：{{val.dataName}}</h4>
            <h4>操作结果：{{val.dataResult}}</h4>
            <p class="remake_title">操作机构：{{val.operateUnit}}</p>
            <p class="remake_title">操作员：{{val.operatorName}}</p>
            <!-- <el-button @click="backtrack" size="mini" type="warning">详情</el-button> -->
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <div class="hover-font-box" @click="handleMoreBox3">
        <i class="el-icon-caret-bottom"></i>
        <span class="hover-font">查看更多</span>
      </div>
    </div>
    <div style="width:100%;text-align:center;margin-top:20px">
      <el-button @click="backtrack" size="mini" type="warning">返回</el-button>
    </div>

    <!-- 列表详情弹框 -->
    <el-dialog title="年检记录详情" :visible.sync="dialogTableDetailVisible" width="30%" center>
      <el-form :model="newCheckDetailForm" :label-width="labelWidth">
        <el-form-item label="复核内容：">
          <el-input v-model="newCheckDetailForm.detecData" class="input-box4" readonly></el-input>
        </el-form-item>
        <el-form-item label="动态复核方式：">
          <el-input v-model="newCheckDetailForm.dataType" class="input-box4" readonly></el-input>
        </el-form-item>
        <el-form-item label="复核类型：">
          <el-input v-model="newCheckDetailForm.detectionType" class="input-box4" readonly></el-input>
        </el-form-item>
        <el-form-item label="复核最终结果：">
          <el-input v-model="newCheckDetailForm.isPass" class="input-box4" readonly></el-input>
        </el-form-item>
        <el-form-item label="提交机构：">
          <el-input v-model="newCheckDetailForm.unitName" class="input-box4" readonly></el-input>
        </el-form-item>
        <el-form-item label="账户专管员：">
          <el-input v-model="newCheckDetailForm.accStaffName" class="input-box4" readonly></el-input>
        </el-form-item>
        <el-form-item label="动态复核经办员：">
          <el-input v-model="newCheckDetailForm.staffName" class="input-box4" readonly></el-input>
        </el-form-item>
        <el-form-item label="复核过程结果：">
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
        <el-form-item label="采取措施：">
          <el-input v-model="newCheckDetailForm.takeSteps" class="input-box4" readonly></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="newCheckDetailForm.remark" class="input-box4" readonly></el-input>
        </el-form-item>
        <el-form-item label="下一环节处理人：">
          <el-input v-model="newCheckDetailForm.nextStaffName" class="input-box4" readonly></el-input>
        </el-form-item>
        <el-form-item label="下一环节采取措施：">
          <el-input v-model="newCheckDetailForm.nextTakeSteps" class="input-box4" readonly></el-input>
        </el-form-item>
        <el-form-item label="下一环节备注：">
          <el-input v-model="newCheckDetailForm.nextRemark" class="input-box4" readonly></el-input>
        </el-form-item>
        <el-form-item label="反馈时间：">
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
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      labelWidth: "140px",
      activeName: "first",
      saveMoneyForm: {},
      newCheckDetailForm: {},
      newForm: {},
      busForm: {},
      rowCount: 3,
      timeListCount: 3,
      isShow: false,
      isShow2: false,
      isShow3: false,
      listLoading: false,
      dialogTableDetailVisible: false,
      operateType: "",
      dynamicrevAccId: "",
      accountNum: "",
      accountName: "",
      tableData2: [],
      multipleSelection: [],
      timeData: [],
      styleObj: {
        background: "#eef1f6",
        "border-color": "#dbdbdb",
        "text-align": "center"
      }
    };
  },
  created() {
    this.operateType = this.$route.query.operateType;
    this.dynamicrevAccId = this.$route.query.dynamicrevAccId;
    this.accountNum = this.$route.query.accountNum;
    this.accountName = this.$route.query.accountName;
    this.handleContent();
    this.getTableData2();
    this.getTimeData();
  },
  methods: {
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
    // 获取时间轴数据
    getTimeData() {
      let prop = {
        rows: this.timeListCount,
        operateType: this.operateType,
        dynamicrevAccId: this.dynamicrevAccId,
        accountNum: this.accountNum,
        accountName: this.accountName
      };
      this.$axios({
        method: "post",
        url: "/banksys/dynamicrev/queryaccoperatebytime.do",
        data: prop
      })
        .then(res => {
          if (res.data.showStatus == "0") {
            if (res.data.code == "1001") {
              this.timeData = res.data.data;
            } else {
              this.$message.error(res.data.msg);
            }
          } else {
            this.timeData = res.data.data;
            this.$message.warning("没有更多数据！！！");
          }
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleContent() {
      let req = {};
      req = {
        dynamicrevAccId: this.dynamicrevAccId,
        operateType: this.operateType
      };
      this.$axios({
        method: "post",
        url: "/banksys/dynamicrev/querydynamicrevdetails.do",
        data: req
      })
        .then(res => {
          this.dataObj = res.data;
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
    handleClick() {},
    // 获取点击的行
    handleClickRow(selection, row) {
      this.multipleSelection = selection;
    },
    handleDetail(id) {
      this.dialogTableDetailVisible = true;
      let req = {};
      req = { fieldDisId: id };
      this.$axios({
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
    getTableData2() {
      this.listLoading = true;
      let prop = {
        rows: this.rowCount,
        operateType: this.operateType,
        dynamicrevAccId: this.dynamicrevAccId
      };
      this.$axios({
        method: "post",
        url: "/banksys/dynamicrev/queryaccfieldstaffdislist.do",
        data: prop
      })
        .then(res => {
          if (res.data.showStatus == "0") {
            if (res.data.code == "1001") {
              this.tableData2 = res.data.data;
              this.listLoading = false;
            } else {
              this.$message.error(res.data.msg);
            }
          } else {
            this.tableData2 = res.data.data;
            this.listLoading = false;
            this.$message.warning("没有更多数据！！！");
          }
        })
        .catch(err => {
          this.$message.error("网络异常，请重试！！！");
        });
    },
    handleShowBox() {
      this.isShow = !this.isShow;
    },
    handleShowBox2() {
      this.isShow2 = !this.isShow2;
    },
    handleShowBox3() {
      this.isShow3 = !this.isShow3;
    },
    handleMoreBox2() {
      this.rowCount += 5;
      this.getTableData2();
    },
    handleMoreBox3() {
      this.timeListCount += 3;
      this.getTimeData();
    },
    backtrack() {
      this.$router.push({ path: "/CheckSituation" });
    }
  }
};
</script>

<style scoped>
.head-top {
  margin-top: 10px;
}
.head_box {
  width: 80%;
  text-align: center;
  margin: 0 auto;
}
table {
  width: 100%;
  border: 1px solid #dbdbdb;
  border-collapse: collapse;
  border-spacing: 0;
  text-align: center;
}
.head_box p {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
}
.center_box {
  width: 80%;
  text-align: center;
  margin: 0 auto;
}
.center_box p {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
}
.bg_color {
  background-color: #eef1f6;
  color: #333;
  width: 160px;
  font-size: 14px;
}
.td_inner {
  padding: 10px;
}
.hover-font-box {
  margin-top: 20px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #a5acf7;
  cursor: pointer;
}
.bottom_box {
  width: 80%;
  margin: 0 auto;
}
.remake_title {
  margin-top: 15px;
  color: rgb(129, 120, 120);
}
</style>