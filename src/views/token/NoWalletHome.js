import {
  CCard,
  CCardBody,
  CCol, CFormCheck, CFormInput, CFormSelect, CRow,
  CAlert, CContainer,
} from '@coreui/react';
import React from 'react';

const NoWalletHome = () => {
  return (
    <CContainer className='CContainer'>
    <CRow>
      <CCol xs={12}>
        <CRow>
          <div className='empty-div'>
            <h3 className='create-heading'>Create Token</h3>
          </div>
        </CRow>
        <div className='empty-div-lg'></div>
        <CAlert color="danger" className="text-center">
          Please connect wallet first
        </CAlert>
      </CCol>
    </CRow>
  </CContainer>
  )
}

export default NoWalletHome