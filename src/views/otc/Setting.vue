<template>
 <div>
          <Row style='padding:0px 8px 8px 8px'>
             <Col span="2" offset="22"><Button type="primary" size="large"  @click="addcoin">添加币种</Button></Col>
          </Row>
          <Modal
        v-model="modal2"
        title="修改币种信息"
          @on-ok="ischang"
        >
        <Form :model="formItemmodify" :label-width="80" class='form'>
         <Row type="flex" justify="center">
          <Col span="15">
      <!--  <p style='margin-top:8px'>主键 :{{formItemmodify.nowid}} </p> -->
            <FormItem label="名称(英文):">
                    <Input v-model="formItemmodify.nowname" ></Input>
            </FormItem>
            <FormItem label="中文名:">
                    <Input v-model="formItemmodify.nownamecn" ></Input>
            </FormItem>
            <FormItem label="币种缩写:">
                    <Input v-model="formItemmodify.nowunit" ></Input>
            </FormItem>
            <FormItem label="状态选择">
               <Select v-model="formItemmodify.passstatus">
                    <Option value="0">启用</Option>
                    <Option value="1">禁用</Option>
                </Select>
           </FormItem>
           <FormItem label="手续费(‰):">
                        <Input v-model="formItemmodify.nowjy" ></Input>
            </FormItem>
            <FormItem label="最低卖出量:">
                        <Input v-model="formItemmodify.nowmaxsell" ></Input>
            </FormItem>
            <FormItem label="最低卖入量:">
                        <Input v-model="formItemmodify.nowminsell" ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
         <Modal
        v-model="modal1"
        title="添加法币"
         @on-ok="isadd"
        >
         <Form :model="formItem" :label-width="80" class='form'>
         <Row type="flex" justify="center">
          <Col span="15">
             <FormItem label="英文名称:">
                <Input v-model="formItem.addname" ></Input>
             </FormItem>
             <FormItem label="中文名称:">
                <Input v-model="formItem.addnamecn" ></Input>
             </FormItem>
           <FormItem label="币种缩写:">
                <Input v-model="formItem.addunit" ></Input>
             </FormItem>
              <FormItem label="交易手续费:">
                <Input v-model="formItem.addjy" ></Input>
             </FormItem>
              <FormItem label="最小卖出量:">
                <Input v-model="formItem.addminsell" ></Input>
             </FormItem>
              <FormItem label="最小买入量:">
                <Input v-model="formItem.addminbuy" ></Input>
             </FormItem>
            </Col>
        </Row>
        </Form>
    </Modal>
     <Table border :columns="columns1" :data="exchange" class='nopadding'></Table>
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
            modal2:false,
            modal1:false,


     formItemmodify:{
           nowid:'',
            nowname:'',
            nowunit:'',
            nownamecn:'',
            nowmaxsell:'',
            nowminsell:'',
            passstatus:'',
            nowjy:''
           },

         formItem:{
            addname:'',
            addnamecn:'',
            addunit:'',
            addjy:'',
            addminsell:'',
            addminbuy:''
            },
                columns1: [
                   {
                        title: '币种',

                         width:100,
                         key: 'id',
                    },
                    {
                        title: '名称',

                         key: 'name',
                    },
                    {
                        title: '缩写',
                        key: 'unit'
                    },
                    {
                        title: '币种名称',
                        key: 'nameCn'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            const row=params.row;
                            const status=row.status=='0'?'启用':'禁用';
                            return h('span', {
                            },status);
                        }
                    },
                    {
                        title: '最小卖入数量',
                        key: 'buyMinAmount'
                    },
                    {
                        title: '最低卖出数量',
                        key: 'sellMinAmount'
                    },
                    {
                        title: '交易手续费(‰)',
                        key: 'jyRate'
                    },
                    {
                        title: '操作',
                        key: 'age',
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
                                           this.modal2=true;
                                            const row=params.row;
                                        this.formItemmodify.nowid=params.row.id;
                                         this.formItemmodify.nowname=params.row.name;
                                         this.formItemmodify.nownamecn=params.row.nameCn;
                                         this.formItemmodify.nowjy=params.row.jyRate;
                                        this.formItemmodify.nowunit=params.row.unit;
                                        this.formItemmodify.nowmaxsell=params.row.buyMinAmount;
                                        this.formItemmodify.nowminsell=params.row.sellMinAmount;
                                        this.formItemmodify.passstatus=params.row.status;
                                        }
                                    }
                                }, '修改')
                            ]);
                        }
                    }
                ],
                exchange: []
          }
        },
       methods:{
          ischang(){
       if(this.passstatus==''){
         return false;
         }
       else{
         axios.post('admin/OtcCoin/update?id='+this.formItemmodify.nowid+'&name='+this.formItemmodify.nowname+'&nameCn='+this.formItemmodify.nownamecn+'&unit='+this.formItemmodify.nowunit+'&status='+this.formItemmodify.passstatus+'&jyRate='+this.formItemmodify.nowjy+'&buyMinAmount='+this.formItemmodify.nowminsell+'&sellMinAmount='+this.formItemmodify.nowmaxsell).then(res=>{
            this.refreshdata()
         })
       }
          },
          refreshdata(){
            axios.post('admin/OtcCoin/pageQuery').then(res=>{
             this.exchange= res.data.data.list;
             })
          },
          //模态框
          addcoin(){
        this.modal1=true;
          },
         //添加法币
          isadd(){
          if(this.addname!=''&&this.addnamecn!=''&&this.addunit!=''){
              axios.post('admin/OtcCoin/create?name='+this.formItem.addname+'&nameCn='+this.formItem.addnamecn+'&unit='+this.formItem.addunit+'&jyRate='+this.formItem.addjy+'&sellMinAmount='+this.formItem.addminsell+'&buyMinAmount='+this.formItem.addminbuy).then(res=>{
                this.refreshdata()
           })
          }else{
           return false
          }
          }
         },
      mounted(){
          this.refreshdata();
     }
    }
</script>