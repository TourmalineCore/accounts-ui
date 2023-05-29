export function getAccessRights(value: string[]) {
  if (value.includes('ViewAccounts') && value.includes('ManageAccounts') && value.includes('ViewRoles')) {
    return 'full access';
  }

  if (value.includes('ViewAccounts') && value.includes('ManageAccounts')) {
    return 'full access to accounts';
  }

  if (value.includes('ViewAccounts') && value.includes('ViewRoles')) {
    return 'limited access to accounts and roles';
  }

  if (value.includes('ViewAccounts')) {
    return 'limited access to accounts';
  }

  if (value.includes('ViewRoles')) {
    return 'limited access to roles';
  }

  return 'no access';
}

export function parseJwt(tokensss: string) {
  const base64Url = tokensss.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

  return JSON.parse(jsonPayload);
}
