import { APIService } from "../../services/api";
import { PaginationActions } from "../reducers/PaginationReducer";
import { Dispatch } from "../types";

interface PaginationOptions {
  institution_id: number;
  page: number;
  per_page: number;
}

async function getCurricularUnits({
  institution_id,
  page,
  per_page,
}: PaginationOptions) {
  try {
    const response = await APIService.getCurricularUnits({
      institution_id,
      page: page.toString(),
      per: per_page.toString(),
    });
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function paginateCurricularUnits(
  dispatch: Dispatch<PaginationActions>,
  paginationOptions: PaginationOptions
) {
  dispatch({
    type: "CHANGE_OPTIONS",
    payload: paginationOptions,
  });

  const data = await getCurricularUnits(paginationOptions);

  if (data instanceof Error) {
    dispatch({
      type: "ERROR",
      payload: data,
    });
  } else {
    dispatch({
      type: "FETCH",
      payload: data,
    });
  }
}
