import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import 'swiper/swiper-bundle.min.css'
// import 'swiper/swiper.min.css'
import 'swiper/swiper.min.css';
import 'swiper/modules/effect-coverflow/effect-coverflow.min.css'
import 'swiper/modules/effect-cube/effect-cube.min.css'
import 'swiper/swiper-bundle.min.css'
import 'swiper/modules/autoplay/autoplay.min.css'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { CProgress } from "@coreui/react";
import { RiBnbLine } from "react-icons/ri";
import { FaEthereum } from "react-icons/fa";


const Slide = () => {
  SwiperCore.use([Navigation, Autoplay])
  return (
    <div className="container">
      <Swiper
        grabCursor={true}
        className="swiper"
        breakpoints={{
          550: {
            slidesPerView: 2
          },
          768: {
            slidesPerView: 3
          },
          1024: {
            slidesPerView: 4
          },
        }}
        navigation={true}
        autoplay={true}
        modules={[Autoplay, Navigation]}
      >
        <SwiperSlide className="swiper-slide">
          <div className='slide-card'>
            <div className="cardlive">
              Live
            </div>
            <div className='card-header'>
              <img src="/7zinz.jpg" width={50} className="card-img" />
              <h4 className="card-title">7sinz</h4>
            </div>
            <div className="cardprogress">
              <div className="card-progress-header">
                <FaEthereum className="progress-eth-icon"/>
                <h5 className="progress-title">8.4 Eth Raised</h5>
              </div>
            </div>
            <CProgress value={25} height={10} color="success" variant="striped" animated/>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
         <div className='slide-card'>
          <div className="cardlive">
              Live
            </div>
            <div className='card-header'>
              <img src="/512napaicon.png" width={50} className="card-img" />
              <h4 className="card-title">Napa</h4>
            </div>
            <div className="cardprogress">
              <div className="card-progress-header">
                <RiBnbLine className="progress-bnb-icon"/>
                <h5 className="progress-title">3.4 BNB Raised</h5>
              </div>
            </div>
            <CProgress value={75} height={10} color="success" variant="striped" animated/>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <div className='slide-card'>
            <div className="cardupcoming">
              Upcoming
            </div>
            <div className='card-header'>
              <img src="/avagold.jpg" width={50} className="card-img" />
              <h4 className="card-title">AvaGold</h4>
            </div>
            <div className="cardprogress">
              <div className="card-progress-header">
                <FaEthereum className="progress-eth-icon"/>
                <h5 className="progress-title">0 Eth Raised</h5>
              </div>
            </div>
            <CProgress value={0} height={10} color="success" variant="striped" animated/>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <div className='slide-card'>
            <div className="cardlive">
              Live
            </div>
            <div className='card-header'>
              <img src="/hoddiecock.png" width={50} className="card-img" />
              <h4 className="card-title">HoddieCock</h4>
            </div>
            <div className="cardprogress">
              <div className="card-progress-header">
                <RiBnbLine className="progress-bnb-icon"/>
                <h5 className="progress-title">1.4 BNB Raised</h5>
              </div>
            </div>
            <CProgress value={60} height={10} color="success" variant="striped" animated/>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <div className='slide-card'>
            <div className="cardlive">
              Live
            </div>
            <div className='card-header'>
              <img src="/koko.jpg" width={50} className="card-img" />
              <h4 className="card-title">Koko</h4>
            </div>
            <div className="cardprogress">
              <div className="card-progress-header">
                <FaEthereum className="progress-eth-icon"/>
                <h5 className="progress-title">0.6 Eth Raised</h5>
              </div>
            </div>
            <CProgress value={30} height={10} color="success" variant="striped" animated/>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <div className='slide-card'>
            <div className="cardlive">
              Live
            </div>
            <div className='card-header'>
              <img src="/markfin.jpg" width={50} className="card-img" />
              <h4 className="card-title">Markfin</h4>
            </div>
            <div className="cardprogress">
              <div className="card-progress-header">
                <RiBnbLine className="progress-bnb-icon"/>
                <h5 className="progress-title">3.3 BNB Raised</h5>
              </div>
            </div>
            <CProgress value={50} height={10} color="success" variant="striped" animated/>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <div className='slide-card'>
            <div className="cardlive">
              Live
            </div>
            <div className='card-header'>
              <img src="/fee.png" width={50} className="card-img" />
              <h4 className="card-title">Fee</h4>
            </div>
            <div className="cardprogress">
              <div className="card-progress-header">
                <RiBnbLine className="progress-bnb-icon"/>
                <h5 className="progress-title">12.8 BNB Raised</h5>
              </div>
            </div>
            <CProgress value={90} height={10} color="success" variant="striped" animated/>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
         <div className='slide-card'>
          <div className="cardlive">
              Live
            </div>
            <div className='card-header'>
              <img src="/trump.jpg" width={50} className="card-img" />
              <h4 className="card-title">MagaTrump</h4>
            </div>
            <div className="cardprogress">
              <div className="card-progress-header">
                <RiBnbLine className="progress-bnb-icon"/>
                <h5 className="progress-title">4.1 BNB Raised</h5>
              </div>
            </div>
            <CProgress value={20} height={10} color="success" variant="striped" animated/>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

  )
}

export default Slide
