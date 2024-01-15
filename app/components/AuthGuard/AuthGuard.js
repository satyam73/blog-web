import { useUser } from "@/app/contexts/UserProvider";

export default function AuthGuard({ children }) {
  const { user } = useUser();

  return (
    <>
      {!user?.uid ? <p>You're not authenticated to view this page!</p> : children}
    </>
  )
}