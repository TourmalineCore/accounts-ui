import React, { useState, useRef, RefObject } from 'react';
import clsx from 'clsx';
import { getRelativePosition } from '../../../../common/utils/getRelativePosition';
import useOnClickOutside from '../../../../common/hooks/useOnClickOutside';
import { ReactComponent as IconThreeDots } from '../../../../assets/icons/three-dots.svg';

export default function ActionsDropdown({
  tableContainerRef,
  actions,
  className,
}:{
  tableContainerRef: RefObject<HTMLTableDataCellElement>,
  actions: { text: string, dataAttr: string, onClick: ()=> unknown }[],
  className?: string,

}) {
  const dropdownContainer = useRef<HTMLDivElement | null>(null);
  const dropdownList = useRef<HTMLDivElement | null>(null);
  const [isOpened, setIsOpened] = useState(false);

  useOnClickOutside([dropdownContainer, dropdownList], () => setIsOpened(false));

  const listPosition = getRelativePosition(dropdownContainer.current, tableContainerRef.current);

  return (
    <div ref={dropdownContainer} className={clsx('tc-table-desktop-actions-dropdown', className)}>

      <button
        type="button"
        style={{ position: 'relative' }}
        onClick={() => setIsOpened(!isOpened)}
      >
        <IconThreeDots />
      </button>

      {isOpened && (
        <div
          ref={dropdownList}
          style={{
            top: listPosition.top + dropdownContainer.current!.offsetHeight,
          }}
          className="tc-table-desktop-actions-dropdown__list"
        >
          {
            actions
              .map((action) => (
                <button
                  key={`${action.text}-${action.dataAttr}`}
                  type="button"
                  data-cy={action.dataAttr}
                  className="tc-table-desktop-actions-dropdown__action"
                  onClick={() => { action.onClick(); }}
                >
                  { action.text}
                </button>
              ))
          }
        </div>
      )}
    </div>
  );
}
