import { BASEURL, fetch, post, patch } from './http.js'

// '/admin/system/employee/sign/in'
export const BASICURL = BASEURL;

export const signIn = data => post('admin/system/employee/sign/in', data);
//GET获取 "财务管理"=>"提币管理"
export const withdrawManage = params => fetch('admin/finance/withdraw-record/page-query', params);

//Patch获取 "财务管理"=>"提币管理"   "一键通过"
export const auditPass = data => patch('admin/finance/withdraw-records/audit-pass', data);

//Patch获取 "财务管理"=>"提币管理"   "一键不通过"
export const auditNoPass = data => patch('admin/finance/withdraw-records/audit-no-pass', data);

//POST？？？获取 "首页"=>上部面板
export const dashBoardInfo = data => post('admin/system/statistics/dashboard', data);