import { useState, useMemo } from "react"
import Button from "./components/Button"
import Title from "./components/Title"
import Count from "./components/Count"

//Counterコンポーネント（親）
const Counter = () => {
  const [firstCountState, setFirstCountState] = useState(0)
  const [secondCountState, setSecondCountState] = useState(10)

  //+ 1 ボタンのstateセット用関数
  const incrementFirstCounter = () => setFirstCountState(firstCountState + 1)

  //+ 10 ボタンのstateセット用関数
  const incrementSecondCounter = () =>
    setSecondCountState(secondCountState + 10)

  const [count01, setCount01] = useState(0)
  const [count02, setCount02] = useState(0)

  const result01 = () => setCount01(count01 + 1)
  const result02 = () => setCount02(count02 + 1)

  const square = useMemo(() => {
    let i = 0
    while (i < 2000000000) i++
    return count02 * count02
  }, [count02])

  // const square = () => {
  //   let i = 0
  //   while (i < 2000000000) i++
  //   return count02 * count02
  // }

  //子コンポーネントを呼び出す
  return (
    <>
      <Title />
      <Count text="+ 1 ボタン" countState={firstCountState} />
      <Count text="+ 10 ボタン" countState={secondCountState} />
      <Button handleClick={incrementFirstCounter} value={"+1 ボタン"} />
      <Button handleClick={incrementSecondCounter} value={"+10 ボタン"} />

      <h2>useMemo</h2>
      <div>result01: {count01}</div>
      <div>result02: {count02}</div>
      {/* <div>square: {square()}</div> */}
      <div>square: {square}</div>
      <button onClick={result01}>increment</button>
      <button onClick={result02}>increment</button>
    </>
  )
}

export default Counter
