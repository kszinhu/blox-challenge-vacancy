// Generic types for context

export type Dispatch<A> = (action: A) => void;
export type State = {
  [key: string]: any;
  error: string | null;
};
