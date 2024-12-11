/* SKU */
import request from '@/utils/request'
import type { SkuResponseData, SkuInfoData } from './type'

enum API {
  // 获取已有SKU
  SKU_URL = '/admin/product/list/',
  // 商品上架
  ON_SALE_URL = '/admin/product/onSale/',
  // 商品下架
  CANCEL_SALE_URL = '/admin/product/cancelSale/',
  // 获取商品详情
  SKU_INFO_URL = '/admin/product/getSkuInfo/',
  // 删除商品
  REMOVE_SKU_URL = '/admin/product/deleteSku/',
}

// 获取sku数据
export const reqSkuList = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)

// 商品上架
export const reqOnSale = (skuId: number) =>
  request.get<any, any>(API.ON_SALE_URL + skuId)

// 商品下架
export const reqCancelSale = (skuId: number) =>
  request.get<any, any>(API.CANCEL_SALE_URL + skuId)

// 获取商品详情
export const reqSkuInfo = (skuId: number) =>
  request.get<any, SkuInfoData>(API.SKU_INFO_URL + skuId)

// 删除商品
export const reqRemoveSku = (skuId: number) =>
  request.delete<any, any>(API.REMOVE_SKU_URL + skuId)
