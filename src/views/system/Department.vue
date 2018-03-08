<template>
   <div style='padding:10px 10px;'>
    <Row type="flex" class="code-row-bg">
        <Col span="4"> <h4 style='font-size:15px;font-weight:400; line-height:2'>部门管理</h4></Col>
        <Col span="2" offset="18"><Button type="primary" @click="adddeparment = true">添加部门</Button>
                <Modal
                v-model="adddeparment"
                title="增加部门"
                @on-ok="ok"
                @on-cancel="cancel">
                <!--   <Row type="flex" justify="center" align="middle" class="code-row-bg" style='margin-top:8px'>
                        <Col span="3">部门ID :</Col>
                        <Col span="18"><Input v-model="departmentdata.id" placeholder="请输入部门ID" ></Input>
                        </Col>
                </Row>-->
                 <Row type="flex" justify="center" align="middle" class="code-row-bg" style='margin-top:8px'>
                        <Col span="3">部门名称:</Col>
                        <Col span="18"><Input v-model="departmentdata.name" placeholder="请输入部门名称" ></Input>
                        </Col>
                </Row>
                 <Row type="flex" justify="center" align="middle" class="code-row-bg" style='margin-top:8px'>
                        <Col span="3">备注:</Col>
                        <Col span="18"><Input v-model="departmentdata.remark" placeholder="请输入备注" ></Input>
                        </Col>
                </Row>
              <!--  <Row type="flex" justify="center" align="middle" class="code-row-bg" style='margin-top:8px'>
                        <Col span="3">部门领导:</Col>
                        <Col span="18"><Input v-model="departmentdata.leaderId" placeholder="请输入领导Id" ></Input>
                        </Col>
                </Row>-->
                <h4 style='text-align:center;font-size:16px;padding-top:16px;color:red;font-weight:400' v-if="errorshow">{{msg}}</h4>
            </Modal>
        </Col>
     </Row>
          <Card style='margin-top:10px'>
            <Row class="margin-top-10 searchable-table-con1">
                <Table :columns="departmentinfo" :data="department1" border class='user_center'></Table>
            </Row>
         </Card>
    </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      departmentinfo: [
        {
          title: "部门ID",
          key: "id",
          width: 120
        },
        {
          title: "部门",
          key: "name"
        },
        {
          title: "创建时间",
          key: "createTime"
        },
        {
          title: "备注",
          key: "remark"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
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
                      //  let query = {order_id: params.row.orderId };
                      this.$router.push({
                        name: "depar_detail"
                        //query:query
                      });
                      //depar_detail
                    }
                  }
                },
                "查看详情"
              )
            ]);
          }
        }
      ],
      department1: [],
      adddeparment: false,
      errorshow: false,
      msg: "",
      departmentdata: {
        id: "",
        name: "",
        leaderId: "",
        remark: ""
      }
    };
  },
  methods: {
    ok() {
      if (this.departmentdata.name == "") {
        this.errorshow = true;
        this.msg = "请输入部门名称";
        return false;
      } else {
        axios.post("/admin/department/merge?name=" +
              this.departmentdata.name
          )
          .then(
            res => {
              // console.log(res);
              this.$Message.info("添加成功");
              location.reload();
            },
            re => {
              console.log("sd");
            }
          );
      }
    },
    cancel() {
      this.$Message.info("取消操作");
    },
    abb() {
      axios.post("/admin/role/permission").then(res => {
        console.log(res);
        //  this.department1=res.body.data;
      });
    }
  },
  mounted: function() {
    // this.abb();
    axios.post("/admin/department/all").then(res => {
      console.log(res);
      this.department1 = res.data.data;
    });
  }
};
</script>
