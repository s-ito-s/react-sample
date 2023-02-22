import { useRecoilState } from "recoil"
import {
  inputSearchNameState,
  inputSearchModelState,
} from "../states/inputSearchTextState"

import "./SearchPanel.css"

export type SearchParam = {
  name?: string
  model?: string
}

const SearchPanel = () => {
  // useRecoilValueは状態管理からデータを取得することができる
  const [name, setName] = useRecoilState(inputSearchNameState)
  const [model, setModel] = useRecoilState(inputSearchModelState)

  return (
    <div className="search-panel-main">
      <div className="search-panel-header">
        <div className="search-panel-header-label">Search</div>
        <div>
          <button>Search</button>
          <button>Clear</button>
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
