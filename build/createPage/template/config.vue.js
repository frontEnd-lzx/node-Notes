export default `
<!-- __menuChinaName__：表单配置页 -->
<template>
  <v-page-transition :title="editText + '__menuChinaName__'" @close="handleClose">
    <v-form-component ref="formRef" :editType="editType" :formConfig="formConfigs" :formData="formData"
      :formRules="formRules" @confirm="onConfirm" @cancel="onBack"></v-form-component>
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
  name: '__menuName__Config'
}
</script>
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue'
import { vFormComponent } from '@cp/extend/formComponent'
import { formConfig, formRules } from './config' // 配置
import { queryDetail, add, update } from './api' // api

const { proxy } = getCurrentInstance()
const formData = ref({})
const editType = ref('')
const editId = ref('')

const formRef = ref(null)

const formConfigs = ref(formConfig)
const isUpdate = computed(() => { 
  return editType.value === 'edit'
})
const editText = computed(() => { 
  return isUpdate.value ? '修改' : '新增'
})

onMounted(() => {
  editType.value = proxy.$route.query.editType || 'add'
  // 修改时查询详情
  if (isUpdate.value) {
    editId.value = proxy.$route.query.id
    queryData()
  }
})

const queryData = () => {
  queryDetail(editId.value).then(res => {
    formData.value = res.data
  })
}

const handleClose = () => {
  formRef.value.onCancel()
}

const onBack = () => {
  proxy.$router.back()
}
const onConfirm = () => {
  const data = { ...formData.value }
  // 修改时带上要修改的id
  if (isUpdate.value) {
    data.id = editId.value
  }
  // 调用api
  const operate = isUpdate.value ? update : add
  operate(data).then(() => {
    proxy.$message(proxy.$t('rmpSystem.delSuccessText'))
    proxy.$refresh()
    onBack()
  })
}
</script>
`
