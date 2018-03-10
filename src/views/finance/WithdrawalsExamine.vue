<template>
	<div>
		<Row class="btnRow">
			<div class="filterWays clearfix" >

				<Select class="filterSelect" v-model="widthdrawTitle" placeholder="提现方式" @on-change="filterWithdrawWays">
					<Option v-for="(item, index) in widthdrawWays" :value="item.status" :key="item.id">{{ item.container }}</Option>
				</Select>

				<Select class="filterSelect" v-model="statusTitle" placeholder="状态" @on-change="filterStatus">
					<Option v-for="(item, index) in statuWays" :value="item.status" :key="item.id">{{ item.container }}</Option>
				</Select>

			</div>
			<div class=" passBtnContainer clearfix ">
				<Button type="error" @click="ifPassAll(false)">一键审核不通过</Button>
				<Button type="success" @click="ifPassAll(true)">一键审核通过</Button>
			</div>
		</Row>
		<Row class="margin-top-10 searchable-table-con1">
			<Table ref="selection" 
			:columns="columns_first" 
			:data="userpageCopy" 
			border
			@on-selection-change="select">
			</Table>
		</Row>
		<Row class="buttomPageContain">
			<Page :total="pageNum" class="buttomPage" :current="current"   @on-change="changePage" show-elevator></Page>
		</Row>
	</div>
</template>

<script>

import { withdrawManage, auditPass, auditNoPass } from '@/service/getData';

import { setStore, getStore, removeStore } from '@/config/storage';


export default{
	data(){
		return {
			//分页总数
			pageNum: null,
			selectedNumArr: [],
			pageIndex: 1,
			widthdrawTitle: '',
			statusTitle: '',
			widthdrawWays: [
        { status: 0, container: '自动提现' },
        { status: 1, container: '人工审核提现' },
        { status: 'all', container: '全部' },
			],
			statuWays: [
        { status: 0, container: '审核中' },
        { status: 1, container: '等待放币' },
        { status: 2, container: '失败' },
        { status: 3, container: '成功' },
        { status: 'all', container: '全部' },
			],
			userpage: [],
			userpageCopy: [],
			userpageCopy_2: [],
			filterVal: 0,
			filterVal_2: 0,
			operateModel: false,
			operateModelObj: {},
			oprateStatus:　null,
			current: 1,
			
			columns_first: [
				{
					type: 'selection',
					width: 60,
					align: 'center',
        },
        {
					title: '编号',
          key: 'id',
          width: 70,
				},
				{
					title: '会员ID',
					key: 'memberId',
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
            const row = params.row;
            console.log(row);
            
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
				{
					title: '操作',
					key: 'action',
					render: (h, obj) => {
						let status = obj.row.status;
						let statusInner = String;
						let btnType = 'info';

						if( status === 0 ) {
							statusInner = '审核';
							btnType = 'info';
						} else {
							statusInner = '查看';
							btnType = 'success';
						} 

						return h('Button',{
							props: {
								type: btnType
							},
							on: {
								click: () => {
                  this.$router.push('/finance/auditdetail');
                  let userDetail = {
                    id: obj.row.id,
										status: obj.row.status,
                    memberId: obj.row.memberId,
                    username: obj.row.memberUsername,
                    realName: obj.row.memberRealName,
                    coinUnit: obj.row.coin.unit,
                    totalAmount: obj.row.totalAmount,
                    fee: obj.row.fee,
                    createTime: obj.row.createTime
                  }
                  removeStore('userDetails');
                  setStore('userDetails', userDetail);
								}
							}
						}, statusInner)
					}
				}
			],
			}
		},
	methods:{
		checkable() { //能否点击
			this.userpageCopy = []
			this.userpage.forEach( item => {
				if(!!item.status) item._disabled = true;
				else item._disabled = false;
				this.userpageCopy.push(item);
			})
		},
		filterStatusFn( status ) {
			let userpageCopy_2 = [];
			this.userpageCopy.forEach( item => {
				if(item.status === status) {
					userpageCopy_2.push(item)
				}
			})
			this.userpageCopy = userpageCopy_2;
		},
		filterStatus(val) {
      alert(val);
			// this.filterWithdrawWays(this.filterVal);
			// if (val === 1) this.filterStatusFn(0);
			// else if (val === 2) this.filterStatusFn(1);
			// else if (val === 3) this.filterStatusFn(2);
			// else if (val === 4) this.filterStatusFn(3);
		},
		filterWithdrawWays(val) {
      alert(val)
			// this.filterVal = val;
			// this.userpageCopy = this.userpage;
			// if(val === 1 ) {
			// 	this.userpageCopy = [];
			// 	this.userpage.forEach( item => {
			// 		if(!item.isAuto){
			// 			this.userpageCopy.push(item)
			// 		}
			// 	})
			// }else if (val === 2) {
			// 	this.userpageCopy = [];
			// 	this.userpage.forEach( item => {
			// 		if(item.isAuto === 1){
			// 			this.userpageCopy.push(item)
			// 		}
			// 	})
			// } 
		},
		select(selection){
			this.selectedNumArr = [];
			selection.forEach( item => {
				this.selectedNumArr.push(item.id);
			})
			console.log(this.selectedNumArr);
			
		},
		passCheck(fn)	 {
			fn({ ids: this.selectedNumArr })
			.then( res => {
				withdrawManage({ pageNo: this.pageIndex, pageSize: 10 })
				.then( res => {
					this.userpage = res.data.list;
					this.checkable();
				})
			})
		},
		// 一键通过
		ifPassAll(bol){
			if(!this.selectedNumArr.length) {
				this.$Message.warning('尚未选取项目');
			}else {
				let fn = null;

				if(bol) fn = auditPass;
				else fn = auditNoPass;

				this.passCheck(fn);
			}
		},
		changePage(pageIndex){
			this.pageIndex = pageIndex;
			//可以直接设置为单页最大条目数10
			withdrawManage({ pageNo: pageIndex, pageSize: 10 })
			.then( res => {
				this.userpage = res.data.list;
				this.checkable();
				// this.filterWithdrawWays(this.filterVal);
			})
		}
	},
	created(){
		withdrawManage({ pageNo: 1, pageSize: 10 })
		.then( res => {
      this.userpage = res.data.list;
      this.userpageCopy = [...this.userpage];
			this.checkable();
			this.pageNum = res.data.totalNumber;
		})
	}
}
</script>

<style scoped>
	span.modalInner{
		padding:3px;
		font-size:13px;
		color:#ec0909;
	}
	.btnRow{
		margin-bottom: 5px;
	}
	.passBtnContainer{
		float: right;
	}
	.passBtnContainer>button{
		margin-left: 5px;
	}
	.filterWays{
		float: left;
	}
	.filterSelect{
		width: 120px;
	}
  .buttomPageContain{
    text-align: right;
  }
  .buttomPage{
    margin: 25px;
  }
</style>