import { TaskAlt, MoreVert } from "@mui/icons-material";
import { Avatar, Typography, Stack, IconButton } from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";
import { CardImage, Container, Footer, Body, Header } from "./styles";

type KnowledgeKeys =
  | "color1"
  | "color2"
  | "color3"
  | "color4"
  | "color5"
  | "icon_white_url"
  | "icon_black_url";

interface CurricularCardProps {
  id: number;
  title: string;
  modality: string;
  date_limit: string | null;
  knowledge_area: Record<KnowledgeKeys, string>;
  responsibles: Record<string, any>[];
}

export default function CurricularCard({
  id,
  title,
  modality,
  date_limit,
  knowledge_area: { color1, color2, color3, icon_white_url },
  responsibles,
}: CurricularCardProps) {
  return (
    <Container sx={{ borderRadius: 4 }}>
      <Header
        color={color1}
        sx={{ p: 1.5 }}
        subheader={
          date_limit ? (
            <Stack sx={{ color: "white" }}>
              <Typography
                variant='body2'
                sx={{ fontSize: 12, marginBottom: "-5px" }}
              >
                Data limite
              </Typography>
              <Typography
                component='span'
                sx={{ fontSize: 14, lineHeight: "normal" }}
              >
                {new Date(date_limit).toLocaleDateString("pt-BR")}
              </Typography>
            </Stack>
          ) : (
            <Typography sx={{ fontSize: 14 }}>Sem data limite</Typography>
          )
        }
        action={
          <Stack direction='row' spacing={1}>
            <IconButton size='small'>
              <TaskAlt sx={{ color: "white" }} />
            </IconButton>
            <IconButton size='small'>
              <MoreVert sx={{ color: "white" }} />
            </IconButton>
          </Stack>
        }
      />
      <Body color={color2} sx={{ px: 1.5, pt: 1, pb: 0 }}>
        <Stack spacing={1}>
          <Stack direction='row' spacing={2} alignItems='center'>
            <CardImage color={color1}>
              <img src={icon_white_url} alt={`Blox Imagem`} title={title} />
            </CardImage>
            <Typography
              component='h2'
              sx={{ fontSize: 16, fontWeight: "bold" }}
            >
              {title}
            </Typography>
          </Stack>
          <Stack direction='row' spacing={3}>
            <Stack sx={{ color: "white" }}>
              <Typography variant='caption' sx={{ marginBottom: "-5px" }}>
                ID
              </Typography>
              <Typography sx={{ fontSize: 14 }}>{id}</Typography>
            </Stack>
            <Stack sx={{ color: "white" }}>
              <Typography variant='caption' sx={{ marginBottom: "-5px" }}>
                Modalidade
              </Typography>
              <Typography sx={{ fontSize: 14 }}>{modality}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Body>
      <Footer color={color1} p={1}>
        {responsibles?.length > 0 ? (
          <AvatarGroup max={responsibles.length}>
            {responsibles.map(({ name, picture_url }) => (
              <Avatar
                key={name}
                alt={name}
                sx={{
                  bgcolor: color3,
                  width: 32,
                  height: 32,
                  fontSize: 16,
                }}
                {...(picture_url
                  ? { src: picture_url }
                  : {
                      children: name
                        .split(" ")
                        .map(
                          (n: [string], index: number) =>
                            index < 2 && n[0].toUpperCase()
                        ),
                    })}
              />
            ))}
          </AvatarGroup>
        ) : (
          <Typography variant='subtitle1' color='white' sx={{ fontSize: 14 }}>
            Sem editor responsável
          </Typography>
        )}
      </Footer>
    </Container>
  );
}
