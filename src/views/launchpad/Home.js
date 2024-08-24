import {
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CRow,
  CAlert,
  CContainer,
} from '@coreui/react';
import { CLoadingButton } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react';
import { cilList, cilWarning, cilShieldAlt } from '@coreui/icons';

import { faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useMemo } from 'react';
import { HashRouter, Route, Switch, Link, useHistory } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import Web3 from 'web3';
import RowBetween from '../components/RowBetween';
import WorkflowItem from "../components/WorkflowItem";
import { useDispatch, useSelector } from 'react-redux'
import { saveBasicSymbol, saveTokenAddr, saveTokenName, saveTokenSymbol, saveTokenDecimals, saveTokenTotalSupply } from '../../state/CreateLaunchPadState'
import { CreateTokenModal } from '../components/CreateTokenModal'
import TokenAbi from '../../contracts/tokenAbi'
import { presaleFactory } from '../components/ContractAddress'

const provider = () => {
  // 1. Try getting newest provider
  const { ethereum } = window
  if (ethereum) return ethereum

  // 2. Try getting legacy provider
  const { web3 } = window
  if (web3 && web3.currentProvider) return web3.currentProvider
}

const Home = () => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [presaleFactoryAddr, setPresaleFactoryAddr] = useState('');
  const [currentChain, setCurrentChain] = useState(0);
  const [tokenAddress, setTokenAddress] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [validMessage, setValidMessage] = useState("");
  const [isExistPool, setIsExistPool] = useState(false);
  const [tokenStatus, setTokenStatus] = useState('no_approved');
  const [isShowInfo, setIsShowInfo] = useState(true);
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDecimal, setTokenDecimal] = useState(0);
  const [tokenTotalSupply, setTotalSupply] = useState(0);
  const [approveState, setApproveState] = useState(false);
  const [tokenContract, setTokenContract] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();
  const initialTokenAddr = useSelector((state) => state.createLaunchPadState.tokenAddress) || '';

  useEffect(() => {
    if (window.ethereum) {
      setIsMetaMaskInstalled(true);
    }
  }, []);

  useEffect(() => {
    if (isMetaMaskInstalled) {
      presaleFactory()
        .then((result) => {
          setPresaleFactoryAddr(result);
        });

      window.ethereum.request({ method: 'eth_chainId' }).then((id) => {
        setCurrentChain(parseInt(id, 16));
      });

      window.ethereum.on('networkChanged', (networkId) => {
        presaleFactory()
          .then((result) => {
            setPresaleFactoryAddr(result);
          });
        setCurrentChain(networkId);
      });
    }
  }, [isMetaMaskInstalled]);

  const unit = useMemo(() => {
    if (currentChain == 97 || currentChain == 56) return "BNB";
    if (currentChain == 25 || currentChain == 338) return "CRO";
    return '';
  }, [currentChain]);

  useEffect(() => {
    setTokenAddress(initialTokenAddr);
  }, [initialTokenAddr]);

  const onChange = (event) => {
    setTokenAddress(event.currentTarget.value);
  }

  const getData = async (address) => {
    const web3 = new Web3(provider());
    const TokenContract = new web3.eth.Contract(TokenAbi, address);
    setTokenContract(TokenContract);
    const [decimals, name, symbol, totalSupply] = await Promise.all([
      TokenContract.methods.decimals().call(),
      TokenContract.methods.name().call(),
      TokenContract.methods.symbol().call(),
      TokenContract.methods.totalSupply().call(),
    ]);
    setTokenDecimal(decimals);
    setTokenName(name);
    setTokenSymbol(symbol);
    setTotalSupply(totalSupply);
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

  const handleApprove = async () => {
    setApproveState(true);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    await tokenContract.methods.approve(presaleFactoryAddr, tokenTotalSupply).send({ from: account });
    setTokenStatus('approved');
    setApproveState(false);
  }

  const handleNext = () => {
    dispatch(saveTokenAddr(tokenAddress));
    dispatch(saveTokenName(tokenName));
    dispatch(saveTokenSymbol(tokenSymbol));
    dispatch(saveTokenDecimals(tokenDecimal));
    dispatch(saveTokenTotalSupply(tokenTotalSupply / (10 ** tokenDecimal)));
    dispatch(saveBasicSymbol(unit));
    history.push("/launchpad/defi_launch_pad_info");
  }

  if (!isMetaMaskInstalled) {
    return (
      <CContainer className='CContainer'>
        <CRow>
          <CCol xs={12}>
            <div className='empty-div'>
              <h3 className='create-heading'>Create Presale</h3>
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
                  title='DeFi Launchpad Info'
                  desc='Enter the launchpad details' />
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
            <h3 className='create-heading'>Create Presale</h3>
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
                title='DeFi Launchpad Info'
                desc='Enter the launchpad details' />
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
                        <CreateTokenModal parent='Normal'/>
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
                            childEnd={<p className="text-right">{tokenName}</p>}
                          />
                          <RowBetween
                            childStart={<p>Symbol</p>}
                            childEnd={<p className="text-right">{tokenSymbol}</p>}
                          />
                          <RowBetween
                            childStart={<p>Decimals</p>}
                            childEnd={<p className="text-right">{tokenDecimal}</p>}
                          />
                          <div className='warning-outline-box-accent dispaly-line-table'>
                            <RowBetween
                              isLong
                              createLanchpad
                              childStart={<FontAwesomeIcon icon={faInfoCircle} className='text-accent-color' style={{ marginTop: '10px' }} />}
                              childMiddle={<p className='text-accent-color' style={{ fontSize: '13px', marginTop: '10px' }}>Make sure the token has <q>Exclude transfer fee</q> function if it has transfer fees.</p>}
                              childEnd={<FontAwesomeIcon icon={faWindowClose} onClick={handleCloseInfo} style={{ color: 'black', marginTop: '10px' }} />}
                            />
                          </div>
                          {
                            !isExistPool ? (
                              tokenStatus === 'no_approved' ? (
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

export default Home;
