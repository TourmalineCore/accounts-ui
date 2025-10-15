import {FunctionComponent, useContext, useEffect} from 'react'
import { authService } from './authService'
import {AccessBasedOnPemissionsStateContext} from '../routes/state/AccessBasedOnPemissionsStateContext'
import { parseJwt } from './utils/utilsForPermissions'

export const withPrivateRoute = <Type extends Record<string, unknown>>(ComposedComponent: FunctionComponent<Type>) => function RequireAuthentication(props: Type) {
  // @ts-ignore
  const [
    token,
  ] = useContext(authService.AuthContext)

  const accessBasedOnPemissionsState = useContext(AccessBasedOnPemissionsStateContext)

  useEffect(() => {
    if (!token) {
      window.location.href = `/auth`
    }
  }, [
    token,
  ])

  if (token) {
    accessBasedOnPemissionsState.checkPermissionFromToken(parseJwt(token).permissions)
  }

  return token ? <ComposedComponent {...props} /> : null
}
