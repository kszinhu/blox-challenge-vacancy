import { usePagination } from "../../../../contexts/PaginationContext";

import { paginateCurricularUnits } from "../../../../contexts/actions/PaginationActions";

import { Stack, Button } from "@mui/material";

export default function PaginationButtons() {
  const {
    state: { paginationOptions, data, status },
    dispatch,
  } = usePagination()!;

  const handleOnClick = (page: number) => {
    paginateCurricularUnits(dispatch, { ...paginationOptions, page });
  };

  return (
    <Stack direction='row' spacing={2} justifyContent='space-evenly' pb={4}>
      <Button
        variant='contained'
        disabled={paginationOptions.page === 1}
        onClick={() => handleOnClick(paginationOptions.page - 1)}
        sx={{ width: "30%" }}
      >
        Anterior
      </Button>
      <Button
        variant='contained'
        disabled={
          status !== "fetched" || paginationOptions.per_page > data?.length
        }
        onClick={() => handleOnClick(paginationOptions.page + 1)}
        sx={{ width: "30%" }}
        children={status !== "fetched" ? "Carregando..." : "Próximo"}
      />
    </Stack>
  );
}
