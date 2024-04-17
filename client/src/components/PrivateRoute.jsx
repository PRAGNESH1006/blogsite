import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PrivateRoute() {
    const { curenrUser } = useSelector((state) => state.user)
    return curenrUser ? <Outlet /> : <Navigate to='/sign-in' />

}
