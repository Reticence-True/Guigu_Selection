// 时间判断：返回此时时间段
export const GET_TIME = () => {
    const date = new Date();
    let hour = date.getHours();
    if(hour >= 5 && hour < 10){
        return "早上好"
    }else if(hour >= 10 && hour < 14) {
        return "中午好"
    }else if(hour >= 14 && hour < 18){
        return "下午好"
    }else if(hour >= 18 && hour < 23){
        return "晚上好"
    }else {
        return "凌晨好"
    }
}