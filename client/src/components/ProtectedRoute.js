import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, isAdmin }) => {
  const { userData: user } = useSelector((state) => state.user)

  if (!user) {
    return <Navigate to="/login" />
  }

  if (isAdmin && user.role !== 'admin') {
    return <Navigate to="/products" />
  }

  return children
}

export default ProtectedRoute
