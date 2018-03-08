<template>
  <div  class='lk_user'>
      <Row>
        <Col span="4">
            <Row >
               <Col span="14"  class='lk_tx'>
                  <Row type="flex" justify="center" class="code-row-bg" >
                         <Col span="16" class='tx_img'>
                                  <img src="../../images/htx.png" alt="" />
                         </Col>
                 </Row>
                </Col>
               <Col span="18">
                     <Row type="flex" justify="center" class="code-row-bg">
                        <Col span="18" > <Button type="error" style='margin-top:8px'>
                               <span v-if='memberLevel==0'>普通会员</span>
                               <span v-else-if='memberLevel==1'>实名会员</span>
                               <span v-else-if='memberLevel==2'>认证会员</span>
                        </Button></Col>
                    </Row>
               </Col>
            </Row>
        </Col>
        <Col span="18" class='lk_table'>
               <Row>
                <Col span="3">用户ID</Col>
                <Col span="7">{{data.id}}</Col>
                <Col span="3">城市</Col>
                <Col span="7">{{data.location.country}}</Col>
              </Row>
              <Row>
                <Col span="3">会员昵称</Col>
                <Col span="7">{{data.username}}</Col>
                <Col span="3">用户来源</Col>
                <Col span="7">{{data.registerType}}</Col>
              </Row>
              <Row>
                <Col span="3">性别</Col>
                <Col span="7">男</Col>
                <Col span="3">注册时间</Col>
                <Col span="7">{{data.registrationTime}}</Col>
              </Row>
              <Row>
                <Col span="3">邮箱</Col>
                <Col span="7">{{data.email}}</Col>
                <Col span="3">最近登录时间</Col>
                <Col span="7">{{data.lastLoginTime}}</Col>
              </Row>
        </Col>
    </Row>
    <Row class='lk_tit'>
           <Col span="3" style='background:#fff;'>
                <Row style='height:32px'>
                   <Col span='8' style='height:32px'><img src="../../images/mana.png"/></Col>
                   <Col span='12' style='height:32px;line-height:32px;font-size:15px'>统计管理</Col>
                </Row>
           </Col>
    </Row>
    <Row class='lk_gl' style='margin-top:10px;display:none'>
        <Col span="3">
            <div>消费金额</div>
        </Col>
        <Col span="3">
            <div>订单数量</div>
        </Col>
        <Col span="3">
            <div>商品评价</div>
        </Col>
        <Col span="3">
            <div>退货记录</div>
        </Col>
        <Col span="3">
            <div>邀请好友</div>
        </Col>
        <Col span="3">
            <div>登录次数</div>
        </Col>
        <Col span="3">
            <div>剩余抽奖次数</div>
        </Col>
    </Row>
    <Row class='lk_gt' style='display:none'>
        <Col span="3">
            <div>2100</div>
        </Col>
        <Col span="3">
            <div>21</div>
        </Col>
        <Col span="3">
            <div>12</div>
        </Col>
        <Col span="3">
            <div>2</div>
        </Col>
        <Col span="3">
            <div>9</div>
        </Col>
        <Col span="3">
            <div>135</div>
        </Col>
        <Col span="3">
            <div>3</div>
        </Col>
    </Row>
    <Row class='lk_tit' style='margin-top:10px'>
           <Col span="3" style='background:#fff;'>
                <Row style='height:32px'>
                   <Col span='8' style='height:32px'><img src="../../images/mana.png"/></Col>
                   <Col span='12' style='height:32px;line-height:32px;font-size:15px'>地址管理</Col>
                </Row>
           </Col>
    </Row>
    <div class='lk_border' style='display:none'>
        <Row type="flex" justify="center" class="code-row-bg">
            <Col span="3">BTC</Col>
            <Col span="8">W12S321SDRSVH123S!S8</Col>
        </Row>
        <Row type="flex" justify="center" class="code-row-bg">
            <Col span="3">BTC</Col>
            <Col span="8">W12S321SDRSVH123S@S7</Col>
        </Row>
    </div>
    <Row class='lk_tit' style='margin-top:10px'>
           <Col span="3" style='background:#fff;'>
                <Row style='height:32px'>
                   <Col span='8' style='height:32px'><img src="../../images/mana.png"/></Col>
                   <Col span='12' style='height:32px;line-height:32px;font-size:15px'>交易记录</Col>
                </Row>
           </Col>
    </Row>
  </div>
</template>
<style>
.lk_user{padding:10px 10px;background:#f2f2f2 }
.lk_table{text-align:center;font-size:13px}
.lk_table .ivu-row{ height:30px;color:#000}
.lk_table .ivu-col-span-7 { border:1px solid #ccc;padding:8px 0px;background:#e4e4e4;height:30px}
.lk_table .ivu-col-span-3 { border:1px solid #ccc;padding:8px 0px;background:#e4e4e4;height:30px}
.lk_tx{height:80px;overflow:hidden;background-color:#fff }
.lk_tx .tx_img{margin-top:15px;height:50px;border-radius:48%;overflow:hidden;width:80%}
.tx_img img{height:50px;width:100%;}
.lk_tit{ padding:10px 0px;background:#f2f2f2;margin-top:20px}
.lk_gl .ivu-col-span-3{border:1px solid #ccc;text-align:center;padding:8px 0;margin-left:2px;background:#e4e4e4;font-size:14px;color:#000}
.lk_gt .ivu-col-span-3{border:1px solid #ccc;text-align:center;padding:8px 0;margin-left:2px;background:#fff;font-size:14px;color:#000}
.lk_border .ivu-col-span-3{border:1px solid #ccc;text-align:center;padding:8px;background:#e4e4e4}
.lk_border .ivu-col-span-8{border:1px solid #ccc;text-align:center;padding:8px;background:#fff}
</style>
<script>
import axios from 'axios';
  export default{
     data(){
        return {
            data:[],
            memberLevel:''
        }
     },
    created:function (){
      let usesid=this.$route.query.user_id;

      axios.post('admin/member/detail?id='+usesid).then(res=>{
                  this.data=res.data.data;
                  console.log(res)

          });

   }
  }
</script>