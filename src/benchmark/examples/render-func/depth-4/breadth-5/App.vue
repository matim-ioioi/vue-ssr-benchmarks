<script>
import { defineComponent, h } from 'vue'
import RecursiveDivsRenderFunc from "../../../../components/RecursiveDivsRenderFunc.vue"

export default defineComponent({
  setup() {
    return () => h(RecursiveDivsRenderFunc, { depth: 4, breadth: 5 })
  }
})
</script>