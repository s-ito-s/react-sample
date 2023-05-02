import { 
  registerUser,
  fetchUsers,
  updateUser,
  deleteUser,
} from "ApiRequest"

export interface IUserService {
  registerUser: (
    params: {
      name: string
      departmentId: string
    }
  ) => any
  
  fetchUsers: ( 
    params: {
      offset: number
      count: number
      name?: string
      department?: string
    }
  ) => any

  updateUser: (
    id: string,
    params: {
      name?: string
      departmentId?: string 
    }
  ) => any

  deleteUser: (id:string) => any
}

export class UserService implements IUserService {
  async registerUser (
    params: {
      name: string
      departmentId: string
    }
  ) {
    return await registerUser(params.name, params.departmentId)
  }

  async fetchUsers ( 
    params: {
      offset: number
      count: number
      name?: string
      department?: string      
    }
  ){
    return await fetchUsers(params)
  }

  async updateUser (
    id: string,
    params: {
      name?: string
      departmentId?: string 
    }
  ) {
    return await updateUser(id, {
      name: params.name,
      departmentId: params.departmentId
    })
  }

  async deleteUser (id:string) {
    return await deleteUser(id)
  }
}

const userService = new UserService()
export default userService