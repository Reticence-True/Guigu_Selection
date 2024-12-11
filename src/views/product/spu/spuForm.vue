<!-- eslint-disable vue/valid-attribute-name -->
<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="SPU名称">
                <el-input placeholder="请输入SPU名称" v-model="spuParam.spuName"></el-input>
            </el-form-item>
            <el-form-item label="SPU品牌">
                <el-select v-model="spuParam.tmId">
                    <el-option v-for="item in allTradeMark" :key="item.id" :label="item.tmName"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input placeholder="请输入SPU描述" type="textarea" v-model="spuParam.description"></el-input>
            </el-form-item>
            <el-form-item label="SPU照片">
                <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                    :before-upload="handlerBeforeUpload">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    <el-dialog v-model="dialogVisible">
                        <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%; height: 100%;" />
                    </el-dialog>
                </el-upload>
            </el-form-item>
            <el-form-item label="SPU销售属性">
                <el-select :placeholder="unSelectedSaleAttr.length ? `还未选择${unSelectedSaleAttr.length}个` : '无'"
                    v-model="saleAttrIdAndValName">
                    <el-option v-for="item in unSelectedSaleAttr" :key="item.id" :label="item.name"
                        :value='`${item.id}:${item.name}`' </el-option>
                </el-select>
                <el-button type="primary" size="default" icon="Plus" style="margin-left: 10px;"
                    :disabled="saleAttrIdAndValName ? false : true" @click="addSaleAttr">添加属性</el-button>
                <!-- spu属性列表 -->
                <el-table border style="margin: 10px 0;" :data="saleAttr">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="销售属性名字" width="120px" prop="saleAttrName">
                    </el-table-column>
                    <el-table-column label="销售属性值">
                        <!-- row 为销售属性对象 -->
                        <template #="{ row, $index }">
                            <el-tag style="margin: 0 5px;" v-for="item in row.spuSaleAttrValueList" :key='item.id'
                                type="primary" @close="row.spuSaleAttrValueList.splice($index, 1)" closable>{{
                                    item.saleAttrValueName }}
                            </el-tag>
                            <el-input v-if="row.flag" v-model="row.saleAttrValue" placeholder="请输入属性值" size="small"
                                style="width: 100px" @blur="toLook(row)"></el-input>
                            <el-button v-if="!row.flag" size="small" icon="Plus" type="success" @click="toEdit(row)">
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120px">
                        <template #="{ $index }">
                            <el-button type="primary" size="small" icon="Delete"
                                @click="saleAttr.splice($index, 1)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label-width="0">
                <el-button type="primary" size="default" @click="save" :disabled="saleAttr.length === 0">保存</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue';
import { ElMessage, type UploadProps } from 'element-plus';
import { reqAllTrademark, reqSpuImageList, reqSpuHasSaleAttr, reqAllSaleAttr, reqAddOrUpdateSpu } from '@/api/product/spu';
import type { HasSaleAttr, SaleAttr, SpuData, SpuImage } from '@/api/product/spu/type';
import { TradeMark } from '@/api/product/trademark/type';

let $emit = defineEmits(["changeScene"])
// 已有的spu完整数据
let allTradeMark = ref<TradeMark[]>([])
let imgList = ref<SpuImage[]>([])
let saleAttr = ref<SaleAttr[]>([])
let allSaleAttr = ref<HasSaleAttr[]>([])
// 存储完整spu
let spuParam = ref<SpuData>({
    id: '',
    category3Id: '',
    description: '',
    spuName: '',
    tmId: '',
    spuImageList: [],
    spuSaleAttrList: []
})
// 控制对话框显示与隐藏
let dialogVisible = ref<boolean>(false)
// 预览图片地址
let dialogImageUrl = ref<string>('')
// 还未选择的属性id和值
let saleAttrIdAndValName = ref<string>('')

// 取消按钮回调
const cancel = () => {
    $emit('changeScene', {flag: 0, params: 'update'})
}

// 初始化spu数据
const initSpuData = async (spu: SpuData) => {
    spuParam.value = spu
    // 全部品牌数据
    allTradeMark.value = (await reqAllTrademark()).data
    // 获取spu商品墙
    imgList.value = (await reqSpuImageList(spu.id as number)).data.map((item) => {
        return {
            name: item.imgName,
            url: item.imgUrl
        }
    })
    // 获取spu销售属性
    saleAttr.value = (await reqSpuHasSaleAttr(spu.id as number)).data
    // 所有销售属性
    allSaleAttr.value = (await reqAllSaleAttr()).data
}

// 照片墙预览
const handlePictureCardPreview = (file: any) => {
    // 弹出对话框
    dialogVisible.value = true
    // 展示图片
    dialogImageUrl.value = file.url
}

// 照片墙删除
const handleRemove = () => {
    console.log(123);
}

// 照片墙上传成功之前的钩子
const handlerBeforeUpload: UploadProps['beforeUpload'] = (_file) => {

}

// 还没有的销售属性
let unSelectedSaleAttr = computed(() => {
    return allSaleAttr.value.filter((item) => {
        return saleAttr.value.every((item1) => {
            return item1.saleAttrName !== item.name
        })
    })
})

// 添加销售属性
const addSaleAttr = () => {
    let [baseSaleAttrId, saleAttrName] = saleAttrIdAndValName.value.split(':')
    // 新的销售属性对象
    let newSaleAttr: SaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
    }
    saleAttr.value.push(newSaleAttr)
    // 清空收集的数据
    saleAttrIdAndValName.value = ''

}

// 属性值按钮的点击事件
const toEdit = (row: SaleAttr) => {
    row.flag = true
    row.saleAttrValue = ''
}

// 表单元素失去焦点
const toLook = (row: SaleAttr) => {
    const { baseSaleAttrId, saleAttrValue } = row
    // 空值
    if (!(saleAttrValue as string).trim()) {
        ElMessage({
            type: 'warning',
            message: '属性值不能为空'
        })
        return
    }
    // 重复
    if (row.spuSaleAttrValueList.find((item) => {
        return item.saleAttrValueName === saleAttrValue
    })) {
        ElMessage({
            type: 'warning',
            message: '属性值不能重复'
        })
        return
    }

    // 追加到数据中
    row.spuSaleAttrValueList.push({
        baseSaleAttrId,
        saleAttrValueName: saleAttrValue as string
    })
    row.flag = false
}

// 保存按钮回调
const save = async () => {
    // 整理数据
    // 照片墙
    spuParam.value.spuImageList = imgList.value.map((item: any) => {
        return {
            imgName: item.name,
            imgUrl: (item.response && item.response.data) || item.url
        }
    })
    // 销售属性数据
    spuParam.value.spuSaleAttrList = saleAttr.value

    // 发请求
    let res = await reqAddOrUpdateSpu(spuParam.value)
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: spuParam.value.id ? '更新成功' : '添加成功'
        })
    }
    else {
        ElMessage({
            type: 'success',
            message: spuParam.value.id ? '更新失败' : '添加失败'
        })
    }
    // 切换场景
    $emit('changeScene', {flag: 0, params: spuParam.value.id ? 'update' : 'add'})
}

// 添加spu的初始化方法
const initAddSpu = async (c3Id: number) => {
    // 清空数据
    Object.assign(spuParam.value, {
        id: '',
        category3Id: '',
        description: '',
        spuName: '',
        tmId: '',
        spuImageList: [],
        spuSaleAttrList: []
    })
    imgList.value.length = 0
    saleAttr.value.length = 0
    saleAttrIdAndValName.value = ''
    spuParam.value.id = undefined
    // 全部品牌数据
    allTradeMark.value = (await reqAllTrademark()).data
    // 所有销售属性
    allSaleAttr.value = (await reqAllSaleAttr()).data
    // 存储c3id
    spuParam.value.category3Id = c3Id
}

// 暴露给父元素
defineExpose({ initSpuData, initAddSpu })

</script>
<script lang="ts">
export default {
    name: 'SpuForm'
}
</script>

<style></style>