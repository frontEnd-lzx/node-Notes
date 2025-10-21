export default `
<!-- __menuChinaName__：详情页 -->
<template>
  <v-page-transition
    :title="'__menuChinaName__详情'"
    @close="handleClose">
    <v-detail-component
      :formConfig="detailConfigs"
      :detail="detail"
      @close="handleClose"></v-detail-component>
  </v-page-transition>
</template>
<script>
/**
 *
 * 代码描述
 * 模块名称: __menuChinaName__
 * @author: __author__
 * 创建时间: __date__
 *
 */
export default {
  name: '__menuName__Detail'
}
</script>
<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { vDetailComponent } from '@cp/extend/details' // 详情组件
import { detailConfig } from './config'
import { queryDetail } from './api'

const { proxy } = getCurrentInstance()
const detail = ref({})

const detailConfigs = ref(detailConfig)


onMounted(() => {
  queryData()
})

// 查询数据
const queryData = () => {
  const { id } = proxy.$route.query
  queryDetail(id).then(res => {
    detail.value = res.data
  })
}
const handleClose = () => {
  proxy.$router.back()
}
</script>
`
