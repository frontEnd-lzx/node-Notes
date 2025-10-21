import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import fuzzypath from 'inquirer-fuzzy-path'
import process from 'process'
import apiJsText from './template/api.js'
import configJSText from './template/config.js'
import indexVueText from './template/index.vue.js'
import detailVueText from './template/detail.vue.js'
import configVueText from './template/config.vue.js'
inquirer.registerPrompt('fuzzypath', fuzzypath)

import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let menuInfo = {}

// 模板中需要替换的字符正则
const regMenuName = /__menuName__/g
const regMenuChinaName = /__menuChinaName__/g
const regAuthor = /__author__/g
const regDate = /__date__/g

/**
 * 处理路径
 * @param {String} dir 新建菜单的目录
 * @param {String} menu 菜单名
 * @returns 处理后的路径
 */
function resolve(dir, menu) {
  return path.resolve(__dirname, '../../', dir, menu)
}

/**
 * 页面生成处理函数
 */
function createPage() {
  const { dir, menuName, pages } = menuInfo
  console.log(dir, menuName, pages)
  const menuPath = resolve(dir, menuName) // 要新建的菜单路径
  // 判断 dir + menuName 是否已经存在
  if (fs.existsSync(menuPath)) {
    throw new Error(menuPath + '菜单已经存在，请重试')
  }
  menuInfo.menuDir = menuPath
  // 新建目录
  fs.mkdirSync(menuPath, { recursive: true }, (err) => {
    if (err) throw err
    console.log(`新建目录${menuName}完成`)
  })

  // 新建api.js
  createApiJs()
  // 新建config.js
  createConfigJs()
  // 新建index.vue
  createIndexVue()
  // 新建detail.vue
  createDetailVue()
  // 新建config.vue
  createConfigVue()
}

/**
 * 将给定字符串转换为驼峰命名法。
 * @param {string} str - 待转换的字符串。
 * @returns {string} 转换成驼峰命名法的字符串。
 */
const getCamelCase = (str) => {
  // 完善的边界条件检查，确保传入的是一个非空字符串
  if (typeof str === 'string' && str.length > 0) {
    // 使用正则表达式和回调函数转换字符串中的每个"-"后的小写字母为大写
    const cameStr = str.replace(/-([a-z])/g, (_, i) => {
      return i.toUpperCase()
    })
    return cameStr
  }
  // 如果输入不满足条件，返回空字符串
  return ''
}

const replaceText = (text) => {
  const { module, menuName, menuChinaName, author, date } = menuInfo
  return text
    .replace(regMenuName, getCamelCase([module, menuName].join('-')))
    .replace(regMenuChinaName, menuChinaName)
    .replace(regAuthor, author)
    .replace(regDate, date)
}

/**
 * 新建api.js文件
 */
function createApiJs() {
  let apiJs = replaceText(apiJsText)
  fs.writeFile(path.resolve(menuInfo.menuDir, 'api.js'), apiJs, (err) => {
    if (err) throw err
    console.log('api.js新建完成')
  })
}
/**
 * 新建config.js文件
 */
function createConfigJs() {
  const { pages } = menuInfo
  let text = configJSText.index
  // 如果要新建表单页，添加表单页配置
  if (pages.includes('config')) {
    text += configJSText.config
  }
  // 如果要新建详情页，添加详情页配置
  if (pages.includes('detail')) {
    text += configJSText.detail
  }
  text = replaceText(text)
  fs.writeFile(path.resolve(menuInfo.menuDir, 'config.js'), text, (err) => {
    if (err) throw err
    console.log('config.js新建完成')
  })
}

/**
 * 新建index.vue文件
 */
function createIndexVue() {
  let indexVue = replaceText(indexVueText)
  fs.writeFile(path.resolve(menuInfo.menuDir, 'index.vue'), indexVue, (err) => {
    if (err) throw err
    console.log('index.vue新建完成')
  })
}

/**
 * 新建detail.vue文件
 */
function createDetailVue() {
  // 判断是否需要详情页
  if (!menuInfo.pages.includes('detail')) return
  let detailVue = replaceText(detailVueText)
  fs.writeFile(path.resolve(menuInfo.menuDir, 'detail.vue'), detailVue, (err) => {
    if (err) throw err
    console.log('detail.vue新建完成')
  })
}

/**
 * 新建config.vue文件
 */
function createConfigVue() {
  // 判断是否需要表单配置页
  if (!menuInfo.pages.includes('config')) return
  let configVue = replaceText(configVueText)
  fs.writeFile(path.resolve(menuInfo.menuDir, 'config.vue'), configVue, (err) => {
    if (err) throw err
    console.log('config.vue新建完成')
  })
}

/**
 * 生成新建菜单的路由配置
 * @returns 路由配置
 */
function createMenuRouteConfig() {
  const { menuName, menuChinaName, pages } = menuInfo
  // 入口页
  const routeConfig = {
    [menuName]: {
      id: '',
      title: menuChinaName,
      icon: '',
      cache: false
    }
  }
  // 表单页路由配置
  if (pages.includes('config')) {
    routeConfig[menuName + 'Config'] = {
      id: '',
      title: menuChinaName + '配置',
      hidden: true,
      path: `${menuName}/config.vue`
    }
  }
  // 详情页路由配置
  if (pages.includes('detail')) {
    routeConfig[menuName + 'Detail'] = {
      id: '',
      title: menuChinaName + '详情',
      hidden: true,
      path: `${menuName}/detail.vue`
    }
  }
  return routeConfig
}

/**
 * 更新routes.json文件
 */
function updateRoutesJson() {
  const { dir } = menuInfo
  // 新菜单路由配置
  const routeConfig = createMenuRouteConfig()
  fs.readFile(path.resolve(dir, 'routes.json'), 'utf-8', (err, res) => {
    if (!err) {
      let config = JSON.parse(res)
      config = Object.assign({}, config, routeConfig)
      writeRoutesConfig(config)
    } else {
      // routes.json不存在
      writeRoutesConfig(routeConfig)
    }
  })
}

function writeRoutesConfig(config) {
  const { dir } = menuInfo
  fs.writeFile(path.resolve(dir, 'routes.json'), JSON.stringify(config, '', '\t') + '\n', (err) => {
    if (err) throw err
    console.log('routes.json更新成功')
    console.log('菜单页面已初始化完成，请手动添加路由ID，并执行 npm run getRoutes all 更新路由文件。')
  })
}

const questions = [
  {
    type: 'list',
    name: 'selectionMethod',
    message: '如何指定文件?',
    choices: [
      { name: '手动输入目录路径', value: 'input' },
      { name: '从目录中选择', value: 'select' }
    ]
  },
  {
    type: 'input',
    name: 'dir',
    itemType: 'directory',
    message: '输入目录路径:',
    when: (answers) => answers.selectionMethod === 'input'
  },
  {
    type: 'fuzzypath',
    name: 'dir',
    message: '选择文件目录:',
    itemType: 'directory',
    rootPath: 'modules',
    excludePath: (nodePath) => nodePath.includes('.git'),
    when: (answers) => answers.selectionMethod === 'select'
  },
  // {
  //   type: 'fuzzypath',
  //   name: 'dir',
  //   message: '选择要新建菜单的目录',
  //   itemType: 'directory',
  //   rootPath: 'modules',
  //   excludePath: nodePath => nodePath.includes('.git') || nodePath.includes('assets') || nodePath.includes('mock'),
  //   excludeFilter: nodePath => nodePath === '.' || nodePath === 'modules'
  // },
  {
    type: 'input',
    name: 'menuName',
    message: '菜单名称【英文驼峰名称，确保工程下的菜单名称唯一】',
    default: '',
    validate(val) {
      // 英文命名
      const regExp = /^[a-zA-Z]+$/g
      return regExp.test(val)
    }
  },
  {
    type: 'input',
    name: 'menuChinaName',
    message: '菜单中文名称',
    default: '',
    validate(val) {
      return !!val
    }
  },
  {
    type: 'checkbox',
    name: 'pages',
    message: '包含的页面',
    choices: [new inquirer.Separator('(*) 列表页【菜单入口页，必选】'), { name: '表单配置页', value: 'config' }, { name: '详情页', value: 'detail' }],
    // default: ['index'],
    validate(val) {
      return val.length > 0
    },
    filter(val) {
      val.push('index') // 添加默认的列表页
      return val
    }
  }
]

const AUTHOR = process.env.USER || 'UNSETTING'
const formatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})

inquirer.prompt(questions).then((answers) => {
  console.log('answers====>', answers)
  const module = answers.dir
    .split('/')
    .filter((it) => !['modules', 'views'].includes(it))
    .map((it) => {
      return it.replace('-system', '').replace('modules\\', '')
    })
    .join('-')
  console.log(module)
  menuInfo = { ...answers, ...{ module, author: AUTHOR, date: formatter.format(new Date()) } }
  console.log(menuInfo, getCamelCase([module, menuInfo.menuName].join('-')))
  createPage()
})
