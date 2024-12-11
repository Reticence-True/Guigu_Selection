// 品牌管理模块接口
import request from '@/utils/request'
import type { TradeMark, TradeMarkResponseData } from './type'
// 接口地址
enum API {
  // 已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 添加品牌接口
  ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改已有品牌
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除已有品牌
  DELETE_TRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}
// 获取已有品牌
// page: 获取第几页
// limit: 页获取多少数据
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )

// 添加与修改已有品牌接口
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  // 修改
  if (data.id) {
    return request.put<any, any>(API.UPDATE_TRADEMARK_URL, data)
  }
  // 新增
  else {
    return request.post<any, any>(API.ADD_TRADEMARK_URL, data)
  }
}

// 删除某个已有品牌数据
export const reqDeleteTrademark = (id: number) =>
  request.delete<any, any>(API.DELETE_TRADEMARK_URL + String(id))
