import {
  inputSearchNameState,
  inputSearchModelState,
} from "../states/inputSearchTextState"
import { useRecoilState, useSetRecoilState } from "recoil"
import { fetchDevices } from "../../ApiRequest"
import { devicesState } from "../states/devicesState"

import "./SearchPanel.css"

type SearchParams = {
  name?: string
  model?: string
}

const SearchPanel = () => {
  // useRecoilValueは状態管理からデータを取得することができる
  const [name, setName] = useRecoilState(inputSearchNameState)
  const [model, setModel] = useRecoilState(inputSearchModelState)
  const setDevicesState = useSetRecoilState(devicesState)

  const onClickSearchButton = async () => {
    const params: SearchParams = {}

    if (name) params.name = name
    if (model) params.model = model

    const response = await fetchDevices(params)
    setDevicesState(response.data)
  }

  const onClickClearButton = async () => {
    setName("")
    setModel("")
    const { data } = await fetchDevices({})
    setDevicesState(data)
  }

  return (
    <div className="search-panel-main">
      <div className="search-panel-header">
        <div className="search-panel-header-label">Search</div>
        <div>
          <button onClick={onClickSearchButton}>Search</button>
          <button onClick={onClickClearButton}>Clear</button>
        </div>
      </div>
      <div className="search-panel-row">
        <div className="search-panel-row-label">Name</div>
        <input
          className="search-panel-row-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="search-panel-row">
        <div className="search-panel-row-label">Model</div>
        <input
          className="search-panel-row-input"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
      </div>
    </div>
  )
}

export default SearchPanel
