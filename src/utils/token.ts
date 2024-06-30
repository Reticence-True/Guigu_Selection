// 封装本地存储/读取数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}
export const GET_TOKEN = (key: string) => {
  return localStorage.getItem(key)
}
// 本地删除数据
export const REMOVE_TOKEN = () => {
  localStorage.removeItem("TOKEN")
}
