type ButtonProps = {
  handleClick: () => void
  value: string
}

//Buttonコンポーネント(子)
const Button = ({ handleClick, value }: ButtonProps) => {
  console.log("Button child component", value)
  return (
    <button type="button" onClick={handleClick}>
      {value}
    </button>
  )
}

export default Button
