// src/plugins/vuetify.js
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // 引入 mdi 圖示
import { createVuetify } from 'vuetify'

export default createVuetify({
  // 可以在此客製主題（theme）或預設設定
  theme: {
    defaultTheme: 'light',
  },
})