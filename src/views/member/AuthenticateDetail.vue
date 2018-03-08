<template>
   <div style='padding:50px 50px;background:#fff'>
          <div class="examin_mian">
                <Row type="flex" justify="center" class="code-row-bg e_mianinput">
                       <Col span="2"> 客户名称 : </Col>
                       <Col span="8"> <Input v-model="username"  style="width: 300px"></Input></Col>
                </Row>
                 <Row type="flex" justify="center" class="code-row-bg e_mianinput">
                       <Col span="2"> 身份证号码 : </Col>
                       <Col span="8"> <Input v-model="useridcard"  style="width: 300px"></Input></Col>
                </Row>
                <Row type="flex" justify="space-around" class="code-row-bg e_img">
                    <Col span="7"><img :src="frontimg"  @click="largeimg"/></Col>
                    <Col span="7"><img :src="reverseimg" @click="largeimg2"/></Col>
                    <Col span="7"><img :src="handimg" @click="largeimg3"/></Col>
                </Row>
                 <Row type="flex" justify="space-around" class="code-row-bg e_img_center">
                    <Col span="7">身份证正面</Col>
                    <Col span="7">身份证反面</Col>
                    <Col span="7">手持证件</Col>
                </Row>
                <Row type="flex" justify="center" class="code-row-bg" style='margin-top:20px'>
                   <Col span="6" >
                       <RadioGroup v-model="yesorno" @on-change="stschange">
                        <Radio label="审核通过" ></Radio>
                        <Radio label="审核驳回" style='margin-left:35px'>
                        </Radio>
                    </RadioGroup>
                   </Col>
                </Row>
                <Row type="flex" justify="center" class="code-row-bg" style='margin-top:20px'>
                   <Col span="12">
                    <div>
                     <Row  type="flex" justify="center" class="code-row-bg" v-if="isyes==1">
                         <Col span="4" style='font-size:16px'>驳回理由 :</Col>
                         <Col span="16"> <Input v-model="rejectreason" type="textarea" :rows="4" ></Input></Col>
                     </Row>
                     <Row  type="flex" justify="center" class="code-row-bg" v-else="isyes==0" >
                         <Col span="8" style='font-size:16px;color:#2287fe'>审核成功</Col>
                     </Row>
                    </div>
                   </Col>
                </Row>
                <Row type="flex" justify="center" class="code-row-bg" style='margin-top:20px'>
                   <Col span="6">
                         <Button @click="success(false)">确认</Button>
                         <Button style='margin-left:30px' @click="checkno">取消</Button>
                   </Col>
                </Row>
          </div>
          <Modal
            v-model="imgdetail"
            title="照片详情"
            width="500">
            <img :src="frontimg" width="100%" height="100%"/>
        </Modal>
         <Modal
            v-model="imgdetail2"
            title="照片详情"
            width="500">
            <img :src="reverseimg" width="100%" height="100%"/>
        </Modal>
         <Modal
            v-model="imgdetail3"
            title="照片详情"
            width="500">
            <img :src="handimg" width="100%" height="100%"/>
        </Modal>
  </div>
</template>
<style>
.examin_mian{ background:#f2f2f2;height:650px; padding-top:50px}
.e_mianinput .ivu-col-span-2{ line-height:2.4;font-size:15px}
.e_img{ margin-top:40px}
.e_img .ivu-col-span-7{ height:165px;border:6px solid #ccc}
.e_img img{ height:153px;width:100%}
.e_img_center { margin-top:20px}
.e_img_center .ivu-col-span-7{ text-align:center;font-size:16px}
</style>
<script>
import axios from 'axios';
    export default {
        data () {
            return {
              frontimg:'',
              reverseimg:'',
              handimg:'',
              status:'',
              id:'',
              imgdetail:false,
             imgdetail2:false,
             imgdetail3:false,
             yesorno: '审核通过',
             rejectreason: '',
             username:'',
             useridcard:'',
             isyes:'',
             usesid:'',
                    }
        },
      methods:{
                stschange:function(){
                    if(this.yesorno=='审核驳回'){
                       this.isyes='1'
                               }
                       else{
                      this.isyes='0'
                       }
                },
                success(){
                    if(this.yesorno=='审核通过'){
                   axios.patch('admin/memberApplication/'+this.id+'/pass').then(res=>{
                       this.$Notice.success({
                      title: '审核通过'
                             });
                       });
                               }
                     else{
                     //admin/memberApplication/{id}/no-pass
                     let _rejectReason={
                             rejectReason:this.rejectreason
                    }
                 axios.patch('admin/memberApplication/'+this.id+'/no-pass',_rejectReason).then(res=>{
                       this.$Notice.success({
                      title: '审核不通过'
                             });
                        this.$router.push({name: 'mana_lookreal'});
                       })
                     }

                },
                checkno(){
                       this.$router.push({name: 'mana_lookreal'});
                },
            largeimg(){
                 this.imgdetail=true;
                },
                largeimg2(){
                 this.imgdetail2=true;
                },
                largeimg3(){
                   this.imgdetail3=true;
                }
    },
    mounted:function (){
       let usesid=this.$route.query.user_id;
       let usestatus=this.$route.query.user_stastus;
       if(usestatus=='审核通过'){
             this.yesorno='审核通过';
             this.isyes='0';

       }
       else if(usestatus=='审核失败'){
             this.yesorno='审核驳回';
             this.isyes='1';
       }
       this.id=usesid;
       axios.post('admin/memberApplication/detail?id='+usesid).then(res=>{
         // console.log(res)
               this.useridcard=res.data.data.idCard;
               this.username=res.data.data.realName;
              this.status=res.data.data.auditStatus;
               this.frontimg=res.data.data.identityCardImgFront;
               this.reverseimg=res.data.data.identityCardImgReverse;
               this.handimg=res.data.data.identityCardImgInHand;
       })

    }
    }
</script>