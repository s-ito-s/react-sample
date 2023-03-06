import { useDispatch, useSelector } from 'react-redux';
import searchPanelSlice from '../redux/SearchPanelSlice';
import { TodoState } from '../redux/store';
import './SearchPanel.css';

export type SearchParam = {
  name?: string;
  model?: string;
};

function SearchPanel({
  onSearch,
}: {
  onSearch: (searchParam: SearchParam) => void;
}) {
  const name = useSelector((state: TodoState) => state.searchPanel.name);
  const model = useSelector((state: TodoState) => state.searchPanel.model);
  const dispatch = useDispatch();
  const { setName, setModel } = searchPanelSlice.actions;

  const onClickSearchButton = () => {
    const param: SearchParam = {};
    if (name !== '') {
      param['name'] = name;
    }
    if (model !== '') {
      param['model'] = model;
    }
    onSearch(param);
  };

  const onClickClearButton = () => {
    dispatch(setName(''));
    dispatch(setModel(''));
    onSearch({});
  };

  return (
    <div className='search-panel-main'>
      <div className='search-panel-header'>
        <div className='search-panel-header-label'>Search</div>
        <div>
          <button onClick={onClickSearchButton}>Search</button>
          <button onClick={onClickClearButton}>Clear</button>
        </div>
      </div>
      <div className='search-panel-row'>
        <div className='search-panel-row-label'>Name</div>
        <input
          className='search-panel-row-input'
          value={name}
          onChange={(e) => {
            dispatch(setName(e.target.value));
          }}
        />
      </div>
      <div className='search-panel-row'>
        <div className='search-panel-row-label'>Model</div>
        <input
          className='search-panel-row-input'
          value={model}
          onChange={(e) => {
            dispatch(setModel(e.target.value));
          }}
        />
      </div>
    </div>
  );
}

export default SearchPanel;
