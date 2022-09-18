export interface PaginationActions {
  type: "FETCHED" | "CHANGE_OPTIONS" | "ERROR";
  payload: any;
}

export interface PaginationState {
  paginationOptions: { institution_id: number; page: number; per_page: number };
  data: any;
  status: "idle" | "fetched" | "fetching" | "error";
  error: string | null;
}

export const initialState: PaginationState = {
  paginationOptions: {
    institution_id: 22,
    page: 1,
    per_page: 9,
  },
  data: null,
  status: "idle",
  error: null,
};

export function PaginationReducer(
  state: PaginationState,
  action: PaginationActions
) {
  switch (action.type) {
    case "FETCHED":
      return {
        ...state,
        status: "fetched",
        data: action.payload,
      } as PaginationState;

    case "CHANGE_OPTIONS":
      return {
        ...state,
        status: "fetching",
        paginationOptions: action.payload,
      } as PaginationState;

    case "ERROR":
      return {
        ...state,
        status: "error",
        error: action.payload,
      } as PaginationState;
  }
}
