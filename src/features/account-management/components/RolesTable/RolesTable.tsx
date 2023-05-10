import React, { useEffect, useState } from 'react';
import { api } from '../../../../common/api';
import { Permissions } from '../../roles-enums';

type RoleType = {
  id: number,
  name: string,
  permissions: string[]
};

// ToDo
// When create a new role, its object should be added to the beginning of the array using unshift method
// object should contain id, which will be sent to mobX class (to __editId field)
// when save changed to a newly created role, its id will be deleted and the object will be sent only with name and permissions list
// we will get the id from backend

// When press Edit button, the id of the role should be sent to mobX class (to __editId field)
// based on this field, we will show either inputs or spans

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
            {roles.map(({ name, permissions }) => (
              <div className="roles-table__cell" data-cy="ViewPersonalProfile">
                {permissions.map((permission) => (
                  <div>{permission === 'ViewPersonalProfile' ? `${name}_${permission}_yes` : `${name}_${permission}_no`}</div>
                ))}
              </div>
            ))}
            {/* <div className="roles-table__cell" data-cy="ViewPersonalProfile">
              {roles.map(({ permissions }) => (permissions.map((permission) => (
                <div>{permission === 'ViewPersonalProfile' ? 'check' : 'uncheck'}</div>
              ))))}
            </div> */}
          </div>

          <div className="roles-table__row" style={{ display: 'flex' }}>
            <div className="roles-table__cell">
              {Permissions.EditPersonalProfile}
            </div>
            {roles.map(({ name, permissions }) => (
              <div className="roles-table__cell" data-cy="EditPersonalProfile">
                {permissions.map((permission) => (
                  <div>{permission === 'EditPersonalProfile' ? `${name}_${permission}_yes` : `${name}_${permission}_no`}</div>
                ))}
              </div>
            ))}
            {/* <div className="roles-table__cell" data-cy="ViewPersonalProfile">
              {roles.map(({ permissions }) => (permissions.map((permission) => (
                <div>{permission === 'ViewPersonalProfile' ? 'check' : 'uncheck'}</div>
              ))))}
            </div> */}
          </div>

          {/* <div className="roles-table__row" style={{ display: 'flex' }}>
            <div className="roles-table__cell">
              {Permissions.EditPersonalProfile}
            </div>
            <div className="roles-table__cell">
              uncheck
            </div>
          </div> */}
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
