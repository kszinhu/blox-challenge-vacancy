export interface PaginationActions {
  type: "FETCH" | "CHANGE_OPTIONS" | "ERROR";
  payload: any;
}

export interface PaginationState {
  paginationOptions: { institution_id: number; page: number; per_page: number };
  data: any;
  error: string | null;
}

export const initialState: PaginationState = {
  paginationOptions: {
    institution_id: 22,
    page: 1,
    per_page: 81,
  },
  data: null,
  error: null,
};

export function PaginationReducer(
  state: PaginationState,
  action: PaginationActions
) {
  switch (action.type) {
    case "FETCH":
      return {
        ...state,
        data: action.payload,
      };

    case "CHANGE_OPTIONS":
      return {
        ...state,
        paginationOptions: action.payload,
      };

    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };
  }
}
