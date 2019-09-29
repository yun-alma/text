<template>
    <vue-ueditor-wrap  v-model="msg" :config="myConfig" @beforeInit="addCustomDialog"/>
</template>
<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  data() {
    return {
      msg: '',
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 700,
        // 初始容器宽度
        initialFrameWidth: '80%',
        UEDITOR_HOME_URL: '/UEditor/',
        enableAutoSave: false,
        allHtmlEnabled: true,
        saveInterval: 500000,
        maxInputCount: 500000,
        insertorderedlist: {
          // 系统自带
          decimal: '', // '1,2,3...'
          'lower-alpha': '', // 'a,b,c...'
          'lower-roman': '', // 'i,ii,iii...'
          'upper-alpha': '', // 'A,B,C'
          'upper-roman': '' // 'I,II,III...'
        },
        insertunorderedlist: {
          dot: '', // 。 小圆圈', 系统自带
          circle: '', // '○ 小圆圈'
          disc: '', // '● 小圆点'
          square: '' // '■ 小方块'
        }
      }
    }
  },
  components: {
    VueUeditorWrap
  },
  methods: {
    addCustomDialog(editorId) {
      // const self = this
      window.UE.registerUI(
        'test-dialog',
        (editor, uiName) => {
          editor.registerCommand(uiName, {
            execCommand: () => {
              const { imgUrl } = this
              editor.execCommand('inserthtml', `<img src='${imgUrl}'>`)
            }
          })
          // 创建 dialog
          const dialog = new window.UE.ui.Dialog({
            // 指定弹出层中页面的路径，这里只能支持页面，路径参考常见问题 2
            iframeUrl: '../../page/index.html#/upload',
            // 需要指定当前的编辑器实例
            editor,
            // 指定 dialog 的名字
            name: uiName,
            // dialog 的标题
            title: '图片上传',
            // 指定 dialog 的外围样式
            cssRules: 'width:600px;height:300px;',
            // 如果给出了 buttons 就代表 dialog 有确定和取消
            buttons: [
              {
                className: 'edui-okbutton',
                label: '确定',
                onclick: () => {
                  this.imgUrl = window.sessionStorage.getItem('imgUrl')
                  editor.execCommand(uiName)
                  dialog.close(false)
                }
              },
              {
                className: 'edui-cancelbutton',
                label: '取消',
                onclick: () => {
                  dialog.close(false)
                }
              }
            ]
          })
          // 参考上面的自定义按钮
          const btn = new window.UE.ui.Button({
            name: 'dialog-button',
            title: '图片上传',
            cssRules: `background-image:https://assets.2dfire.com/frontend/a83db7a9f1bf70b66750f13073f3f368.png !important;background-size: cover;`,
            onclick: () => {
              // 渲染dialog
              dialog.render()
              dialog.open()
              const mapFrame = document.getElementById('edui80_iframe')
              const iframeWin = mapFrame.contentWindow
              iframeWin.postMessage('fdsfsd', '*')
            }
          })
          return btn
        },
        1 /* 指定添加到工具栏上的那个位置，默认时追加到最后 */,
        editorId /* 指定这个UI是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */
      )
    }
  }
}
</script>
<style lang="less">

</style>
