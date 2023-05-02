import { useState, useEffect } from 'react';

import ModalBase from './ModalBase';
import Pagination from 'architecture-redux-di/Components/Common/Pagination'

import loadingIcon from "architecture-redux-di/Assets/loading.gif"

import './SelectorModal.css'

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
  onExecute: (value:string, label:string) => void
};

function SelectorModal ( {
  title, 
  text,
  initialValue,
  count,
  clearButton,
  fetchFunction,
  onCancel, 
  onExecute
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

  const onChangePage = (_offset: number) => {
    setOffset(_offset)
    fetch(_offset, count, searchWord)
  }

  const onSelect = (value: string) => {
    setValue(value)
  }

  const onClear = () => {
    onExecute('', '')
  }

  const onChange = () => {
    const selectedItem = list.find(item => item.value === value)
    if (selectedItem) {
      onExecute(value, selectedItem.label)
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
                    className='selector-modal-list-item' 
                    onClick={() => {onSelect(item.value)}}
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
          <button onClick={() => {onClear()}}>clear</button> : <></>
        }
        <div className='selector-modal-footer-space'></div>
        <button onClick={onChange}>select</button>
      </div>
    </ModalBase>
  )
}

export default SelectorModal