import { useUser } from "@/app/contexts/UserProvider";

export default function AuthGuard({ children }) {
  const { user, loading } = useUser();

  console.log(user, loading)
  return (
    <>
      {!user?.uid ? <p>You're not authenticated to view this page!</p> : children}
    </>
  )
}