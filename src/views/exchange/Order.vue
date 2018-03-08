<template>
  <div>

     <template>
           <Table border :columns="columns1" :data="exchange" class='nopadding'></Table>
     </template>
  </div>

</template>
<style>
.nopadding .ivu-table-cell{padding-right:0px}
</style>
 <script>
 import axios from 'axios';
    export default {
        data () {
            return {
                columns1: [
                   {
                        title: '主键',
                        key: 'orderId',
                        width:180
                    },
                    {
                        title: '挂单量',
                        key: 'amount'
                    },
                    {
                        title: '挂单类型',
                        key: 'type',
                        render: (h, params) => {
                            const row=params.row;

                            const type=row.type=='0'?'市价':'现价';
                            return h('span', {
                            },type);
                        },
                    },
                    {
                        title: '订单方向',
                        key: 'direction',
                        render: (h, params) => {
                            const row=params.row;
                            const direction=row.direction=='0'?'买入':'卖出';
                            return h('span', {
                            },direction)
                        }
                    },
                    {
                        title: '挂单价格',
                        key: 'price'
                    },

                    {
                        title: '操作',
                        key: 'age',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'large'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                let query = {order_id: params.row.orderId };
                                    this.$router.push({
                                        name: 'quotdetail',
                                        query:query
                                    });
                                        }
                                    }
                                }, '查看')
                            ]);
                        }
                    }
                ],
                exchange: []
          }
        },
       methods:{

         },
      mounted(){
        axios.post('admin/exchangeOrder/pageQuery').then(res=>{
     //console.log(res)
       this.exchange= res.data.data.list;
    })
     }
    }
</script>