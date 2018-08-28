
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