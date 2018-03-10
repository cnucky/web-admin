<template>
    <div>
          <Row class=" functionWrapper">
            <div class="queryWrapper">
              <Select v-model="userstatus" style="width:200px" placeholder='审核状态' @on-change="filterUser">
                <Option  :value="statusInner.status" v-for="statusInner in  filterStatus" :key="statusInner.status">
                   {{ statusInner.container }}
                </Option>
              </Select>
            </div>

            <!-- <div class="buttonWrapper">
              <Button type="error">一键审核不通过</Button>
              <Button type="success">一键审核通过</Button>
            </div> -->

          </Row>
            <Row class="margin-top-10 searchable-table-con1">
                <Table :columns="columns_first" :data="userpageCopy" border class='user_center'></Table>
            </Row>
            <div class="pageWrapper">
              <Page  :total="totalNum" style='margin-top:8px' :current="current"   @on-change="changePage" show-elevator></Page>
            </div>
    </div>
</template>

<script>

import axios from "axios";
import { MemberRealNameList } from '@/service/getData';
import { setStore, getStore, removeStore } from '@/config/storage';
import loginVue from '../login.vue';

export default {
  data() {
    return {
      userstatus: null,
      realName: null,
      totalNum: null,
      current: 1,
      pageIndex: 1,
      loading: true,

      filterStatus: [
        { status: 'all', container: '全部' },
        { status: 0, container: '待审核' },
        { status: 1, container: '审核失败' },
        { status: 2, container: '审核成功' },
      ],

      

      columns_first: [
        {
					type: 'selection',
					width: 60,
					align: 'center',
        },
        {
          title: "编号",
          key: "id",
          width: 80
        },
         {
          title: "会员ID",
           width: 80,
          render: (h, obj) => {
            const row = obj.row;
            const memberID = row.member.id;
            return h("span", {}, memberID);
          }
        },
        {
          title: "用户名",
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
          title: "身份证号码",
          key: "idCard",
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
          render: (h, obj) => {
            const row = obj.row;
            let auditStatus = row.auditStatus;
            if (auditStatus === 0)  auditStatus  = "待审核";
            else if (auditStatus == 1) auditStatus = "审核失败";
            else if (auditStatus == 2)  auditStatus = "审核成功";
            return h("span", {}, auditStatus);
          }
        },
        {
          title: "操作",
          render: (h, obj) => {
            let status = obj.row.auditStatus;
            let statusTxt = String;
            let btnType = 'info';

             if (!status) {
              statusTxt = '待审核'; 
              btnType = 'info';
            } else {
              statusTxt = '查看';
              btnType = 'success';
            }
            
            return h("Button", {
              props: {
                type: btnType
              },
              	on: {
								click: () => {
                  removeStore('AuthenticateID');
                  setStore('AuthenticateID',obj.row.id);
                  this.$router.push('memberaudit/auditdetail');
								}
							}
            }, statusTxt);
          }
        },
      ],
      userpage: [],
      userpageCopy: []
    };
  },
  methods: {
    filterUser(val) {
      this.userpageCopy = [];
      this.userpage.forEach( item => {
        if(item.auditStatus === val) {
          this.userpageCopy.push(item);
        }
      })
      if (val === 'all') this.userpageCopy = this.userpage;
     console.log(this.userpageCopy);
    },
    //分页
    changePage(pageIndex) {
      MemberRealNameList({pageNo: pageIndex, pageSize: 10})
      .then(res => {
        this.userpage = res.data.list;
        this.userpageCopy = [...this.userpage];
      });
    }
  },
  created() {
    MemberRealNameList({pageNo: 1, pageSize: 10})
    .then(res => {
      // console.log(res);
      this.userpage = res.data.list;
      this.userpageCopy = [...this.userpage];
      this.totalNum = res.data.totalNumber;

      // console.log(this.userpageCopy);
      this.userpageCopy.forEach( item => {
          if(!!item.auditStatus) item._disabled = true;
          else item._disabled = false;
      } )
      
    });
  }
};
</script>

<style scoped>
  .pageWrapper {
    margin: 20px;
    text-align: right;
  }
  .functionWrapper{
    padding: 20px 0 ;
  }
  .functionWrapper Button {
    margin-right: 10px;
  }
  .queryWrapper{
    float: left;
  }
  .buttonWrapper{
    float: right;
  }
</style>
