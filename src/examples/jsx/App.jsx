import { defineComponent } from 'vue'
import RecursiveDivs from "../../components/RecursiveDivsJSX"

export default defineComponent({
  setup() {
    return () => (
        <RecursiveDivs depth={5} breadth={10} />
    )
  },
})