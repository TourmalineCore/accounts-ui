import { authService } from '../authService';

export function parseJwt(token: string): {
  permissions: string[];
} {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

  return JSON.parse(jsonPayload);
}

const token = authService.getAuthToken();

export function getAccessRights() {
  const { permissions } = parseJwt(token);

  if (permissions.includes('ViewAccounts')
  && permissions.includes('ManageAccounts')
  && permissions.includes('ViewRoles')
  && permissions.includes('AccessAnalyticalForecastsPage')) {
    return 'full access';
  }

  if (permissions.includes('ViewAccounts')
  && permissions.includes('ManageAccounts')
  && permissions.includes('ViewRoles')
  && permissions.includes('AccessAnalyticalForecastsPage')) {
    return 'full access';
  }

  if (permissions.includes('AccessAnalyticalForecastsPage')) {
    return 'full access to analytics';
  }

  if (permissions.includes('ViewAccounts') && permissions.includes('ManageAccounts')) {
    return 'full access to accounts';
  }

  if (permissions.includes('ViewAccounts') && permissions.includes('ViewRoles')) {
    return 'limited access to accounts and roles';
  }

  if (permissions.includes('ViewAccounts')) {
    return 'limited access to accounts';
  }

  if (permissions.includes('ViewRoles')) {
    return 'limited access to roles';
  }

  return 'no access';
}
