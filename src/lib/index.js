import KalixHeader from './KalixHeader.vue' // 导入组件
const kalixHeader = {
  install(Vue) {
    Vue.component(KalixHeader.name, KalixHeader)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(kalixHeader)
}
export default kalixHeader
