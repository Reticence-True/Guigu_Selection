/** 品牌管理模块接口类型 */
// 已有品牌ts数据类型
export interface TradeMark {
  id?: number
  tmName: string
  logoUrl: string
}

// 包含全部品牌数据类型
export type Records = TradeMark[]

// 通用返回值类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 获取已有全部品牌
export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: number
    pages: number
  }
}
