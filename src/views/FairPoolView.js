import {
  CCard,
  CCardBody,
  CCol, CFormCheck, CFormInput, CFormSelect, CRow,
  CAlert,
  CCardHeader,
  CCardImage,
  CImage,
  CContainer, CTooltip,
  CBadge,
  CButton,
  CAccordion,
  CAccordionHeader,
  CAccordionBody, CAccordionItem, CProgress, CProgressBar,
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
} from '@coreui/react';
import {
  CChart,
  CChartPie,
} from '@coreui/react-chartjs'
import React, { useEffect, useState, useMemo } from 'react';
import ReactEcharts from "echarts-for-react"; 

import CIcon from '@coreui/icons-react';
import { cilList, cilKey, cilShieldAlt, AiOutlineGlobal } from '@coreui/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from 'react-bootstrap/Spinner'

import { 
  faInfoCircle, faWindowClose, faKey, faEdit, faEarth, faLink,
  faGlobe,
 } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebookSquare, faTelegram, faGithub, faInstagram, faDiscord, faRedditAlien } from '@fortawesome/free-brands-svg-icons'
import RowBetween from './components/RowBetween'
import NumberInputComponent from './components/NumberInputComponent';
import { useDispatch, useSelector } from 'react-redux'
import { CSpinner } from '@coreui/react'
//import { AiOutlineGlobal } from "react-icons/ai";

import Web3 from 'web3';
import abi from '../contracts/fairlaunchAbi'

import { useLocation } from 'react-router-dom';

const TotalView = () => {
  const [buyAmount, setBuyAmount] = useState(0)
  const [saleType, setSaleType] = useState('Public')
  const [whitelistcap, setWhitelistCap] = useState('Whitelist')
  const [currentState, setCurrentState] = useState(0)
  // const tokenName = useSelector((state) => state.createLaunchPadState.tokenName)
  // const currentAddr = useSelector((state) => state.createFairLaunchState.currentAddr)
  const currentAddr = new URLSearchParams(useLocation().search).get('id')
  const metaInfo = useSelector((state) => state.metamaskState.metaAddress)
  // const database_url = 'http://127.0.0.1:5000/presale/launchpad'
  const database_url = 'https://presale-backend.vercel.app/presale/launchpad'

  /// simple
  const [presaleAddress, setPresaleAddress] = useState('')
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [tokenDecimal, setTokenDecimal] = useState(0)
  const [tokenAddress, setTokenAddress] = useState('')
  const [tokenSupply, setTokenSupply] = useState(0)
  const [presaleRate, setPresaleRate] = useState(0)
  const [listingRate, setListingRate] = useState(0)
  const [softcap, setSoftcap] = useState(0)
  const [hardcap, setHardcap] = useState(0)
  const [unsold, setUnsold] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [listing, setListing] = useState('Pancakeswap')
  const [liquidityPercent, setLiquidityPercent] = useState(0)
  const [lockTime, setLockTime] = useState(0)
  const [minBuy, setMinBuy] = useState(0)
  const [maxBuy, setMaxBuy] = useState(0)
  const [description, setDescription] = useState('')

  /// first option

  const [useVesting, setUseVesting] = useState(false)
  const [firstReleasePresale, setFirstReleasePresale] = useState(0)
  const [vestingPresalePercent, setVestingPresalePercent] = useState(0)
  const [vestingPresaleTime, setVestingPresaleTime] = useState(0)

  /// second option

  const [useTeamVesting, setUseTeamVesting] = useState(false)
  const [totalTeamVesting, setTotalTeamVesting] = useState(0)
  const [firstReleaseListing, setFirstReleaseListing] = useState(0)
  const [firstReleaseTeam, setFirstReleaseTeam] = useState(0)
  const [cycleTime, setCycleTime] = useState(0)
  const [teamReleaseEach, setTeamReleaseEach] = useState(0)

  const [tabledata, setTableData] = useState([])
  const [isCancel, setCancel] = useState(false)
  const [publicvisible, setVisible] = useState(false)

  const [presaleState, setPresaleState] = useState(0)
  const [presaleTime, setPresaleTime] = useState(-1)
  const [presaleDay, setPresaleDay] = useState(0)
  const [presaleHour, setPresaleHour] = useState(0)
  const [presaleMinute, setPresaleMinute] = useState(0)
  const [presaleSecond, setPresaleSecond] = useState(0)

  const [isChecked, setIsChecked] = useState(false)
  const [isValidBuy, setIsValidBuy] = useState(false)

  const [logoUrl, setLogoUrl] = useState('')
  const [siteUrl, setSiteUrl] = useState('')
  const [twitterUrl, setTwitterUrl] = useState('')
  const [facebookUrl, setFacebookUrl] = useState('')
  const [telegramUrl, setTelegramUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [instagramUrl, setInstagramUrl] = useState('')
  const [discordUrl, setDiscordUrl] = useState('')
  const [redditUrl, setRedditUrl] = useState('')
  const [isOwner, setOwner] = useState('')
  const [showOwnerZone, setShowOwnerZone] = useState(false)

  const [isFinalizeLoad, setFinalizeLoad] = useState(false)
  const [isBuying, setBuying] = useState(false)
  const [isFinalized, setFinalized] = useState(true)

  const [progress, setProgress] = useState(0)
  const [wholeLoading, setWholeLoading] = useState(true)
  const [userCurrent, setUserCurrent] = useState(0)
  const [currentChain, setCurrentChain] = useState(0)

  window.ethereum.on('networkChanged', function (networkid) {
    setCurrentChain(networkid)
  })

  const unit = useMemo (() => {
    if (currentChain == 97 || currentChain == 56) return "BNB"
    if (currentChain == 25 || currentChain == 338 ) return "CRO"
  }, [currentChain])

  const chartOption = {
    tooltip: {
      trigger: 'none'
    },
    legend: {
      orient: 'vertical',
      x: 'right',
      data: ['Unlocked', 'Liquidity', 'Presale']
    },
    itemStyle: {
      // Color of the point.
      color: '#fff'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['80%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: (presaleRate * liquidityPercent / 100), name: 'Liquidity' },
          { value: (presaleRate), name: 'Presale' },
        ]
      }
    ]
  };

  const onChangeAmount = (e) => {
    // setBuyAmount((v) => (e.target.validity.valid ? e.target.value : v))
    setBuyAmount(e.target.value)
    setIsValidBuy(e.target.value > 0)
//    console.log(e.target.value, maxBuy, (e.target.value < maxBuy))

  }

  const provider = () => {
    // 1. Try getting newest provider
    const { ethereum } = window
    if (ethereum) return ethereum

    // 2. Try getting legacy provider
    const { web3 } = window
    if (web3 && web3.currentProvider) return web3.currentProvider
  }

  async function handleBuy(valueBid) {
    setBuying(true)
    try {
      const web3 = new Web3(provider())

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      console.log(account)

      const presaleContract = new web3.eth.Contract(abi, presaleAddress)
  //  const txResult = await presaleContract.methods.Bid().send({'from': account, 'value': valueBid * 10 ** 18})
      const blocktime = await presaleContract.methods.getTimestamp().call()
      console.log(blocktime)
      const txResult = await presaleContract.methods.userDeposit().send({'from': account, 'value': valueBid * 10 ** 18})

     console.log('success', txResult)
     setBuying(false)
     return 1;
      
    } catch (error) {
      setBuying(false)
      return -1
      console.log('error', error)
    }
  }

  async function handleCancel() {
    try {
      const web3 = new Web3(provider())

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      console.log(account)

      const presaleContract = new web3.eth.Contract(abi, presaleAddress)
//     const txResult = await presaleFactoryContract.methods.create(hexSoftCap, hexHardCap, startDate, presaleRate, tokenAddr, ).send({ 'from': account, 'value': 100000000000000000 })
     const txResult = await presaleContract.methods.setCancel().send({'from': account})

     console.log('success', txResult)
     setCancel(true)      
    } catch (error) {
      console.log('error', error)
    }
  }

  async function handleWithdraw() {
    try {
      const web3 = new Web3(provider())

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      const presaleContract = new web3.eth.Contract(abi, presaleAddress)
      const txResult = await presaleContract.methods.ownerWithdrawTokens().send({'from': account})

      console.log('success', txResult)
      
    } catch (error) {
      console.log('error', error)
    }
  }

  async function handleFinalize() {
    setFinalizeLoad(true)
    try {
      const web3 = new Web3(provider())

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      const presaleContract = new web3.eth.Contract(abi, presaleAddress)
      const txResult = await presaleContract.methods.purchaseICOCoin(account).send({'from': account})

      console.log('success', txResult)      
    } catch (error) {
      console.log('error', error)
    }
    setFinalizeLoad(false)
  }

  async function handleClaim() {
    try {
      const web3 = new Web3(provider())

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0]
      const presaleContract = new web3.eth.Contract(abi, presaleAddress)
      const txResult = await presaleContract.methods.userWithdrawTokens().send({'from': account})
      
      console.log('success', txResult)
    } catch (error) {
      console.log('error', error)
    }
  }

  async function loadWholeData() {
    setWholeLoading(true)
    // const res = await fetch(database_url.concat('/').concat(currentAddr))
    const res = await fetch(`${database_url}/${currentAddr}?chainId=${currentChain}`)
    let presaleAddr;
    let currentime, startime, endtime;
    // const res = await fetch(database_url.concat('/').concat('62857e9c68be6cb6c8e55628'))
    await res.json()
      .then(data1 => {
        if(data1.length > 0) {
          var data = data1[0]
          setPresaleAddress(data.presale_addr)
          presaleAddr = data.presale_addr
          setOwner(data.token_owner)
          setTokenName(data.token_name)
          setTokenSymbol(data.token_symbol)
          setTokenDecimal(data.token_decimal)
          setTokenAddress(data.token_addr)
          setTokenSupply(data.token_supply)
          setPresaleRate(data.token_presale_rate)
          setListingRate(data.token_listing_rate)
          setSoftcap(data.softcap)
          if(data.unsold == false) {
            setUnsold('Burn')
          } else {
            setUnsold('Refund')
          }
          setStartTime(data.starttime)
          setEndTime(data.endtime)
          setLiquidityPercent(data.liquidityPercent)
          setLockTime(data.lockupTime)
          setMinBuy(data.minBuy)
          setMaxBuy(data.maxBuy)
          setDescription(data.description)
          if(data.iswhitelist == true) {
            setSaleType('Whitelist')
          } else {
            setSaleType('Public')
          }

          setLogoUrl(data.logoURL)
          setSiteUrl(data.websiteURL)
          setFacebookUrl(data.facebookURL)
          setTwitterUrl(data.twitterURL)
          setGithubUrl(data.githubURL)
          setTelegramUrl(data.telegramURL)
          setInstagramUrl(data.instagramURL)
          setDiscordUrl(data.discordURL)
          setRedditUrl(data.redditURL)
      
          if(data.useVestingCont) {
            setUseVesting(true)
            setFirstReleasePresale(data.ves_firstReleasePresale)
            setVestingPresaleTime(data.ves_vestingPeriod)
            setVestingPresaleTime(data.ves_presaleTokenRelease)
          }
      
          if(data.useTeamVest) {
            setUseTeamVesting(true)
            setTotalTeamVesting(data.team_totalTeamVest)
            setFirstReleaseListing(data.team_firstTokenReleaseMinute)
            setFirstReleaseTeam(data.team_firstTokenReleasePercent)
            setCycleTime(data.team_vestingPeriod)
            setTeamReleaseEach(data.team_teamTokenRelease)
            const ltotal = data.team_totalTeamVest
            const lfirstReleaseTeam = data.team_firstTokenReleasePercent
            const lfirstlisting = data.team_firstTokenReleaseMinute
            const lcycletime = data.team_vestingPeriod
            const lteameach = data.team_teamTokenRelease
            const lstarttime = data.starttime
            var ltabledata = []
            ltabledata.push([1, lstarttime + lfirstlisting, ltotal * lfirstReleaseTeam / 100, lfirstReleaseTeam])
            var count = 2;
            var temp = 100 - +lfirstReleaseTeam
            var temptime = lstarttime
            while( temp > 0 ) {
              if(temp < +lteameach){
                ltabledata.push([count, temptime, ltotal * temp / 100, temp ])
                // console.log([count, temptime, ltotal * temp / 100, temp])
              } else {
                ltabledata.push([count, temptime, ltotal * lteameach / 100, lteameach])
                // console.log([count, temptime, ltotal * lteameach / 100, lteameach])
              }
              count ++;
              temp -= +lteameach
              temptime += +lcycletime
            }
          }
          setTableData(ltabledata)
          currentime = parseInt((new Date()).getTime() / 1000)
          startime = new Date(data.starttime).getTime() / 1000
          endtime = new Date(data.endtime).getTime() / 1000
        // console.log(startime, endtime, currentime)
        // if(currentime < startime) {
        //   setPresaleState(1)
        //   setPresaleTime(startime - currentime)
        // } else if(currentime >= startime && currentime <= endtime) {
        //   setPresaleState(2)
        //   setPresaleTime(endtime - currentime)
        // } else {
        //   setPresaleState(3)
        // }
        }
      })
  
      const status = await getPresaleStatus(presaleAddr)
      setPresaleState(status)
      if(status == 6) {
        setFinalized(false)
      } else if(status == 1) {
        setPresaleTime(startime - currentime)
      } else if(status == 2) { 
        setPresaleTime(endtime - currentime)
      } else {
        setPresaleTime(0)
      }
//      loadTotalSupply()
    setWholeLoading(false)
  }

  async function getPresaleStatus(address) {
    try {
      const web3 = new Web3(provider())

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      const presaleContract = new web3.eth.Contract(abi, address)
      const txResult = await presaleContract.methods.presaleStatus().call()
      let balance = await web3.eth.getBalance(address)
      setCurrentState(+balance / (10 ** 18))
      balance = await presaleContract.methods.getProgress().call()
      setProgress(balance)
      const current = await presaleContract.methods.getUserStatus().call()
      console.log(current)
      setUserCurrent(current)
      return +txResult+1;
      
    } catch (error) {
      console.log('error', error)
    }
  }


  const showState = () => {
    if(presaleState == 1) {
      return 'upcoming'
    } else if(presaleState == 2) {
      return 'in progress'
    } else if(presaleState == 3 || presaleState == 6) {
      return 'ended'
    } else if(presaleState == 4) {
      return 'failed'
    } else if(presaleState == 5) {
      return 'canceled'
    } else {
      return ''
    }
  }

  const showStatus = () => {
    let message = ''
    if(presaleState == 1) {
      message = 'Presale Starts In'
    } else if(presaleState == 2) {
      message = 'Presale Ends In'
    } else if(presaleState == 3 || presaleState == 6) {
      message = 'Presale Ended'
    } else if(presaleState == 4) {
      message = 'Presale Failed'
    } else if(presaleState == 5) {
      message = 'Presale Canceled'
    }
    return (
      <CContainer className='CContainer'>
        <>
          <p className="text-align-center text-white-color">{message}</p>
          {
            presaleState == 1 || presaleState == 2 ? 
            (
              <>
              <CRow>
                  <CCol><div className="text-timer">{presaleDay}</div></CCol>
                  <CCol><div className="text-timer">{presaleHour}</div></CCol>
                  <CCol><div className="text-timer">{presaleMinute}</div></CCol>
                  <CCol><div className="text-timer">{presaleSecond}</div></CCol>
                </CRow>
                <br/>
                <CProgress className="mb-1">
                  <CProgressBar color="warning" value={+progress}/>
                </CProgress>
                <div style={{display: 'flex'}}>
                  <div className='col-md-6 text_align_left'>{currentState} {unit} </div>
                  <div className='col-md-6 text_align_right'>{softcap} {unit} </div>
                </div>
                <CRow>
                  <NumberInputComponent
                    title= {'Amount:'}
                    value={buyAmount}
                    onChange={onChangeAmount}
                    errMsg=''
                    desc=''
                    notSup
                  />
                  <div className='mt-3 d-grid gap-3 d-md-flex'>
                    {
                      (isValidBuy == true) ? (
                        <button type="button" className="btn-accent" onClick={() => handleBuy(buyAmount)}>
                          {
                            isBuying === true ?(
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                variant="light"
                                style={{marginRight: '5px', marginTop: '2px'}}
                              /> ) : (<></>)
                          }
                          Buy
                        </button>
                      ) : (
                        <button type="button" className="btn-black" disabled >Buy</button>
                      )
                    }
                  </div>
                </CRow>
              </>
            ) : (
              userCurrent === 0 ?
              (
                <></>
              ) : (
              <>
                <CButton color="dark" shape = "rounded-2" style={{backgroundColor: '#000'}} onClick={handleClaim}>Claim tokens</CButton>
              </> 
              )
            )
          }
        </>
      </CContainer>
    )
  }

  useEffect( () => {
    if(metaInfo.toLowerCase() == isOwner) {
      console.log('setOwnerzone ========> true', metaInfo, isOwner)
      setShowOwnerZone(true)
    } else {
      console.log('setOwnerzone ========> false', metaInfo, isOwner)
      setShowOwnerZone(false)
    }
  }, [metaInfo, isOwner])

  useEffect(async () => {
    const id = await window.ethereum.request({ method: 'eth_chainId' })
    setCurrentChain(parseInt(id, 16))
  }, [])

  useEffect(() => {
    loadWholeData()
   }, [currentChain])
 
  useEffect(() => {
    const interval = setInterval(() => {
      setPresaleTime((prevCounter) => prevCounter - 1);
    }, 1000);

    return () => clearInterval(interval);
   }, [])

  useEffect(async () => {
    const status = await getPresaleStatus(presaleAddress)
    setPresaleState(status)
    if(status == 6) {
      setFinalized(false)
    }
    if(status == 2) {
      const currentime = parseInt((new Date()).getTime() / 1000)
      const endtime = new Date(endTime).getTime() / 1000
      setPresaleTime(endtime - currentime)
    } else if(status > 2) {
      setPresaleTime(0)
    }
    if(presaleTime >= 0) {
      const day = parseInt(presaleTime / 3600 / 24)
      const hour = parseInt((presaleTime - day * 3600 * 24) / 3600)
      const minute = parseInt((presaleTime - (day * 3600 * 24 + hour * 3600)) / 60 )
      const second = parseInt(presaleTime - (day * 3600 * 24 + hour * 3600 + minute * 60))
      setPresaleDay(day)
      setPresaleHour(hour)
      setPresaleMinute(minute)
      setPresaleSecond(second)
    }
  }, [presaleTime])

  return (
    <CContainer>
      <CRow xs={12} className="display-block">
        {
          wholeLoading == true ?
          (
            <CSpinner color="primary" />
          ) : 
            tokenName === '' ? (
              <p className='white-color-text' style={{textAlign: 'center'}}>Error: please check the correct network or reload this page</p>
            ) :
          (
            <>
        <CCol xs={8} className="width-100">
          <CCard
            color='#242525'
            textColor='white'
            className='border-dark'
          >
            <CCardBody className='bg-white'>
              <CRow className="flex-column-list">
                <CCol xs={1}>
                  <div className="clearfix">
                    <CImage align="start" rounded src={logoUrl} width={50} height={50} />
                  </div>
                </CCol>
                <CCol className='justify-content-md'>
                  <div style={{fontSize: '25px'}}>{tokenName}&nbsp;Fair Launch &nbsp;
                    {
                      showOwnerZone === true ? (
                      <>
                        <FontAwesomeIcon icon={faKey} /> &nbsp;
                        <FontAwesomeIcon icon={faEdit} /> 
                      </> ) : (<></>)
                    }
                  </div>
                  <div style={{marginTop: '7px'}}>
                    <a href={siteUrl} style={{color: '#fff'}}><FontAwesomeIcon icon={faGlobe} /></a>&nbsp;&nbsp;
                    {
                      twitterUrl !== '' ? <><a href={twitterUrl} style={{color: '#fff'}}><FontAwesomeIcon icon={faTwitter} /></a>&nbsp;&nbsp;</> : <></>
                    }
                    {
                      facebookUrl !== '' ? <><a href={facebookUrl} style={{color: '#fff'}}><FontAwesomeIcon icon={faFacebookSquare} /></a>&nbsp;&nbsp;</> : <></>
                    }
                    {
                      telegramUrl === '' ? <></> : <><a href={telegramUrl} style={{color: '#fff'}}><FontAwesomeIcon icon={faTelegram} /></a>&nbsp;&nbsp;</>
                    }
                    {
                      githubUrl === '' ? <></> : <><a href={githubUrl} style={{color: '#fff'}}><FontAwesomeIcon icon={faGithub} /></a>&nbsp;&nbsp;</>
                    }
                    {
                      instagramUrl === '' ? <></> : <><a href={instagramUrl} style={{color: '#fff'}}><FontAwesomeIcon icon={faInstagram} /></a>&nbsp;&nbsp;</>
                    }
                    {
                      discordUrl === '' ? <></> : <><a href={discordUrl} style={{color: '#fff'}}><FontAwesomeIcon icon={faDiscord} /></a>&nbsp;&nbsp;</>
                    }
                    {
                      redditUrl === '' ? <></> : <><a href={redditUrl} style={{color: '#fff'}}><FontAwesomeIcon icon={faRedditAlien} /></a></>
                    }
                  </div>
                </CCol>
                <CCol xs={2} className="d-md-flex justify-content-md-end position-right-absolute">
                  <div>
                    {
                      presaleState === 3 || presaleState === 6 ?
                      <CBadge color='danger'>Ended</CBadge>
                      : presaleState === 1 ?
                      <CBadge color='warning' style={{textColor: 'white'}}>Upcoming</CBadge>
                      : presaleState === 2 ?
                      <CBadge color='success'>Sale Live</CBadge>
                      : presaleState === 5 ?
                      <CBadge color='light'>Canceled</CBadge>
                      : <></>
                    }
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol>{description}</CCol>
              </CRow>
              <br/><br/>
              <RowBetween
                token
                childStart = 'Presale Address'
                childEnd = {<p className='text-yellow-color word-break text-right'>{presaleAddress}</p>}
              />
              <RowBetween
                childStart = 'Token Name'
                childEnd = {<p className="text-right">{tokenName}</p>}
              />
              <RowBetween
                childStart = 'Token Symbol'
                childEnd = {<p className="text-right">{tokenSymbol}</p>}
              />
              <RowBetween
                childStart = 'Token Decimals'
                childEnd = {<p className="text-right">{tokenDecimal}</p>}
              />
              <RowBetween
                token
                childStart = 'TokenAddress'
                childEnd = {<div className='text-yellow-color word-break text-right'>{tokenAddress}</div>}
                desc = {`Do not send ${unit} to the token address!`}
              />
              <RowBetween
                childStart = 'Total Supply'
                childEnd = {<p className="text-right">{tokenSupply} {tokenSymbol}</p>}
              />
              <RowBetween
                childStart = 'Tokens For Presale'
                childEnd = {<p className="text-right">{presaleRate} {tokenSymbol}</p>}
              />
              <RowBetween
                childStart = 'Tokens For Liquidity'
                childEnd = {<p className="text-right">{presaleRate * liquidityPercent / 100} {tokenSymbol}</p>}
              />
              {/* {
                useVesting === true ? (
                <>
                  <RowBetween
                    childStart = 'First Release For Presale'
                    childEnd = {<p className="text-right">{firstReleasePresale}%</p>}
                  />
                  <RowBetween
                    childStart = 'Vesting For Presale'
                    childEnd = {<p className="text-right">{vestingPresalePercent}% each {vestingPresaleTime} minutes</p>}
                  />
                </> ) : (<> </>)
              } */}
              <RowBetween
                childStart = 'Soft Cap'
                childEnd = {<p className="text-right">{softcap} {unit}</p>}
              />
              <RowBetween
                childStart = 'Presale Start Time'
                childEnd = {<p className="text-right">{startTime}</p>}
              />
              <RowBetween
                childStart = 'Presale End Time'
                childEnd = {<p className="text-right">{endTime}</p>}
              />
              <RowBetween
                childStart = 'Listing On'
                childEnd = {<p className='text-yellow-color text-right'>{listing}</p>}
              />
              <RowBetween
                childStart = 'Liquidity Percent'
                childEnd = {<p className="text-right">{liquidityPercent}</p>}
              />
              <RowBetween
                childStart = 'Liquidity Lockup Time'
                childEnd = {<p className="text-right">{lockTime} minutes after pool ends</p>}
              />
              {
                useTeamVesting === true ? (
                <>
                  <RowBetween
                    childStart = 'Total Team Vesting Tokens'
                    childEnd = {<p className="text-right">{totalTeamVesting} {tokenSymbol}</p>}
                  />
                  <RowBetween
                    childStart = 'First Release After Listing(minutes)'
                    childEnd = {<p className="text-right">{firstReleaseListing} minutes</p>}
                  />
                  <RowBetween
                    childStart = 'First Release For Team'
                    childEnd = {<p className="text-right">{firstReleaseTeam} %</p>}
                  />
                  <RowBetween
                    childStart = 'Cycle (minutes)'
                    childEnd = {<p className="text-right">{cycleTime} minutes</p>}
                  />
                  <RowBetween
                    childStart = 'Team Tokens Release Each Cycle'
                    childEnd = {<p className="text-right">{teamReleaseEach} %</p>}
                  />
                  {
                    useVesting === true ? (
                      <> 
                        <RowBetween
                          childStart = 'Tokens release each cycle'
                          childEnd = {<p className="text-right">{vestingPresalePercent}% each {vestingPresaleTime} minutes</p>}
                        />
                      </>
                    ) : (<> </>)
                  }
                  <CRow className='mr-0 pr-0' >
                    <CAccordion >
                      <CAccordionItem itemKey={1} className="text-white-color" style={{border: 'none'}}>
                        <CAccordionHeader>
                          Team Vesting Info (Estimate from end time)
                        </CAccordionHeader>
                        <CAccordionBody style={{backgroundColor: '#242525'}}>
                          <CTable style={{textAlign: 'center', textColor: 'white'}}>
                            <CTableHead>
                              <CTableRow>
                                <CTableHeaderCell scope="col">Unlock #</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Time (UTC)</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Unlocked tokens</CTableHeaderCell>
                              </CTableRow>
                            </CTableHead>
                            <CTableBody>
                            {
                              tabledata.map((item) => {
                                return (
                                  <CTableRow key={item[0]}>
                                    <CTableHeaderCell scope="row">{item[0]}</CTableHeaderCell>
                                    <CTableDataCell>{item[1]}</CTableDataCell>
                                    <CTableDataCell>{item[2]}&nbsp;({item[3]}%)</CTableDataCell>
                                  </CTableRow>
                                )
                              })
                            }
                            </CTableBody>
                          </CTable>
                        </CAccordionBody>
                      </CAccordionItem>
                    </CAccordion>
                  </CRow>
                </> ) : (<></>)
              }
            </CCardBody>
          </CCard>
          <CCol>
            <br/>
            <CCard
              color='#242525'
              textColor='white'
              className='border-dark'
              style={{marginBottom: '20px'}}
            >
              <CCardBody className='bg-white'>
                <CRow className="flex-none">
                  <CCol className='col-md-3'></CCol>
                  <CCol>
                    {/* <CChart
                      type="doughnut"
                      width="320px"
                      height="320px"
                      data={{
                        labels: ['Presale', 'Liquidity', 'Unlock'],
                        datasets: [
                          {
                            backgroundColor: ['#e02677', '#209ae6', '#edc01f'],
                            data: [40, 30, 80],
                          },
                        ],
                      }}
                    /> */}
                    <ReactEcharts option={chartOption} />
                  </CCol>
                  <CCol className='col-md-3'></CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CCol>
        <CCol xs={4} className="width-100">
          <CCard
            color='#242525'
            textColor='white'
            className='border-dark'
          >
            <CCardBody className='bg-white'>
              <CAlert color="dark">
                Make sure the website
              </CAlert>
              {
                showStatus()
              }
            </CCardBody>
          </CCard>
          <br/>
          <CCard
            color='#242525'
            textColor='white'
            className='border-dark'
          >
            <CCardBody className='bg-white'>
              <RowBetween
                childStart = "Status"
                childEnd = {<p className="text-yellow-color text-right">{
                  showState()
                }</p>}  
              />
              <RowBetween
                childStart = "Current Rate"
                childEnd = {<p className='text-yellow-color text-right'>1 {unit} = {presaleRate / currentState} {tokenSymbol}</p>}
              />
            </CCardBody>
          </CCard>
          <br/>
          {
            showOwnerZone === true ? (
          <CCard 
            color='#242525'
            textColor='white'
            className='border-dark'>
            <CCardHeader>Owner Zone</CCardHeader>
            <CCardBody className='bg-white'>
              <CAlert color="dark">
                To make sure there will be no issues during the presale time, please don&apos;t send tokens to wallets before you finalize the presale pool
              </CAlert>
              <p></p>
              <div style ={{width: '100%', height: '2px', backgroundColor: 'black'}}></div>
              <p></p>
              <p>Pool Action</p>
              {/* <CButton color="dark" shape="rounded-2" style={{width : '100%'}}>Dark</CButton> */}
              <div className="d-grid gap-2">
                {
                  useVesting ? (
                  <CButton color="dark" shape = "rounded-2" style={{backgroundColor: '#000'}}>List of contributors</CButton>
                  ): (<></>)
                }
                {
                  presaleState === 3 && isFinalized === true? (
                    <CButton color="dark" shape = "rounded-2" style={{backgroundColor: '#000'}} disabled={isFinalizeLoad} onClick={handleFinalize}>
                      {
                      isFinalizeLoad == true ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        variant="light"
                        style={{marginRight: '5px', marginTop: '2px'}}
                      /> ) : (<></>)
                      }
                      Finalize
                    </CButton>
                  ) : (
                    <CButton color="dark" shape = "rounded-2" style={{backgroundColor: '#000'}} disabled onClick={handleFinalize}>Finalize</CButton>
                  )
                }
                {
                  isCancel ? (
                    <CButton color="dark" shape = "rounded-2" style={{backgroundColor: '#000'}} disabled={isFinalizeLoad} onClick={handleWithdraw}>
                      Withdraw canceled tokens
                    </CButton>
                  ) : (
                    isFinalized === true ? (
                    <CButton color="dark" shape = "rounded-2" style={{backgroundColor: '#000'}} onClick={handleCancel}>Cancel Pool</CButton>
                    ) : (<></>)
                  )
                }
              </div>
              <p className="small-text-sz mt-1 text-blue-color">To Finalize presale, you have to exclude token transfer fee for presale contract.</p>
            </CCardBody>
          </CCard> ) : (<></>)
          }
        </CCol>
        </>
        )}
      </CRow>
    </CContainer>
  )
}

export default TotalView