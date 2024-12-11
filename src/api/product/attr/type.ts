// 分类相关数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 分类的 ts类型
export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number // 二级分类的一级ID
  category2Id?: number // 三级分类的二级ID
}

// 相应的分类接口返回的数据类型
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}

// 属性与属性值数据类型
// 属性值对象
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean // 控制属性值的显示模式
}
// 属性值对象数组
export type AttrValueList = AttrValue[]

// 属性对象
export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList
}
// 属性对象数组
export type AttrList = Attr[]

// 属性接口数据类型
export interface AttrResponseData extends ResponseData {
  data: AttrList
}
