import { Suspense } from "react"
import { Link } from "react-router-dom"
import { RecoilRoot } from "recoil"
import SearchPanel from "./components/SearchPanel"
import DeviceList from "./components/DeviceList"
import DeviceRegistrationForm from "./components/DeviceRegistrationForm"

const SampleRecoil = (): JSX.Element => {
  return (
    // 状態変数を適用させる範囲を決める 囲むことで囲まれたコンポーネントで状態管理を利用することができるようになる。
    <RecoilRoot>
      <div className="sample-use-state-main">
        <h1>Sample Recoil</h1>
        <div className="search-panel">
          <SearchPanel />
        </div>
        <div className="device-list">
          {/* コンポーネントを「ローディング中なのでまだレンダリングできない」という状態にすることができる  */}
          <Suspense fallback={<div>Now Loading...</div>}>
            <DeviceList />
          </Suspense>
        </div>
        <div className="device-registration-form">
          <DeviceRegistrationForm />
        </div>
        <Link to={`/`}>back</Link>
      </div>
    </RecoilRoot>
  )
}

export default SampleRecoil
