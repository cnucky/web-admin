<template>
 	<div>
	 	<Row class="manageRow clearfix">
			<div class="searchContain">
				<span>搜索：</span><Input></Input>
				<Icon 
					type="information-circled" size=16 color="#80848f" 
					title="可根据编号和广告名称搜索 试一试吧">
				</Icon>

			</div>

			<div class="manageWrapper">
				<Button type="error">删除</Button>
				<Button type="info" @click="addAd">添加</Button>
			</div>
		</Row>
		<Modal
			v-model="modal_status"
			title="详情"
			>
			<p >系统广告编号 : <span style='padding:3px;font-size:13px;color:#000'>{{serialNumber1}}</span>  </p>
			<p>创建时间 : <span style='padding:3px;font-size:13px;color:#000'>{{createtime}}</span></p>
			<p >开始时间 : <span style='padding:3px;font-size:13px;color:#000'>{{startime}}</span></p>
			<p>结束时间 : <span style='padding:3px;font-size:13px;color:#000'>{{endtime}}</span></p>
		</Modal>
    <Table border :columns="columns_first" :data="advertisementdata"></Table>
		<!-- 添加广告 -->
		<Modal
			v-model="addModal"
			title="添加广告"
			width="400"
			on-ok="confrimAddAd"
			on-cancel="cancelAddAd">

			<p slot="header" style="color:#5cadff;text-align:center">
				<Icon type="information-circled"></Icon>
				<span style="padding-left: 5px;">添加广告</span>
			</p>

			<div class="addAdWrapper">
				<p>广告名称：<Input v-model="adName"></Input></p>
				<div>广告位置：
					<Select v-model="adPosModel" style="width:200px">
						<Option v-for=" item in adPosition" :value="item.status" :key="item.status">
							{{ item.posName }}
						</Option>
					</Select>
				</div>
				<div>开始时间：
					<DatePicker :value="adStartTime" type="date" format="yyyy-MM-dd HH:mm" placeholder="请选择时间" style="width: 200px"></DatePicker>
					</div>
				<div>结束时间：
					<DatePicker :value="adEndTime" type="date" format="yyyy-MM-dd HH:mm" placeholder="请选择时间" style="width: 200px"></DatePicker>
					</div>
				<!-- <p>广告图片：</p> -->
				<p>图片地址：<Input v-model="picUrl"></Input></p>
				<p>广告备注：<Input type="textarea" :rows="4" placeholder="添加广告备注..."></Input></p>
			</div>

		</Modal>
  </div>
</template>
<script>

import axios from 'axios';

export default {
	data () {
		return {
			adName: null,
			adPosModel: null,
			picUrl: null,
			adStartTime: null,
			adEndTime: null,

			modal_status:false,
			addModal: false,
			adPosition: [
				{status: 0, posName: 'APP轮播'},
				{status: 1, posName: 'PC轮播'},
				{status: 2, posName: 'PC分类'}
			],


			serialNumber1:'',
			startime:'',
			endtime:'',
			createtime:'',
				columns_first: [
					{
						type: 'selection',
						width: 60
					},
					{
						title: '编号',
						key: 'serialNumber',
						width:100
					},
					{
						title: '广告名称',
						key: 'name'
					},
					{
						title: '广告位置',
						width: 90,
						render: (h, params) => {
							let sysAdLoc = params.row.sysAdvertiseLocation;
							let sysAdLocName = String;

							if(sysAdLoc === 0) sysAdLocName = 'APP轮播';
							else if(sysAdLoc === 1) sysAdLocName = 'pc 轮播';
							else if(sysAdLoc === 2) sysAdLocName = 'pc 分类';
										
							return h('span', {
							},sysAdLocName);
						}
					},
					{
						title: '图片地址',
						key: 'url'
					},
					{
						title: '时间',
						width: 220,
						render: (h, obj) => {
							let endTime = obj.row.startTime;
							let startTime = obj.row.endTime;
							let tiemStr = `开始时间：${startTime}\n结束时间：${endTime}`;
							
							return h('pre', {

							},tiemStr)
						}
					},
					{
						title: '状态',
						width: 90,
						render: (h, obj) => {
							let status=obj.row.status;
							let statuStr = String;

							if(status === 0) statuStr = '上线';
							else if(status === 1) statuStr = '下线';

							return h('span', {
							}, statuStr);

						}
					},
					{
						title: '点击次数',
						width: 90,
						key: 'numberOfClicks'
					},
					{
						title: '操作',
						width:120,
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
											type: 'info',
											size: 'small'
									},
									style: {
											marginRight: '5px'
									},
									on: {
											click: () => {
									this.modal1=true;
									let ids=params.row.serialNumber;
											axios.post('/admin/sysAdvertise/detail?serialNumber='+ids).then(res=>{
											console.log(res);
											this.serialNumber1=res.data.data.serialNumber;
											this.startime=res.data.data.startTime;
												this.endtime=res.data.data.endTime;
												this.createtime=res.data.data.createTime;
												})
											}
										}
									}, '查看详情 编辑')
							]);
							}
					}
			],
			advertisementdata: [
			]
		}
	},
	methods: {
		addAd() {
			this.addModal = true;
		},
		confrimAddAd () {
			this.addModal = false;
			console.log(this.adStartTime);
			console.log(this.adEndTime);
		},
		cancelAddAd () {
			this.addModal = false;
		}
	},
	mounted(){
				axios.post('admin/sysAdvertise/all').then(res=>{
	this.advertisementdata= res.data.data
		})
	}
}
</script>

<style scoped>
	.manageRow{
		height: 45px;
	}
	.searchContain{
		display: inline-block;
	}	
	.searchContain .ivu-input-wrapper {
		width: 150px;
	}
	.searchContain span{
    vertical-align: middle;
		font-size: 15px;
	}
	.searchContain i{
		vertical-align: middle;
	}
	.manageWrapper{
		float: right;
	}
	.manageWrapper Button {
		margin-right: 10px;
	}
	.addAdWrapper{
		font-size: 15px;
	}
	.addAdWrapper>p,.addAdWrapper>div{
		margin-bottom: 10px;
	}
	.addAdWrapper .ivu-input-wrapper.ivu-input-type{
		width: 75%;
	}
	/* .searchContain{
		margin-bottom: 10px;
	} */
	/* .searchContain Input {
		width: 200px;
	} */
</style>