<template>
  <div>
       <Row style='padding-bottom: 15px'>
          <Input   placeholder="暂不可用…" style="width: 200px"  v-model="memberids" disabled="disabled"/>

          <Button type="primary" size="small" @click="searchorderId">搜索</Button>
       </Row>
     <template>
           <Table border :columns="columns1" :data="tranrecorddata" class='nopadding'></Table>
           <Page :total="parseInt(datalength)" style='margin-top:8px' :current="current"   @on-change="changePage" show-elevator></Page>
     </template>
  </div>

</template>
<style>
.nopadding .ivu-table-cell {
  padding-right: 0px;
}
</style>
 <script>
import axios from "axios";
export default {
  data() {
    return {
      memberids: "",
      current: 1,
      urrent: 1,
      pageIndex: 1,
      loading: true,
      columns1: [
        {
          title: "会员Id",
          key: "memberId",
          width: 150
        },
        {
          title: "金额",
          key: "amount",
          width: 150
        },
        {
          title: "类型",
          key: "type",
          width: 150,
          render: (h, params) => {
            const row = params.row;
            let type = row.type;
            if (type == "0") {
              const type = (row.type = "充值");
            } else if (type == "1") {
              const type = (row.type = "提现");
            } else if (type == "2") {
              const type = (row.type = "转账");
            }
            return h("span", {}, type);
          }
        },
        {
          title: "创建时间",
          key: "createTime"
        },
        {
          title: "币种名称",
          key: "symbol",
          width: 160
        },
        {
          title: "提现充值地址",
          key: "address"
        }
      ],
      tranrecorddata: []
    };
  },
  methods: {
    searchorderId() {
      axios
        .post("admin/memberTransaction/pageQuery?memberId?=" + this.memberids)
        .then(res => {
          this.tranrecorddata = res.data.data;
        });
    },
    //分页;
    changePage(pageIndex) {
      this.pageIndex = pageIndex;
      axios
        .post("admin/memberTransaction/pageQuery?pageNo=" + this.pageIndex)
        .then(res => {
          this.datalength = res.data.data.totalNumber;
          this.tranrecorddata = res.data.data.list;
        });
    }
  },
  mounted() {
    axios.post("admin/memberTransaction/pageQuery").then(res => {
      this.datalength = res.data.data.totalNumber;
      this.tranrecorddata = res.data.data.list;
    });
  }
};
</script>