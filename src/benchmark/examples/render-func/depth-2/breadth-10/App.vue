<script>
import { defineComponent, h } from 'vue'
import RecursiveDivsRenderFunc from "../../../../components/RecursiveDivsRenderFunc.vue"

export default defineComponent({
  setup() {
    return () => h(RecursiveDivsRenderFunc, { depth: 2, breadth: 10 })
  }
})
</script>