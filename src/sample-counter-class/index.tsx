import React, { Component } from "react"
import Button from "./components/Button"
import Title from "./components/Title"
import Count from "./components/Count"

type CounterState = {
  firstCountState: number
  secondCountState: number
  count01: number
  count02: number
}

//Counterコンポーネント（親）
class Counter extends Component<{}, CounterState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      firstCountState: 0,
      secondCountState: 10,
      count01: 0,
      count02: 0,
    }
  }

  //+ 1 ボタンのstateセット用関数
  incrementFirstCounter = () => {
    this.setState({ firstCountState: this.state.firstCountState + 1 })
  }

  //+ 10 ボタンのstateセット用関数
  incrementSecondCounter = () => {
    this.setState({ secondCountState: this.state.secondCountState + 10 })
  }

  result01 = () => {
    this.setState({ count01: this.state.count01 + 1 })
  }

  result02 = () => {
    this.setState({ count02: this.state.count02 + 1 })
  }

  square = () => {
    let i = 0
    while (i < 2000000000) i++
    return this.state.count02 * this.state.count02
  }

  render() {
    return (
      <>
        <Title />
        <Count text="+ 1 ボタン" countState={this.state.firstCountState} />
        <Count text="+ 10 ボタン" countState={this.state.secondCountState} />
        <Button handleClick={this.incrementFirstCounter} value={"+1 ボタン"} />
        <Button
          handleClick={this.incrementSecondCounter}
          value={"+10 ボタン"}
        />

        {/* <h2>useMemo</h2>
        <div>result01: {this.state.count01}</div>
        <div>result02: {this.state.count02}</div>
        <div>square: {this.square()}</div>
        <button onClick={this.result01}>increment</button>
        <button onClick={this.result02}>increment</button> */}
      </>
    )
  }
}

export default Counter
