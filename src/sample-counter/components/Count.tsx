type CountProps = {
  text: string
  countState: number
}

const Count = ({ text, countState }: CountProps) => {
  console.log("Count child component", text)
  return (
    <p>
      {text}:{countState}
    </p>
  )
}
export default Count
