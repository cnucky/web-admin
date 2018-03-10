<style lang="less">
    @import '../../styles/common.less';
    li{list-style:none}
</style>
<template>
    <div>
        <Row class="margin-top-10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <!-- <Icon type="android-remove"></Icon> -->
                        广告管理
                    </p>
                    <a href="#" slot="extra">
                        <Button type="primary" size="small" @click.prevent="refresh">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                        </Button>
                    </a>
                    <Modal v-model="showModal" :mask-closable='false' :width="500">
                        <h3 slot="header" style="color:#2D8CF0">币种信息</h3>
                        <ul>
                            <li style="margin:6px 100px;"><span>币种编号：&nbsp;&nbsp;</span>{{coinInformation.id}}</li>
                            <li style="margin:6px 100px;"><span>币种名称：&nbsp;&nbsp;</span>{{coinInformation.nameCn}}</li>
                            <li style="margin:6px 100px;"><span>英文名称：&nbsp;&nbsp;</span>{{coinInformation.name}}</li>
                            <li style="margin:6px 100px;"><span>货币单位：&nbsp;&nbsp;</span>{{coinInformation.unit}}</li>
                            <li style="margin:6px 100px;"><span>交易手续费率：&nbsp;&nbsp;</span>{{coinInformation.jyRate}}</li>
                            <li style="margin:6px 100px;"><span>卖出广告最低发布数量：&nbsp;&nbsp;</span>{{coinInformation.sellMinAmount}}</li>
                            <li style="margin:6px 100px;"><span>买入广告最低发布数量：&nbsp;&nbsp;</span>{{coinInformation.buyMinAmount}}</li>
                            <li style="margin:6px 100px;"><span>状态：&nbsp;&nbsp;</span>{{coinInformation.status}}</li>
                        </ul>
                        <div slot="footer">
                        </div>
                    </Modal><!-- 查看按钮模态框 -->
                    <Modal v-model="showEditModal" :closable='false' :mask-closable='false' :width="600">
                        <div slot="header">
                            <Button type="primary" size="large" long>{{modalTitle}}</Button>
                        </div>
                        <Form ref="coinInformation" :model="coinInformation" :rules="ruleValidate" :label-width="170" label-position="right">  
                            <FormItem label="币种编号：" prop="id" v-show="view">
                                <Input v-model="coinInformation.id" disabled></Input>
                            </FormItem>
                            <FormItem label="币种名称：" prop="nameCn">
                                <Input v-model="coinInformation.nameCn"></Input>
                            </FormItem>
                            <FormItem label="英文名称：" prop="name">
                                <Input v-model="coinInformation.name"></Input>
                            </FormItem>
                            <FormItem label="货币单位：" prop="unit">
                                <Input v-model="coinInformation.unit"></Input>
                            </FormItem>
                            <FormItem label="交易手续费率（%）：" prop="jyRate">
                                <Input v-model="coinInformation.jyRate"></Input>
                            </FormItem>
                            <!-- <FormItem label="卖出广告最低发布数量：" prop="sellMinAmount">
                                <Input v-model="coinInformation.sellMinAmount"></Input>
                            </FormItem>
                            <FormItem label="买入广告最低发布数量：" prop="buyMinAmount">
                                <Input v-model="coinInformation.buyMinAmount"></Input>
                            </FormItem> -->
                            <FormItem label="状态：" prop="status">
                                <Select v-model="coinInformation.status">
                                    <Option value="正常">正常</Option>
                                    <Option value="失效">失效</Option>
                                </Select>
                            </FormItem>
                        </Form>
                        <div slot="footer" align="middle" v-if="modalTitle=='修改'">
                            <Button type="primary" :loading="saveLoading" @click.stop.prvent="saveEditPass">保存</Button>
                            <Button @click="cancelEdit">取消</Button>
                        </div>
                        <div slot="footer" align="middle" v-else>
                            <Button type="primary" :loading="saveLoading" @click.stop.prvent="saveAddPass">确认</Button>
                            <Button @click="cancelEdit">取消</Button>
                        </div>
                    </Modal><!-- 修改添加按钮模态框 -->
                    <Row>
                        <Poptip trigger="hover" content="输入币种名称或英文名称查询" placement="bottom-start">
                            <Input icon="search" placeholder="请输入币种名称或英文名称查询" v-model="searchValue" @on-change="handleSearch" style="width: 200px;" />
                        </Poptip>
                        <div style="float:right;">
                            <Button @click="addJobNumber" style="width: 80px" type="primary">上架</Button>
                        </div>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style="margin-top: 10px;">
                        <Table :loading="loading" highlight-row :context="self" height="468" :columns="columnsList" :data="columnsData" border style="width: 100%;" size="small"></Table>
                    </Row>
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page @on-change="changePage" @on-page-size-change="pageSizeChange" show-sizer show-total :total="total" :current="current"></Page>
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
import util from '@/libs/util';
import axios from "axios";
import qs from "qs";
axios.defaults.withCredentials = true;
export default {
    name: 'adManage',
    data () {
        return {
            self: this,
            saveLoading:false,
            showEditModal:false,
            showModal:false,
            loading:true,
            view:true,
            modalTitle:'',
            columnsData: [],
            groupIdN:'',
            searchValue:'',
            pageIndex:1,
            pageSize:10,
            total:1,
            current:1,
            columnsList:[
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '广告编号',
                    width: 108,
                    align: 'center',
                    key: 'id'
                },
                {
                    title: '创建人',
                    // width: 108,
                    align: 'center',
                    key: 'nameCn'
                },
                {
                    title: '币种',
                    // width: 108,
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '广告数量',
                    // width: 108,
                    align: 'center',
                    key: 'unit'
                },
                {
                    title: '广告金额',
                    // width: 108,
                    align: 'center',
                    key: 'jyRate',
                    // render (h, params) {
                    //     const row = params.row;
                    //     return h('span', {
					// 	},row.jyRate+'%');
                    // }
                },
                {
                    title: '广告限额',
                    // width: 108,
                    align: 'center',
                    key: 'sellMinAmount'
                },
                {
                    title: '类型',
                    // width: 108,
                    align: 'center',
                    key: 'buyMinAmount'
                },
                {
                    title: '支付方式',
                    // width: 108,
                    align: 'center',
                    key: 'buyMinAmount'
                },
                {
                    title: '广告状态',
                    // width: 64,
                    align: 'center',
                    key: 'status',
                    render (h, params) {
                        const row = params.row;
                        return h('span', {
						},row.status==0?'失效':'正常');
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    // width: 130,
                    key: 'handle',
                    render:(h,params)=>{
                        return h('div',[
                            h('Button',{
                                props:{
                                    type:'primary',
                                    size:'small'
                                },
                                style:{
                                    marginRight:'10px'
                                },
                                on:{
                                    click:()=>{
                                        this.showEdit(params.row.loginNo);
                                    }
                                }
                            },'下架'),
                            h('Button',
                                {
                                    props: {
                                        type: 'error',
                                        placement: 'top',
                                        size:'small'
                                    }
                                },[
                                h('Poptip', {
                                    props: {
                                        confirm: true,
                                        title: '您确定要删除这条数据吗?',
                                        transfer: true
                                    },
                                    on: {
                                        'on-ok': () =>{
                                            this.remove(params.row.id);
                                        }
                                    }
                                }, '删除')
                            ])
                        ]);
                    }
                }
            ],
            coinInformation: {
                id:'',
                nameCn:'',
                name:'',
                unit:'',
                jyRate:'',
                sellMinAmount:'',
                buyMinAmount:'',
                status:''
            },
            ruleValidate: {
                nameCn: [
                    {required: true, message: '币种名称不能为空', trigger: 'blur' }
                ],
                name: [
                    {required: true, message: '英文名称不能为空',trigger: 'blur' }
                ],
                unit: [
                    {required: true, message: '货币单位不能为空',trigger: 'blur'}
                ],
                jyRate:[
                    {required: true, message: '交易手续费率不能为空',trigger: 'blur'}
                ],
                // sellMinAmount: [
                //     {required: true, message: '卖出广告最低发布数量不能为空',trigger: 'change' }
                // ],
                // buyMinAmount: [
                //     {required: true,message: '买入广告最低发布数量不能为空',trigger: 'change'}
                // ],
                status: [
                    {required: true, message: '状态不能为空', trigger: 'change' }
                ]
            }
        };
    },
    methods: {
        getData (pageIndex,pageSize) {
            let _data = {
                'pageNo':this.pageIndex,
                'pageSize':this.pageSize,
                // 'name':this.searchValue,
                // 'nameCn':this.searchValue
            };
            this.$ajax.post(this.api.otc.advertise,_data)
            .then(res=>{
                this.loading = false;
                let _data=res.data.data;
                this.columnsData = _data.list;
                this.total = _data.totalNumber;
                this.current = _data.pageNo+1;
            })
            .catch(err=>{
                this.loading = false;
                console.log(err);
            });
        },
        refresh(){
            this.loading = true;
            this.getData();
        },
        changePage(pageIndex){
            this.loading = true;
            this.pageIndex = pageIndex;
            this.getData(pageIndex,this.pageSize);
        },
        pageSizeChange(pageSize){
            this.pageIndex = 1;
            this.pageSize = pageSize;
            this.getData(1,pageSize);
        },
        handleSearch () {
            this.getData();
        },
        setShowEditModalData(id){
            this.$ajax.post(this.api.otc.detail,qs.stringify({"id":id}))
            .then(res=>{
                let resJson = res.data.data;
                this.coinInformation.id=resJson.id;
                this.coinInformation.nameCn=resJson.nameCn;
                this.coinInformation.name=resJson.name;
                this.coinInformation.unit=resJson.unit;
                this.coinInformation.jyRate=resJson.jyRate;
                // this.coinInformation.sellMinAmount=resJson.sellMinAmount;
                // this.coinInformation.buyMinAmount=resJson.buyMinAmount;
                if(resJson.status==0){
                    this.coinInformation.status='正常'
                }else{
                    this.coinInformation.status='失效'
                };
            })
            .catch(err=>{
                console.log(err);
            });
        },
        show (id) {
            this.showModal=true;
            this.setShowEditModalData(id);
        },
        showEdit (id) {
            this.view=true;
            this.modalTitle="修改";
            this.showEditModal=true;
            this.setShowEditModalData(id);
        },
        addJobNumber(){
            this.view=false;
            this.modalTitle="添加";
            this.showEditModal=true;
        },
        cancelEdit(){
            this.$refs['coinInformation'].resetFields();
            this.showEditModal=false;
        },
        saveEditPass(){
            const content = "修改成功";
            this.savePass(this.api.otc.update,content);
        },
        saveAddPass(){
            const content = "添加成功";
            this.savePass(this.api.otc.create,content);
        },
        savePass (url,content) {
            this.$refs['coinInformation'].validate((valid) => {
                if (valid) {
                    let formData = {
                        'name':this.coinInformation.name,
                        'nameCn':this.coinInformation.nameCn,
                        'unit':this.coinInformation.unit,
                        'jyRate':this.coinInformation.jyRate,
                        'id':this.coinInformation.id,
                        'status':this.coinInformation.status=='正常'?1:0
                    };
                    formData=qs.stringify(formData);
                    this.$ajax.post(url,formData)
                    .then(res=>{
                        if(res.data.code==0){
                            this.$Message.success(content);
                            this.showEditModal=false;
                            this.getData();
                        }else{
                            this.$Message.error('请求异常');
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }
            });
        },
    },
    created () {
        this.getData();
    },
    watch: {
        
    }
};
</script>
