// src/plugins/vuetify.js
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // 引入 mdi 圖示
import { createVuetify } from 'vuetify'

// 1. 定義自訂主題的色票
const myCustomLightTheme = {
  dark: false, // 是否為深色主題
  colors: {
    background: '#000000',
    surface: '#FFFFFF',
    primary: '#6200EE',      // 主色
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',    // 次要色
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

export default createVuetify({
  // 可以在此客製主題（theme）或預設設定
  theme: {
    defaultTheme: 'myCustomLightTheme', // 設定預設主題名稱
    themes: {
      myCustomLightTheme,
    },
  },
})