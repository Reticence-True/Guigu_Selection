/* SKU接口类型 */

import { ResponseData, SkuData } from '../spu/type'

// 获取 sku接口
export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}

// 获取sku详情接口
export interface SkuInfoData extends ResponseData {
  data: SkuData
}
