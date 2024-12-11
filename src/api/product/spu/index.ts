import request from '@/utils/request'
import type {
  AllTradeMark,
  HasSaleAttrResponseData,
  HasSpuResponseData,
  SaleAttrResponseData,
  SkuData,
  SkuInfoData,
  SpuData,
  SpuHasImg,
} from './type'

// spu接口
enum API {
  HAS_SPU_URL = '/admin/product/', // 获取已有spu数据
  ALL_TRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList', // 获取所有商品
  IMAGE_LIST_URL = '/admin/product/spuImageList/', // spu商品的图片数据
  SPU_SALE_ATTR_URL = '/admin/product/spuSaleAttrList/', // spu所有的销售属性
  ALL_SALE_ATTR_URL = '/admin/product/baseSaleAttrList', // 获取项目全部销售信息
  ADD_SPU_URL = '/admin/product/saveSpuInfo', // 新增spu
  UPDATE_SPU_URL = '/admin/product/updateSpuInfo', // 更新spu
  ADD_SKU_URL = '/admin/product/saveSkuInfo', // 更新sku
  SKU_INFO_URL = '/admin/product/findBySpuId/', // 查看某一个已有spu的sku
  REMOVE_SPU_URL = '/admin/product/deleteSpu/', // 删除spu
}

// 获取某一个三级分类的spu数据
export const reqHasSpu = (page: number, limit: number, c3Id: number | string) =>
  request.get<any, HasSpuResponseData>(
    API.HAS_SPU_URL + `${page}/${limit}?category3Id=${c3Id}`,
  )

// 获取全部spu品牌
export const reqAllTrademark = () =>
  request.get<any, AllTradeMark>(API.ALL_TRADEMARK_URL)

// 获取spu下的商品图片
export const reqSpuImageList = (spuId: number) =>
  request.get<any, SpuHasImg>(API.IMAGE_LIST_URL + spuId)

// 获取spu下的销售属性
export const reqSpuHasSaleAttr = (spuId: number) =>
  request.get<any, SaleAttrResponseData>(API.SPU_SALE_ATTR_URL + spuId)

// 所有商品销售属性
export const reqAllSaleAttr = () =>
  request.get<any, HasSaleAttrResponseData>(API.ALL_SALE_ATTR_URL)

// 新增spu
export const reqAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    return request.post<any, any>(API.UPDATE_SPU_URL, data)
  } else {
    return request.post<any, any>(API.ADD_SPU_URL, data)
  }
}
// 删除spu
export const reqRemoveSpu = (spuId: number | string) =>
  request.delete<any, any>(API.REMOVE_SPU_URL + spuId)

// 添加sku
export const reqAddSku = (data: SkuData) => request.post(API.ADD_SKU_URL, data)
// 获取sku
export const reqSkuList = (spuId: number | string) =>
  request.get<any, SkuInfoData>(API.SKU_INFO_URL + spuId)
