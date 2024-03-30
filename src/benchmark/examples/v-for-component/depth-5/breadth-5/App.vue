<template>
  <CustomDiv v-for="j1 in 5" :key="`j1-${j1}`">
    <CustomDiv v-for="j2 in 5" :key="`j2-${j2}`">
      <CustomDiv v-for="j3 in 5" :key="`j3-${j3}`">
        <CustomDiv v-for="j4 in 5" :key="`j4-${j4}`">
          <CustomDiv v-for="j5 in 5" :key="`j5-${j5}`">
            1
          </CustomDiv>
        </CustomDiv>
      </CustomDiv>
    </CustomDiv>
  </CustomDiv>
</template>

<script setup>
import CustomDiv from "../../../../components/CustomDiv.vue"
</script>