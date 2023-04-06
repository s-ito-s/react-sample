export type Device = {
  id: string;
  name: string;
  model: string;
};

export type SearchParam = {
  name?: string;
  model?: string;
};

export type State = {
  isLoading: boolean;
  deviceList: Device[];
};

export type ActionType =
  | ReturnType<typeof startFetch>
  | ReturnType<typeof successFetch>;

export const initState = {
  isLoading: false,
  deviceList: [] as Device[],
};

export function reducer(state: State, action: ActionType): State {
  console.log("action:", action.type);
  switch (action.type) {
    case "START_FETCH": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "SUCCESS_FETCH": {
      return {
        ...state,
        isLoading: false,
        deviceList: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export const actions = {
  startFetch,
  successFetch,
};

function startFetch() {
  console.log("dispatch:", "START_FETCH");
  return {
    type: "START_FETCH" as const,
  };
}

function successFetch(payload: Device[]) {
  console.log("dispatch:", "SUCCESS_FETCH");
  return {
    type: "SUCCESS_FETCH" as const,
    payload,
  };
}

export type Reducer = React.Reducer<State, ActionType>;
export type Dispatch = React.Dispatch<ActionType>;
