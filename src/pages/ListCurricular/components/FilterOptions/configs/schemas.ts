import { object, string, date, ref, boolean } from "yup";

const filterOptionsSchema = object().shape({
  title: string(),
});

export { filterOptionsSchema };
