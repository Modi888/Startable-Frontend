import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  RiHome3Line,
  RiRocketLine,
  RiCheckboxBlankCircleFill,
  RiTelegramLine,
  RiTwitterLine,
  RiFacebookBoxLine,
  RiGiftLine,
} from 'react-icons/ri';

import { MdOutlineGeneratingTokens } from "react-icons/md";

const AppSideBar = ({ sidebarOpen, setSidebarOpen, mobileMenu, setMobileMenu }) => {
  const navLinks = [
    {
      single: true,
      pathname: '/',
      text: 'Home',
      icon: () => <RiHome3Line style={styles.icon} />,
    },
    {
      single: false,
      text: 'Launchpad',
      icon: () => <RiRocketLine style={styles.icon} />,
      dropdowns: [
        { pathname: '/launchpad/home', text: 'Create Launchpad' },
        { pathname: '/fairlaunch/home', text: 'Create Fair Launch' },
        { pathname: '/launchpadlist', text: 'Launchpad List' },
      ],
    },
    {
      single: false,
      text: 'Token',
      icon: () => <MdOutlineGeneratingTokens style={styles.icon} />,
      dropdowns: [
        { pathname: '/createtoken/home', text: 'Create Token' },
      ],
    },
    {
      single: false,
      text: 'Airdrop',
      icon: () => <RiGiftLine style={styles.icon} />,
      dropdowns: [
        { pathname: '/airdrop/create', text: 'Create Airdrop' },
        { pathname: '/airdrop/list', text: 'Airdrop List' },
      ],
    },
    {
      single: true,
      pathname: 'https://telegram.org',
      text: 'Telegram',
      icon: () => <RiTelegramLine style={styles.icon} />,
      external: true,
    },
    {
      single: true,
      pathname: 'https://twitter.com',
      text: 'X',
      icon: () => <RiTwitterLine style={styles.icon} />,
      external: true,
    },
    {
      single: true,
      pathname: 'https://facebook.com',
      text: 'Facebook',
      icon: () => <RiFacebookBoxLine style={styles.icon} />,
      external: true,
    },
  ];

  return (
    <>
      <div className='hidden md:tw-flex' > 
        <aside style={{ ...styles.sidebar, ...(sidebarOpen ? styles.sidebarOpen : {}) }} onMouseEnter={() => setSidebarOpen(true)} onMouseLeave={() => setSidebarOpen(false)}>
          <nav>
            {navLinks.map((link, i) => (
              <NavItem
                key={i}
                item={link}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                setMobileMenu={setMobileMenu}
              />
            ))}
          </nav>
        </aside>
      </div>

      <MobileNav
        navLinks={navLinks}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        sidebarOpen={!sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </>
  );
};

const NavItem = ({ item, sidebarOpen, setSidebarOpen, setMobileMenu }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const location = useLocation();
  const history = useHistory();

  const handleClick = (pathname, external) => {
    setMobileMenu(false);
    setDropdownOpen(false);
    if (external) {
      window.location.href = pathname;
    } else {
      history.push(pathname);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDropdownMouseEnter = (index) => {
    setHoveredDropdown(index);
  };

  const handleDropdownMouseLeave = () => {
    setHoveredDropdown(null);
  };

  const handleOnClick = () => {
    if (item.single) {
      handleClick(item.pathname, item.external);
    } else {
      setDropdownOpen(!dropdownOpen);
    }
    setSidebarOpen(true);
  };

  return (
    <>
      <div
        style={{
          ...styles.navItem,
          ...(location.pathname === item.pathname ? styles.active : {}),
          ...(isHovered && !dropdownOpen ? styles.navItemHover : {}),
        }}
        onClick={handleOnClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span style={styles.icon}>{item.icon()}</span>
        <span style={{ ...styles.navText, ...(sidebarOpen ? {} : styles.hidden) }}>{item.text}</span>
      </div>
      {dropdownOpen && item.dropdowns && (
        <div style={{ ...styles.dropdown, ...(sidebarOpen ? {} : styles.hidden) }}>
          {item.dropdowns.map((drop, i) => (
            <div
              key={i}
              onClick={() => handleClick(drop.pathname)}
              style={{
                ...styles.dropdownItem,
                ...(location.pathname === drop.pathname ? styles.active : {}),
                ...(hoveredDropdown === i ? styles.dropdownItemHover : {}),
              }}
              onMouseEnter={() => handleDropdownMouseEnter(i)}
              onMouseLeave={handleDropdownMouseLeave}
            >
              <RiCheckboxBlankCircleFill style={styles.dropdownIcon} />
              {drop.text}
            </div>
          ))}
        </div>
      )}
    </>
  );
};


const MobileNavItem = ({ item, sidebarOpen, setSidebarOpen, setMobileMenu }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const location = useLocation();
  const history = useHistory();

  const handleClick = (pathname, external) => {
    setMobileMenu(false);
    setDropdownOpen(false);
    if (external) {
      window.location.href = pathname;
    } else {
      history.push(pathname);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDropdownMouseEnter = (index) => {
    setHoveredDropdown(index);
  };

  const handleDropdownMouseLeave = () => {
    setHoveredDropdown(null);
  };

  const handleOnClick = () => {
    if (item.single) {
      handleClick(item.pathname, item.external);
    } else {
      setDropdownOpen(!dropdownOpen);
    }
  };

  return (
    <>
      <div
        style={{
          ...styles.navItem,
          ...(location.pathname === item.pathname ? styles.active : {}),
          ...(isHovered && !dropdownOpen ? styles.navItemHover : {}),
        }}
        onClick={handleOnClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span style={styles.icon}>{item.icon()}</span>
        <span style={{ ...styles.navText, ...(sidebarOpen ? {} : styles.hidden) }}>{item.text}</span>
      </div>
      {dropdownOpen && item.dropdowns && (
        <div style={{ ...styles.dropdown, ...(sidebarOpen ? {} : styles.hidden) }}>
          {item.dropdowns.map((drop, i) => (
            <div
              key={i}
              onClick={() => handleClick(drop.pathname)}
              style={{
                ...styles.dropdownItem,
                ...(location.pathname === drop.pathname ? styles.active : {}),
                ...(hoveredDropdown === i ? styles.dropdownItemHover : {}),
              }}
              onMouseEnter={() => handleDropdownMouseEnter(i)}
              onMouseLeave={handleDropdownMouseLeave}
            >
              <RiCheckboxBlankCircleFill style={styles.dropdownIcon} />
              {drop.text}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const MobileNav = ({ navLinks, mobileMenu, setMobileMenu, sidebarOpen, setSidebarOpen }) => {
  return (
    <div className='flex md:tw-hidden'> 
      <aside style={{ ...styles.mobileNav, ...(mobileMenu ? styles.mobileNavOpen : {}) }}>
        <nav>
          {navLinks.map((link, i) => (
            <MobileNavItem
              key={i}
              item={link}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              setMobileMenu={setMobileMenu}
            />
          ))}
        </nav>
      </aside>
    </div>
  );
};

const styles = {
  sidebar: {
    height: '100vh',
    width: '4.5rem',
    borderRight: '2px solid #50C878',
    overflowY: 'auto',
    transition: 'width 0.3s',
    display: 'inline-block',
    position: 'sticky',
    top: '0',
    backgroundColor: '#ebf2f4',
  },
  sidebarOpen: {
    width: '13rem',
    display: 'inline-block',
  },
  navItem: {
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: '#50c878',
    transition: 'background-color 0.3s, color 0.3s',
  },
  navItemHover: {
    backgroundColor: '#d5fadc',
    color: '#50C878',
  },
  active: {
    backgroundColor: '#50C878',
    color: '#f1f5f9',
  },
  navText: {},
  hidden: {
    display: 'none',
  },
  mobileNav: {
    position: 'fixed',
    top: 90,
    left: '-70%',
    width: '70%',
    height: '100vh',
    backgroundColor: 'rgba(213, 232, 255, 0.6)',
    backdropFilter: 'blur(10px)',
    zIndex: 20,
    transition: 'left 0.3s',
    display: 'inline-block',
  },
  mobileNavOpen: {
    left: 0,
  },
  navItemContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  dropdown: {
    backgroundColor: '#f8fafc',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '0.25rem',
    padding: '0.5rem 0',
    transition: 'all 0.3s',
    marginLeft: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  dropdownItem: {
    padding: '0.5rem 1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#6b7280',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
  },
  dropdownItemHover: {
    backgroundColor: '#d6fadc',
    color: 'black',
  },
  icon: {
    fontSize: '1.75rem',
    color: 'inherit',
  },
  dropdownIcon: {
    fontSize: '0.5rem',
    marginRight: '0.5rem',
  },
};

export default AppSideBar;
