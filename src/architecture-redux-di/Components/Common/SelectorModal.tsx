// React
import { useState, useEffect } from 'react';

// Component
import ModalBase from './ModalBase';
import Pagination from 'architecture-redux-di/Components/Common/Pagination'

// Css
import './SelectorModal.css'

// Asset
import loadingIcon from "architecture-redux-di/Assets/loading.gif"

type SelectorModalProps = { 
  title: string
  text: string
  initialValue: string
  count: number
  clearButton?: boolean
  fetchFunction: (offset: number, count: number, searchWord: string) => Promise<{
    offset: number
    count: number
    total: number
    list: { value: string; label: string }[]
  }>
  onCancel: () => void
  onSelect: (value:string, label:string) => void
};

let timerId : any = null

function SelectorModal ( {
  title, 
  text,
  initialValue,
  count,
  clearButton,
  fetchFunction,
  onCancel, 
  onSelect
}: SelectorModalProps) {
  const [isLoading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)
  const [searchWord, setSearchWord] = useState('')
  const [value, setValue] = useState(initialValue)
  const [list, setList] = useState<{value:string, label:string}[]>([])

  useEffect(() => {
    (async ()=> {
      await fetch(offset, count, searchWord)
    })()
  },[])

  const onInputSearchWord = (e:any) => {
    const _searchWord = e.target.value
    setSearchWord(_searchWord)

    if (timerId) {
      clearTimeout(timerId)
    }else{
      setLoading(true)
    }

    timerId = setTimeout( async () => {
      await fetch(offset, count, _searchWord)
      setLoading(false)
      timerId = null
    }, 500)
  }

  const onChangePage = (_offset: number) => {
    setOffset(_offset)
    fetch(_offset, count, searchWord)
  }

  const onChangeValue = (value: string) => {
    setValue(value)
  }

  const onClear = () => {
    onSelect('', '')
  }

  const onClickSelectButton = () => {
    const selectedItem = list.find(item => item.value === value)
    if (selectedItem) {
      onSelect(value, selectedItem.label)
    }
  }

  const fetch = async (_offset:number, _count:number, _searchWord:string) => {
    try {
      setLoading(true)
      const response = await fetchFunction(_offset, _count, _searchWord)
      setOffset(response.offset)
      setTotal(response.total)
      setList(response.list)  
    }finally{
      setLoading(false)
    }
  }

  return (
    <ModalBase>
      <div className='selector-modal-header'>
        { title }
      </div>
      <div className='selector-modal-text'>
        {text}
      </div>
      <div className='selector-modal-search'>
        <input 
          className='selector-modal-search-input' 
          placeholder='search'
          onInput={onInputSearchWord}
        />
      </div>
      <div className='selector-modal-list'>
        { 
          isLoading ? 
          <div className='selector-modal-list-loading'>
            <img src={loadingIcon} /> Loading
          </div> : 
          <>
            {list.map((item) => {
              if (item.value === value) {
                return (
                  <div
                    key={item.value} 
                    className='selector-modal-list-item selector-modal-list-item-selected'>
                    {item.label}
                  </div>
                )
              } else {
                return (
                  <div
                    key={item.value} 
                    className='selector-modal-list-item selector-modal-list-item-not-selected' 
                    onClick={() => {onChangeValue(item.value)}}
                  >
                    {item.label}
                  </div>
                )
              }
            })}
          </>
        }
      </div>
      <div className='selector-modal-pagination'>
        <Pagination 
          offset={offset}
          pageSize={count}
          total={total}
          onChangePage={onChangePage}
        />
      </div>
      <div className='selector-modal-footer'>
        <button onClick={() => {onCancel()}}>cancel</button>
        <div className='selector-modal-footer-space'></div>
        { 
          clearButton ?
          <>
            <button onClick={() => {onClear()}}>clear</button> 
            <div className='selector-modal-footer-space'></div>
          </>
          : <></>
        }
        <button onClick={onClickSelectButton}>select</button>
      </div>
    </ModalBase>
  )
}

export default SelectorModal