<template>
  <div>
    <div class="stepWrapper">
      <Steps :current="status">
        <Step title="已审核" v-if="!!status" ></Step>
        <Step title="待审核" v-if="!status" ></Step>
        <Step title="待转账"></Step>
        <Step title="交易成功"></Step>
        <!-- <Step title="交易失败"></Step> -->
      </Steps>
    </div>
    <Row class="userDetails">
         
      <span>用户名：<i>{{ userInfo.username }}</i></span>
      <span>真实姓名：<i>{{ userInfo.realName }}</i></span>
      <br>
      <span>提现币种：<i>{{ userInfo.coinUnit }}</i></span>
      
      <span>提现数量：<i>{{ userInfo.totalAmount }}</i></span>
      <span>手续费：<i>{{ userInfo.fee }}</i></span>
      <span>申请时间：<i>{{ userInfo.createTime }}</i></span>

    </Row>
    <Row class="tradeRecord">
      <h3>交易记录</h3>
      <div class="tableWrapper">
        <Table :columns="columns_first" :data="trade_data"></Table>
        <Page :total="totalNum" :page-size=6  @on-change="changePage" ></Page>
      </div>  
      <p class="line"></p>
      <div class="btnContainer" v-if="!status">
        <Button type="error" size="large" @click="ifPass(false)">不通过</Button>
        <Button type="success" size="large" @click="ifPass(true)">通过</Button>
      </div>
    </Row>

  </div>
</template>

<script>

import { setStore, getStore, removeStore } from '@/config/storage';
import { auditPass, auditNoPass, withdrawManage, perTradeAll } from '@/service/getData';

export default{
    data() {
      return {
        userInfo: {},
        totalNum: null,
        status: null,
        columns_first: [
         	{
					title: '真实姓名',
					key: 'memberRealName',
				},
				{
					title: '会员账号',
					key: 'memberUsername'
				},
				{
					title: '申请时间',
					key: 'createTime',
					width: 100
				},
				{
					title: '交易编号',
					key: 'transactionNumber'
				},
				{
					title: '提现币种',
					key: 'coin',
					render: (h, obj) => {
						let unit = obj.row.coin.unit;
						return h('span', {
						}, unit)
					}
				},
				{
					title: '提现数量',
					key: 'totalAmount'
				},
				{
					title: '提现方式',
					key: 'isAuto',
					render: (h, params) => {
						const row=params.row;
						const isAuto=row.isAuto=='0'?'自动提现':'人工审核提现';
						return h('span', {
						},isAuto)
					}
				},
				{
					title: '手续费',
					key: 'fee',
					render: (h, obj) => {
						let fee = obj.row.fee;
						let unit = obj.row.coin.unit;
						
						return h('span', {
						}, fee+unit)
					}
				},
				{
					title: '状态',
					key: 'status',
					render: (h, obj) => {
						let status=obj.row.status;
						let statusInner = String;

						if(status === 0) statusInner = '待审核';
						else if(status === 1) statusInner = '等待放币';
						else if(status === 2) statusInner = '失败';
						else if(status === 3) statusInner = '成功';
						
						return h('span', {
						},statusInner);
					}
				},
        ],
        trade_data: []
      }
    },
    methods: {
     changePage (pageIndex) {
			perTradeAll({ pageNo: pageIndex, pageSize: 6, memberId: this.userInfo.memberId})
			.then( res => {
			  this.trade_data = res.data.list;
			})
     },
    ifPass (bol) {
      let id = this.userInfo.id;
      console.log(this.userInfo);
      let fn = null;

      if (bol)  fn = auditPass;
      else fn = auditNoPass;

      fn({ ids: [id] })
      .then( res => {
        // console.log(res);
        if (!res.code) {
          this.$Message.success('审核通过!');
        }else {
          this.$Message.error('审核不通过!');
        }
          this.$router.push('/finance/userwithdrawals');
        // this.$Message.success('审核通过');
        // this.$Message.warning('This is a warning tip');
        // this.$Message.error('This is an error tip');
       })
     }
    },
    created () {
      this.userInfo = JSON.parse(getStore('userDetails'));
      this.status = this.userInfo.status;
      console.log(this.userInfo.memberId);
      perTradeAll({ pageNo: 1, pageSize: 6,memberId: this.userInfo.memberId })
      .then( res => {
        if(!res.code)
        this.trade_data = res.data.list;
        this.totalNum =  res.data.totalNumber;
        console.log(res);
      }, err => {
        console.log(err);
      })
    }
  }
</script>

<style scoped>
  .stepWrapper{
    padding: 10px 0;
    padding-left: 10%;
  }
  .userDetails{
    font-size: 13px;
  }
  .userDetails span {
    padding-left: 10px;
    display: inline-block;
    min-width: 150px;
    height: 25px;
    font-weight: 700;
  }
  .userDetails i{
    font-style: normal;
    font-weight: normal;
  }
  .tradeRecord{
    padding-left: 10px;
    margin-top: 10px;
  }
  .tradeRecord h3{
    color: #2b85e4;
    margin-bottom: 10px;
  }
  .btnContainer{
    margin-top: 15px;
    text-align: center; 
  }
  .btnContainer Button{
    margin: 10px;
  }
  .tableWrapper{
    text-align: right;
    /* line-height: 100px; */
  }
  .tableWrapper .ivu-page {
    margin-top: 20px;
    margin-right: 80px;
  }
  .line{
    margin-top: 10px;
    border-top: 1px solid #dddee1;
  }
</style>

