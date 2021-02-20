import Vue from 'vue'
import * as filters from "./filters";
import * as directives from "./directives";
import * as functions from './functions'
const requireComponent = require.context('./components', false, /\.vue$/)

const commonPlugin = {
  install(_vue) {
    //管道
    Object.keys(filters).forEach(key => {
      _vue.filter(key, filters[key]);
    });
    // 指令
    Object.keys(directives).forEach(key => {
      _vue.directive(key, directives[key]);
    });
    //全局组件
    requireComponent.keys().forEach(fileName => {
      const _component = requireComponent(fileName).default
      _vue.component(_component.name, _component)
    })
    //全局工具方法
    Object.keys(functions).forEach(key => {
      _vue.prototype[`$${key}`] = functions[key]
    });
  }
}

Vue.use(commonPlugin)
