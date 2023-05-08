import { fetchDepartments } from "ApiRequest"

export interface IDepartmentService {
  fetchDepartments: ( 
    params: {
      offset: number
      count: number
      searchWord?: string
    }
  ) => any
}

export class DepartmentService implements IDepartmentService {
  async fetchDepartments ( 
    params: {
      offset: number
      count: number
      searchWord?: string
    }
  ){
    const res = await fetchDepartments(params)
    return res.data
  }
}

const departmentService = new DepartmentService()
export default departmentService