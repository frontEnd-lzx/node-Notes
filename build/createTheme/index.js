import fs from 'fs'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const tempVariables = await import('./template/variable.scss.js')
const tempThemes = await import('./template/theme.scss.js')

const { themes } = tempThemes.default
const { variables } = tempVariables.default

// 读取运行环境中配置的系统简称
// eslint-disable-next-line no-undef
const currentSys = process.env.npm_config_project || 'rmp'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * 处理路径
 * @param {String} dir 新建菜单的目录，相对路径
 * @param {String} menu 菜单名
 * @returns 处理后的完整路径
 */
function resolve(dir, menu) {
  // 将相对路径转换为绝对路径，并确保目录结构正确
  return path.resolve(__dirname, '../../', dir, menu)
}
/**
 * 复制favicon文件到public下
 * 需要在template下提供logo.svg和logo_white.svg两个文件
 */
const createFavicon = () => {
  const iconPath = resolve('build/createTheme/ico', `favicon-${currentSys}.ico`)
  if (!fs.existsSync(iconPath)) {
    throw new Error(`${iconPath}文件不存在`)
  }
  fs.copyFileSync(iconPath, resolve('public', 'favicon.ico'))
}

/**
 * 复制log文件到src/common/assets下
 * 需要在template下提供logo.svg和logo_white.svg两个文件
 */
const createThemeLogo = () => {
  const iconPath = resolve('build/createTheme/ico', `logo-${currentSys}.svg`)
  if (!fs.existsSync(iconPath)) {
    throw new Error(`${iconPath}文件不存在`)
  }
  fs.copyFileSync(iconPath, resolve('src/assets/svg', 'logo.svg'))
}

/**
 * 重新创建vairiable.scss文件
 */
const createVariableScss = () => {
  try {
    const fileName = 'variable.scss'
    // 检查目录是否存在，并确保有写权限
    const dirPath = path.dirname(resolve('src/assets/css', fileName))
    fs.accessSync(dirPath, fs.constants.W_OK)
    console.log('目录检查通过，可以写入文件')
    // 写入文件
    fs.writeFileSync(resolve('src/assets/css', fileName), variables)
    console.log(`${fileName}更新完成`)
  } catch (err) {
    // 错误处理
    console.error(`创建变量vairiable.scss文件时出错: ${err}`)
    // 在这里可以添加更多的错误处理逻辑，例如发送错误报告或进行自动重试
  }
}

/**
 *  创建主题样式文件
 */
const createTheme = () => {
  try {
    const fileName = 'theme.scss'
    // 检查目录是否存在，并确保有写权限
    const dirPath = path.dirname(resolve('src/assets/css', fileName))
    fs.accessSync(dirPath, fs.constants.W_OK)
    console.log('目录检查通过，可以写入文件')
    // 写入文件
    fs.writeFileSync(resolve('src/assets/css', fileName), themes)
    console.log(`${fileName}更新完成`)
  } catch (err) {
    // 更优雅的错误处理
    console.error(`创建主题theme.scss文件时出错: ${err}`)
    // 根据需要在这里添加更多的错误处理逻辑，例如发送错误报告或进行自动重试
  }
}

const createThemeFile = () => {
  createFavicon()
  createThemeLogo()
  createVariableScss()
  createTheme()
}

createThemeFile()
