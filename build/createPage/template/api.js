export default `
/**
 *
 * 代码描述
 * 模块名称: __menuChinaName__api
 * @author: __author__
 * 创建时间: __date__
 *
 */
import { get, post, del, put } from '@/http'

const BASEURL = ''

// 列表查询
export const queryList = _params => get(BASEURL, _params)

// 详情查询
export const queryDetail = _id => get(\`\${BASEURL}/\${_id}\`)

// 删除
export const deleteItem = _id => del(\`\${BASEURL}/\${_id}\`)

// 新增
export const add = _params => post(BASEURL, _params)

// 修改
export const update = _params => put(\`\${BASEURL}/\${_params.id}\`, _params)
`
