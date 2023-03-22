import React from "react"

type CountProps = {
  text: string
  countState: number
}

class Count extends React.Component<CountProps> {
  constructor(props: CountProps) {
    // superすることでconstructor内でthisでpropsにアクセス可能になる。
    super(props)
    console.log(this.props)
  }
  render() {
    const { text, countState } = this.props
    console.log("Count child component", text)

    return (
      <p>
        {text}:{countState}
      </p>
    )
  }
}

export default Count
