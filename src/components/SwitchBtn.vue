<script setup>
import { ref } from 'vue'

// props
const props = defineProps({
  switchItem: {
    type: Array,
    default: () => ([])
  }
})

// emit
const emit = defineEmits(['selectOption'])

const activeIndex = ref(0)

const selectOption = (index, value) => {
  activeIndex.value = index
  emit('selectOption', value)
}
</script>

<template>
  <div class="gradient-toggle" role="tablist">
    <!-- 滑動漸層背景塊 -->
    <div
      class="toggle-slider"
      :style="{ transform: `translateX(${activeIndex * 100}%)` }"
    />

    <!-- 選項按鈕 -->
    <button
      v-for="(option, index) in switchItem"
      :key="option.value"
      type="button"
      class="toggle-option"
      :class="{ 'is-active': activeIndex === index }"
      @click="selectOption(index, option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.gradient-toggle {
  position: relative;
  display: inline-grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: #ffffff;
  border-radius: 9999px;
  padding: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  user-select: none;
}

/* 橘紅漸層滑塊 */
.toggle-slider {
  position: absolute;
  top: 2px;
  left: 2px;
  bottom: 2px;
  width: calc(50% - 2px);
  border-radius: 9999px;
  background: linear-gradient(90deg, #ffa726 0%, #ef5350 60%, #d81b60 100%);
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 1;
}

/* 選項文字按鈕 */
.toggle-option {
  position: relative;
  z-index: 2;
  padding: 6px 22px;
  border: none;
  background: transparent;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 700;
  color: #1e293b; /* 未選中時的深色文字 */
  cursor: pointer;
  transition: color 0.25s ease;
  white-space: nowrap;
}

/* 選中時文字轉為白色 */
.toggle-option.is-active {
  color: #ffffff;
}
</style>