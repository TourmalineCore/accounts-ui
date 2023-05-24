import { observer } from 'mobx-react-lite';
import React, {
  ChangeEvent, Fragment, useContext, useEffect, useRef,
} from 'react';
import { CheckField } from '@tourmalinecore/react-tc-ui-kit';
import RolesPageStateContext from '../../state/roles-page/RolesPageStateContext';
import { ReactComponent as IconCheck } from '../../../../assets/icons/check.svg';
import { ReactComponent as IconUncheck } from '../../../../assets/icons/uncheck.svg';
import { ReactComponent as IconThreeDots } from '../../../../assets/icons/three-dots.svg';

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
            <td data-cy="role-column" key={name} className="roles-table__role-column">
              {
                id === rolesPageStateContext.updatedRole?.id
                  ? (
                    <input
                      data-cy="role-name-input"
                      className="roles-table__name-input"
                      type="text"
                      ref={nameRef}
                      onChange={(event: { target: { value: any; }; }) => {
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
                className="roles-table__role-action-button"
                onClick={() => { rolesPageStateContext.editRole(id); }}
              >
                <IconThreeDots />
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
            <tr data-cy="permission-group" className="roles-table__permission-group">
              <td colSpan={rolesPageStateContext.roles.length + 1}>{groupName}</td>
            </tr>
            {children.map(({ id, name }) => (
              <tr data-cy="permission" key={id}>
                <td>{name}</td>
                {rolePermissions.map(({ id: roleId, permissions }) => (
                  <td
                    data-cy="permission-indicator"
                    key={roleId}
                  >

                    {roleId === rolesPageStateContext.updatedRole?.id
                      ? (
                        <CheckField
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
                            ? <IconCheck data-cy="permission-indicator-checked" />
                            : <IconUncheck data-cy="permission-indicator-unchecked" />}
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
