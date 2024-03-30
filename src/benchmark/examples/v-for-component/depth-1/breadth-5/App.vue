<template>
  <CustomDiv v-for="j1 in 5" :key="`j1-${j1}`">
    1
  </CustomDiv>
</template>

<script setup>
import CustomDiv from "../../../../components/CustomDiv.vue"
</script>