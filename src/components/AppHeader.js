import { cilMenu } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
    CContainer,
    CHeader,
    CHeaderBrand, CHeaderNav,
    CHeaderToggler,
    CButton,
    CModal, CModalHeader, CModalBody, CModalTitle,
    CCardImage,
    CRow, CCol,
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logo } from 'src/assets/brand/logo';
import { AppHeaderDropdown } from './header/index';
import { set } from '../state/SideBarState';
import { setMetamask } from '../state/MetamaskState';
import {
    RiMenuLine, RiMenuFoldLine
} from 'react-icons/ri';

const AppHeader = ({ sidebarOpen, setSidebarOpen, mobileMenu, setMobileMenu }) => {
    const dispatch = useDispatch();

    const [networkId, setNetworkId] = useState('BSC MAINNET');
    const [networkImg, setNetworkImg] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const networkImgs = ['/bnb.png', '/cronos.png']
    const chainInformation = [
        [56, 'Binance Smart Chain', 'https://bsc-dataseed.binance.org/', 'https://bscscan.com/', {symbol: 'BNB', decimals: 18}],
        [25, 'Cronos', 'https://evm.cronos.org', 'https://cronoscan.com/', {symbol: 'CRO', decimals: 18}],
        [97, 'BSC Testnet', 'https://data-seed-prebsc-1-s1.binance.org:8545/', 'https://testnet.bscscan.com', {symbol: 'tBNB', decimals: 18}],
        [338, 'Cronos-testnet', 'https://evm-t3.cronos.org/', 'https://testnet.cronoscan.com/', {symbol: 'tCRO', decimals: 18}]
    ];
    const [currentAccount, setCurrentAccount] = useState(null);

    async function loadWallet() {
        try {
            const provider = window.ethereum;
            if (!provider) {
                console.log("Metamask is not installed");
                return;
            }

            const accounts = await provider.request({ method: 'eth_requestAccounts' });
            console.log("Found an account! Address: ", accounts[0]);
            dispatch(setMetamask(accounts[0]));
            setNetworkId('BSC MAINNET');
            setNetworkImg(0);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadWallet();

        const handleAccountsChanged = (accounts) => {
            setCurrentAccount(accounts[0]);
            dispatch(setMetamask(accounts[0]));
        };

        const handleNetworkChanged = (chainId) => {
            const networkid = parseInt(chainId, 16).toString();
            if (networkid === '56') {
                setNetworkId('BSC MAINNET');
                setNetworkImg(0);
            } else if (networkid === '25') {
                setNetworkId('Cronos MAINNET');
                setNetworkImg(1);
            } else if (networkid === '97') {
                setNetworkId('BSC TESTNET');
                setNetworkImg(0);
            } else if (networkid === '338') {
                setNetworkId('Cronos TESTNET');
                setNetworkImg(1);
            } else {
                setNetworkId('Not supported');
            }
        };

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleNetworkChanged);
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                window.ethereum.removeListener('chainChanged', handleNetworkChanged);
            }
        };
    }, [dispatch]);

    const connectWalletHandler = async () => {
        try {
            loadWallet();
        } catch (e) {
            console.log(e);
        }
    };

    const logoutHandler = () => {
        setCurrentAccount(null);
        dispatch(setMetamask(null));
    };

    const changeNetwork = async (id) => {
        const provider = window.ethereum;
        if (!provider) {
            console.log("Metamask is not installed");
            return;
        }

        const chain = chainInformation[id][0], chainName = chainInformation[id][1],
            rpcURL = chainInformation[id][2], blockExplorer = chainInformation[id][3], native = chainInformation[id][4];
        var currentChain;
        if (networkId === 'BSC MAINNET') {
            currentChain = 56;
        } else if (networkId === 'Cronos MAINNET') {
            currentChain = 25;
        } else if (networkId === 'BSC TESTNET') {
            currentChain = 97;
        } else if (networkId === 'Cronos TESTNET') {
            currentChain = 338;
        }
        if (currentChain !== chain) {
            try {
                await provider.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: `0x${chain.toString(16)}` }],
                });
                console.log(`You have successfully switched to ${chainName}`);
            } catch (switchError) {
                if (switchError.code === 4902) {
                    try {
                        await provider.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: `0x${chain.toString(16)}`,
                                    chainName: chainName,
                                    rpcUrls: [rpcURL],
                                    blockExplorerUrls: [blockExplorer],
                                    nativeCurrency: native,
                                },
                            ],
                        });
                    } catch (addError) {
                        console.log(addError);
                    }
                }
                return;
            }
        }
        setModalVisible(false);
    };

    return (
        <CHeader position="sticky" style={{ borderBottom: '3px solid #2fc521', backgroundColor: 'white', height: 90, padding:0}}>
            <CContainer fluid style={{height:90}}>
                <div className="hidden tw-items-center tw-gap-3 md:tw-flex md:tw-w-2/5">
                    <CHeaderBrand href={'/'} className='tw-w-full !tw-p-0'>
                        <img src={"/startablelogo.png"} alt="Startable Logo" width={240}/>
                    </CHeaderBrand>
                </div>

                <div className="flex tw-items-center md:tw-hidden mobilelogo">
                    {mobileMenu ? (
                        <RiMenuFoldLine
                            onClick={() => {
                                setMobileMenu(!mobileMenu);
                            }}
                            className="menufold"
                        />
                    ) : (
                        <RiMenuLine
                            onClick={() => {
                                setMobileMenu(!mobileMenu);
                            }}
                            className="menuopen"
                        />
                    )}
                    <CHeaderBrand href={'/'} className='tw-w-full headerbrand'>
                        <img src={"/startablelogo.png"} alt="Startable Logo" />
                    </CHeaderBrand>
                </div>

                <CHeaderNav>
                    <div className='hidden md:tw-flex'>
                        <CButton color="warning" variant="outline" shape="rounded-pill" className='network_btn' onClick={() => setModalVisible(!modalVisible)}>{networkId}</CButton>
                    </div>
                    <div className='flex md:tw-hidden'>
                        <CButton color="warning" variant="outline" shape="rounded-pill" className='network_btn' onClick={() => setModalVisible(!modalVisible)}><img src={networkImgs[networkImg]} width={24} height={24} alt="Network" /></CButton>
                    </div>
                    <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
                        <CModalHeader onClose={() => setModalVisible(false)}>
                            <CModalTitle>Choose network</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <p className='text-black-color'> MAINNET</p>
                            <CRow xs={12} className="display-block">
                                <CCol xs={6} className="d-grid width-100">
                                    <CButton color="dark" onClick={() => changeNetwork(0)}>
                                        <CCardImage orientation="top" src="/bnb.png" style={{ width: '40px', height: '40px' }} alt="BNB" />&nbsp;
                                        BNB Smart Chain
                                    </CButton>
                                </CCol>
                                <CCol xs={6} className="d-grid width-100 mt-3">
                                    <CButton color="dark" onClick={() => changeNetwork(1)}>
                                        <CCardImage orientation="top" src="/cronos.png" style={{ width: '40px', height: '40px' }} alt="Cronos" />&nbsp;
                                        Cronos
                                    </CButton>
                                </CCol>
                            </CRow>
                            <br />
                            <p className='text-black-color'>TESTNET</p>
                            <CRow xs={12} className="display-block">
                                <CCol xs={6} className="d-grid width-100">
                                    <CButton color="dark" onClick={() => changeNetwork(2)}>
                                        <CCardImage orientation="top" src="/bnb.png" style={{ width: '40px', height: '40px' }} alt="BNB Testnet" />&nbsp;
                                        BNB Smart Chain
                                    </CButton>
                                </CCol>
                            </CRow>
                        </CModalBody>
                    </CModal>
                    <AppHeaderDropdown
                        currentAccount={currentAccount}
                        onConnect={connectWalletHandler}
                        onLogout={logoutHandler}
                    />
                </CHeaderNav>
            </CContainer>
        </CHeader>
    );
};

export default AppHeader;
