import { memo } from "react"

type CountProps = {
  text: string
  countState: number
}

const Count = memo(({ text, countState }: CountProps) => {
  console.log("Count child component", text)
  return (
    <p>
      {text}:{countState}
    </p>
  )
})
export default Count
