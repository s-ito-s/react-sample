import './Pagination.css'

type PaginationProps = {
  offset: number
  pageSize: number
  total: number
  onChangePage: (offset:number) => void
};

function Pagination ( {offset, pageSize, total, onChangePage}:PaginationProps ) {

  const currentPageIdx = () => {
    return Math.floor(offset / pageSize)
  }

  const pageCount = () => {
    let count = Math.floor(total / pageSize)
    if (total % pageSize !== 0) ++count
    return count
  }

  const isPrevButtonDisabled = () => {
    return currentPageIdx() === 0
  }

  const isNextButtonDisabled = () => {
    return currentPageIdx() + 1 === pageCount()
  }

  const onClickPrevButton = () => {
    onChangePage(offset - pageSize)
  }

  const onClickNextButton = () => {
    onChangePage(offset + pageSize)
  }

  const onSelectPage = (e:any) => {
    const pageIdx = Number(e.target.value)
    onChangePage(pageSize * pageIdx)    
  }

  return (
    <div className='pagination'>
      <button 
        onClick={onClickPrevButton}
        disabled={isPrevButtonDisabled()}
      >
        Prev
      </button>
      <select
        value={currentPageIdx()}
        onChange={onSelectPage}
      >
        {[...Array(pageCount())].map( (_, idx) => {
          const from = 1 + idx * pageSize
          const to = Math.min(from + pageSize - 1, total)
          return <option key={idx} value={idx}>{from + ' - ' + to}</option>
        })}
      </select>
      <button 
        onClick={onClickNextButton}
        disabled={isNextButtonDisabled()}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination