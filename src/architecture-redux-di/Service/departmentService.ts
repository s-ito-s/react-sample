import { fetchDepartments } from "ApiRequest"

export interface IDepartmentService {
  fetchDepartments: ( 
    params: {
      offset: number
      count: number
    }
  ) => any
}

export class DepartmentService implements IDepartmentService {
  async fetchDepartments ( 
    params: {
      offset: number
      count: number
    }
  ){
    const res = await fetchDepartments(params)
    return res.data
  }
}

const departmentService = new DepartmentService()
export default departmentService