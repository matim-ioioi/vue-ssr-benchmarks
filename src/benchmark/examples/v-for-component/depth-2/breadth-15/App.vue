<template>
  <CustomDiv v-for="j1 in 15" :key="`j1-${j1}`">
    <CustomDiv v-for="j2 in 15" :key="`j2-${j2}`">
      1
    </CustomDiv>
  </CustomDiv>
</template>

<script setup>
import CustomDiv from "../../../../components/CustomDiv.vue"
</script>