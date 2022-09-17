import { Tab, Typography } from "@mui/material";
import { Actions, Header } from "./styles";
import { Outlet, Link } from "react-router-dom";

interface ListLayoutProps {
  title: string;
  tabs: {
    key: string;
    label: string;
    path: string;
    disabled?: boolean;
  }[];
  children: React.ReactNode;
}

export default function ListLayout({ tabs, title, children }: ListLayoutProps) {
  return (
    <>
      <Header color='#638cf8' px={3} pt={3}>
        <Typography
          component='h1'
          sx={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}
          mb={2}
        >
          {title}
        </Typography>
        <Actions
          value={location.pathname}
          indicatorColor='secondary'
          textColor='inherit'
        >
          {tabs.map(({ key, label, path, disabled }) => (
            <Tab
              key={key}
              label={label}
              value={path}
              component={Link}
              to={path}
              disabled={disabled}
              sx={{ color: "#fff" }}
            />
          ))}
        </Actions>
      </Header>
      {children}
    </>
  );
}
