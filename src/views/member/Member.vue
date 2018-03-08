<template>
	<div >
		<Card>
			<Row style='padding-bottom: 15px'>
					<Input   placeholder="请输入姓名搜搜..." style="width: 200px"  v-model="realName"/>
					<Button type="primary" @click="searchname">搜索</Button>
			</Row>
			<Row class="margin-top-10 searchable-table-con1">
					<Table :columns="columns1" :data="userpage" border class='user_center'></Table>
			</Row>
			<Page :total="parseInt(datalength)" style='margin-top:8px' :current="current"   @on-change="changePage" show-elevator></Page>
		</Card>
  </div>
</template>

<style>
.user_center .ivu-table-border td{ text-align:center}
.user_center .ivu-table-border th{ text-align:center}
</style>

<script>
import axios from 'axios';

    export default {
        data () {
            return {
                usemmuber:'',
                current:1,
                pageIndex:1,
                loading:true,
                datalength:'',
                columns1: [
                    {
                        title: '会员ID',
                        key: 'id'
                    },
                    {
                        title: '真实姓名',
                        key: 'realName'
                    },
                    {
                        title: '会员昵称',
                        key: 'username'
                    },
                    {
                        title: '邮箱',
                        key: 'email',
                        width:160
                    },
                    {
                        title: '注册时间',
                        key: 'registrationTime'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            const row=params.row;
                            const status=row.status=='0'?'正常':'失效';
                            return h('span', {
                            },status);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button',
                                {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                 let query = {user_id: params.row.id };
                                    this.$router.push({
                                        name: 'mana_look',
                                        query:query
                                    });
                                        }
                                    }
                                }, '查看')
                            ]);
                        }
                    }
                ],
                userpage: [],
                realName:''
            }
        },
        methods: {
          searchname(){
              if(this.realName==''){
                 return false;
              }
              else{
                axios.post('admin/member/page?realName='+this.realName).then(res=>{
                      this.userpage=res.data.data.list;

              })

              }
        },

          changePage(pageIndex){
                this.pageIndex = pageIndex;
                axios.post('admin/member/page?pageNo='+this.pageIndex).then(res=>{
                //console.log(res)

                  this.userpage=res.data.data.list;
                    this.datalength=res.data.data.totalNumber;
                })
            }
        },
    mounted:function (){
     axios.post('admin/member/page').then(res=>{
                      this.userpage=res.data.data.list;
                     this.datalength=res.data.data.totalNumber;
         })
    }
}
</script>
