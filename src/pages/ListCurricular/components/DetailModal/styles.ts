import styled from "styled-components";
import { Box, IconButton } from "@mui/material";

interface CompetenceTagProps {
  tagColor: string;
}

interface HexagonIconProps {
  size: number;
  positions?: { top?: number; left?: number; right?: number; bottom?: number };
}

const Container = styled(Box)`
  position: absolute;
  display: flex;
  flex-direction: column;

  top: 50%;
  left: 50%;
  width: fit-content;
  height: fit-content;
  transform: translate(-50%, -50%);

  border: "2px solid #000";

  @media (max-width: 900px) {
    width: 90%;
  }
`;

const HeaderWrapper = styled(Box)`
  display: block;

  height: 100px;
  border-radius: 8px 8px 0 0;
  background-color: ${(props: any) => props.color};
`;

const Header = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;

  align-items: center;

  & > h1 {
    margin-left: 150px; // 100 is size of hexagon + 50 is margin
  }
`;

const Content = styled(Box)`
  height: calc(100% - 100px);
  background-color: #fff;
  border-radius: 0 0 8px 8px;
`;

const HexagonIcon = styled.div<HexagonIconProps>`
  ${(props) =>
    Object.keys(props.positions || {}).length > 0
      ? "position: absolute;"
      : "position: relative;"}

  ${(props) => props.positions?.top && `top: ${props.positions.top}rem;`}
  ${(props) => props.positions?.left && `left: ${props.positions.left}rem;`}
  ${(props) => props.positions?.right && `right: ${props.positions.right}rem;`}
  ${(props) =>
    props.positions?.bottom && `bottom: ${props.positions.bottom}rem;`}

  width: ${(props) => props.size}px;
  height: ${(props) =>
    props.size >= 90 ? props.size + 10 : props.size + 2.5}px;
  background-color: ${(props) => props.color};

  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  flex: none;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-position: center;
  }
`;

const CloseButton = styled(IconButton)`
  position: absolute !important;
  top: 0.5rem;
  right: 8px;
`;

const CompetenceTag = styled(Box)<CompetenceTagProps>`
  background-color: ${(props) => props.tagColor};

  color: #fff;
  white-space: nowrap;

  border-radius: 1.5rem;
  padding: 0.25rem 0.5rem;
`;

const VerticalDivider = styled.hr<{ borderColor: string }>`
  display: block;
  margin: 15px 25px;
  border-right: 0.5px solid ${(props) => props.borderColor};
`;

export {
  Container,
  HeaderWrapper,
  Header,
  Content,
  HexagonIcon,
  CloseButton,
  CompetenceTag,
  VerticalDivider,
};
