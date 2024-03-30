<template>
  <div v-for="j1 in 10" :key="`j1-${j1}`">
    <div v-for="j2 in 10" :key="`j2-${j2}`">
      1
    </div>
  </div>
</template>