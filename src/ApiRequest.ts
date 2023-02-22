import axios from "axios";

export async function registerDevice(name: string, model: string) {
  return await axios.post('/device', { name, model })  
}

type Device = {
  id: string
  name: string
  model: string
}

export async function fetchDevices(searchParam: {
  name?: string
  model?: string
}) {
  return await axios.get("/devices", {
    params: searchParam,
  })
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