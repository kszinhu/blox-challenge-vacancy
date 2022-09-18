import { createContext, useContext, useReducer, useMemo } from "react";
import { Dispatch } from "./types";
import {
  PaginationReducer,
  initialState,
  PaginationActions,
  PaginationState,
} from "./reducers/PaginationReducer";

type PaginationProviderProps = { children: React.ReactNode };

const PaginationContext = createContext<
  { state: PaginationState; dispatch: Dispatch<PaginationActions> } | undefined
>(undefined);

const usePagination = () => useContext(PaginationContext);

function PaginationProvider({ children }: PaginationProviderProps) {
  const [state, dispatch] = useReducer(PaginationReducer, initialState!);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
}

export { PaginationProvider, usePagination };
