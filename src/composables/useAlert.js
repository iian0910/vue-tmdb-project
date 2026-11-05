import { ref } from "vue";

const visible = ref(false)
const message = ref('')
const type = ref('success') // success | error | warning | info

let timer = null

export function useAlert() {
  const showAlert = (msg, alertType = 'success', timeout = 3000) => {
    if (timer) clearTimeout(timer)

    message.value = msg
    type.value = alertType
    visible.value = true

    if (timeout > 0) {
      timer = setTimeout(() => {
        hideAlert()
      }, timeout)
    }
  }

  const hideAlert = () => {
    visible.value = false
    message.value = ''
  }

  return {
    visible,
    message,
    type,
    showAlert,
    hideAlert
  }
}