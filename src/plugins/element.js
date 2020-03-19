import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// 导入弹框提示组件 prototype后可以通过this访问$message

Vue.prototype.$message = Message
