import { useForm, SubmitHandler } from "react-hook-form";
import { usePagination } from "../../../../contexts/PaginationContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { filterOptionsSchema } from "./configs/schemas";
import { paginateCurricularUnits } from "../../../../contexts/actions/PaginationActions";
import { Typography, Stack, TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import { FilterOptionsData } from "./configs/types";

interface FilterOptionsProps {
  status: string;
}

export default function FilterOptions({ status }: FilterOptionsProps) {
  const {
      state: { paginationOptions },
      dispatch,
    } = usePagination()!,
    {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FilterOptionsData>({
      resolver: yupResolver(filterOptionsSchema),
      mode: "onBlur",
    });

  const onSubmit: SubmitHandler<Record<string, any>> = (values) => {
    paginateCurricularUnits(dispatch, {
      ...paginationOptions,
      page: 1, // reset page to 1
      ...values,
    });
  };

  return (
    <Stack
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      onBlur={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }
      }}
      justifyContent='space-between'
      alignItems='center'
      direction='row'
      py={2.5}
    >
      <Typography component='h2' sx={{ fontSize: 24, fontWeight: "bold" }}>
        {status}
      </Typography>
      <TextField
        placeholder='Título'
        variant='standard'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Search color='primary' />
            </InputAdornment>
          ),
        }}
        error={!!errors.title}
        helperText={errors.title?.message}
        {...register("title")}
      />
    </Stack>
  );
}
