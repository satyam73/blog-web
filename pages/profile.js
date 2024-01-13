import { Box } from "@mui/material";
import UserProvider, { useUser } from "@/app/Contexts/UserProvider";
import Layout from "@/app/components/common/Layout/Layout";
import AuthGuard from "@/app/components/AuthGuard/AuthGuard";

export default function Profile() {
  const { user, loading } = useUser();

  return <Box>
    {loading ? <>loading...</> :
      user?.displayName
    }
  </Box>
}

Profile.getLayout = function getLayout(page) {
  return (
    <UserProvider>
      <AuthGuard>
        <Layout>
          {page}
        </Layout>
      </AuthGuard>
    </UserProvider>
  )
}