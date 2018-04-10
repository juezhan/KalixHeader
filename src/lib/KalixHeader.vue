<template lang="pug">
  div.kalix-header
    img(src="./logo_oa_horizontal.png")
    ul.menu(ref="ulMenu")
      li(v-for="item in menuList")
        router-link.link-btn(tag="div" v-bind:to="{path:'/'+item.id}")
          i(:class="bindClass(item.iconCls)")
          | {{item.text}}
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'KalixHeader',
    data() {
      return {
        menuList: [],
        themeValue: ''
      }
    },
    props: {
      reqUrl: {
        type: String,
        default: ''
      },
      params: {
        type: Object,
        default() {
          return {
            _dc: (new Date()).getTime(),
            page: 1,
            start: 0,
            limit: 25
          }
        }
      }
    },
    mounted() {
      console.log('KalixSecondPage mounted')
      this.initMenu()
    },
    methods: {
      initMenu() {
        let toolListData = {}
        if (Cache.get('toolListData')) {
          toolListData = JSON.parse(Cache.get('toolListData'))
        }
        console.log('KalixSecondPage toolListData', toolListData)
        if (!isEmptyObject(toolListData)) {
          this.menuList = toolListData
        } else {
          if (this.reqUrl.length) {
            this.$http.get(this.reqUrl, {
              params: this.params
            }).then(response => {
              if (response && response.data) {
                console.log('[toolListData] data:', response.data)
                toolListData = response.data
                this.menuList = toolListData
                Cache.save('toolListData', JSON.stringify(toolListData))
              }
            })
          } else {
            console.log(' ===== this.reqUrl is Null! ===== ')
          }
        }
      },
      bindClass(e) {
        return e
      },
      setTheme(theme) {
        if (theme) {
          this.themeValue = theme
        }
      },
      onFlowCommand(command) {
        console.log(' ===== 代办流程 ===== ')
        // 代办流程
        this.$router.push({path: `/oa/Task`})
      },
      onMsgClick() {
        this.$router.push({path: `/common/receiver`})
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .kalix-header
    background-color #0000ff
    h1
      color #ff0000
    h2
      color #00ff00
</style>