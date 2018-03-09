<style lang="less">
@import "./login.less";
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules" method="POST">
                        <FormItem prop="username">
                            <Input v-model="form.username" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem prop="captcha">
                        <Row>
                            <Col span="12">
                                <Input v-model="form.captcha" placeholder="验证码" ><span slot="prepend">
                                <Icon :size="14" type="locked"></Icon>
                                </span></Input>
                            </Col>
                            <Col span="10" offset="2">
                            <img :src="logimg" style='vertical-align: middle;width:95%;height:95%' @click="chanloimg"/></Col>
                        </Row>
                        <FormItem style='margin-top:10px'>
                            <Button @click="handle" type="primary" long>登录</Button>
                        </FormItem>
                        <p style='color:red;text-align:center' v-if="messshow">{{errormessage}}</p>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>

import Cookies from "js-cookie";
import store from "../store";

import { setStore, getStore, removeStore } from "@/config/storage"

import { otherRouter, appRouter } from "@/router/router.js"

import { BASICURL, signIn } from "@/service/getData";

export default {
  data() {
    return {
      form: {
        username: null,
        password: null,
        captcha: null
      },
      messshow: false,
      errormessage: null,
      logimg: `${ BASICURL }/admin/captcha?cid=ADMIN_LOGIN`,
      // ？？？
      rules: {
        username: [{ required: true, message: "不能为空", trigger: "blur" }],
        captcha: [{ required: true, message: "不能为空", trigger: "blur" }],
        password: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      permissions: {}
    };
  },
  methods: {
    chanloimg () {
      this.logimg = `${ BASICURL }admin/captcha?cid=ADMIN_LOGIN&a=${Math.random().toFixed(2)}`;
    },
    processPermission (menu){
        if(menu.name != '') this.permissions[menu.name] = 1;
          
        if(menu.subMenu != null && menu.subMenu.length > 0){
          for (var i = 0; i < menu.subMenu.length; i++) {
            this.processPermission(menu.subMenu[i]);
          }
        }
    },
    handle () {
      signIn(this.form)
      .then( res => {
        console.log(res);
        
          var loginin = res.code;
          var realmenu = [];
          var permissions = {};
          if (loginin == "0") {
            let meuninfo = res.data;
            //该角色没有菜单数据
            for (var i = 0; i < meuninfo.length; i++) {
              this.processPermission(meuninfo[i]);
            }
            //存储信息
            Cookies.set("user", this.form.username);
            localStorage.setItem("ROLEINFO", JSON.stringify(realmenu));
            localStorage.setItem("PERMISSIONS", JSON.stringify(this.permissions));

            this.$store.commit("updatePermission", this.permissions);
            this.$router.push({
              name: "home_index"
            });
          } else {
            this.messshow = true;
            this.errormessage = res.message;
            return false;
          }

        removeStore('leftSidebarList');//登录失效时也需要清除数据

        if (!res.code) {
          setStore('leftSidebarList', res.data);
          let leftSidebarList =  getStore('leftSidebarList');
          let leftSidebarArr = JSON.parse(leftSidebarList);
          // console.log();
           console.log(leftSidebarArr);
          
        }
        }, err => {
          console.log(err);
        });
    }
  },
  beforeRouteLeave(to, from, next) {
      window.location.reload();
      next();
  },
  created () {
    this.logimg = `${ BASICURL }admin/captcha?cid=ADMIN_LOGIN`;
  }
};
</script>