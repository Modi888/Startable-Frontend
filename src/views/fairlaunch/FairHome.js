import {
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CRow,
  CAlert, 
  CContainer
} from '@coreui/react';
import { faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useMemo } from 'react';
import { HashRouter, Route, Switch, Link, useHistory } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import Web3 from 'web3';
import RowBetween from '../components/RowBetween';
import WorkflowItem from "../components/WorkflowItem";
import { useDispatch, useSelector } from 'react-redux'
import { saveTokenAddr, saveTokenName, saveTokenSymbol, saveTokenDecimals, saveTokenTotalSupply, saveBasicSymbol } from '../../state/CreateFairLaunchState'
import CIcon from '@coreui/icons-react';
import { cilList, cilWarning, cilShieldAlt } from '@coreui/icons';
import { CreateTokenModal } from '../components/CreateTokenModal'
import TokenAbi from '../../contracts/tokenAbi'
import { fairlaunchFactory } from '../components/ContractAddress'

const provider = () => {
  const { ethereum } = window;
  if (ethereum) return ethereum;

  const { web3 } = window;
  if (web3 && web3.currentProvider) return web3.currentProvider;
}

const FairHome = () => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [fairlaunchFactoryAddr, setFairlaunchFactoryAddr] = useState('');
  const [currentChain, setCurrentChain] = useState(0);
  
  useEffect(() => {
    if (window.ethereum) {
      setIsMetaMaskInstalled(true);
    }
  }, []);
  
  useEffect(() => {
    if (isMetaMaskInstalled) {
      fairlaunchFactory().then((result) => {
        setFairlaunchFactoryAddr(result);
      });
      
      window.ethereum.request({ method: 'eth_chainId' }).then((id) => {
        setCurrentChain(parseInt(id, 16));
      });
      
      window.ethereum.on('networkChanged', function (networkid) {
        fairlaunchFactory().then((result) => {
          setFairlaunchFactoryAddr(result);
        });
        setCurrentChain(networkid);
      });
    }
  }, [isMetaMaskInstalled]);

  const unit = useMemo(() => {
    if (currentChain == 97 || currentChain == 56) return "BNB";
    if (currentChain == 25 || currentChain == 338) return "CRO";
  }, [currentChain]);

  const history = useHistory();
  const dispatch = useDispatch();
  const tokenAddr = useSelector((state) => state.createFairLaunchState.tokenAddress);
  const initialTokenAddr = tokenAddr ? tokenAddr : "";

  const [NO_APPROVED, APPROVED] = ['no_approved', 'approved'];
  const [tokenAddress, setTokenAddress] = useState(initialTokenAddr === "" ? "" : initialTokenAddr);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [validMessage, setValidMessage] = useState("");
  const [isExistPool, setIsExistPool] = useState(false);
  const [tokenStatus, setTokenStatus] = useState(NO_APPROVED);
  const [isShowInfo, setIsShowInfo] = useState(true);
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDecimal, setTokenDecimal] = useState(0);
  const [tokenTotalSupply, setTotalSupply] = useState(0);
  const [approveState, setApproveState] = useState(false);
  const [tokenContract, setTokenContract] = useState('');

  useEffect(() => {
    setTokenAddress(tokenAddr);
  }, [tokenAddr]);

  const onChange = (event) => {
    setTokenAddress(event.currentTarget.value);
  }

  async function getData(address) {
    const web3 = new Web3(provider());
    const TokenContract = new web3.eth.Contract(TokenAbi, address);
    setTokenContract(TokenContract);
    await TokenContract.methods.decimals().call().then(setTokenDecimal);
    await TokenContract.methods.name().call().then(setTokenName);
    await TokenContract.methods.symbol().call().then(setTokenSymbol);
    await TokenContract.methods.totalSupply().call().then(setTotalSupply);
  }

  useEffect(() => {
    const checkTokenValidation = async (address) => {
      const web3 = new Web3();
      if (address.length === 0) {
        setIsTokenValid(false);
        setValidMessage("Token address can not be blank");
      } else if (address.substring(0, 2) !== "0x") {
        setIsTokenValid(false);
        setValidMessage("Invalid Token Address");
      } else if (address.length !== 42) {
        setIsTokenValid(false);
        setValidMessage("Invalid Token Address");
      } else if (!web3.utils.isAddress(address)) {
        setIsTokenValid(false);
        setValidMessage("Invalid Token Address");
      } else {
        await getData(address);
        setIsTokenValid(true);
        setValidMessage("");
      }
    }

    if (isMetaMaskInstalled) {
      checkTokenValidation(tokenAddress);
    }
  }, [tokenAddress, isMetaMaskInstalled]);

  const handleCloseInfo = () => {
    setIsShowInfo(false);
  }

  async function handleApprove() {
    setApproveState(true);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    await tokenContract.methods.approve(fairlaunchFactoryAddr, tokenTotalSupply).send({ from: account });
    setTokenStatus(APPROVED);
    setApproveState(false);
  }

  const handleNext = () => {
    dispatch(saveTokenAddr(tokenAddress));
    dispatch(saveTokenName(tokenName));
    dispatch(saveTokenSymbol(tokenSymbol));
    dispatch(saveTokenDecimals(tokenDecimal));
    dispatch(saveTokenTotalSupply(tokenTotalSupply / (10 ** tokenDecimal)));
    dispatch(saveBasicSymbol(unit));
    history.push("/fairlaunch/defi_fair_launch_info");
  }

  if (!isMetaMaskInstalled) {
    return (
      <CContainer className='CContainer'>
        <CRow>
          <CCol xs={12}>
            <div className='empty-div'>
              <h3 className='create-heading'>Create Fairlaunch</h3>
            </div>
            <CRow className="hide-less-than-1026">
              <CCol className="col-sm-3">
                <WorkflowItem
                  stemNumber={1}
                  active
                  title='Verify Token'
                  desc='Enter the token address and verify' />
              </CCol>
              <CCol className="col-sm-3">
                <WorkflowItem
                  stemNumber={2}
                  title='DeFi Fairlaunch Info'
                  desc='Enter the fairlaunch details' />
              </CCol>
              <CCol className="col-sm-3">
                <WorkflowItem
                  stemNumber={3}
                  title='Add Additional Info'
                  desc='Let people know who you are' />
              </CCol>
              <CCol className="col-sm-3">
                <WorkflowItem
                  stemNumber={4}
                  title='Finish'
                  desc='Review your information' />
              </CCol>
            </CRow>
            <div className='empty-div-lg'></div>
            <CAlert color="danger" className="text-center">
              Please connect wallet first
            </CAlert>
          </CCol>
        </CRow>
      </CContainer>
    );
  }

  return (
    <CContainer className='CContainer'>
      <CRow>
        <CCol xs={12}>
          <div className='empty-div'>
              <h3 className='create-heading'>Create Fairlaunch</h3>
          </div>
          <CRow className="hide-less-than-1026">
            <CCol className="col-sm-3">
              <WorkflowItem
                stemNumber={1}
                active
                title='Verify Token'
                desc='Enter the token address and verify' />
            </CCol>
            <CCol className="col-sm-3">
              <WorkflowItem
                stemNumber={2}
                title='DeFi Fairlaunch Info'
                desc='Enter the fairlaunch details' />
            </CCol>
            <CCol className="col-sm-3">
              <WorkflowItem
                stemNumber={3}
                title='Add Additional Info'
                desc='Let people know who you are' />
            </CCol>
            <CCol className="col-sm-3">
              <WorkflowItem
                stemNumber={4}
                title='Finish'
                desc='Review your information' />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol>
              <CCard className="mb-4">
                <CCardBody>
                  <CRow>
                    <p className="danger small-text-sz mb-0">(*) is required field.</p>
                    <CCol>
                      <p className='font-bold'>Token address
                        <sup className="danger">*</sup>
                      </p>
                    </CCol>
                    <CCol>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CreateTokenModal parent='Fair'/>
                      </div>
                    </CCol>
                    {
                      isTokenValid ? (
                        <div>
                          <CFormInput type="text" id="tokenAddress" placeholder="Ex: Ox..." value={tokenAddress} onChange={onChange} />
                        </div>
                      ) : (
                        <div>
                          <CFormInput type="text" id="tokenAddress" className='input-highlighted' placeholder="Ex: Ox..." value={tokenAddress} onChange={onChange} />
                        </div>
                      )
                    }
                    <p className="small-text-sz mt-1 text-blue-color">Create pool fee: 0.01 {unit}</p>
                    {
                      isTokenValid ? (
                        <div>
                          <RowBetween
                            childStart={<p>Name</p>}
                            childEnd={<p className='text-blue-color text-right'>{tokenName}</p>}
                          />
                          <RowBetween
                            childStart={<p>Symbol</p>}
                            childEnd={<p className="text-right">{tokenSymbol}</p>}
                          />
                          <RowBetween
                            childStart={<p>Decimals</p>}
                            childEnd={<p className="text-right">{tokenDecimal}</p>}
                          />
                          <CAlert color="warning" className="d-flex align-items-center" dismissible>
                            <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                            <div>
                              Make sure the token has <q>Exclude transfer fee</q> function if it has transfer fees.
                            </div>
                          </CAlert>
                          {
                            !isExistPool ? (
                              tokenStatus === NO_APPROVED ? (
                                <div className="d-md-flex justify-content-md-center mt-4 position-right">
                                  <div className='loader'></div>
                                  <button type="button" className="btn-accent" disabled={approveState} onClick={() => handleApprove()} >
                                    {
                                      approveState == true ? (
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
                                    Approve
                                  </button>             
                                </div>
                              ) : (
                                <div className="d-md-flex justify-content-md-center mt-4 position-right">
                                  <button type="button" className="btn-accent" onClick={handleNext}>Next</button>
                                </div>
                              )
                            ) : (
                              <></>
                            )
                          }
                        </div>
                      ) : (
                        <>
                          <p className="danger small-text-sz mb-0">{validMessage}</p>
                          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                            <button type="button" className="btn-disabled">Next</button>
                          </div>
                        </>
                      )
                    }
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default FairHome;
