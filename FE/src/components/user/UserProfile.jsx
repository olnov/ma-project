import { useAuth0 } from '@auth0/auth0-react'

const UserProfile = () => {
  const { user, isAuthenticated } = useAuth0()

  if (!isAuthenticated) return null

  return (
    <div>
      <p>Logged in as: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  )
}

export default UserProfile
