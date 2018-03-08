<template>
  <div>
       <Row style='padding-bottom: 15px'>
          <Input   style="width: 200px"  v-model="memberids" placeholder='订单编号'/>
         <Select v-model="pagestatus" style="width:200px" placeholder='订单状态'>
            <Option value="0" label="订单取消">
                <span>订单取消</span>
            </Option>
            <Option value="1" label="订单未付款">
                <span>订单未付款</span>
            </Option>
            <Option value="2" label="订单已付款">
              <span>订单已付款</span>
            </Option>
            <Option value="3" label="订单已完成">
              <span>订单已完成</span>
            </Option><Option value="4" label="订单申诉中">
              <span>订单申诉中</span>
            </Option>
        </Select>
    <Button type="primary" size="small" @click="searchorderId">搜索</Button>
    <Button type="primary" size="large" style='float:right'  @click="refresh">刷新</Button>
       </Row>
       <Modal
        v-model="modal1"
        title="订单详情"
       >
       <p>订单拥有者ID : <span style='padding:3px;font-size:13px;color:#000'>  {{context5}}</span></p>
       <p>订单拥有者用户名 : <span style='padding:3px;font-size:13px;color:#000'> {{context6}}</span></p>
        <p>订单拥有者真实姓名 : <span style='padding:3px;font-size:13px;color:#000'>{{context7}}</span></p>
        <p>交易对象ID : <span style='padding:3px;font-size:13px;color:#000'>{{context3}}</span></p>
        <p>交易对象真实姓名 :<span style='padding:3px;font-size:13px;color:#000'>{{context1}}</span></p>
        <p>交易对象用户名 :<span style='padding:3px;font-size:13px;color:#000'>{{context2}}</span></p>
        <p>交易手续费 :<span style='padding:3px;font-size:13px;color:#000'>{{context4}}</span></p>
        <p>支付方式 :<span style='padding:3px;font-size:13px;color:#000'>{{context8}}</span></p>
    </Modal>
     <template>
           <Table border :columns="columns1" :data="tranrecorddata" class='nopadding'></Table>
            <Page :total="parseInt(datalength)" style='margin-top:8px' :current="current"   @on-change="changePage" show-elevator></Page>

     </template>
     <Modal
        v-model="modal2"
        title="订单状态修改"
         @on-ok="changestatus"
       >
     <Form :model="otcorder" :label-width="80" class='form'>
         <Row type="flex" justify="center">
          <Col span="15">
            <FormItem label="订单编号:">
                <Input v-model="otcorder.otcid" disabled></Input>
             </FormItem>
             <FormItem label="状态选择">
                <Select v-model="otcorder.otcstatus">
                    <Option value="0">订单取消</Option>
                    <Option value="1">订单未付款</Option>
                    <Option value="2">订单已付款</Option>
                    <Option value="3">订单已完成</Option>
                    <Option value="4">订单申诉中</Option>
                </Select>
            </FormItem>
          </Col>
        </Row>
     </Form>
     </Modal>

  </div>
</template>
<style>
.form .ivu-form-item{margin-bottom:2px }
.nopadding .ivu-table-cell{padding-right:0px}
</style>
 <script>
 import axios from 'axios';
    export default {
        data () {
            return {
            pagestatus:'',
            datalength:'',
            memberids:'',
            modal1: false,
            modal2: false,
            current:1,
            pageIndex:1,
            loading:true,
            otcorder:{
                otcid:'',
                otcstatus:''
                    },
            context1:'',
            context2:'',
            context3:'',
            context4:'',
            context5:'',
            context6:'',
            context7:'',
            context8:'',
                   columns1: [
                   {
                        title: '订单编号',
                        key: 'id',
                        width:100
                    },{
                        title: '订单号',
                        key: 'orderSn'
                    },
                    {
                        title: '币种',
                        key: 'coin',
                        width:100,
                        render: (h, params) => {
                            const row=params.row;
                            const coin=row.coin.unit;
                            return h('span', {
                            },coin)
                        }
                    },
                    {
                        title: '广告发布者',
                        key: 'memberRealName'
                    },{
                        title: '价格',
                        key: 'price',
                        width:100
                    },
                    {
                        title: '订单状态',
                        key: 'status',
                        width:100,
                        render: (h, params) => {
                            const row=params.row;
                            let status=row.status;
                          if(status=='0'){
                              const   status=row.status='订单取消'
                                 }
                          else if(status=='1'){
                               const   status=row.status='订单未付款'
                           }
                            else if(status=='2'){
                               const   status=row.status='订单已付款'
                           }else if(status=='3'){
                               const   status=row.status='订单已完成'
                           }else if(status=='4'){
                               const   status=row.status='订单申诉中'
                           }
                            return h('span', {
                            },status);
                        }
                    },
                    {
                       title: '类型',
                        key: 'advertiseType',
                        width:100,
                        render: (h, params) => {
                            const row=params.row;
                            const advertiseType=row.advertiseType=='0'?'购买':'出售';
                            return h('span', {
                            },advertiseType)
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },

                    {
                        title: '操作',
                        key: 'age',
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
                                         this.modal1 = true;
                                         let ids=params.row.id;
                                         axios.post('admin/order/detail?id='+ids).then(res=>{
                                         console.log(res)

                                          this.context1=res.data.data.customerRealName;
                                          this.context2=res.data.data.customerName;
                                          this.context3=res.data.data.customerId;
                                          this.context4=res.data.data.coin.jyRate;
                                          this.context5=res.data.data.memberId;
                                          this.context6=res.data.data.memberName;
                                          this.context7=res.data.data.memberRealName;
                                          this.context8=res.data.data.payMode;

                                         })
                                        }
                                    }
                                }, '查看'),
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
                                         this.modal2=true;
                                          this.otcorder.otcid=params.row.id;
                                          this.otcorder.otcorder=params.row.orderSn;
                                          this.otcorder.otcstatus=params.row.status;
                                        }
                                    }
                                }, '修改状态')
                            ]);
                        }
                    }
                    ],
                    tranrecorddata:[]
               }
        },
    methods:{
        fetchData(){
            axios.get('admin/order/pageQuery').then(res=>{
              this.datalength=res.data.data.totalNumber;
              this.tranrecorddata=res.data.data.list;
            })
        },

  refresh(){
         this.fetchData();
         },
searchorderId(){
               //状态是空 只查询订单号;
               if(this.pagestatus==''){
                 axios.get('admin/order/pageQuery?orderSn='+this.memberids).then(res=>{
                    this.pagestatus='';
             this.datalength=res.data.data.totalNumber;
                  this.tranrecorddata=res.data.data.list;
               })
               }
               //订单号是空 只查状态
              else if(this.memberids==''){
                axios.get('admin/order/pageQuery?status='+this.pagestatus).then(res=>{
                    this.pagestatus='';
                 this.datalength=res.data.data.totalNumber;
                  this.tranrecorddata=res.data.data.list;
               })
               }
               else{
                  axios.get('admin/order/pageQuery?orderSn='+this.memberids).then(res=>{
                    this.pagestatus='';
                  this.datalength=res.data.data.totalNumber;
                  this.tranrecorddata=res.data.data.list;
               })
               }
            },
 changestatus(){
              axios.patch('admin/order/'+this.otcorder.otcid+'/alertStatus?status='+this.otcorder.otcstatus).then(res=>{
                  this.fetchData();
               })
            },
            //分页;
            changePage(pageIndex){
                this.pageIndex = pageIndex;
                axios.get('admin/order/pageQuery?pageNo='+this.pageIndex).then(res=>{
                  this.tranrecorddata=res.data.data.list;
                })
            }
             },
      mounted(){
            this.fetchData();
      }
    }
</script>