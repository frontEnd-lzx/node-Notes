export default {
  index: `
import { /** initParams, */updateBusinessStatus } from '@page/page/config'
import { setCompleted, setFailure } from '@/utils/colorState.js'
/**
 *
 * 代码描述
 * 模块名称: __menuChinaName__config
 * @author: __author__
 * 创建时间: __date__
 *
 */
// 状态枚举
  const statusList = [
    setFailure({ status: '0', content:  '停用', value: '0', label:  '停用',color: '#f14225', isFlash: false }),
    setCompleted({ status: '1', content: '启用', value: '1', label: '启用', color: '#36bb42', isFlash: true }),
  ]
// __menuChinaName__列表页配置
export const pageConfig = {
  title: '__menuChinaName__列表',
  tableIndex: '',
  header: {
    buttons: [
      { text: '新增', svg: 'xinzeng', type: 'add' }
    ]
  },
  tableProps: [
    { prop: 'key1', label: '示例字段1' },
    { prop: 'key2', label: '示例字段2' },
    { prop: 'key3', label: '示例字段3' },
    { prop: 'status', label: '状态', isStatus: true, statusList: statusList },
    { prop: '', label: '操作', isEdit: true }
  ],
  editTypes: ['preview', 'edit', 'delete']
}

// __menuChinaName__搜索表单配置
export const searchFormConfig = {
  confirmBtnText: '查询',
  cancelBtnText: '重置',
  isSearch: true,
  formItems: [
    [
      { label: '搜索条件1', placeholder: '搜索条件示例', key: 'key1' },
      { label: '状态', key: 'status', type: 'select', placeholder: '请选择状态', options: statusList, clearable: true }
    ]
  ]
}
`,
  // 表单页配置
  config: `
// __menuChinaName__新增修改表单配置
export const formConfig = {
  confirmBtnText: '保存',
  confirmAndSupplyBtnText: '提交',
  cancelBtnText: '取消',
  needValidate: true, // 是否需要验证
  formItems: [
    // 每个子数组代表一列
    [
      { label: '示例字段1', key: 'key1' },
      { label: '示例字段2', key: 'key2', type: 'select', options: [] }
    ],
    [
      { label: '示例字段3', key: 'key3', type: 'date' }
    ],
    [
      { label: '示例字段4', key: 'key4', type: 'textarea' }
    ]
  ]
}

// __menuChinaName__新增修改表单验证规则
export const formRules = {
  key1: [
    { required: true, message: '请输入****', trigger: 'blur' }
  ]
}
`,
  // 详情页配置
  detail: `
// __menuChinaName__详情页配置
export const detailConfig = [
  [
    { label: '字段1', key: 'key1' }
  ],
  [
    { label: '字段2', key: 'key2' }
  ]
]
`
}
