import { h, type ComponentPublicInstance } from 'vue'

type propsType = {
  title?: string
  render: Function
  col: Object
}
export default {
  props: {
    title: String,
    render: Function,
    col: Object
  },
  setup(props: propsType) {
    return () => props.render(props.col)
  }
}
