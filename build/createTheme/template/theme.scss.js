// 读取运行环境中配置的系统简称
const currentSys = process.env.npm_config_project || 'rmp'

// 读取系统对应配置文件
const config = await import(`../../${currentSys}.config.js`)

// 读完配置文件中配置的主题颜色
const { themes } = config.default

const genThemeColor = () => {
  // 使用模板字符串和数组方法来构建主题颜色字符串
  const themeColorStr = Object.entries(themes)
    .map(([key, value]) => {
      // 假设themes的值已经是安全的，或者在这里进行转义/验证
      if (!value || typeof value !== 'object' || Object.keys(value).length !== 1) {
        throw new Error(`主题颜色配置错误${key}",参考配置如：'ld-red': { '#E13541': '领雁红' }`)
      }
      const color = Object.keys(value)[0]
      const comment = value[color]
      return `  ${key}: ${color},\n  // ${comment}`
    })
    .join('\n')
  return [`$theme-colors: (`, themeColorStr, `);`].join('\n')
}
const themeTemplate1 = `
// 主题色变换函数
@function themeColor($mColor, $idx) {
  $theme-colors: (
    'level-15': color.adjust($mColor, $lightness: 75%),
    'level-14': color.adjust($mColor, $lightness: 70%),
    'level-13': color.adjust($mColor, $lightness: 65%),
    'level-12': color.adjust($mColor, $lightness: 60%),
    'level-11': color.adjust($mColor, $lightness: 55%),
    'level-10': color.adjust($mColor, $lightness: 50%),
    'level-9':  color.adjust($mColor, $lightness: 45%),
    'level-8':  color.adjust($mColor, $lightness: 40%),
    'level-7':  color.adjust($mColor, $lightness: 35%),
    'level-6':  color.adjust($mColor, $lightness: 30%),
    'level-5':  color.adjust($mColor, $lightness: 25%),
    'level-4':  color.adjust($mColor, $lightness: 20%),
    'level-3':  color.adjust($mColor, $lightness: 15%),
    'level-2':  color.adjust($mColor, $lightness: 10%),
    'level-1':  color.adjust($mColor, $lightness: 5%),
    level0: $mColor,
    'level1':  color.adjust($mColor, $lightness: -5%),
    'level2':  color.adjust($mColor, $lightness: -10%),
    'level3':  color.adjust($mColor, $lightness: -15%),
    'level4':  color.adjust($mColor, $lightness: -20%),
    'level5':  color.adjust($mColor, $lightness: -25%),
    'level6':  color.adjust($mColor, $lightness: -30%),
    'level7':  color.adjust($mColor, $lightness: -35%),
    'level8':  color.adjust($mColor, $lightness: -40%),
    'level9':  color.adjust($mColor, $lightness: -48%),
    'level10': color.adjust($mColor, $lightness: -50%),
    'level11': color.adjust($mColor, $lightness: -55%),
    'level12': color.adjust($mColor, $lightness: -60%),
    'level13': color.adjust($mColor, $lightness: -65%),
    'level14': color.adjust($mColor, $lightness: -70%),
    'level15': color.adjust($mColor, $lightness: -75%)
  );

$key: "level#{$idx}";

@if not map.has-key($theme-colors, $key) {
  @warn "No color found for '#{$key}' in $theme-colors map. Property omitted.";
}

@return map.get($theme-colors, $key);
}

@function completeColor($color, $idx) {
  $black: themed('0'); // 灰度基准 #333
  $grayscale-colors: (
    "level-17": mix($black,$color, 85%),
    "level-16.1": mix($black,$color, 81%),
    "level-16": mix($black,$color, 80%),
    "level-15": mix($black,$color, 75%),
    "level-14": mix($black,$color, 70%),
    "level-13": mix($black,$color, 65%),
    "level-12": mix($black,$color, 60%),
    "level-11": mix($black,$color, 55%),
    "level-10": mix($black,$color, 50%),
    "level-9": mix($black,$color, 45%),
    "level-8": mix($black,$color, 40%),
    "level-7": mix($black,$color, 35%),
    "level-6": mix($black,$color, 30%),
    "level-5": mix($black,$color, 25%),
    "level-4": mix($black,$color, 20%),
    "level-3": mix($black,$color, 15%),
    "level-2": mix($black,$color, 10%),
    "level-1": mix($black,$color, 5%),
    level0: $black,
  );

$key: "level#{$idx}";

@if not map-has-key($grayscale-colors, $key) {
  @warn "No color found for '#{$key}' in $grayscale-colors map. Property omitted.";
}

@return map-get($grayscale-colors, $key);
}

// 灰度
@function grayscale($idx) {
  $black: rgba(38, 38, 38, 1); // 灰度基准 #333
  $grayscale-colors: (
    'level-17': color.adjust($black, $lightness: 85%),
    'level-16.1': color.adjust($black, $lightness: 81%),
    'level-16': color.adjust($black, $lightness: 80%),
    'level-15': color.adjust($black, $lightness: 75%),
    'level-14': color.adjust($black, $lightness: 70%),
    'level-13': color.adjust($black, $lightness: 65%),
    'level-12': color.adjust($black, $lightness: 60%),
    'level-11': color.adjust($black, $lightness: 55%),
    'level-10': color.adjust($black, $lightness: 50%),
    'level-9':  color.adjust($black, $lightness: 45%),
    'level-8':  color.adjust($black, $lightness: 40%),
    'level-7':  color.adjust($black, $lightness: 35%),
    'level-6':  color.adjust($black, $lightness: 30%),
    'level-5':  color.adjust($black, $lightness: 25%),
    'level-4':  color.adjust($black, $lightness: 20%),
    'level-3':  color.adjust($black, $lightness: 15%),
    'level-2':  color.adjust($black, $lightness: 10%),
    'level-1':  color.adjust($black, $lightness: 5%),
    level0: $black
  );

$key: "level#{$idx}";

@if not map.has-key($grayscale-colors, $key) {
  @warn "No color found for '#{$key}' in $grayscale-colors map. Property omitted.";
}

@return map.get($grayscale-colors, $key);
}

// 获取对应层级的颜色
@function level($color, $level) {
  @return themeColor($color, $level);
}`

const themeTemplate3 = `
@function genTheme($theme-colors) {
  $themes: ();

  @each $key, $value in $theme-colors {
    $theme: ();

    @for $i from 0 through 11 {
      $theme: map.merge(
        $theme,
        (
          'l#{$i}': level($value, $i)
        )
      );
    }

    @for $i from 1 through 10 {
      $theme: map.merge(
        $theme,
        (
          'l-#{$i}': level($value, -$i)
        )
      );
    }

    $themes: map.merge(
      $themes,
      (
        $key: $theme
      )
    );
  }
  @return $themes;
}

// 系统生成主题
$themes: genTheme($theme-colors);
$theme-map: null;
//遍历主题map
@mixin themeify {
  @each $theme-name, $theme-map in $themes {
    //!global 把局部变量强升为全局变量
    $theme-map: $theme-map !global;

    //判断html的data-theme的属性值  #{}是sass的插值表达式
    //& sass嵌套里的父容器标识   @content是混合器插槽，像vue的slot
    [data-theme=#{'' + $theme-name}] & {
      @content;
    }
  }
}

//声明一个根据Key获取颜色的function
@function themed($key) {
  @return map.get($theme-map, 'l' + $key);
}

// 获取背景色
@mixin background($level) {
  @include themeify {
    background-color: themed($level) !important;
    // background: themed($level);
  }
}
  
//获取边框颜色
@mixin outline-color($level) {
  @include themeify {
    outline-color: themed($level) !important;
  }
}
  
//获取边框颜色
@mixin border-color($level) {
  @include themeify {
    border-color: themed($level) !important;
  }
}
//获取单个边的边框颜色
@mixin border-direction-color($level, $direction) {
  @include themeify {
    border-#{$direction}-color: themed($level) !important;
  }
}

//获取字体颜色
@mixin font-color($level) {
  @include themeify {
    color: themed($level);
  }
}

@mixin linear-gradient($level) {
  @include themeify {
    background: linear-gradient(180deg, themed($level) 0%, rgba(255, 255, 255, 1) 100%);
  }
}
@mixin complete-color($color, $level) {
  @include themeify {
    background: completeColor($color, $level) !important;
  }
}
@mixin complete-border-color($color, $level) {
  @include themeify {
    border-color: completeColor($color, $level) !important;
  }
}

@mixin outline-border($level) {
  @include themeify {
    outline: 1px solid themed($level)  !important;
  }
}
@mixin box-shadow($level) {
  @include themeify {
    box-shadow: 0 0 0 1px themed($level) inset !important;
  }
}

.box-main-shadow {
  @include box-shadow('0')
}
.box-common-shadow {
  box-shadow: 0 0 0 1px $mainBorderColor inset !important;
}
.outline-background {
  @include outline-border('0')
}
/* ************************ 背景色 ************************ */

// 选中颜色1（浅色）
.background-mix-color-light {
  @include complete-color(rgba(255, 255, 255, 0.85),'-3')
}
// 选中颜色2（深色）
.background-mix-color-dark {
  @include complete-color( rgba(0, 0, 0, 0.45), '-3')
}
// 二级菜单背景底色
.background-mix-color-dark2 {
  @include complete-color( rgba(0, 0, 0, 0.2), '-3')
}
// 三级菜单背景底色
.background-mix-color-dark3 {
  @include complete-color( rgba(0, 0, 0, 0.35), '-3')
}

// 背景色（同主题色）
.background-color {
  @include background('0');
}
// 背景色变浅（主题色-3）
.background-color-light {
  @include background('-3');
}
// 背景色加深（主题色+3）
.background-color-dark {
  @include background('3');
}
.background-color-opacity6 {
  @include background('-6');
}
.background-color-opacity2 {
  @include background('2');
}
.background-color-opacity5 {
  @include background('5');
}
  .background-color-opacity7 {
  @include background('-7');
}
// 背景色淡化（主题色-8）
.background-color-hover {
  background-color: grayscale('-16') !important;
}
//
.background-color-bg {
  @include background('-9');
}

/* ************************ 边框色 ************************ */
.outline-color-background {
  @include outline-color('0');
}

// 边框色（同主题色）
.border-color-background {
  @include border-color('0');
}
.border-bottom-color-background {
  @include border-direction-color('0', 'bottom');
}
// 边框色变浅（主题色-3）
.border-color-background-light {
  @include border-color('-3');
}

// 边框色加深（主题色+3）
.border-color-background-dark {
  @include border-color('3');
}

// 边框色淡化（主题色-8）
.border-color-background-hover {
  @include border-color('-8');
}

// 默认边框
.border-main-color {
  border: 1px solid $mainBorderColor;
}
.border-color {
  border: 1px solid $borderColor;
}

.linear-gradient-background {
  @include linear-gradient('-6')
}

/* ************************ 字体色 ************************ */

// 字体色（同主题色）
.font-color-background {
  @include font-color('0');
}

// 字体色变浅（主题色-3）
.font-color-background-light {
  @include font-color('-3');
}

// 字体色加深（主题色+3）
.font-color-background-dark {
  @include font-color('3');
}

// 默认字体色
.font-color {
  color: $fontColor;
}

// 字体色浅灰色
.font-color-light {
  color: $fontColorLight;
}

// 白色字体
.font-color-white {
  color: #FFF;
}`

const themeTemplate2 = genThemeColor()

export default {
  themes: [themeTemplate1, themeTemplate2, themeTemplate3].join('\n')
}
