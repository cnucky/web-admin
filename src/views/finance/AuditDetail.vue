<template>
  <div>
    <div class="stepWrapper">
      <Steps :current="1">
        <Step title="已审核"></Step>
        <Step title="待转账"></Step>
        <Step title="交易成功"></Step>
        <!-- <Step title="交易失败"></Step> -->
      </Steps>
    </div>
    <Row class="userDetails">
      <span>用户名：<i>张三</i></span>
      <span>手机号：<i>12345678941</i></span>
      <br>
      <span>提现币种：<i>GXS</i></span>
      
      <span>提现数量：<i>20</i></span>
      <span>手续费：<i>0.2SKS</i></span>
      <span>申请时间：<i>2018-03-06 16:54:52</i></span>

    </Row>
    <Row class="tradeRecord">
      <h3>交易记录</h3>
      <div class="tableWrapper">
        <Table :columns="columns_first" :data="trade_data"></Table>
        <Page :total="10"></Page>
      </div>  
      <p class="line"></p>
      <div class="btnContainer" >
        <Button type="error" size="large">不通过</Button>
        <Button type="success" size="large">通过</Button>
      </div>
    </Row>

  </div>
</template>

<script>
  export default{
    data() {
      return {
        columns_first: [
          {
            title: 'Name',
            key: 'name'
          },
          {
            title: 'Age',
            key: 'age'
          },
          {
            title: 'Address',
            key: 'address'
          }
        ],
        trade_data: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          }
        ]
      }
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
    /* text-align: center;  */
  }
  .btnContainer Button{
    margin: 10px;
  }
  .tableWrapper{
    text-align: center;
    /* line-height: 100px; */
  }
  .tableWrapper .ivu-page {
    margin-top: 20px;
  }
  .line{
    margin-top: 10px;
    border-top: 1px solid #dddee1;
  }
</style>

