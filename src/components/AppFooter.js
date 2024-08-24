import React from 'react'
import { CFooter } from '@coreui/react'
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa6";



const AppFooter = () => {
  return (
    <CFooter className='footer'>      
      <div className="waves">
            <div className="wave" id="wave1"></div>
            <div className="wave" id="wave2"></div>
            <div className="wave" id="wave3"></div>
            <div className="wave" id="wave4"></div>
          </div>
          <ul className="social-icon">
            <li className="social-icon__item"><a className="social-icon__link" href="https://facebook.com">
              <FaFacebook />
            </a></li>
            <li className="social-icon__item"><a className="social-icon__link" href="https://twitter.com">
              <FaXTwitter />
            </a></li>
            <li className="social-icon__item"><a className="social-icon__link" href="https://linkedin.com">
              <FaLinkedin />
            </a></li>
            <li className="social-icon__item"><a className="social-icon__link" href="https://telegram.com">
              <FaTelegram />
            </a></li>
          </ul>
          <ul className="menu">
            <li className="menu__item"><a className="menu__link" href="/">Home</a></li>
            <li className="menu__item"><a className="menu__link" href="/docs">Docs</a></li>
            <li className="menu__item"><a className="menu__link" href="/launchpad/home">Services</a></li>
            <li className="menu__item"><a className="menu__link" href="/team">Team</a></li>

          </ul>
          <p className='text-center'>&copy;2024 Startable.inc | All Rights Reserved</p>
    </CFooter>
  )
}

export default React.memo(AppFooter)
