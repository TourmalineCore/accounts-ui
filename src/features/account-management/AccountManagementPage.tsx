import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AccountManagementPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/account-management/accounts');
  }, []);

  return (
    <div>AccountManagementPage</div>
  );
}

export default AccountManagementPage;
