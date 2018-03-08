<!--
场外交易广告管理
 -->
<template>
  <div>
   <Row style='padding-bottom: 15px'>
        <Input   placeholder="请输入用户名..." style="width: 200px"  v-model="orderIds"/>
        <Button type="primary" size="small" @click="searchorderId">搜索</Button>
      </Row>
    <Modal
        v-model="modalstatus"
        title="修改广告状态"
           @on-ok="ok">
        <Form :model="otccoin" :label-width="80" class='form'>
         <Row type="flex" justify="center">
          <Col span="15">
              <FormItem label="编号名称:">
                   <Input v-model="otccoin.order1"></Input>
              </FormItem>
              <FormItem label="状态选择">
                  <Select v-model="otccoin.model9">
                      <Option value="0">上线</Option>
                      <Option value="1">下线</Option>
                      <Option value="2">关闭</Option>
                  </Select>
              </FormItem>
         </Col>
        </Row>
       </Form>
    </Modal>
    <Modal
        v-model="advertismodel"
        title="查看广告信息">
        <Form :model="advertisedata" :label-width="80" class='form'>
              <Card dis-hover>
                 <p>用户城市 : &nbsp;&nbsp;{{advertisedata.localhost}}</p>
                  <p>市场价 : &nbsp;&nbsp;{{advertisedata.marketprice}}</p>
                 <p>支付方式 : &nbsp;&nbsp;{{advertisedata.paymode}}</p>
                 <p>备注 : &nbsp;&nbsp;{{advertisedata.remakes}}</p>
                 <p>最低单笔交易额 : &nbsp;&nbsp;{{advertisedata.mincoin}}</p>
                 <p>最高单笔交易额 : &nbsp;&nbsp;{{advertisedata.maxcoin}}</p>
                 <p>付款期限(分钟) : &nbsp;&nbsp;{{advertisedata.timelimit}}</p>
                 <p>溢价百分比 : &nbsp;&nbsp;{{advertisedata.premiserate}}</p>
              </Card>
       </Form>
    </Modal>
     <template>
           <Table border :columns="columns1" :data="exchange" class='nopadding'></Table>
     </template>
      <Page :total="parseInt(datalength)" style='margin-top:8px'></Page>
  </div>

</template>
<style>
.form .ivu-form-item {
  margin-bottom: 2px;
}
.nopadding .ivu-table-cell {
  padding-right: 0px;
}
</style>
 <script>
import qs from "qs";
import axios from "axios";
export default {
  data() {
    return {
      advertismodel: false,
      advertisedata: {
        paymode: "",
        localhost: "",
        remakes: "",
        mincoin: "",
        maxcoin: "",
        timelimit: "",
        premiserate: "",
        marketprice: ""
      },

      datalength: "",
      orderIds: "",
      modalstatus: false,

      otccoin: {
        order1: "",
        model9: ""
      },

      statuspass: "",
      columns1: [
        {
          title: "编号",
          key: "id"
        },
        {
          title: "用户名",
          key: "member",
          render: (h, params) => {
            const row = params.row;
            const member = row.member.realName;
            return h("span", {}, member);
          }
        },
        {
          title: "币种",
          key: "coin",
          width: 120,
          render: (h, params) => {
            const row = params.row;
            const coin = row.coin.nameCn;
            return h("span", {}, coin);
          }
        },
        {
          title: "价格",
          key: "price",
          width: 120
        },
        {
          title: "数量",
          key: "number",
          width: 120
        },
        {
          title: "挂单方向",
          key: "advertiseType",
          render: (h, params) => {
            const row = params.row;
            const advertiseType = row.advertiseType == "0" ? "买入" : "卖出";
            return h("span", {}, advertiseType);
          }
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            const row = params.row;
            let status = row.status;
            if (status == "0") {
              const status = (row.status = "上架");
            } else if (status == "1") {
              const status = (row.status = "下线");
            } else if (status == "2") {
              const status = (row.status = "关闭");
            }
            return h("span", {}, status);
          }
        },
        {
          title: "发布时间",
          key: "createTime"
        },
        {
          title: "操作",
          key: "age",
          width: 180,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.advertismodel = true;
                      const row = params.row;
                      let needis = params.row.id;
                      axios
                        .post("admin/advertise/detail?id=" + needis)
                        .then(res => {
                          this.advertisedata.paymode = res.data.data.payMode;
                          this.advertisedata.localhost =
                            res.data.data.member.location.country;
                          this.advertisedata.remakes = res.data.data.remark;
                          this.advertisedata.mincoin = res.data.data.minLimit;
                          this.advertisedata.maxcoin = res.data.data.maxLimit;
                          this.advertisedata.timelimit =
                            res.data.data.timeLimit;
                          this.advertisedata.premiserate =
                            res.data.data.premiseRate;
                          this.advertisedata.marketprice =
                            res.data.data.marketPrice;
                        });
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.modalstatus = true;
                      const row = params.row;
                      this.otccoin.order1 = params.row.id;
                    }
                  }
                },
                "修改状态"
              )
            ]);
          }
        }
      ],
      exchange: []
    };
  },
  methods: {
    refreshdata() {
      axios.post("admin/advertise/pageQuery").then(res => {
        this.datalength = res.data.data.list.length;
        this.exchange = res.data.data.list;
      });
    },
    searchorderId() {
      axios
        .post("admin/advertise/pageQuery?realName=" + this.orderIds)
        .then(res => {
          this.exchange = res.data.data;
        });
    },

    ok() {
      axios
        .post(
          "admin/advertise/alterStatus?id=" +
            this.otccoin.order1 +
            "&status=" +
            this.otccoin.model9
        )
        .then(res => {
          this.refreshdata();
        });
    }
  },
  mounted() {
    this.refreshdata();
  }
};
</script>