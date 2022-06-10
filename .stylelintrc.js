module.exports = {
  extends: [
    'stylelint-config-standard', // 配置stylelint拓展插件
    'stylelint-config-prettier', // 配置stylelint和prettier兼容
    'stylelint-config-recess-order' // 配置stylelint css属性书写顺序插件
  ],
  rules: {
    'selector-class-pattern': null
  }
}
