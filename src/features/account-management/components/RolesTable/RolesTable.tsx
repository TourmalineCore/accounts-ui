import { observer } from 'mobx-react-lite';
import React, {
  ChangeEvent, Fragment, useContext, useEffect, useRef,
} from 'react';
import RolesPageStateContext from '../../state/roles-page/RolesPageStateContext';
// import React, { useContext, useEffect } from 'react';

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

  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, [rolesPageStateContext.updatedRole]);

  return (

    <table data-cy="roles-table" className="roles-table">
      <thead>
        <tr>
          <td>Permissions</td>
          {rolePermissions.map(({ id, name }) => (
            <td data-cy="role-column" key={name}>
              {
                id === rolesPageStateContext.updatedRole?.id
                  ? (
                    <input
                      data-cy="role-name-input"
                      type="text"
                      ref={nameRef}
                      onChange={(event) => {
                        rolesPageStateContext.changeRole({ ...rolesPageStateContext.updatedRole!, name: event.target.value });
                      }}
                      defaultValue={name}
                    />
                  )
                  : <span data-cy={`role-name-${name}`}>{name}</span>
              }
              {
                (name !== 'Admin' && (!rolesPageStateContext.isInEditMode))
            && (
              <button
                data-cy={`edit-role-button-${name}`}
                type="button"
                onClick={() => { rolesPageStateContext.editRole(id); }}
              >
                Edit
              </button>
            )
              }

            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {permissionGroups.map(({ groupName, children }) => (
          <Fragment key={groupName}>
            <tr data-cy="permission-group" style={{ backgroundColor: '#e2e2e2' }}>
              <td colSpan={3}>{groupName}</td>
            </tr>
            {children.map(({ id, name }) => (
              <tr data-cy="permission" key={id}>
                <td>{name}</td>
                {rolePermissions.map(({ id: roleId, permissions }) => (
                  <td data-cy="permission-indicator" key={roleId}>

                    {roleId === rolesPageStateContext.updatedRole!.id
                      ? (
                        <input
                          id={id}
                          type="checkbox"
                          defaultChecked={permissions.some((item) => item === id)}
                          onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            const permissionsCopy = [...rolesPageStateContext.updatedRole!.permissions];
                            const permissionIndexInArray = permissionsCopy.indexOf(event.target.id);

                            if (permissionsCopy.includes(event.target.id)) {
                              permissionsCopy.splice(permissionIndexInArray, 1);
                            } else {
                              permissionsCopy.push(event.target.id);
                            }
                            rolesPageStateContext.changeRole({ ...rolesPageStateContext.updatedRole!, permissions: permissionsCopy });
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
          </Fragment>
        ))}
      </tbody>
    </table>

  );
}

export default observer(RolesTable);
