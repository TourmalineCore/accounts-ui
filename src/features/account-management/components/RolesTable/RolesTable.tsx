import React, { useEffect, useState } from 'react';
import { api } from '../../../../common/api';
import { Permissions } from '../../roles-enums';

type RoleType = {
  id: number,
  name: string,
  permissions: string[]
};

function RolesTable() {
  const [roles, setRoles] = useState<RoleType[]>([]);

  useEffect(() => {
    loadDataAsync();
  }, []);

  return (
    <div data-cy="roles-table" className="roles-table">
      <div data-cy="role-name-row" className="roles-table__row" style={{ display: 'flex' }}>
        <div className="roles-table__cell">Permissions</div>
        {roles.map((role) => (
          <div className="roles-table__cell">{role.name}</div>
        ))}
      </div>
      <div className="accordion roles-table__section">
        <div className="accordion__header">
          <div className="roles-table__row">My Profile</div>
        </div>
        <div data-cy="profile-section-content" className="accordion__content">
          <div className="roles-table__row" style={{ display: 'flex' }}>
            <div className="roles-table__cell">
              {Permissions.ViewPersonalProfile}
            </div>
            <div className="roles-table__cell">
              check
            </div>
            <div className="roles-table__cell">
              check
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  async function loadDataAsync() {
    const { data } = await api.get('api/roles');
    setRoles(data);
  }
}

export default RolesTable;
