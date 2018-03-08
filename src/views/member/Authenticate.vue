<template>
    <div>
          <Row style='padding-bottom: 15px'>
                    <Input   placeholder="请输入用户名..." style="width: 160px"  v-model="usernames"/>
                      <Select v-model="userstatus" style="width:200px" placeholder='审核状态'>
                      <Option value="0" label="待审核">
                          <span>待审核</span>
                      </Option>
                      <Option value="1" label="审核失败">
                          <span>审核失败</span>
                      </Option>
                      <Option value="2" label="审核成功">
                        <span>审核成功</span>
                      </Option>
                      </Option>
                  </Select>
                    <Button type="primary" @click="searchname" size="small">查询</Button>
          </Row>
            <Row class="margin-top-10 searchable-table-con1">
                <Table :columns="columns1" :data="userpage" border class='user_center'></Table>
            </Row>
           <Page :total="parseInt(datalength)" style='margin-top:8px' :current="current"   @on-change="changePage" show-elevator></Page>
    </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      userstatus: "",
      usernames: "",
      realName: "",
      datalength: "",
      current: 1,
      pageIndex: 1,
      loading: true,

      columns1: [
        {
          title: "编号",
          key: "id"
        },
        {
          title: "用户名",
          key: "xxx",
          render: (h, params) => {
            const row = params.row;
            const member = row.member.username;
            return h("span", {}, member);
          }
        },
        {
          title: "真实姓名",
          key: "xxx",
          render: (h, params) => {
            const row = params.row;
            const member = row.member.realName;
            return h("span", {}, member);
          }
        },

        {
          title: "注册时间",
          key: "createTime",
          render: (h, params) => {
            const row = params.row;
            const member = row.member.registrationTime;
            return h("span", {}, member);
          }
        },
        {
          title: "状态",
          key: "auditStatus",
          render: (h, params) => {
            const row = params.row;
            let auditStatus = row.auditStatus;
            if (auditStatus == "0") {
              const auditStatus = (row.auditStatus = "待审核");
            } else if (auditStatus == "1") {
              const auditStatus = (row.auditStatus = "审核失败");
            } else if (auditStatus == "2") {
              const auditStatus = (row.auditStatus = "审核成功");
            }
            return h("span", {}, auditStatus);
          }
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            let look = params.row.auditStatus;
            if (look == "审核失败") {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        let query = {
                          user_id: params.row.id,
                          user_stastus: params.row.auditStatus
                        };
                        this.$router.push({
                          name: "mane_examine",
                          query: query
                        });
                      }
                    }
                  },
                  "查看"
                )
              ]);
            } else if (look == "审核成功") {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "success",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        let query = {
                          user_id: params.row.id,
                          user_stastus: params.row.auditStatus
                        };
                        this.$router.push({
                          name: "mane_examine",
                          query: query
                        });
                      }
                    }
                  },
                  "查看"
                )
              ]);
            } else {
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
                        let query = {
                          user_id: params.row.id,
                          user_stastus: params.row.auditStatus
                        };
                        this.$router.push({
                          name: "mane_examine",
                          query: query
                        });
                      }
                    }
                  },
                  "查看"
                )
              ]);
            }
          }
        }
      ],
      userpage: []
    };
  },
  methods: {
    refreshdata() {
      axios.post("admin/memberApplication/pageQuery").then(res => {
        this.userpage = res.data.data.list;
        this.datalength = res.data.data.list.totalNumber;
      });
    },
    searchname() {
      if (this.userstatus == "") {
        //状态空  查名字
        axios
          .post("admin/memberApplication/pageQuery?username=" + this.usernames)
          .then(res => {
            this.userpage = res.data.data.list;
            this.datalength = res.data.data.list.totalNumber;
          });
      } else if (this.usernames == "") {
        //状态
        axios
          .post(
            "admin/memberApplication/pageQuery?auditStatus=" + this.userstatus
          )
          .then(res => {
            this.userpage = res.data.data.list;
            this.datalength = res.data.data.list.totalNumber;
          });
      } else {
        axios
          .post("admin/memberApplication/pageQuery?username=" + this.usernames)
          .then(res => {
            this.userstatus = "";
            this.userpage = res.data.data.list;
            this.datalength = res.data.data.list.totalNumber;
          });
      }
    },

    //分页
    changePage(pageIndex) {
      this.pageIndex = pageIndex;
      axios
        .post("admin/memberApplication/pageQuery?pageNo=" + this.pageIndex)
        .then(res => {
          this.userpage = res.data.data.list;
        });
    }
  },
  mounted() {
    this.refreshdata();
  }
};
</script>
/*  return h('div', [
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
                                    let query = {user_id:params.row.id,user_stastus: params.row.auditStatus};
                                    this.$router.push({
                                        name: 'mane_examine',
                                        query:query
                                    });

                                        }
                                    }
                                }, '审核')
                            ]);*/