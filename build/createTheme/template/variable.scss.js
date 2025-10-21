// 读取运行环境中配置的系统简称
const currentSys = process.env.npm_config_project || 'rmp'

// 读取系统对应配置文件
const config = await import(`../../${currentSys}.config.js`)

// 读完配置文件中配置的主题颜色
const { themes } = config.default

/**
 * 生成主题模版
 * @param {Object} themes - 主题颜色配置对象，键为主题名，值为包含一个颜色键值对的对象
 * @returns {String} 构建的主题颜色样式字符串
 * @throws {Error} 如果themes参数非对象、空对象或格式不正确，则抛出错误
 */
const generateThemeStyles = (themes) => {
  // 验证传入的themes参数是否合法
  if (!themes || typeof themes !== 'object' || Object.keys(themes).length === 0) {
    throw new Error(`主题颜色配置错误,请在${config}检查`)
  }
  // 将主题颜色配置转换为CSS字符串
  const themeColorStr = Object.entries(themes)
    .map(([key, value]) => {
      // 验证每个主题的颜色配置是否合法
      if (!value || typeof value !== 'object' || Object.keys(value).length !== 1) {
        throw new Error(`主题颜色配置错误${key}",参考配置如：'ld-red': { '#E13541': '领雁红' }`)
      }
      const color = Object.keys(value)[0] // 获取颜色值
      const comment = value[color] // 获取颜色对应的描述
      return `$${key}: ${color}; // ${comment}` // 格式化主题颜色和描述
    })
    .join('\n')
  // 构建完整的主题样式字符串
  const themeStr = `
/*************************** 主题颜色 **************************/
${themeColorStr}
  `
  return themeStr
}

const themeTemplate1 = generateThemeStyles(themes)

const themeTemplate2 = `
/*************************** 字体颜色 **************************/
$fontColor: #6A748A; // 字体颜色# 333
$fontColorLight: #9FA4AF; // 字体色浅灰色#999
$borderColor: rgba(56, 56, 56, 0.1); // #eaeaea; // 边框颜色
$backgroundDark: #333; // 深色背景

/*************************** 其他颜色 **************************/

$successColor: #36bb42; // 成功颜色
$failureColor: #EE424E; // 失败颜色
$warningColor: #f1a225; // 警告颜色
$messageColor: #999; // 提醒颜色

/*************************** 2024-11-13 UI规范升级 **************************/

$specTextSize1: 28px; // 特殊数据1     28px/36px  (文字大小/行高)
$specTextSize2: 24px; // 特殊数据2     24px/32px
$specTextLineHeight: 36px; // 特殊数据1行高
$specTextLineHeight: 32px; // 特殊数据2行高
$specTextColor: #272935; // 特殊数据颜色

$titleTextSize: 20px; // 标题          20px/28px
$titleTextLineHeight: 28px; // 标题行高
$titleTextColor: #363a50;  // 标题1颜色
$titleTextColor2: #495164; // 标题2颜色

$headTextSize: 16px; // 顶部head       16px/24px
$headTextLineHeight: 24px; // 顶部head行高

$mainTextSize: 14px; // 正文body      14px/22px
$mainTextLineHeight: 22px; // 正文主要行高
$mainTextColor: #6a748a; // 正文颜色

$minorTextSize: 12px; // 次要文字   12px/20px
$minorTextLineHeight: 20px; // 次要文本行高
$minorTextColor: #9fa4af;  // 次要文本颜色

$stripeColor: #f7f8fa; // 斑马条颜色

$mainBorderColor: #d4d8df; // 按提示、边框颜色
$minorBorderColor: #f2f3f4; // 分割、弱描边颜色

$unSelectCheckboxBorderColor: #abadc2; // 未选中的checkbox边框颜色

$overlayColor: rgba(0, 0, 0, 0.45); // 弹出层蒙层背景颜色

$btnLargeHeight: 40px; // 大按钮高度  （大）  对应v-button组件的default
$btnNormalHeight: 34px; // 正常按钮高度 （中） 对应v-button组件的small
$btnMinHeight: 28px; // 小按钮高度 （小）     对应v-button组件的mini

$topSubMenuHeight: 46px; // 顶部菜单子菜单项高度
$slideMenuHeight: 48px; // 侧边一级菜单高度
$slideSubMenuHeight: 46px; //侧边子菜单高度
$menuCollapseWidth: 62px; // 折叠后的菜单宽度

$graphBg: #FFFFFF; // 画布-背景
$graphMenuTopBg: #D2DEF9; // 画布-操作面板背景
$graphMenuTopColor: #35373D; // 画布-操作面板字体颜色
$graphMenuTopArrowColor: #377FFE; // 画布-操作面板箭头颜色
$graphMenuBg: #F7F8FA; // 菜单栏背景
$graphMenuContentBg: #F0F2F4; // 菜单栏内容背景
$graphMenuColor: #5C6368; // 菜单栏文字颜色
$graphMenuArrowColor: #828998; // 菜单栏图标颜色
$graphMenuTreeColor: #828998; // 菜单栏树形文字颜色
$graphToolBg: #FFFFFF; // 画布工具栏背景颜色
$graphToolColor: #828998; // 画布工具栏文字颜色
$graphSelectBg: #FFFFFF; // 画布节点选择框背景
$graphContextMenuBg: #FFFFFF; // 画布右键背景
$graphContextMenuHoverColor: #F0F2F4; // 画布右键鼠标hover颜色
$graphContextMenuColor: #787B87; // 画布右键字体颜色
$graphScrollBg: #f7f7f7; // 画布滚动条背景色
$graphScrollThumbColor: #C8CBCD; // 画布滚动条方块颜色
/*************************** 边框 **************************/
$borderRadius: 4px;

// 圆角
.border-radius {
  border-radius: $borderRadius;
}

/*************************** 尺寸 **************************/
// 大
.size-large {
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
}

// 中(正常)
.size-normal {
  height: 32px;
  // line-height: 32px;
  box-sizing: border-box;
}

// 小
.size-small {
  height: 28px;
  line-height: 28px;
  box-sizing: border-box;
}

/*************************** banner **************************/

$bannerHeight: 58px; // 头部栏banner的高度
$MarginTopHeight: 0;

$menuWidth: 220px;

/* 全局css变量 */
$--color-primary: #409EFF;
`
export default {
  variables: [themeTemplate1, themeTemplate2].join('\n')
}
