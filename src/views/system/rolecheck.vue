<template>
  <div style='padding:10px 10px'>
  <Row  type="flex" justify="center" >
          添加权限
    </Row>
  </div>
</template>
<style>
.departli li{float:left}
</style>
/*<script>
import axios from 'axios';
import qs from 'qs';
    export default {
        data () {
            return {
                permission:'',
                modals:false,
               ischang:true,
               departmentarr:[]
            }
        },
        methods: {
            postform(){
             if(this.ischang=='true'){
                 if(this.addform.role==''){
                     return false;
                  }
                  if(this.addform.description==''){
                   return false;
                  }
                  if(this.addform.roleid==''){
                   return false;
                  }
                  else{
                   axios.post('/admin/role/merge').then(res=>{
                     if(res.data.code == 0){
                        this.modals=true;
                     }
                     console.log(res)

                    });
                }   }
                //修改角色名称
                else{
                  if(this.addform.role==''){
                     return false;
                  }
                  if(this.addform.description==''){
                   return false;
                  }
                  else{
                  axios.post('admin/role/merge',qs.stringify(this.addform)).then(res=>{
                     if(res.data.code == 0){
                        this.modals=true;
                     }
                     console.log(res)

                    });
                    }
                      }
                }

   },
    mounted:function (){
     axios.post('admin/department/all').then(res=>{
                      console.log(res)
                      this.departmentarr=res.data.data;
                    });
    }
    }
</script>*/