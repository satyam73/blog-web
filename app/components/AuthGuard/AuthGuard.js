import { useUser } from "@/app/contexts/UserProvider";
import UnauthorizedCard from "@/app/components/common/UnauthorizedCard/UnauthorizedCard";
import { Box, Typography } from "@mui/material";
import Layout from "../common/Layout/Layout";

export default function AuthGuard({ children }) {
  const { user, loading } = useUser();

  return (<>
    <Layout>
      {!loading && !user?.uid ?
        <Box sx={{ display: 'grid', placeItems: 'center', placeContent: 'center', height: 'calc(100vh - var(--navbar-height))', textAlign: 'center' }}>
          <UnauthorizedCard />
          <Typography variant="h4">You&apos;re not authenticated to view this page!</Typography >
        </Box>
        : children
      }
    </Layout>
  </>)
}