import React from 'react';
import { Link, useHistory } from "react-router-dom";
import Slide from './slide';

// =========================
// HOME PAGE COMPONENT =====
// =========================
const Home = () => {
  return (
    <div className="tw-min-h-screen tw-w-full tw-pt-3">
      {/* page */}
      <div className="tw-flex tw-flex-col md:tw-items-center">
        {/* Protocol */}
        <div className="md:tw-w-[90%] lg:tw-w-[80%]">
          <CommonContent
            title={"The Easiest Platform To Launch Your Token"}
            sub1={
              "Mint, Sell, and Market —— All in one place at Startable!"
            }
          />

          {/* buttons */}
          <div className="tw-flex tw-justify-center tw-gap-4 tw-my-6">
            <Link to="/launchpadlist">
              <button className="homebtn">Checkout Sales</button>
            </Link>
            <Link to="/launchpad/home">
              <button className="homebtn">Start Building</button>
            </ Link>     
          </div>
          
          
          {/* items
          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-4 tw-mt-12">
            <ContentCard
              title={"$0.01M"}
              subtitle={"Total Liquidity Raised"}
            />
            <ContentCard title={"12"} subtitle={"Total Projects"} />
            <ContentCard title={"8"} subtitle={"Total Participants"} />
            <ContentCard title={"$0.01M"} subtitle={"Total Values Locked"} />
          </div> */}
        </div>
        {/* Sales Slide */}
        <div className='followsales'>
          Follow Our Latest Sales
        </div>
        <Slide />

        {/* Suite of Tools */}
        <div className="md:tw-w-[90%] margintop48">
          <CommonContent
            title={"A Suite Of Tools For Your Ideas"}
            sub1={"Make your idea come true in just a few clicks, with no prior code knowledge required"}
          />

          {/* items */}
          <div className="tw-flex tw-flex-col tw-gap-4 tw-mt-12">
            {/* row */}
            <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-4">
              <ContentCard
                img={'/token_pixian_ai.png'}
                title={"Mint"}
                subtitle={
                  "Mint you token code-free in a few seconds."
                }
              />
              <ContentCard
                img={'/sale_pixian_ai.png'}
                title={"Sale"}
                subtitle={"Launch a token sale with a few clicks"}
              />
              <ContentCard
                img={'/lock_pixian_ai.png'}
                title={"Lock"}
                subtitle={
                  "Lock your liquidity or tokens."
                }
              />
              <ContentCard
                img={'/drop_pixian_ai.png'}
                title={"AirDrop"}
                subtitle={
                  "Send you token to thoudsands of people at once."
                }
              />
            </div>
            {/* row */}
            <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-4">
            </div>
          </div>
        </div>


        {/* A Growing Protocol Ecosystem. */}
        <div className="md:tw-w-[90%] tw-mt-24">
          <CommonContent
            title={"A Growing Protocol Ecosystem"}
            sub1={
              "Create numerous types of tokens and sales. Build your community with our managing tools."
            }
          />

          {/* items */}
          <div className="tw-flex tw-flex-col tw-gap-4 tw-mt-12">
            {/* row */}
            <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-4">
              <ContentCard
                img={'/target_pixian_ai.png'}
                title={"Marketing"}
                subtitle={
                  "Market your token easily with Startable"
                }
              />
              <ContentCard
                img={'/data_pixian_ai.png'}
                title={"Management"}
                subtitle={
                  "Manage airdrops, whitelists, and transactions"
                }
              />
              <ContentCard
                img={'/people_pixian_ai.png'}
                title={"Community"}
                subtitle={
                  "Build your community with Startable"
                }
              />
              <ContentCard
                img={'/exchange_pixian_ai.png'}
                title={"Stake"}
                subtitle={
                  "Create staking for your token"
                }
              />
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

// =======================
// EXTENDED COMPONENTS ===

// ContentCard
const ContentCard = ({ title, subtitle, img }) => (
  <div className="tw-p-6 tw-bg-tan tw-text-center tw-rounded-lg !tw-flex">
    {img && (
      <div className="tw-flex tw-justify-center tw-items-center">
        <img src={img} alt="icon" className="contentcardpic tw-my-4" />
      </div>
    )}
    <h4 className="tw-text-3xl tw-font-semibold tw-mb-2 tw-text-black">{title}</h4>
    <p className="">{subtitle}</p>
  </div>
);


const ProtocolCard = ({ title, subtitle}) => (
  <div className="tw-p-6 tw-bg-tan tw-text-center tw-rounded-lg h200 w200">
    <h4 className="tw-text-3xl tw-font-semibold tw-mb-2 tw-text-black">{title}</h4>
    <p className="!tw-pt-9">{subtitle}</p>
  </div>
);





// CommonContent
export const CommonContent = ({ title, sub1, sub2 }) => (
  <div className="tw-text-center">
    <h3 className="tw-text-3xl tw-font-bold tw-mb-3">{title}</h3>
    <div className="tw-w-[80%] tw-mx-auto">
      <p className="tw-text-lg">{sub1}</p>
      <p className="tw-text-lg">{sub2}</p>
    </div>
  </div>
);

// EXPORT =========
export default Home;
