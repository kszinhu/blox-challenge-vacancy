import styled from "styled-components";
import { Tabs, Box } from "@mui/material";

const Header = styled(Box)`
  width: 100%;
  background-color: ${(props: any) => props.color};
`;

const Actions = styled(Tabs)``;

export { Header, Actions };
