<template>
<div class=" padding:50px 50px ">
         <Row style='padding:0px 8px 8px 8px'>
             <Col span="2" offset="22"><Button type="primary" size="large"  @click="addCoin">添加币种</Button></Col>
          </Row>
    <Table border :columns="columns1" :data="coindata" class='nopadding'></Table>
    <Modal
        v-model="showDetailModel"
        title="详细信息"
        >
        <p style='margin-top:8px'>最小交易手续费: {{currentRow.minTxFee}}</p>
        <p style='margin-top:8px'>最大交易手续费: {{currentRow.maxTxFee}}</p>
        <p style='margin-top:8px'>最小提币数量: {{currentRow.minWithdrawAmount}}</p>
        <p style='margin-top:8px'>最大提币数量: {{currentRow.maxWithdrawAmount}}</p>
    </Modal>
    <Modal
        v-model="showUpdateModel"
        title="币种信息修改"
        @on-ok="update"
        style="padding:10px;"
        width="620"
        >
        <Form :model="formUpdate" :label-width="80" class='form'>
            <FormItem label="中文名称:">
                <Input  :readonly="!isNew" v-model="formUpdate.nameCn"></Input>
            </FormItem>
            <FormItem label="英文名称:">
                <Input :readonly="!isNew" v-model="formUpdate.name"></Input>
            </FormItem>
             <FormItem label="币种单位:">
                <Input :readonly="!isNew" v-model="formUpdate.unit"></Input>
            </FormItem>
            <Row>
                <Col span="12">
                    <FormItem label="充值">
                        <i-switch v-model="formUpdate.canRecharge" true-value="1" false-value="0" size="large">
                            <span slot="open">开放</span>
                            <span slot="close">禁止</span>
                        </i-switch>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="RPC">
                        <i-switch v-model="formUpdate.enableRpc" true-value="1" false-value="0" size="large">
                            <span slot="open">开放</span>
                            <span slot="close">禁止</span>
                        </i-switch>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="提现">
                       <i-switch v-model="formUpdate.canWithdraw" true-value="1" false-value="0" size="large">
                            <span slot="open">启用</span>
                            <span slot="close">禁用</span>
                        </i-switch>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="最小手续费:">
                        <Input  v-model="formUpdate.minTxFee" ></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="最大手续费:">
                        <Input  v-model="formUpdate.maxTxFee" ></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="最小提币量:">
                        <Input v-model="formUpdate.minWithdrawAmount" ></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="最大提币量:">
                        <Input v-model="formUpdate.maxWithdrawAmount" ></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="自动转账">
                        <i-switch v-model="formUpdate.canAutoWithdraw" true-value="1" false-value="0"  size="large">
                            <span slot="open">启用</span>
                            <span slot="close">禁用</span>
                        </i-switch>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="阀值:">
                        <Input v-model="formUpdate.withdrawThreshold"></Input>
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="排序:">
                <Input v-model="formUpdate.sort"></Input>
            </FormItem>
            <FormItem label="状态">
                <i-switch v-model="formUpdate.status" true-value="0" false-value="1" size="large">
                    <span slot="open">启用</span>
                    <span slot="close">禁用</span>
                </i-switch>
            </FormItem>
        </Form>
    </Modal>
</div>
</template>
<style>
.form .ivu-form-item{margin-bottom:2px }
</style>
<script>
import axios from 'axios';
import qs from 'qs';
  export default {
     data(){
      return {
        showDetailModel:false,
        showUpdateModel:false,
        currentRow:{},
        formUpdate:{},
        errorshow:false,
        isNew:false,
        columns1: [
                {
                    title: '中文名',
                    key: 'nameCn'
                },
                {
                    title: '名称(英文)',
                    key: 'name'
                },{
                    title: '币种缩写',
                    key: 'unit'
                },
                {
                    title: '是否支持提现',
                    key: 'canWithdraw',
                    render: (h, params) => {
                        const row=params.row;
                        const canWithdraw=row.canWithdraw==1?'是':'否';
                        return h('span', {
                        },canWithdraw);
                    }
                },
                {
                    title: '是否支持充值',
                    key: 'canRecharge',
                    render: (h, params) => {
                        const row=params.row;
                        const canRecharge=row.canRecharge==1?'是':'否';
                        return h('span', {
                        },canRecharge);
                    }
                },
                {
                    title: '状态',
                    key: 'status',
                    render: (h, params) => {
                        const row=params.row;
                        const status = row.status=='0'?'启用':'禁用';
                        return h('Tag', {
                            props:{
                                color:row.status==0?'green':'red'
                            }
                        },status);
                    }
                } ,{
                    title: '操作',
                    width:160,
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
                                        this.showDetailModel = true;
                                        this.currentRow = params.row;
                                    }
                                }
                            }, '详情'),
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
                                        this.formUpdate.name=params.row.name;
                                        this.formUpdate.minTxFee=params.row.minTxFee;
                                        this.formUpdate.maxTxFee=params.row.maxTxFee;
                                        this.formUpdate.nameCn=params.row.nameCn;
                                        this.formUpdate.withdrawThreshold=params.row.withdrawThreshold;
                                        this.formUpdate.unit=params.row.unit;
                                        this.formUpdate.minWithdrawAmount=params.row.minWithdrawAmount;
                                        this.formUpdate.maxWithdrawAmount=params.row.maxWithdrawAmount;
                                        this.formUpdate.status = params.row.status + '';
                                        this.formUpdate.canAutoWithdraw = params.row.canAutoWithdraw + '';
                                        this.formUpdate.canRecharge = params.row.canRecharge + '';
                                        this.formUpdate.canWithdraw = params.row.canWithdraw + '';
                                        this.formUpdate.enableRpc = params.row.enableRpc + '';
                                        this.formUpdate.sort = params.row.sort;
                                        this.isNew = false;
                                        this.showUpdateModel=true;
                                    }
                                }
                            }, '修改')
                        ]);
                    }
                }
            ],
            coindata: [],
            showWithdrawSet:false
        }
    },
    methods:{
        update(){
            if(this.isNew){
                axios.post('/admin/system/coin/create',qs.stringify(this.formUpdate)).then( res=>{
                    console.log(res.data);
                    if(res.data.code == 0){
                        this.getList();
                    }
                })
            }
            else{
                axios.post('/admin/system/coin/update',qs.stringify(this.formUpdate)).then( res=>{
                    console.log(res.data);
                    if(res.data.code == 0){
                        this.getList();
                    }
                })
            }
        },
        addCoin(){
            this.showUpdateModel = true;
            this.isNew = true;
            this.formUpdate = {};
            this.formUpdate.name= '';
            this.formUpdate.minTxFee = 0;
            this.formUpdate.maxTxFee = 0;
            this.formUpdate.nameCn = '';
            this.formUpdate.withdrawThreshold = 0;
            this.formUpdate.unit = '';
            this.formUpdate.minWithdrawAmount = 0;
            this.formUpdate.maxWithdrawAmount = 0;
            this.formUpdate.status = '0';
            this.formUpdate.canAutoWithdraw = '1';
            this.formUpdate.canRecharge = '1';
            this.formUpdate.canWithdraw = '1';
            this.formUpdate.enableRpc = '1';
            this.formUpdate.sort = 1;
            console.log(this.formUpdate);
        },
        getList(){
            axios.post('/admin/system/coin/pageQuery').then(res=>{
                this.coindata=res.data.data.list
            })
        }
    },
    mounted (){
       this.getList();
    }
}
</script>