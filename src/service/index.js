import { Observable,from,pipe,interval } from 'rxjs';
import { switchMap,map,distinctUntilChanged } from 'rxjs/operators';
let warObservable$;
const DEVICE_URL= 'http://giot.kjxt.tech:3030';
const DEVICE_URL_PORT= 'http://giot.kjxt.tech:3000';
const FORGET_PASSWORD_URL='http://127.0.0.1:3000';
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
 *  获取控制器状态
 *  @param pid 棚ID
 */
export const getControllerStatus = (pid) => axios.get(`${DEVICE_URL}/stat/controllerStatus?pengId=${pid}`);
/**
 *  获取控制器状态
 *  @param  deviceId
 */
export const getCtrlStatusByDeviceId = (deviceId) => axios.get(`${DEVICE_URL}/stat/controllerStatus?deviceId=${deviceId}`);
/**
 * 设置值
 * */
export const setController = (deviceId,sensorChannel,val,gatewayID) => axios.get(`${DEVICE_URL}/gateway/tcpcmd?cmd=control_power&value=${deviceId}:${sensorChannel}*${val}&gatewayId=${gatewayID}`);
/**
 *  获取日 监控数据
 * */
export const getDayLs = (id,type,day) => axios.get(`${DEVICE_URL}/stat/sensordata?id=${id}&type=${type}&day=${day}`);
/**
 *  获取月 监控数据
 * */
export const getMonthLs = (id,type,month) => axios.get(`${DEVICE_URL}/stat/sensordata?id=${id}&type=${type}&month=${month}`);
/**
 *  获取年 监控数据
 * */
export const getYearLs = (id,type,year) => axios.get(`${DEVICE_URL}/stat/sensordata?id=${id}&type=${type}&yeart=${year}`);
/**
 *  获取我的
 * */
export const getAbout = (token) => axios.get(`/apps/about?token=`+encodeURIComponent(token));
/**
 *  修改地址电话
 * */
export const modifyAddrAndTel = (token,userName,address,phone) =>{
	let url = "/apps/updateEmployee?token=" + encodeURIComponent(token) + "&loginname=" + userName;
	if(address!==false){
		url = url + "&address=" + address;
	}
	if(phone!==false){
		url = url + "&phone=" + phone;
	}
	return axios.get(url);
};
/**
 *  控制-控制列表
 * */
export const getControList = (token,pid) =>{
	return axios.get(`/apps/controllersByParkGroupByType?token=`+encodeURIComponent(token) + "&pid=" + pid);
};
/**
 * 发现-列表页
 * */
export const getFindList = (token,currentPage,pageSize,type) =>{
	return axios.get(`/apps/discoverInfo?pageindex=` + currentPage + `&pagesize=` + pageSize + `&type=` + type + `&token=`+encodeURIComponent(token));
};
/**
 * 发现-tab个数
 * */
export const getFindTab = (token) =>{
	return axios.get(`/apps/discoverModule?token=` + encodeURIComponent(token));
};

/**
 * 修改单控制器
 **/
export const setControl = (gatewayId,value) => { // value 格式：100:17*1;传感器ID，通道号，期望值
    return axios.get(`${DEVICE_URL}/gateway/tcpcmd?cmd=control_power&gatewayId=${gatewayId}&value=${value}`);
};
/**
 * 获取自动任务列表
 * */
// export const getAutoTask = (controllerId,token) => {
//     return axios.get(`/apps/gettask?controllerid=${controllerId}&token=${token}`);
// };
/**
 * 添加自动任务
 * */
// export const  addAutoTask = (ctrlId,token,content,type,status) => {
//      return axios.post(`/apps/createtask`,{controllerid:ctrlId,content:content,token:token,type:type,status:status});
// };
/**
 * 修改自动任务
 * */
// export const modifyAutoTask = (taskId,ctrlId,content,token) => {
//    return axios.post(`/apps/modifytask?`,{id:taskId,controllerid:ctrlId,content:content,token:token});
// };
/**
 * 获取告警统计
 * */
export const getWarings = (type,corpId,status,from,to) => {
    return axios.get(`${DEVICE_URL}/stat/warningStat?type=${type}&corp_id=${corpId}&status=${status}&from=${from}&to=${to}`);
};
/**
 * 修改大棚信息
 * */
export const editDaPeng = (dpId,token,name,foodtype,w,h,len,address) => {
    w = w || 0;
    h = h || 0;
    len = len || 0;
    return axios.post(`/apps/modifygreenhouse`,{id:dpId,token:token,name:name,foodtype:foodtype,width:w,height:h,length:len,address:address});
};
/**
 * 告警this.$router.
 **/
export const getWaringList = (userId, status, pageNum) =>{
	return axios.get(`${DEVICE_URL}/stat/warningByUser?uid=${userId}&page=${pageNum}&status=${status}`);
};


/**
 * 轮询接口
 */
export  const  getRepeateWaringList = (id) => {
    return interval(1000*10).pipe(
        switchMap(val =>  from(getWarings('1',id,'1','2018-09-01',''))),
        distinctUntilChanged((p,q) => {
            if((p.data && p.data.results) && (q.data && q.data.results)) {
                return JSON.stringify(p.data.results) === JSON.stringify(q.data.results);
            } else {
               return false;
            }
        }),
        map(res => {
            return res.data;
        })
    );
};
/**
 * 查询最新设备信息
 */
export const getLatestSensorData = (pid) =>{
    return axios.get(`${DEVICE_URL}/stat/sensorDataLatest?pid=${pid}`);
};
/**
 * 发送手机验证码
 */
export const getPhoneCode = (phoneNumber) =>{
    return axios.get(`${DEVICE_URL_PORT}/apps/sendsms?phone=${phoneNumber}`);
};
/**
 * 忘记密码
 */
export const forgetPassword = (phone,pwd,smscode) =>{
    return axios.get(`${DEVICE_URL_PORT}/apps/resetpwdbysms?phone=${phone}&pwd=${pwd}&smscode=${smscode}`);
};
/**
 * 修改密码
 */
export const resetPassword = (oldPassword,newPassword,token) =>{
    return axios.get(`${DEVICE_URL_PORT}/apps/resetPwd?oldpwd=${oldPassword}&pwd=${newPassword}&token=${token}`);
};
/**
 * 查找对应关系
 */
export const getPicRelations = (token) => {
    return axios.get(`${DEVICE_URL_PORT}/apps/controllericon?token=${encodeURIComponent(token)}`);
};
/**
 * 上传头像
 */
export const uploadPhoto = (token,loginname,base64Data) => {
    // param.append('file', base64Data);
    // console.log('uploadPhoto');
    return axios.post(`${DEVICE_URL_PORT}/apps/updateEmployee`,{loginname:loginname,token:token,icon:base64Data});
};
/**
 * 获取自动任务
 * @param controllerid 控制器id
 * @param token
 */
export const getAutoTask = (controllerid,token) => {
    return axios.get(`/apps/gettask?controllerid=${controllerid}&token=${encodeURIComponent(token)}`);
};
/**
 * 修改自动任务
 * @param controllerid 控制器id
 * @param token
 * @param content 可选
 * @param status 自动任务状态(启用 1\停用 0) 可选
 * @param type  控制器类型(单路:1;双路:2;三路:3) 可选
 */
export const modifyAutoTask = (controllerid,token,content,status,type) => {
    return axios.get(`/apps/modifytask?controllerid=${controllerid}&content=${JSON.stringify(content)}&status=${status}&type=${type}&token=${encodeURIComponent(token)}`);
};
/**
 * 添加自动任务
 * @param controllerid 控制器id
 * @param token
 * @param content 可选
 * @param status 自动任务状态(启用 1\停用 0) 可选
 * @param type  控制器类型(单路:1;双路:2;三路:3) 可选
 */
export const addAutoTasks = (controllerid,token,content,status,type) => {
    return axios.get(`/apps/createtask?controllerid=${controllerid}&content=${JSON.stringify(content)}&status=${status}&type=${type}&token=${encodeURIComponent(token)}`);
};
