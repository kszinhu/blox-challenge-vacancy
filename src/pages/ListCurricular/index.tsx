import { useEffect } from "react";
import { usePagination } from "../../contexts/PaginationContext";

import { paginateCurricularUnits } from "../../contexts/actions/PaginationActions";

import { Grid, Skeleton } from "@mui/material";
import { CurricularCard } from "./components";

export default function ListCurricular() {
  const {
    state: { paginationOptions, data },
    dispatch,
  } = usePagination()!;

  useEffect(() => {
    const fetchCurricularUnits = async () =>
      await paginateCurricularUnits(dispatch, paginationOptions);
    fetchCurricularUnits();
  }, [paginationOptions]);

  return data?.length > 0 ? (
    <Grid container p={2} spacing={4}>
      {data.map(
        ({
          id,
          title,
          modality,
          cached_blox: { date_limit_edition, knowledge_area, responsibles },
        }: {
          id: number;
          title: string;
          modality: string;
          cached_blox: Record<string, any>;
        }) => (
          <Grid item xs={12} sm={6} lg={4} key={id}>
            <CurricularCard
              id={id}
              title={title}
              modality={modality}
              date_limit={date_limit_edition}
              knowledge_area={knowledge_area}
              responsibles={responsibles}
            />
          </Grid>
        )
      )}
    </Grid>
  ) : (
    <Grid container p={2} spacing={4}>
      {[...Array(paginationOptions.per_page)].map((_, index) => (
        <Grid item xs={12} sm={6} lg={4} key={index}>
          <Skeleton variant='rounded' height={250} sx={{ borderRadius: 4 }} />
        </Grid>
      ))}
    </Grid>
  );
}
