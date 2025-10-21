export default `
<!-- __menuChinaName__：列表入口页 -->
<template>
  <v-table-page-component
    ref="pageRef"
    :pageConfig="pageConfigs"
    :dataList="dataList"
    @handleEdit="handleAction"
  >
    <!-- 条件搜索 -->
    <template #pageSearch>
      <v-form-component
        ref="searchFormRef"
        :formConfig="searchFormConfigs"
        @confirm="onSearchByCondition"
        @cancel="onReset"
      ></v-form-component>
    </template>
  </v-table-page-component>
</template>

<script setup>
/**
 *
 * 代码描述
 * 模块名称: __menuChinaName__
 * @author: __author__
 * 创建时间: __date__
 *
 */
import { ref, onMounted, getCurrentInstance } from 'vue'
import { vTablePageComponent } from '@cp/extend/tablePageComponent'
import { vFormComponent } from '@cp/extend/formComponent'
import { pageConfig, searchFormConfig } from './config'
import { queryList, deleteItem } from './api'

const { proxy } = getCurrentInstance()
const searchForm = ref({})
const dataList = ref([])
const pageRef = ref()
const searchFormRef = ref()

const pageConfigs = ref(pageConfig)
const searchFormConfigs = ref(searchFormConfig)

onMounted(() => {
  queryData()
})

// 查询数据
const queryData = async () => {
  const { page, size } = pageRef.value.getParams()
  
  const params = {
    ...{ page: page + 1, limit: size },
    ...searchForm.value
  }
  queryList(params).then(res => {
    dataList.value = res.data.list
    pageRef.value.setVal('total', res.data.total)
  })
}

// 查询条件
const onSearchByCondition = async (form) => {
  searchForm.value = form
  pageRef.value.setVal('currentPage', 1)
  queryData()
}

// 重置查询条件
const onReset = async () => {
  searchFormRef.value.resetVal()
}

const handleAction = ({ type, param }) => {
  switch (type) {
    case 'btnClick': // head栏按钮点击；如果有配置多个按钮，则需要做判断
      proxy.$router.push({
        name: '__menuName__Config'
      })
      break
    case 'edit': // 表格操作项
      {
        const method = 'handle' + param.svg.type
        methodMap[method] && methodMap[method](param.row)
      }
      break
    case 'pageChange': // 分页查询
      queryData()
      break
  }
}

// 删除
const handledelete = async ({ id }) => {
  proxy
    .$confirm(proxy.$t('rmpSystem.roleDelText'), proxy.$t('vBase.delText'), {
      type: 'warning',
      cancelButtonText: proxy.$t('vExtend.cancelText'),
      confirmButtonText: proxy.$t('vExtend.confirmText')
    })
    .then(() => {
      deleteItem(id).then(() => {
        proxy.$message(proxy.$t('rmpSystem.delSuccessText'))
        queryData()
      })
    })
    .catch(() => {})
}

const handleedit = ({ id }) => {
  proxy.$router.push({
    name: '__menuName__Config',
    query: {
      editType: 'edit',
      id
    }
  })
}

const handlepreview = ({ id }) => {
  proxy.$router.push({
    name: '__menuName__Detail',
    query: { id }
  })
}

const methodMap = {
  delete: handledelete,
  edit: handleedit,
  preview: handlepreview
}
</script>
`
