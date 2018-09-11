
/**
 * 登录
 * */
export const loginIn = (name, pwd) => axios.post('/apps/login',
       {loginname: name,
        pwd: pwd});
/**
 * resetPwd
 * */
export const resetPwd = (name, pwd, sms, token) => axios.post('/apps/resetPwd',
        {
            loginname: name,
            pwd: pwd,
            smscode: sms,
            token: token
        });
/**
 * 获取地区园区列表
 * */
export const getLocates = (token) => axios.get('/apps/locates?token='+encodeURIComponent(token));
/**
 * 获取大棚列表
 * */
export const getUtilities = (pid,token) => axios.get('/apps/utilities?token='+encodeURIComponent(token)+'&pid='+pid);
/**
 * 获取传感器列表
 * */
export const getSensors = (pid,token) => axios.get('/apps/sensors?token='+encodeURIComponent(token)+'&pid='+pid+'&num='+new Date().getTime());
/**
 * 获取控制器列表
 * */
export const getControllers = (pid,token) => axios.get('/apps/controllers?token='+encodeURIComponent(token)+'&pid='+pid);
/**
 * 设置值
 * */
export const setController = (deviceId,sensorChannel,val,gatewayID) => axios.get(`http://39.104.67.142:3030/gateway/tcpcmd?cmd=control_power&value=${deviceId}:${sensorChannel}*${val}&gatewayId=${gatewayID}`);
/**
 *  获取日 监控数据
 * */
export const getDayLs = (id,type,day) => axios.get(`http://giot.kjxt.tech:3030/stat/sensordata?id=${id}&type=${type}&day=${day}`);
/**
 *  获取月 监控数据
 * */
export const getMonthLs = (id,type,month) => axios.get(`http://giot.kjxt.tech:3030/stat/sensordata?id=${id}&type=${type}&month=${month}`);
/**
 *  获取年 监控数据
 * */
export const getYearLs = (id,type,year) => axios.get(`http://giot.kjxt.tech:3030/stat/sensordata?id=${id}&type=${type}&yeart=${year}`);
/**
 *  获取我的
 * */
export const getAbout = (token) => axios.get(`/apps/about?token=`+encodeURIComponent(token));
/**
 *  修改地址电话
 * */
export const modifyAddrAndTel = (token,userName,address,phone) =>{
	var url = "/apps/updateEmployee?token=" + encodeURIComponent(token) + "&loginname=" + userName;
	if(address!=false){
		url = url + "&address=" + address;
	}
	if(phone!=false){
		url = url + "&phone=" + phone;
	}
	return axios.get(url);
} 
/**
 *  控制-控制列表
 * */
export const getControList = (token,pid) =>{
	return axios.get(`/apps/controllersByParkGroupByType?token=`+encodeURIComponent(token) + "&pid=" + pid);
} 
/**
 * 发现-列表页
 * */
export const getFindList = (token,currentPage,pageSize,type) =>{
	return axios.get(`/apps/discoverInfo?pageindex=` + currentPage + `&pagesize=` + pageSize + `&type=` + type + `&token=`+encodeURIComponent(token));
}
/**
 * 发现-tab个数
 * */
export const getFindTab = (token) =>{
	return axios.get(`/apps/discoverModule?token=` + encodeURIComponent(token));
}

/**
 * 修改单控制器
 **/
export const setControl = (gatewayId,value) => { // value 格式：100:17*1;传感器ID，通道号，期望值
    return axios.get(`http://39.104.67.142:3030/gateway/tcpcmd?cmd=control_power&gatewayId=${gatewayId}&value=${value}`);
};
/**
 * 获取自动任务列表
 * */
export const getAutoTask = (controllerId,token) => {
    return axios.get(`/apps/gettask?controllerid=${controllerId}&token=${token}`);
};
/**
 * 添加自动任务
 * */
export const  addAutoTask = (ctrlId,token,content) => {
     return axios.post(`/apps/createtask`,{controllerid:ctrlId,content:content,token:token});
};
/**
 * 修改自动任务
 * */
export const modifyAutoTask = (taskId,ctrlId,content,token) => {
   return axios.post(`/apps/modifytask?`,{id:taskId,controllerid:ctrlId,content:content,token:token});
};
/**
 * 获取告警统计
 * */
export const getWarings = (type,corpId,status,from,to) => {
    return axios.get(`http://39.104.67.142:3030/stat/warningStat?type=${type}&corp_id=${corpId}&status=${status}&from=${from}&to=${to}`);
};
/**
 * 修改大棚信息
 * */
export const editDaPeng = (dpId,token,name,foodtype,w,h,len,address) => {
    w = w || 0;
    h = h || 0;
    len = len || 0;
    // return axios.get(`/apps/modifygreenhouse?id=${dpId}&name=${name}&foodtype=${foodtype}&width=${w}&height=${h}&length=${len}&address=${address}`);
    return axios.post(`/apps/modifygreenhouse`,{id:dpId,token:token,name:name,foodtype:foodtype,width:w,height:h,length:len,address:address});
};
/**
 * 告警this.$router.
 **/
export const getWaringList = (userId, status, pageNum) =>{
	return axios.get(`http://giot.kjxt.tech:3030/stat/warningByUser?uid=${userId}&page=${pageNum}&status=${status}`);
}