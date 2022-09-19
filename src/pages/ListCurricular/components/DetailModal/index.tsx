import { useState, useEffect } from "react";

import { Modal, Typography, Stack, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Close } from "@mui/icons-material";
import {
  Container,
  HeaderWrapper,
  Header,
  Content,
  HexagonIcon,
  CloseButton,
  CompetenceTag,
  VerticalDivider,
} from "./styles";

interface KnowledgeArea {
  name: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  icon_url: string | null;
  description: string;
}

interface FunctionalArea {
  name: string;
  description: string;
  icon_dark_url: string | null;
  icon_light_url: string | null;
}

interface Profile {
  name: string;
  icon_url: string | null;
  icon_dark_url: string | null;
  description: string;
}

interface Competence {
  id: number;
  name: string;
  icon_url: string | null;
  description: string;
}

interface DetailModalProps {
  blox: {
    setSelectedBlox: React.Dispatch<any>;
    selectedBlox: {
      title: string;
      modality: string;
      hours: number;
      competences: Competence[];
      knowledge_area: KnowledgeArea;
      functional_area: FunctionalArea;
      blox_profile: Profile;
    } | null;
  };
}

export default function DetailModal({
  blox: { selectedBlox: blox, setSelectedBlox },
}: DetailModalProps) {
  const theme = useTheme(),
    isMobile = useMediaQuery(theme.breakpoints.down("md")),
    [isOpen, setIsOpen] = useState(blox !== null);

  console.log(isMobile);

  useEffect(() => {
    setIsOpen(blox !== null);
  }, [blox]);

  return (
    <Modal
      disableAutoFocus
      disableScrollLock
      open={isOpen}
      onClose={() => setSelectedBlox(null)}
      aria-labelledby={`modal-${blox?.title}`}
    >
      <Container sx={{ boxShadow: 24 }}>
        <HeaderWrapper color={blox?.knowledge_area.color2}>
          <HexagonIcon
            positions={{ top: 2, left: 1.5 }}
            size={100}
            color={blox?.knowledge_area.color3}
          />
          <Header>
            <Typography
              component='h1'
              variant='h5'
              sx={{ color: "#fff", fontWeight: "bold" }}
            >
              {blox?.title}
            </Typography>
            <CloseButton
              onClick={() => setSelectedBlox(null)}
              sx={{ display: "absolute", top: "8px", right: "8px" }}
            >
              <Close sx={{ color: "#fff" }} />
            </CloseButton>
          </Header>
        </HeaderWrapper>
        <Content pt={isMobile ? 6 : 3} pb={isMobile ? 4 : 0}>
          <Stack
            spacing={4}
            direction='row'
            justifyContent='center'
            sx={{ color: "#8c8c8c" }}
          >
            <Stack spacing={0.5}>
              <Typography variant='body1' sx={{ fontWeight: 500 }}>
                Modalidade
              </Typography>
              <Typography variant='body1' sx={{ fontSize: 24 }}>
                {blox?.modality}
              </Typography>
            </Stack>
            <VerticalDivider borderColor='#8c8c8c' />
            <Stack spacing={0.5}>
              <Typography variant='body1' sx={{ fontWeight: 500 }}>
                Carga horária
              </Typography>
              <Typography variant='body1' sx={{ fontSize: 24 }}>
                {blox?.hours}h
              </Typography>
            </Stack>
          </Stack>
          <Grid
            container
            spacing={4}
            pt={4}
            pb={4}
            pl={isMobile ? 6 : 14}
            pr={isMobile ? 6 : 4}
          >
            <Grid item xs={12} md={6}>
              <Stack>
                <Typography
                  component='span'
                  sx={{ fontSize: 22, fontWeight: 500 }}
                >
                  Área do conhecimento
                </Typography>
                <Stack direction='row' spacing={2}>
                  <HexagonIcon size={24} color={blox?.knowledge_area.color3} />
                  <Typography variant='body1'>
                    {blox?.knowledge_area.name}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack>
                <Typography
                  component='span'
                  sx={{ fontSize: 22, fontWeight: 500 }}
                >
                  Perfil
                </Typography>
                <Typography variant='body1'>
                  {blox?.blox_profile.name}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack>
                <Typography
                  component='span'
                  sx={{ fontSize: 22, fontWeight: 500 }}
                >
                  Área funcional
                </Typography>
                <Stack direction='row' spacing={1.5} alignItems='center'>
                  <img
                    src={blox?.functional_area.icon_dark_url || ""}
                    color={blox?.knowledge_area.color3}
                    width={28}
                    height={28}
                    alt=''
                  />
                  <Typography variant='body1'>
                    {blox?.functional_area.name}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item sm={12} md={6}>
              <Stack>
                <Typography
                  component='span'
                  sx={{ fontSize: 22, fontWeight: 500 }}
                >
                  Competências
                </Typography>
                <Stack
                  direction='row'
                  alignItems='center'
                  flexWrap='wrap'
                  sx={{ width: "100%" }}
                  gap={1}
                >
                  {blox?.competences.map(({ id, name }) => (
                    <CompetenceTag
                      key={id}
                      tagColor={blox?.knowledge_area.color3}
                    >
                      {name}
                    </CompetenceTag>
                  ))}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Content>
      </Container>
    </Modal>
  );
}
