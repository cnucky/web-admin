<template>
    <div >
     <Row type="flex"   class="code-row-bg">
        <Col span="4"><h3 style='font-size:15px; color:#999999;line-height:2'><span><Icon type="navicon"></Icon> </span> 角色列表</h3></Col>
        <Col span="2" offset="18"><Button type="primary" @click='checkrouter' >添加角色</Button>
        </Col>
     </Row>
     <Row class="margin-top-10 searchable-table-con1" style='margin-top:15px;padding:0px 20px'>
        <Table :columns="role.columns" :data="role.rows" border class='user_center'></Table>
     </Row>
        <Modal
            v-model="showForm"
            title="修改权限"
            @on-ok="submit">
            <Tree ref="tree" :data="permissions" show-checkbox></Tree>
        </Modal>
    </div>
</template>
<style>
.bus_user {
  text-align: center;
}

.bus_user .ivu-col-span-3 {
  border: 2px solid #ccc;
  margin: -1px;
  padding: 8px;
}
.bus_user .ivu-col-span-4 {
  border: 2px solid #ccc;
  margin: -1px;
  padding: 8px;
}
.bus_user .ivu-col-span-5 {
  border: 2px solid #ccc;
  margin: -1px;
  padding: 8px;
}
.bus_user .ivu-col-span-2 {
  border: 2px solid #ccc;
  margin: -1px;
  padding: 8px;
}
.ivu-form-item-required .ivu-form-item-label:before {
  display: none;
}
</style>
<script>
import axios from "axios";
import qs from "qs";
axios.defaults.withCredentials = true;
export default {
  data() {
    return {
        showForm:false,
        permissions:[],
        permissionsMap:{},
        ruleaddform: {
            username: [
            { required: true, message: "请输入用户名", trigger: "blur" }
            ],
            password: [{ required: true, message: "请输入密码", trigger: "blur" }],
            realName: [
            { required: true, message: "请输入真实姓名", trigger: "blur" }
            ],
            mobilephone: [
            { required: true, message: "请输入联系电话", trigger: "blur" }
            ],
            roleid: [{ required: true, message: "请输入部门", trigger: "blur" }]
        },
        role:{
          rows:[],
          columns: [
            {
            title: "ID",
            key: "id",
            width: 120
            },
            {
            title: "角色名称",
            key: "role"
            },
            {
            title: "备注",
            key: "description"
            },
            {
            title: "权限",
            key: "permissions"
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
                            this.showForm = true;
                            this.getRolePermissions(params.row.id);
                        }
                    }
                    },
                    "修改权限"
                )
                ]);
            }
            }
        ]
      }
    };
  },
  methods: {
    submit(){
        console.log(this.permissions);
    },
    checkrouter() {
     
    },
    //将菜单树转化为Tree数据
    toTree(menus,parentPermission){
        menus.forEach((item,index)=>{
            var permission = {};
            permission.title = item.title;
            permission.expand = true;
            permission.children = [];
            permission.id = item.id;
            permission.checked = false;
            if(parentPermission == undefined){
                this.permissions.push(permission);
            }
            else{
                parentPermission.children.push(permission);
            }
            this.permissionsMap[item.name] = permission;
            if(item.subMenu && item.subMenu.length > 0){
                this.toTree(item.subMenu,permission);
            }
        })
    },
    toMap(map,menus){
        menus.forEach((item,index)=>{
            map[item.name] = 1;
            if(item.subMenu && item.subMenu.length > 0){
                this.toMap(map,item.subMenu);
            }
        })
    },
    getPermissions(){
        axios.post(this.api.system.permissionAll).then(
        res => {
            if(res.data.code == 0){
                this.toTree(res.data.data);
                console.log();
            }
        });
    },
    getRolePermissions(roleId){
        axios.post(this.api.system.rolePermission,qs.stringify({'roleId':roleId})).then(
        res => {
            if(res.data.code == 0){
                var map = {};
                this.toMap(map,res.data.data);
                for(var name  in this.permissionsMap){
                    var item = this.permissionsMap[name];
                    if(map[name] == 1 && item.children.length == 0){
                        item['checked'] = true;
                    }
                    else{
                        item['checked'] = false;
                    }
                }
            }
        });
    }
  },
  created:function(){
      this.getPermissions();
  },
  mounted: function() {
    let usesid = this.$route.query.user_id;
    //查询所有角色
    axios.post(this.api.system.role).then(
      res => {
        if(res.data.code == 0){
            this.role.rows = res.data.data;
        }
      },
      re => {
        console.log("sd");
      }
    );
  }
};
</script>