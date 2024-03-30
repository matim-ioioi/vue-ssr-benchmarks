import { defineComponent } from 'vue'
import RecursiveDivsJSX from "../../../../components/RecursiveDivsJSX"

export default defineComponent({
  setup() {
    return () => (
        <RecursiveDivsJSX depth={5} breadth={1} />
    )
  },
})