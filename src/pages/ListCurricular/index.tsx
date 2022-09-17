import { useEffect, useState } from "react";
import { usePagination } from "../../contexts/PaginationContext";

import { paginateCurricularUnits } from "../../contexts/actions/PaginationActions";

import { Grid, Skeleton } from "@mui/material";
import {
  CurricularCard,
  FilterOptions,
  ViewOptions,
  PaginationButtons,
} from "./components";
import { Container } from "./styles";
import { ViewOptions as ViewOptionsEnum } from "./configs/constants";

export default function ListCurricular() {
  const [view, setView] = useState<ViewOptionsEnum>(ViewOptionsEnum.grid),
    {
      state: { paginationOptions, data },
      dispatch,
    } = usePagination()!;

  useEffect(() => {
    const fetchCurricularUnits = async () =>
      await paginateCurricularUnits(dispatch, paginationOptions);
    fetchCurricularUnits();
  }, [paginationOptions]);

  return (
    <Container px={4}>
      <FilterOptions status='Aceitas' />
      <ViewOptions changeView={setView} current={view} />
      <Grid container spacing={4} pb={4}>
        {data?.length > 0
          ? data.map(
              ({
                id,
                title,
                modality,
                cached_blox: {
                  date_limit_edition,
                  knowledge_area,
                  responsibles,
                },
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
            )
          : [...Array(paginationOptions.per_page)].map((_, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Skeleton
                  variant='rounded'
                  height={250}
                  sx={{ borderRadius: 4 }}
                />
              </Grid>
            ))}
      </Grid>
      <PaginationButtons />
    </Container>
  );
}
