<!-- eslint-disable vue/valid-attribute-name -->
<template>
  <el-card>
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button
      type="primary"
      size="default"
      icon="Plus"
      @click="addTradeMark"
      v-has="`btn.Trademark.add`"
    >
      添加品牌
    </el-button>
    <!-- 展示已有平台数据 -->
    <el-table style="margin: 10px 0" border :data="trademarkArr">
      <el-table-column
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <!-- table-column: 展示数据默认使用div，如果不想用div，可以传递插槽设置结构 -->
      <!-- div -->
      <!-- <el-table-column label="品牌名称" prop="tmName"></el-table-column> -->
      <!-- 插槽 -->
      <el-table-column label="品牌名称">
        <template #="{ row }">
          <pre>{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌logo">
        <template #="{ row }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateTradeMark(row)"
          ></el-button>
          <el-popconfirm
            :title="`是否要删除${row.tmName}？`"
            width="250px"
            icon="Delete"
            @confirm="removeTrademark(row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 
       v-model:current-page: 设置分页器当前页码
       v-model:page-size: 设置每一个展示数据的条数
       page-sizes: 设置下拉菜单数据
       background: 设置分页器按钮背景颜色
       layout: 设置分页器子组件布局
    -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      background
      layout="prev, pager, next, jumper, ->, total, sizes"
      :total="total"
      :pager-count="9"
    />
  </el-card>

  <!-- 对话框 -->
  <!-- v-model 设置显示对话框，接受布尔值 -->
  <el-dialog
    v-model="dialogFormVisible"
    :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    width="500"
  >
    <el-form
      style="width: 80%"
      :model="trademarkParams"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item label="品牌名称" label-width="100px" prop="tmName">
        <el-input
          placeholder="请您输入品牌名称"
          size="default"
          clearable
          v-model="trademarkParams.tmName"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌logo" label-width="100px" prop="logoUrl">
        <!-- 
        upload组件相应属性
          action: 请求 URL（在本项目中要带api，触发代理请求）
          
        -->
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="trademarkParams.logoUrl"
            :src="trademarkParams.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-button type="primary" size="default" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, reactive, nextTick } from 'vue'
import {
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
  reqHasTrademark,
} from '@/api/product/trademark'
import type {
  Records,
  TradeMark,
  TradeMarkResponseData,
} from '@/api/product/trademark/type'
import { ElMessage, type UploadProps } from 'element-plus'

// 当前页面
let pageNo = ref<number>(1)
// 每页展示数据条数
let limit = ref<number>(3)
// 已有品牌数据总数
let total = ref<number>(22)
// 已有品牌数据
let trademarkArr = ref<Records>([])
// 控制对话框显示隐藏
let dialogFormVisible = ref(false)
// 收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
// el-form组件实例
let formRef = ref()

// 获取已有品牌接口函数
const getHasTrademark = async (pager = 1) => {
  // 乳沟改变一页商品数量，则回到第一页
  pageNo.value = pager
  let res: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (res.code === 200) {
    // 已有品牌总数
    total.value = res.data.total
    trademarkArr.value = res.data.records
  }
}

// 添加品牌商品
const addTradeMark = () => {
  // 清空收集数据
  trademarkParams.id = void 0
  trademarkParams.logoUrl = ''
  trademarkParams.tmName = ''
  // 弹出对话框
  dialogFormVisible.value = true
  // 清除上一次表单验证信息
  // ts写法
  // formRef.value?.clearValidate('tmName')
  // formRef.value?.clearValidate('logoUrl')
  // nexttick
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
}

// 修改已有品牌按钮
// row: 当前已有品牌
const updateTradeMark = (row: TradeMark) => {
  // 收集展示已有品牌数据
  Object.assign(trademarkParams, row)
  // 弹出对话框
  dialogFormVisible.value = true
  // 清除上一次表单验证信息
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
}

// 对话框取消按钮
const cancel = () => {
  // 隐藏对话框
  dialogFormVisible.value = false
}
// 对话框确定按钮
const confirm = async () => {
  // 发请求之前，对于整个表单进行校验
  // 如果校验通过，则发送请求，否则不执行后续代码
  await formRef.value.validate()
  // 发送请求
  let res: any = await reqAddOrUpdateTrademark(trademarkParams)
  // 添加成功
  if (res.code === 200) {
    // 隐藏对话框
    dialogFormVisible.value = false
    // 显示提示信息
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '品牌修改成功' : '品牌添加成功',
    })
    // 重新获取所有品牌，修改留在当前页，添加留在第一页
    getHasTrademark(trademarkParams.id ? pageNo.value : undefined)
  } else {
    // 隐藏对话框
    dialogFormVisible.value = false
    // 显示提示信息
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '品牌修改失败' : '品牌添加失败',
    })
  }
}

// 上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 图片上传成功之前触发
  // 用于上传文件之前约束文件类型和大小
  // 要求：上传文件格式：png, jpg, gif，大小小于4m
  if (
    rawFile.type !== 'image/jpeg' &&
    rawFile.type !== 'image/png' &&
    rawFile.type !== 'image/gif'
  ) {
    ElMessage({
      type: 'error',
      message: '上传文件格式：png, jpg, gif',
    })
    return false
  }
  if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage({
      type: 'error',
      message: '文件大小要小于4M',
    })
    return false
  }
}

// 图片上传成功钩子
// response：当前这次上传图片post请求服务器返回的数据
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  // 收集上传图片的地址
  trademarkParams.logoUrl = response.data
  // 清除图片校验表单提示
  formRef.value.clearValidate('logoUrl')
}

// 表单检验
const rules = {
  tmName: [
    {
      required: true, // 必填
      trigger: 'blur', // 触发校验时机：change和 blur
      // 自定义校验数据
      validator: (_rules: any, value: any, callBack: any) => {
        // 当触发时机满足时（trigger: "blur"），会触发改函数
        // rules: 规则对象
        // value：表单值
        // callBack：放行函数
        if (value.trim().length >= 2) {
          callBack()
        } else {
          // 校验未通过返回的错误信息
          callBack(new Error('品牌名称需要大于等于2位'))
        }
      },
    },
  ],
  logoUrl: [
    {
      required: true,
      validator: (_rules: any, value: any, callback: any) => {
        // 图片上传
        if (value) {
          callback()
        } else {
          callback(new Error('图片需要上传'))
        }
      },
    },
  ],
}

// 气泡确认框确认事件
const removeTrademark = async (id: number) => {
  let res = await reqDeleteTrademark(id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    // 获取已有品牌数据
    getHasTrademark(
      trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}

// 监听当前页码发生变化
watch(pageNo, (val) => {
  // 获取已有品牌数组
  getHasTrademark(val)
})

// 监听当前页面一页展示数据变化
watch(limit, () => {
  // 获取已有品牌数组
  getHasTrademark()
})

// 组件挂挂载
onMounted(() => {
  // 获取品牌
  getHasTrademark()
})
</script>

<style></style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
