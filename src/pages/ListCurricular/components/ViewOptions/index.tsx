import { useEffect } from "react";
import { ViewOptions as ViewOptionsEnum } from "../../configs/constants";
import { GridViewSharp, ViewColumn, ViewList } from "@mui/icons-material";
import { Stack, IconButton } from "@mui/material";

interface ViewOptionsProps {
  changeView: React.Dispatch<React.SetStateAction<ViewOptionsEnum>>;
  current: ViewOptionsEnum;
}

export default function ViewOptions({ changeView, current }: ViewOptionsProps) {
  const SquareButton = {
    sx: {
      borderRadius: 2,
    },
  };

  return (
    <Stack direction='row' pb={1}>
      <IconButton
        aria-label='grid'
        onClick={() => changeView(ViewOptionsEnum.grid)}
        color={current === ViewOptionsEnum.grid ? "primary" : "default"}
        {...SquareButton}
      >
        <GridViewSharp />
      </IconButton>
      <IconButton
        aria-label='list'
        onClick={() => changeView(ViewOptionsEnum.list)}
        color={current === ViewOptionsEnum.list ? "primary" : "default"}
        {...SquareButton}
      >
        <ViewList />
      </IconButton>
      <IconButton
        aria-label='column'
        onClick={() => changeView(ViewOptionsEnum.column)}
        color={current === ViewOptionsEnum.column ? "primary" : "default"}
        {...SquareButton}
      >
        <ViewColumn />
      </IconButton>
    </Stack>
  );
}
