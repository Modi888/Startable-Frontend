import React from 'react'
import { AppContent, AppHeader, AppSidebar, AppTopBar, AppFooter } from '../components/index'
import { useState } from 'react';
import { CContainer } from '@coreui/react';

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <div>
      <AppHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
      />
      <div className="wrapper d-flex min-vh-100">
        <AppSidebar sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          mobileMenu={mobileMenu}
          setMobileMenu={setMobileMenu}/>
        <CContainer fluid className='!tw-overflow-hidden'>
          {/* <AppTopBar /> */}
          <AppContent />
        </CContainer>
      </div>
      <AppFooter />
    </div>
  )
}

export default DefaultLayout
