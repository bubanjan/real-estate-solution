import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import adminImg from '../assets/admin2.png';
import agentImg from '../assets/agent2.png';

export default function AboutUs() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          justifyContent: 'space-between',
          alignItems: 'stretch',
          gap: 4,
          flexWrap: 'nowrap',
        }}
      >
        <Card
          sx={{
            flex: isMdUp ? '1' : 'unset',
            backgroundColor: '#f0f7fc',
            color: 'grey',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom align="center" mb={2}>
              Budvanka Real Estate
            </Typography>

            <Typography variant="body1" align="left" mb={2}>
              We are a passionate real estate agency based in Montenegro,
              helping clients buy, sell, and discover their dream properties
              along the Adriatic coast. Whether you're looking for sea-view
              apartments, mountain homes, or city investments — we're here to
              guide you with honesty, experience, and heart.
            </Typography>

            <Typography variant="body1" align="left" mb={2}>
              With a deep understanding of the local market and a commitment to
              personalized service, we ensure every client feels confident in
              their property decisions. From first-time buyers to seasoned
              investors, our team offers trusted advice and tailored solutions.
            </Typography>

            <Typography variant="body1" align="left" mb={2}>
              Our multilingual staff is fluent in few languages, ready to
              support both local and international clients. We believe in
              building long-term relationships, and many of our clients become
              friends.
            </Typography>

            <Typography variant="body1" align="left">
              Visit our office in Budva or contact us online to start your
              journey toward owning a beautiful piece of Montenegro. At Budvanka
              Real Estate, your coastal dream is just one conversation away.
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            flex: isMdUp ? '1' : 'unset',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardMedia
            component="img"
            image={adminImg}
            alt="Chef Anđela"
            sx={{ height: 300, objectFit: 'contain', mb: 3 }}
          />
          <CardContent>
            <Typography variant="h6">Chef Anđela</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Founder of Budvanka Real Estate. With over 10 years in property
              investment, Anđela leads the agency with vision and charm.
            </Typography>
            <Typography>📞 +382 67 123 456</Typography>
            <Typography>📧 andjela@budvanka.me</Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            flex: isMdUp ? '1' : 'unset',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardMedia
            component="img"
            image={agentImg}
            alt="Agent Stefan"
            sx={{ height: 300, objectFit: 'contain', mb: 3 }}
          />
          <CardContent>
            <Typography variant="h6">Agent Stefan</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Your go-to expert for coastal homes. Stefan knows every hidden gem
              from Budva to Kotor and brings deals to life with energy and care.
            </Typography>
            <Typography>📞 +382 67 987 654</Typography>
            <Typography>📧 stefan@budvanka.me</Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
