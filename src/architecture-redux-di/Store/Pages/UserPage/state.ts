export type UserListItem = {
  id: string
  name: string
  departmentId: string
  department: string
  checked: boolean
}

export type UserListSearchParam = {
  name: string
  departmentId: string 
  departmentName: string
}

export type UserPageState = {
  // ページの状態
  isLoading: boolean
  hasError: boolean

  // ユーザー情報
  userList: UserListItem[]
  offset: number
  pageSize: number
  total: number

  // 検索パラメータ
  searchParam: UserListSearchParam

  // 進捗表示
  isProcessing: boolean
  progressRate: number
}

export function getInitialUserPageState(): UserPageState {
  return {
    // ページの状態
    isLoading: false,
    hasError: false,

    // ユーザー情報
    userList: [],
    offset: 0,
    pageSize: 20,
    total: 0,

    // 検索パラメータ
    searchParam: {
      name: '',
      departmentId: '',
      departmentName: '',
    },

    // 進捗表示
    isProcessing: false,
    progressRate: 0,
  }
}