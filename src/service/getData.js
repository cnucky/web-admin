import { BASEURL, fetch, post, patch } from './http.js'

// '/admin/system/employee/sign/in'
export const BASICURL = BASEURL;

export const signIn = data => post('admin/system/employee/sign/in', data);
//GET获取 "财务管理"=>"提币管理(记录)"
export const withdrawManage = data => fetch('admin/finance/withdraw-record/page-query', data);

//Patch获取 "财务管理"=>"提币管理"   "一键通过"
export const auditPass = data => patch('admin/finance/withdraw-record/audit-pass', data);

//Patch获取 "财务管理"=>"提币管理"   "一键不通过"
export const auditNoPass = data => patch('admin/finance/withdraw-record/audit-no-pass', data);

//POST？？？获取 "首页"=>上部面板
export const dashBoardInfo = data => post('admin/system/statistics/dashboard', data);

//GET获取 "审核详情"=>"个人交易详细信息"
export const personalTradeInfo = data => fetch(`/admin/finance/withdraw-record/${data}`);

//GET获取 "审核详情"=>"个人所有交易记录"
export const allTradeInfo = () => post('admin/finance/member-transaction/all');

//GET获取 "财务管理"=>"个人记录"
export const perTradeAll = data => post('admin/finance/member-transaction/page-query', data);

//POST获取 "会员实名审核"
//axios.post("admin/member/member-application/page-query").
export const MemberRealNameList = data => post('admin/member/member-application/page-query', data);

//POST获取 "会员实名审核详情页"
export const MemberRealNameDetail = data => post('admin/member/member-application/detail', data);

//POST获取 "会员实名审核通过"
export const memberCheckPass = data => patch(`admin/member/member-application/${data}/pass`);

//POST获取 "会员实名审核不通过" 较为特殊
export const memberCheckNotPass = data => patch(`admin/member/member-application/${data.memberID}/no-pass?${data.rejectReason}`);