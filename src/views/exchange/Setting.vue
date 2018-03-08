<template>
 <div>
          <Row style='padding:0px 8px 8px 8px'>
              <Col span="2" offset="22"><Button type="primary" size="large"  @click="addcoin">添加交易对</Button></Col>
          </Row>
    <Modal
        v-model="modal2"
        title="修改信息"
         @on-ok="ischang">
         <Form :model="formItem" :label-width="80" class='form'>
         <Row type="flex" justify="center">
          <Col span="15">
             <FormItem label="币种对:">
                <Input v-model="formItem.coinname" ></Input>
             </FormItem>
             <FormItem label="当前手续费:">
                <Input v-model="formItem.fee" ></Input>
             </FormItem>
             <FormItem label="状态选择">
            <Select v-model="formItem.coinstatus">
                <Option value="1">启用</Option>
                <Option value="2">禁用</Option>
            </Select>
            </FormItem>
            </Col>
        </Row>
        </Form>
    </Modal>
     <Modal
        v-model="modal3"
        title="添加币种"
         @on-ok="info(false)">
        <Row type="flex" justify="center" class='form'  >
              <Col span="15" style='background:#fff;padding:18px 10px;border-radius:8px'>
                     <Form :model="formLeft2" label-position="left" :label-width="100">
                        <FormItem label="币种名称(英文):">
                            <Input v-model="formLeft2.name"></Input>
                        </FormItem>
                        <FormItem label="币种中文名:">
                            <Input v-model="formLeft2.nameCn"></Input>
                        </FormItem>
                        <FormItem label="币种缩写:">
                            <Input v-model="formLeft2.unit"></Input>
                        </FormItem>
                        <FormItem label="手续费:">
                            <Input v-model="formLeft2.jyRate"></Input>
                        </FormItem>
                        <h3 v-show="pshow" style='color:red;text-align:center;padding-bottom:8px'>请填写完整信息</h3>
                    </Form>
              </Col>
         </Row>
    </Modal>
          <Table border :columns="columns1" :data="exchange" class='nopadding'></Table>
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
import axios from "axios";
export default {
  data() {
    return {
      modal2: false,
      modal3: false,

      formItem: {
        fee: "",
        coinname: "",
        coinstatus: ""
      },
      pshow: false,

      formLeft2: {
        name: "",
        nameCn: "",
        unit: "",
        jyRate: ""
      },

      coinmin: "",
      coinmax: "",
      coinhl: "",
      coinmy: "",
      columns1: [
        {
          title: "序号",
          width: 100,
          type: "index"
        },
        {
          title: "交易对",
          key: "symbol"
        },
        {
          title: "结算币种",
          key: "baseSymbol"
        },
        {
          title: "交易币种",
          key: "coinSymbol"
        },
        {
          title: "手续费",
          key: "fee",
          render: (h, params) => {
            const row = params.row;
            const fee = row.fee * 1000 + "‰";
            return h("span", {}, fee);
          }
        },
        {
          title: "状态",
          key: "enable",
          render: (h, params) => {
            const row = params.row;
            const enable = row.enable == "1" ? "启用" : "禁用";
            return h("span", {}, enable);
          }
        },
        {
          title: "操作",
          key: "xx",
          width: 120,
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
                      this.modal2 = true;
                      const row = params.row;
                      this.formItem.coinname = params.row.symbol;
                      this.formItem.fee = params.row.fee;
                      this.formItem.coinstatus = params.row.enable;
                      //  console.log(this.formItem.coinstatus)
                    }
                  }
                },
                "修改"
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
      axios.post("admin/exchangeCoin/pageQuery").then(res => {
        this.exchange = res.data.data.content;
      });
    },
    addcoin() {
      this.modal3 = true;
    },
    ischang() {
      axios
        .post(
          "admin/exchangeCoin/alterRate?symbol=" +
            this.formItem.coinname +
            "&fee=" +
            this.formItem.fee +
            "&enable=" +
            this.formItem.coinstatus
        )
        .then(res => {
          this.refreshdata();
        });
    },
    //添加exchang币种
    info(nodesc) {
      if (
        this.formLeft2.name != "" &&
        this.formLeft2.nameCn != "" &&
        this.formLeft2.unit != ""
      ) {
        axios
          .post("admin/exchangeCoin/create", qs.stringify(this.formLeft))
          .then(res => {
            if (res.status == "200") {
              this.$Notice.info({
                title: "币种添加成功"
              });
            }
            this.refreshdata();
          });
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.refreshdata();
  }
};
</script>