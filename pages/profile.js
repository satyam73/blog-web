import { Box } from "@mui/material";
import UserProvider, { useUser } from "@/Contexts/UserProvider";
import Layout from "@/components/common/Layout/Layout";

export default function Profile() {
  const { user, loading } = useUser();
  console.log(user);

  return <Box>
    {loading ? <>loading...</> :
      user?.displayName
    }
  </Box >
}

Profile.getLayout = function getLayout(page) {
  return (
    <UserProvider>
      <Layout>
        {page}
      </Layout>
    </UserProvider>
  )
}