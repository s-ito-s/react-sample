import { memo } from "react"

const Title = memo(() => {
  console.log("Title component")
  return <h2>useCallBackTest</h2>
})

export default Title
