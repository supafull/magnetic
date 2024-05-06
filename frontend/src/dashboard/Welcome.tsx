import CodeIcon from "@mui/icons-material/Code";
import HomeIcon from "@mui/icons-material/Home";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

export const Welcome = () => {
  return (
    <Card
      sx={{
        background: `#c5dedd`,
        color: "rgba(0, 0, 0, 0.87)",
        padding: "1em",
        marginBottom: "1em",
        marginTop: "2em",
        [`& .MuiCardActions-root`]: {
          p: 2,
          mt: -2,
          mb: -1,
          flexDirection: "column",
          "& a": {
            mb: 1,
            color: "rgba(0, 0, 0, 0.87)",
            backgroundColor: "white",
            marginLeft: "0 !important",
          },
        },
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          CRM PWA demo
        </Typography>
        <Typography gutterBottom>
          This demo app runs in the browser, and uses various best-in-class open
          source technologies. The frontend code was adapted from the{" "}
          <a href="https://github.com/marmelab/ra-supabase">ra-supabase</a> demo
          project. The React Admin dataProvider from that project was replaced
          with an adapter for Electric SQL, a new open source project that
          connects to any postgresql install.
        </Typography>
        {/* <Typography gutterBottom>
          This demo uses Electric SQL to connect to a Supabase instance.
          Supabase is an open source Firebase alternative that provides a
          realtime database, authentication, and file storage.
        </Typography>
        <Typography gutterBottom>
          Most examples like this use either a fake REST API or rely on docker
          compose. This is unfortunate because it can significantly complicate
          getting something meaningful into production. This demo uses Helm to
          deploy to a Kubernetes cluster. k3d is used to run a local Kubernetes
          cluster for development, meaning you are developing in an environment
          that is very similar to production. Through the mapping of local
          volumes, you are able to benefit from hot reloading and other
          development niceties, meaning you can develop quickly and efficiently,
          without using a fake API or technologies like docker compose that are
          highly unsuited for production.
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          fullWidth
          href="https://github.com/supafull/magnetic/"
          startIcon={<CodeIcon />}
        >
          Source of this demo
        </Button>
        <Button
          variant="contained"
          fullWidth
          href="https://marmelab.com/react-admin/"
          startIcon={<HomeIcon />}
        >
          React-admin site
        </Button>
        <Button
          variant="contained"
          fullWidth
          href="https://github.com/electric-sql/electric/"
          startIcon={<CodeIcon />}
        >
          Electric SQL
        </Button>
        <Button
          variant="contained"
          fullWidth
          href="https://github.com/supabase/supabase/"
          startIcon={<CodeIcon />}
        >
          Supabase
        </Button>
      </CardActions>
    </Card>
  );
};
