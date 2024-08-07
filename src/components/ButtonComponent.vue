<script setup>
import DefineProps from "vue";

DefineProps({
  text: {
    type: String,
  },
  handleClick: {
    type: Function,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "button",
  },
  style: {
    type: String,
  },
});
</script>

<template>
    <button
        :type="type"
        :disabled="disabled"
        @click="handleClick"
        :class="`px-4 py-2 rounded-md ${style}`"
    >
        {{ text }}
    </button>
</template>
