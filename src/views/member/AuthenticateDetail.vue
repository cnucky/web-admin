<template>
   <div>
      <div class="examin_mian">
        <Row type="flex" justify="center" class="code-row-bg e_mianinput">
          <Col span="2"> 客户名称 : </Col>
          <Col span="8"> 
            <span>{{ memberName }}</span>
          </Col>
        </Row>
        <Row type="flex" justify="center" class="code-row-bg e_mianinput">
          <Col span="2"> 身份证号码 : </Col>
          <Col span="8">
            <span>{{ IDCard }}</span>
          </Col>
        </Row>
        <Row type="flex" justify="space-around" class="code-row-bg e_img">
          <Col span="6" v-for=" (imginfo, index) in imgUrlArr" :key="index">
            <img :src="imginfo"/>
          </Col>
        </Row>
        <Row type="flex" justify="space-around" class="code-row-bg e_img_center">
          <Col span="7">身份证正面</Col>
          <Col span="7">身份证反面</Col>
          <Col span="7">手持证件</Col>
        </Row>
        <Row v-if="!status">
          <Row type="flex" justify="center" class="code-row-bg" style='margin-top:20px;text-aligin: center'>
            <Col span="6" >
              <RadioGroup v-model="ifPass" @on-change="tabSwitch = !tabSwitch">
                <Radio label="审核通过"></Radio>
                <Radio label="审核驳回" style='margin-left:35px'>
                </Radio>
              </RadioGroup>
            </Col>
          </Row>
          <Row type="flex" justify="center" class="code-row-bg" style='margin-top:20px'>
            <Col span="12">
            <div style="text-align: center">
              <Row  type="flex" justify="center" class="code-row-bg" v-show="!tabSwitch">
                <Col span="4" style='font-size:16px'>驳回理由 :</Col>
                <Col span="16"> <Input v-model="rejectReason" type="textarea" :rows="4" ></Input></Col>
              </Row>
              <Row  type="flex" justify="center" class="code-row-bg" v-show="tabSwitch">
                <Col span="8" style='font-size:16px;color:#2287fe'>审核通过</Col>
              </Row>
            </div>
            </Col>
          </Row>
          <Row type="flex" justify="center" class="code-row-bg" style='margin-top:20px'>
            <Col span="6">
              <Button @click="pass" type="success" long size="large">确 认</Button>
            </Col>
          </Row>
        </Row>
        <Row v-if="!!status" class="passInfo">
          <p v-if="status === 2">审核通过</p>
          <p v-if="status === 1" style="color: #ed3f14">审核未通过</p>
        </Row>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

import { MemberRealNameDetail, memberCheckPass, memberCheckNotPass } from '@/service/getData';
import { setStore, getStore, removeStore } from '@/config/storage';

export default {
  data () {
  return {
      memberName: null,
      IDCard: null,
      imgUrlArr: [],
      ifPass: '审核通过',
      tabSwitch: true,
      rejectReason: null,
      status: null,
      queryID: null
    }
  },
  methods: {
    pass () {
      if(this.tabSwitch) {
        memberCheckPass(this.queryID)
        .then(res => {
          if (res.code === 0) {
            MemberRealNameDetail ({id: this.queryID})
            .then( res => {
              this.status = res.data.auditStatus;
            })
          }
        })
      } else {
        let callBack = memberCheckNotPass({ memberID: this.queryID, rejectReason: `rejectReason=${this.rejectReason}`});
        if (!!callBack) {
          callBack.then(res => {
            if (res.code === 0) {
              MemberRealNameDetail ({id: this.queryID})
              .then( res => {
                this.status = res.data.auditStatus;
              })
            }
          })
        }
      }
    }
  },   
  created (){
    this.queryID = getStore('AuthenticateID');
    MemberRealNameDetail ({id: this.queryID})
    .then (res => {
        this.memberName = res.data.realName;
        this.IDCard = res.data.idCard;
        this.imgUrlArr = [
          res.data.identityCardImgFront,
          res.data.identityCardImgInHand,
          res.data.identityCardImgReverse
        ];
        this.status = res.data.auditStatus;
      console.log(res);
    })
  }
}
</script>

<style scoped>
.examin_mian{ background:#f2f2f2;height:650px; padding-top:50px}
.e_mianinput .ivu-col-span-2{ line-height:2.4;font-size:15px}
.e_img{ margin-top:40px}
.e_img .ivu-col-span-7{ height:165px;border:6px solid #ccc}
.e_img img{ height:153px;width:100%}
.e_img_center { margin-top:20px}
.e_img_center .ivu-col-span-7{ text-align:center;font-size:16px}

.code-row-bg.e_mianinput{
  font-weight: 700;
}
.code-row-bg.e_mianinput span{
  line-height: 36px;
  font-size: 15px;
  font-weight: normal;
}
.passInfo p{
  padding-top: 20px;
  font-size: 25px;
  color: #19be6b;
  font-weight: 700;
  text-align: center;
}
</style>