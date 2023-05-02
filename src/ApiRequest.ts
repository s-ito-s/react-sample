import axios from "axios";

export async function registerDevice(name: string, model: string) {
  return await axios.post('/device', { name, model })  
}

export async function fetchDevices(
  searchParam: {
    name?: string
    model?: string
  }
) {
  return await axios.get('/devices', { params:searchParam })  
}

export async function updateDevice(
  id: string,
  updateParam: {
    name?: string
    model?: string
  }
) {
  return await axios.put('/device/' + id, { params:updateParam })  
}

export async function deleteDevice(id: string) {
  return await axios.delete('/device/' + id,)  
}

export async function registerUser(name: string, departmentId: string) {
  return await axios.post('/user', { name, departmentId })  
}

export async function fetchUsers(
  params: {
    offset: number
    count: number
    name?: string
    department?: string    
  }
) {
  return await axios.get('/users', { params })  
}

export async function updateUser(
  id: string,
  updateParam: {
    name?: string
    departmentId?: string
  }
) {
  return await axios.put('/user/' + id, { params:updateParam })  
}

export async function deleteUser(id: string) {
  return await axios.delete('/user/' + id,)  
}

export async function fetchDepartments(
  params: {
    offset: number
    count: number
  }
) {
  return await axios.get('/departments', { params })  
}
