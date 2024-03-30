<script>
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'RecursiveDivsRenderFunc',
  props: {
    depth: {
      type: Number,
      required: true,
    },
    breadth: {
      type: Number,
      required: true,
    }
  },
  setup(props) {
    const RecursiveDivs = (depth = 1, breadth = 1) => {
      if (depth <= 0) {
        return `<div>1</div>`
      }

      let children = []

      for (let i = 0; i < breadth; i++) {
        children.push(RecursiveDivs(depth - 1, breadth))
      }

      return `<div>${children.join('')}</div>`
    }

    return () => h(RecursiveDivs(props.depth, props.breadth))
  }
})
</script>