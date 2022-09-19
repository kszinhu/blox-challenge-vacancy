import { useEffect, useState } from "react";
import { usePagination } from "../../contexts/PaginationContext";

import { paginateCurricularUnits } from "../../contexts/actions/PaginationActions";

import { Grid, Skeleton, Box } from "@mui/material";
import {
  CurricularCard,
  FilterOptions,
  ViewOptions,
  PaginationButtons,
  DetailModal,
} from "./components";
import { ViewOptions as ViewOptionsEnum } from "./configs/constants";

interface Blox {
  title: string;
  modality: string;
  hours: number;
  competences: any[];
  knowledge_area: any;
  functional_area: any;
  blox_profile: any;
  date_limit_edition: string;
  responsibles: any[];
}

export default function ListCurricular() {
  const [view, setView] = useState<ViewOptionsEnum>(ViewOptionsEnum.grid),
    [selectedBlox, setSelectedBlox] = useState<Blox | null>(null),
    {
      state: { paginationOptions, data },
      dispatch,
    } = usePagination()!;

  useEffect(() => {
    const fetchCurricularUnits = async () =>
      await paginateCurricularUnits(dispatch, paginationOptions);
    fetchCurricularUnits();
  }, [paginationOptions]);

  const onCardClick = (blox: Blox) => {
    setSelectedBlox(blox);
  };

  return (
    <Box px={4}>
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
                cached_blox,
              }: {
                id: number;
                title: string;
                modality: string;
                cached_blox: Blox;
              }) => (
                <Grid item xs={12} sm={6} lg={4} key={id}>
                  <div
                    onClick={() => onCardClick(cached_blox)}
                    style={{ cursor: "pointer" }}
                  >
                    <CurricularCard
                      id={id}
                      title={title}
                      modality={modality}
                      date_limit={date_limit_edition}
                      knowledge_area={knowledge_area}
                      responsibles={responsibles}
                    />
                  </div>
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
      <DetailModal blox={{ selectedBlox, setSelectedBlox }} />
    </Box>
  );
}
