// 登录接口参数
export interface loginForm {
    username: String,
    password: String
}

interface dataType {
    token: String
}

// 登录返回数据
export interface loginResponseData {
    code: Number,
    data: dataType
}

// 服务器返回用户信息的相关数据类型
interface userInfo {
    userId: number,
    avatar: string,
    username: String,
    password: String,
    desc: string,
    roles: string[],
    buttons: string[],
    routes: string[],
    token: string
}

interface user {
    checkUser: userInfo
}
export interface useResponseData {
    code: Number,
    data: user
}