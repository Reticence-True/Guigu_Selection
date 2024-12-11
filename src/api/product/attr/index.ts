// 属性管理API

import request from '@/utils/request'
import type { CategoryResponseData, Attr } from './type'

// 接口地址
enum API {
  C1_URL = '/admin/product/getCategory1/', // 一级分类
  C2_URL = '/admin/product/getCategory2/', // 二级分类
  C3_URL = '/admin/product/getCategory3/', // 三级分类
  ATTR_URL = '/admin/product/attrInfoList/', // 分类下已有的属性
  ADD_OR_UPDATE_ATTR_URL = '/admin/product/saveAttrInfo', // 新增/修改属性（值）
  DELETE_ATTR_URL = '/admin/product/deleteAttr/', // 删除属性
}

// 获取一级分类接口
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
// 获取二级分类接口
export const reqC2 = (c1id: number | string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + c1id)
// 获取三级分类接口
export const reqC3 = (c2id: number | string) =>
  request.get<any, CategoryResponseData>(API.C3_URL + c2id)
// 获取分类下的属性
export const reqAttr = (
  c1id: number | string,
  c2id: number | string,
  c3id: number | string,
) => request.get(`${API.ATTR_URL}/${c1id}/${c2id}/${c3id}`)
// 新增/修改属性
export const reqAddOrUpdateAttr = (data: Attr) =>
  request.post<any, any>(API.ADD_OR_UPDATE_ATTR_URL, data)
// 删除属性
export const reqRemoveAttr = (attrId: number) =>
  request.delete<any, any>(API.DELETE_ATTR_URL + attrId)
