import { UserPageState } from './state'
import { IUserService } from '../../../Service/userService'

let timerId: any = null

export const initialize = async (
  state: UserPageState,
  service: IUserService
) => {
  return await updateUserList(state, service)
}

export const startLoading = (
  state: UserPageState
) => {
  let newState = Object.assign({}, state)
  newState.isLoading = true
  return newState
}

export const finishLoading = (
  state: UserPageState
) => {
  let newState = Object.assign({}, state)
  newState.isLoading = false
  return newState
}

export const fetchUsers = async (
  state: UserPageState,
  service: IUserService,
  params: {
    offset?: number
    name?: string
    department?: string
    departmentName? : string
  },
  stateChangeCallback: (state: UserPageState) => void
) => {
  let newState = Object.assign({}, state)
  const newSearchParam = Object.assign({}, newState.searchParam)

  // ローディング表示
  newState.isLoading = true

  // パラメータ更新
  if(params.offset !== undefined) {
    newState.offset = params.offset
  }
  if(params.name !== undefined) {
    newSearchParam.name = params.name
  }
  if(params.department !== undefined) {
    newSearchParam.departmentId = params.department
  }
  if(params.departmentName !== undefined) {
    newSearchParam.departmentName = params.departmentName
  }
  newState.searchParam = newSearchParam

  // state 変更
  stateChangeCallback(newState)

  // 取得
  newState = await updateUserList(newState,service)
  newState.isLoading = false
  stateChangeCallback(newState)
}

export const updateUserList = async (
  state: UserPageState,
  service: IUserService,
) => {
  const params: {
    offset: number,
    count: number,
    name? : string,
    department? : string,
  } = {
    offset: state.offset,
    count: state.pageSize,
  }

  if (state.searchParam.name !== '') {
    params.name = state.searchParam.name
  }
  if (state.searchParam.departmentId !== '') {
    params.department = state.searchParam.departmentId
  }

  const res = await service.fetchUsers(params)
  const users = res.data.list
  const newState = Object.assign({}, state)
  newState.userList = users.map( (user:any) => {
    return {
      id: user.id,
      name: user.name,
      departmentId: user.deparmtentId,
      department: user.departmentName,
      checked: false
    }
  })
  newState.total = res.data.total

  return newState
}

export const checkUser = (
  state: UserPageState,
  params: {
    id: string
    checked: boolean
  }
) => {
  const newState = Object.assign({}, state)
  const newUserList = [... newState.userList]
  const userIdx = newUserList.findIndex( (user) => {
    return user.id === params.id
  })
  if (userIdx >= 0) {
    const newUserParam = Object.assign({}, newUserList[userIdx])
    newUserParam.checked = params.checked
    newUserList[userIdx] = newUserParam
  }
  newState.userList = newUserList
  return newState
}

export const checkUsers = (
  state: UserPageState,
) => {
  if (state.userList.every(user => user.checked)) {
    return uncheckAllUsers(state)
  }else{
    return checkAllUsers(state)
  }
}

export const checkAllUsers = (
  state: UserPageState,
) => {
  const newState = Object.assign({}, state)
  newState.userList = newState.userList.map( (user) => {
    const newUserParam = Object.assign({}, user)
    newUserParam.checked = true
    return newUserParam
  })
  return newState
}

export const uncheckAllUsers = (
  state: UserPageState,
) => {
  const newState = Object.assign({}, state)
  newState.userList = newState.userList.map( (user) => {
    const newUserParam = Object.assign({}, user)
    newUserParam.checked = false
    return newUserParam
  })
  return newState
}

export const registerUser = async (
  state: UserPageState, 
  service: IUserService,
  param: {name:string, departmentId:string}
) : Promise<UserPageState> => {
  await service.registerUser(param)
  return await updateUserList(state, service)
}

export const updateUser = async (
  state: UserPageState,
  service: IUserService,
  param: {id: string, name?:string, departmentId?:string}
) : Promise<UserPageState> => {
  await service.updateUser(param.id, param)
  return await updateUserList(state, service)
}

export const deleteUsers = async (
  state: UserPageState, 
  service: IUserService,
  // 処理を中断したい場合は stateChangeCallback で true を返すようにする
  stateChangeCallback: (state: UserPageState, completeUserIds: string[]) => boolean 
) => {
  const deleteUserIds = state.userList.filter((user) => {
    return user.checked
  }).map(user => user.id)
  let newState = Object.assign({}, state)
  let completeUserIds: string[] = []
  newState.isProcessing = true

  try {
    for (let i = 0; deleteUserIds.length > i; ++i) {
      newState.progressRate = i / deleteUserIds.length
      if (stateChangeCallback(newState, completeUserIds)) {
        break
      }
      const id = deleteUserIds[i]
      await service.deleteUser(id)
      completeUserIds.push(id)
    }
  } catch(e) {
    throw e
  } finally {
    newState.progressRate = 0
    newState.isProcessing = false
    newState = await updateUserList(newState, service)
    stateChangeCallback(newState, completeUserIds)  
  }
}