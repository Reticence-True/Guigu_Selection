// spu接口类型
import type { TradeMark } from '../trademark/type'

// 返回类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// spu数据类型
export interface SpuData {
  id?: string | number
  spuName?: string
  description: string
  category3Id: string | number
  tmId: number | string // 品牌ID
  spuSaleAttrList: SaleAttr[] | null
  spuImageList: SpuImage[] | null
}
export type Records = SpuData[]

// 已有spu接口数据
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

// 所有品牌接口数据类型
export interface AllTradeMark extends ResponseData {
  data: TradeMark[]
}

// 商品图片
export interface SpuImage {
  id?: number
  spuId?: number
  imgName?: string
  imgUrl?: string
  // 兼容plus照片墙
  name?: string
  url?: string
}
export interface SpuHasImg extends ResponseData {
  data: SpuImage[]
}

// spu销售属性
export interface SaleAttrValue {
  id?: number
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null
}
export type SpuSaleAttrValueList = SaleAttrValue[]
export interface SaleAttr {
  id?: number
  spuId?: number
  baseSaleAttrId: string
  saleAttrName: string
  spuSaleAttrValueList: SpuSaleAttrValueList
  flag?: boolean // 切换标记/显示模式标志
  saleAttrValue?: string // 编辑的属性值
}
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}

// 所有商品spu销售属性
export interface HasSaleAttr {
  id: number
  name: string
}
export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}

// sku数据
export interface SkuData {
  category3Id: string | number
  spuId: string | number
  tmId: string | number
  skuName: string
  price: string | number
  weight: string | number
  skuDesc: string
  skuAttrValueList?: skuAttr[]
  skuSaleAttrValueList?: skuSaleAttr[]
  skuDefaultImg: string
  isSale?: number // 是否售卖
  id?: number | string
  skuImageList?: SkuImage[]
}
export interface skuAttr {
  attrId: string | number
  valueId: string | number
  valueName?: string
}
export interface skuSaleAttr {
  saleAttrId: string | number
  saleAttrValueId: string | number
  saleAttrValueName?: string
}
export interface SkuImage {
  id?: number | string
  imgUrl: string
}

// 获取sku数据接口
export interface SkuInfoData extends ResponseData {
  data: SkuData[]
}
