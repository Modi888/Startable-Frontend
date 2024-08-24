import React from 'react'
import { CRow, CCol } from '@coreui/react'

const RowBetween = (props) => {
    return (
        <CRow className={props.lanchpadList ? 'mr-0 pr-0 display-block' : 'mr-0 pr-0'}>
            {!props.lanchpadList && (
                <CCol className={props.createLanchpad ? "flex-0" : ""}>
                    {props.childStart}
                </CCol>
            )}

            {!props.lanchpadList && props.childMiddle && (
                <CCol className={`d-md-flex justify-content-md-center ${props.isLong ? 'col-md-8' : ''}`}>
                    {props.childMiddle}
                </CCol>
            )}

            <CCol className={props.createLanchpad ? "flex-0" : ""}>
                <div className="d-md-flex justify-content-md-end">
                    {props.childEnd}
                </div>
            </CCol>

            {props.desc && (
                <div className="text-label-color small text-end">
                    {props.desc}
                </div>
            )}

            {props.underline && (
                <div className='underline'></div>
            )}
        </CRow>
    )
}

export default RowBetween
