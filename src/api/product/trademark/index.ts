/** 品牌管理模块接口 */
import request from '@/utils/request'
// 接口地址
enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/', // 获取已有品牌伤口
}

/**
 * 获取已有品牌
 * @param {number} page 获取第几页（默认第一页）
 * @param {number} limit 一页品牌数
 */
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, any>(API.TRADEMARK_URL + `${page}/${limit}`)
