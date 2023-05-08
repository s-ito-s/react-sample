// Service
import departmentService from 'architecture-redux-di/Service/departmentService'

// Component
import SelectorModal from 'architecture-redux-di/Components/Common/SelectorModal'

// Css
import './DepartmentSelector.css'

type DepartmentSelectorProps = {
  initialValue: string
  onCancel: () => void
  onSelect: (value:string, label:string) => void
}

function DepartmentSelector ( {initialValue, onCancel, onSelect}: DepartmentSelectorProps) {
  // console.log('render => DepartmentSelector')

  const fetchDepartments = async (offset: number, count: number, searchWord: string) => {
    const res: any = await departmentService.fetchDepartments({offset, count, searchWord})
    return {
      offset: offset,
      count: res.count,
      total: res.total, 
      list: res.list.map ((item: any) => {
        return {
          value: item.id,
          label: item.name,
        } 
      })
    }
  }

  return (
    <SelectorModal
      title='Department'
      text='Select department'
      initialValue={initialValue}
      fetchFunction={fetchDepartments}
      count={10}
      clearButton={true}
      onCancel={onCancel}
      onSelect={onSelect}
    />
  )
}

export default DepartmentSelector