import { useState } from "react";

export type SearchParam = {
  name?: string;
  model?: string;
};

export default function SearchPanel({
  onSearch,
}: {
  onSearch: (searchParam: SearchParam) => void;
}) {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");

  const onClickSearchButton = () => {
    const param: SearchParam = {};
    if (name !== "") {
      param["name"] = name;
    }
    if (model !== "") {
      param["model"] = model;
    }
    onSearch(param);
  };

  function onClickClearButton() {
    setName("");
    setModel("");
    onSearch({});
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
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="search-panel-row">
        <div className="search-panel-row-label">Model</div>
        <input
          className="search-panel-row-input"
          value={model}
          onChange={(e) => {
            setModel(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
