<template>
  <div v-if="props.depth <= 0">1</div>
  <div v-else>
    <RecursiveDivs v-for="n in props.breadth" :key="n" :depth="props.depth - 1" :breadth="props.breadth" />
  </div>
</template>

<script setup>
defineOptions({
  name: 'RecursiveDivs'
})

const props = defineProps({
  depth: {
    type: Number,
    required: true,
  },
  breadth: {
    type: Number,
    required: true,
  }
})
</script>