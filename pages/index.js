import React, { useEffect, useState, useMemo, useCallback } from 'react'
import Maps from '../component/Maps'
import NavigationBar from '../component/NavigationBar'
import { optionalList, transportTypeList } from '../utils/schema'
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Index = () => {

  const [wayPoint, setWaypoint] = useState({
    origin: "",
    destination: [""]
  })

  const [optional, setOptional] = useState(optionalList[0])
  const [transportType, setTransportType] = React.useState(0);
  const [sliderRef] = useKeenSlider({
    initial: 0,
    afterChange: (val) => setOptional(optionalList[val.details().relativeSlide]),
    slideChanged(s) {
      setTransportType(s.details().relativeSlide);
    }
  });

  const handleTypeChange = e => {

  }

  return (
    <div className="h-screen v-screen">
      <test />
      <NavigationBar />
      <div className="grid grid-cols-2">
        <div className="h-screen flex flex-col">

          <div className="bg-orange-300 h-50 flex flex-row">
            <div className="z-1">
              <img
                className="w-5 h-5 mt-20"
                src="https://www.flaticon.com/svg/static/icons/svg/120/120892.svg"
                alt="arrow right"
              />
            </div>
            <div ref={sliderRef} className="keen-slider w-full h-full">
              {transportTypeList.map((item, key) => (
                <div
                  key={key}
                  className={`keen-slider__slide number-slide${key + 1} flex flex-col justify-center items-center`}>
                  <img
                    className="w-5 h-5"
                    src="https://www.flaticon.com/svg/static/icons/svg/3468/3468846.svg"
                    alt="box"
                  />
                  <p>{item.string}</p>
                  <p>{item.description}</p>
                  <p>{item.limitWeight} Kg</p>
                </div>
              ))}
              <div className="absolute z-1 bottom-0 right-0">
                <img
                  className="w-5 h-5"
                  src="https://www.flaticon.com/svg/static/icons/svg/120/120893.svg"
                  alt="arrow right"
                />
              </div>
            </div>

            <img
              className="float-right"
              src="moving_cart.065c8f1b.svg" alt="cart"
            />
          </div>

          <div className="h-10 my-5">
            เส้นทาง (สูงสุด 20)
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              ดาวน์โหลดเทมเพลต
            </button>
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              นำเข้าที่อยู่
            </button>
          </div>
          <div>
          </div>

          <div className="h-30 my-5">
            <div className="flex flex-col">
              <div class="flex items-center border-b border-teal-500 py-2">
                <input
                  class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="จุดรับสินค้า"
                  aria-label="Full name"
                />
              </div>
              <div class="flex items-center border-b border-teal-500 py-2">
                <input
                  class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="จุดส่งสินค้า"
                  aria-label="Full name"
                />

              </div>
              <div>
                เพิ่มจุด
              </div>
            </div>
          </div>

          <div className="h-50 my-5 flex flex-col">
            บริการเสริม
            {
              optional.optional.map((item, key) => (
                <span
                  className="flex flex-row justify-items-center content-center items-center"
                  key={key}>{item.string}
                  {item.help ?
                    <img
                      className="ml-5 mt-1 w-4 h-4"
                      src="https://www.flaticon.com/svg/static/icons/svg/37/37171.svg"
                      alt="Question Mark" /> : null
                  }
                </span>
              ))
            }
          </div>

        </div>
        <div className="h-full">
          <Maps />
        </div>
      </div>
    </div>
  )
}

export default Index