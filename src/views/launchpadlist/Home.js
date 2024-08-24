import {
  CCard,
  CCardBody,
  CCol, CFormCheck, CFormInput, CFormSelect, CRow,
  CAlert,
  CNav, CNavLink, CNavItem, CTabContent, CTabPane,
  CCardImage, CCardTitle, CCardText, CButton, CBadge,
  CProgressBar, CProgress, CContainer,
} from '@coreui/react'
import { CSpinner } from '@coreui/react'

import React, { useEffect, useState, useMemo } from 'react'
import { FormControl } from "react-bootstrap"
import { FairCardDetail, NormalCardDetail } from '../components/EachCardDetail'
import Spinner from 'react-bootstrap/Spinner'

const LaunchpadList = () => {

  const [activeKey, setActiveKey] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(9)
  const [tabledata, setTableData] = useState([])
  const [myCurrentPage, setMyCurrentPage] = useState(1)
  const [myTableData, setMyTableData] = useState([])
  const [currentChain, setCurrentChain] = useState(0)

  const [wholeLoading, setWholeLoading] = useState(true)
 
  const database_url = 'https://presale-backend.vercel.app/presale/launchpad'

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('networkChanged', function (networkid) {
        setCurrentChain(networkid)
      })
    } else {
      console.warn('MetaMask is not installed')
    }
  }, [])

  const unit = useMemo(() => {
    if (currentChain == 97 || currentChain == 56) return "BNB"
    if (currentChain == 25 || currentChain == 338) return "CRO"
  }, [currentChain])

  useEffect(() => {
    const getCurrentChain = async () => {
      if (window.ethereum) {
        try {
          const netId = await window.ethereum.request({ method: 'eth_chainId' })
          setCurrentChain(parseInt(netId, 16))
        } catch (error) {
          console.error('Error fetching chain ID:', error)
        }
      }
    }
    getCurrentChain()
  }, [])

  const loadData = async () => {
    try {
      const res = await fetch(`${database_url}/all?chainId=${currentChain}`)
      const data = await res.json()
      console.log('fetch whole Data=========>', data)
      setTableData(data)
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const loadMyData = async (currentPage_, pageCount_, owner_) => {
    try {
      const res = await fetch(`${database_url}/myzone?pageCount=${pageCount_}&currentPage=${currentPage_}&owner=${owner_}&chainId=${currentChain}`)
      const data = await res.json()
      console.log('fetch my Data==========>', data)
      setMyTableData(data)
    } catch (error) {
      console.error('Error loading my data:', error)
    }
  }

  const loadWalletAddress = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const account = accounts[0]
        console.log('Account=============', account)
        return account
      } catch (error) {
        console.error('Error fetching wallet address:', error)
      }
    } else {
      console.warn('MetaMask is not installed')
    }
    return null
  }

  const handlePage = (e) => {
    if (e.target.value !== '') {
      setCurrentPage(e.target.value)
    }
  }

  const handleMyPage = (e) => {
    if (e.target.value !== '') {
      setMyCurrentPage(e.target.value)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setWholeLoading(true)
      await loadData(currentPage, pageCount)
      setWholeLoading(false)
    }
    fetchData()
  }, [currentPage, pageCount, currentChain])

  useEffect(() => {
    const fetchMyData = async () => {
      setWholeLoading(true)
      const ownerAddr = await loadWalletAddress()
      if (ownerAddr) {
        console.log('ownerAddr=============>', ownerAddr)
        await loadMyData(myCurrentPage, pageCount, ownerAddr)
      }
      setWholeLoading(false)
    }
    fetchMyData()
  }, [myCurrentPage, pageCount, currentChain])

  return (
    <CContainer className='CContainer'>
      <CRow>
        {
          wholeLoading === true ?
            (
              <CSpinner color="primary" />
            ) : (
              <CCol xs={12}>
                <CCard>
                  <CCardBody>
                    <CNav style={{width:222, overflow:'hidden'}}>
                      <CNavItem>
                        <CNavLink
                          href="javascript:void(0);"
                          active={activeKey === 1}
                          onClick={() => setActiveKey(1)}
                          className='navlink'
                        >
                          All
                        </CNavLink>
                      </CNavItem>
                      <CNavItem >
                        <CNavLink
                          href="javascript:void(0);"
                          active={activeKey === 2}
                          onClick={() => setActiveKey(2)}
                          className="navlink"
                        >
                          My Contributions
                        </CNavLink>
                      </CNavItem>
                    </CNav>
                    <br />
                    <CTabContent>
                      <CTabPane role="tabpanel" aria-labelledby="all-tab" visible={activeKey === 1}>
                        <CRow className="display-block">
                          {
                            tabledata.length === 0 ?
                              (
                                <div className='text-white-color'>There are no launchpad or fairlaunchpad</div>
                              ) : (
                                tabledata.map((data) => {
                                  return (data.presaletype === true ?
                                    <FairCardDetail
                                      list={1}
                                      xs={4}
                                      id={data._id}
                                      address={data.presale_addr}
                                      img={data.logoURL}
                                      name={data.token_name}
                                      softCap={data.softcap}
                                      liquidity={data.liquidityPercent}
                                      lockup={data.lockupTime}
                                      basicSymbol={`${unit}`}
                                    /> :
                                    <NormalCardDetail
                                      list={1}
                                      xs={4}
                                      id={data._id}
                                      address={data.presale_addr}
                                      img={data.logoURL}
                                      name={data.token_name}
                                      symbol={data.token_symbol}
                                      perrate={data.token_presale_rate}
                                      softCap={data.softcap}
                                      hardCap={data.hardcap}
                                      liquidity={data.liquidityPercent}
                                      lockup={data.lockupTime}
                                      basicSymbol={`${unit}`}
                                    />)
                                })
                              )
                          }
                        </CRow>
                      </CTabPane>
                      <CTabPane role="tabpanel" aria-labelledby="mine-tab" visible={activeKey === 2}>
                        <CRow>
                          {
                            tabledata.length === 0 ?
                              (
                                <div className='text-white-color'>There are no your launchpad or fairlaunchpad</div>
                              ) : (
                                myTableData.map((data) => {
                                  return (data.presaletype === true ?
                                    <FairCardDetail
                                      list={1}
                                      xs={4}
                                      id={data._id}
                                      address={data.presale_addr}
                                      img={data.logoURL}
                                      name={data.token_name}
                                      softCap={data.softcap}
                                      liquidity={data.liquidityPercent}
                                      lockup={data.lockupTime}
                                    /> :
                                    <NormalCardDetail
                                      list={1}
                                      xs={4}
                                      id={data._id}
                                      address={data.presale_addr}
                                      img={data.logoURL}
                                      name={data.token_name}
                                      symbol={data.token_symbol}
                                      perrate={data.token_presale_rate}
                                      softCap={data.softcap}
                                      hardCap={data.hardcap}
                                      liquidity={data.liquidityPercent}
                                      lockup={data.lockupTime}
                                    />)
                                })
                              )
                          }
                        </CRow>
                      </CTabPane>
                    </CTabContent>
                  </CCardBody>
                </CCard>
              </CCol>
            )}
      </CRow>
    </CContainer>
  );
}

export default LaunchpadList
