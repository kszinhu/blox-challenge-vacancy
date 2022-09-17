import styled from "styled-components";
import { Card, CardHeader, CardContent, Box } from "@mui/material";

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 250px;
`;

const Header = styled(CardHeader)`
  flex: 1 1 25px;
  align-items: center;

  background-color: ${(props: any) => props.color};
  color: #fff;

  & > .MuiCardHeader-action {
    margin: 0;
  }
`;

const Body = styled(CardContent)`
  flex: 1 1 auto;

  background-color: ${(props: any) => props.color};
  color: #fff;
`;

const Footer = styled(Box)`
  display: flex;
  align-items: center;
  background-color: ${(props: any) => props.color};
  flex: 1 1 35px;
  flex-direction: row reverse;

  & > .MuiAvatarGroup-root {
    display: inline-flex;
  }
`;

const DisplayValue = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardImage = styled.div`
  width: 65px;
  height: 70px;
  background-color: ${(props) => props.color};

  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  flex: none; // don't shrink

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-position: center;
  }
`;

export { Container, Header, Body, Footer, CardImage, DisplayValue };
