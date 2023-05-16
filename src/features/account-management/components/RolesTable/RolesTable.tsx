import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, {
  ChangeEvent, useContext, useEffect, useRef,
} from 'react';
import RolesPageStateContext from '../../state/roles-page/RolesPageStateContext';
// import React, { useContext, useEffect } from 'react';
// import RolesPageStateContext from '../../state/roles-page/RolesPageStateContext';

// ToDo
// When create a new role, its object should be added to the beginning of the array using unshift method
// object should contain id, which will be sent to mobX class (to __editId field)
// when save changed to a newly created role, its id will be deleted and the object will be sent only with name and permissions list
// we will get the id from backend

// When press Edit button, the id of the role should be sent to mobX class (to __editId field)
// based on this field, we will show either inputs or spans

function RolesTable(
  {
    permissionGroups,
    rolePermissions,
  }: {
    permissionGroups: PermissionGroup[];
    rolePermissions: Role[];
  },

) {
  const rolesPageStateContext = useContext(RolesPageStateContext);

  // useEffect(() => {
  //   function loadData() {
  //     console.log('123');
  //   }

  //   if (!rolesPageState.isInEditMode) {
  //     loadData();
  //   }
  // }, [rolesPageState.isInEditMode]);

  console.log(toJS(rolesPageStateContext.roles));

  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, [rolesPageStateContext.roleIdThatIsBeingEditedNow]);

  return (

    <table data-cy="roles-table" className="roles-table">
      <tr>
        <th>Permissions</th>
        {rolePermissions.map(({ id, name }) => (
          <th data-cy="role-column">
            {
              id === rolesPageStateContext.roleIdThatIsBeingEditedNow
                ? (
                  <input
                    data-cy="role-name-input"
                    type="text"
                    ref={nameRef}
                  />
                )
                : <span>{name}</span>
            }
            {
              name !== 'Admin'
            && <button data-cy="role-column" type="button">Edit</button>
            }

          </th>
        ))}
      </tr>
      {
        permissionGroups.map(({ groupName, children }) => (
          <>
            <tr data-cy="permission-group" style={{ backgroundColor: '#e2e2e2' }}>
              <td colSpan={3}>{groupName}</td>
            </tr>
            {children.map(({ id, name }) => (
              <tr data-cy="permission">
                <td>{name}</td>
                {rolePermissions.map(({ id: roleId, permissions }) => (
                  <td data-cy="permission-indicator">

                    {roleId === rolesPageStateContext.roleIdThatIsBeingEditedNow
                      ? (
                        <input
                          type="checkbox"
                          defaultChecked={permissions.some((item) => item === id)}
                          onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            console.log(permissions[0], event.target.checked);
                            return rolesPageStateContext.applyChanges({ name: '', permissions: [] });
                          }}
                        />
                      )
                      : (
                        <span>
                          {permissions.some((item) => item === id)
                            ? <span data-cy="permission-indicator-checked" className="roles-table__permission-indicator roles-table__permission-indicator--checked" />
                            : <span data-cy="permission-indicator-unchecked" className="roles-table__permission-indicator roles-table__permission-indicator--unchecked" />}
                        </span>
                      )}

                  </td>
                ))}
              </tr>
            ))}
          </>
        ))
      }
    </table>

  );
}

export default observer(RolesTable);
