import React from "react"

type ButtonProps = {
  handleClick: () => void
  value: string
}

class Button extends React.Component<ButtonProps> {
  constructor(props: ButtonProps) {
    // superすることでconstructor内でthisでpropsにアクセス可能になる。
    super(props)
    console.log(this.props)
  }
  render() {
    const { value } = this.props

    console.log("Button child component", value)

    return (
      <button type="button" onClick={this.props.handleClick}>
        {value}
      </button>
    )
  }
}

export default Button
