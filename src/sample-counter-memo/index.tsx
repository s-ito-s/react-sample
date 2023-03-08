import { useCallback, useState } from "react"
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

  // //+ 1 ボタンのstateセット用関数
  // const incrementFirstCounter = useCallback(
  //   () => setFirstCountState(firstCountState + 1),
  //   [firstCountState]
  // )

  // //+ 10 ボタンのstateセット用関数
  // const incrementSecondCounter = useCallback(
  //   () => setSecondCountState(secondCountState + 10),
  //   [secondCountState]
  // )

  //子コンポーネントを呼び出す
  return (
    <>
      <Title />
      <Count text="+ 1 ボタン" countState={firstCountState} />
      <Count text="+ 10 ボタン" countState={secondCountState} />
      <Button handleClick={incrementFirstCounter} value={"+1 ボタン"} />
      <Button handleClick={incrementSecondCounter} value={"+10 ボタン"} />
    </>
  )
}

export default Counter
