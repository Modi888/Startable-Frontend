import { cilLockLocked } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CDropdown, CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react';
import React from 'react';
import { IoWalletOutline } from "react-icons/io5";

const AppHeaderDropdown = (props) => {
  return (
    <CDropdown className='connect-dropdown'>
      <CDropdownToggle placement="bottom-end" className="py-0 connect-dropdown" caret={false} color='transparent'>
        {
          props.currentAccount === null ? (
            <>
              <button className='connect_btn hidden md:tw-block' onClick={props.onConnect}>
                Connect
              </button>
              <button className='connect_btn_mobile flex md:tw-hidden' onClick={props.onConnect}>
                Connect
              </button>
            </>
          ) : (
            <>
              <button className='connected_btn hidden md:tw-block tw-text-center'>{props.currentAccount}</button>

              <button className='connected_btn_mobile flex md:tw-hidden tw-items-center'>
                <IoWalletOutline size={30}/>
              </button>
            </>
          )
        }
      </CDropdownToggle>
      {
        props.currentAccount === null ? (
          <></>
        ) : (
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownItem href="#" onClick={props.onLogout}>
              <CIcon icon={cilLockLocked} className="me-2" />
              Logout
            </CDropdownItem>
          </CDropdownMenu>
        )
      }
    </CDropdown>
  );
}

export default AppHeaderDropdown;
