import React, { useEffect, useState, useRef } from 'react'
import Maps from '../component/Maps'
import NavigationBar from '../component/NavigationBar'
import { optionalList, transportTypeList } from '../utils/schema'
import { DragDropContext, Draggable, Droppable, resetServerContext } from 'react-beautiful-dnd';
import PlacesAutocomplete from 'react-places-autocomplete';
import Geocode from "react-geocode";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import gsap from 'gsap'

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || "AIzaSyAlULpCzs57poHJ0CQWp9cZs0n2Tak2Qyw"
Geocode.setApiKey(API_KEY);
Geocode.enableDebug(false);
Geocode.setLanguage("th");
Geocode.setRegion("th");

const Index = () => {

  const vhDriving = useRef()

  const vh = [
    useRef(),
    useRef(),
    useRef(),
    useRef()
  ]

  const [route, setRoute] = useState({})
  const [update, setForceUpdate] = useState(0)
  const [wayPoint, setWaypoint] = useState([
    { id: "0", name: 'จุดเริ่มต้น' },
    { id: "1", name: 'จุดส่งสินค้า' }
  ])

  const [latLng, setLatLng] = useState([
    {
      lat: 13.756331, lng: 100.501762
    },
    {
      lat: null, lng: null
    }
  ])

  const [optional, setOptional] = useState(optionalList[0])
  const [address, setAddress] = useState({});
  const [currentSlider, setCurrenSlider] = useState(0)
  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    loop: true,
    slideChanged: (val) => {
      setOptional(optionalList[val.details().relativeSlide])
      setCurrenSlider(val.details().relativeSlide)
      gsap.fromTo(vhDriving.current, 1,
        { x: -100, y: 100 },
        { x: 0, y: 0 })
    },
  });

  const handleCheck = (item, checked) => {
    let arr = []
    optional.optional.map((i, k) => {
      arr.push(i)
      if (JSON.stringify(optional.optional[k]) === JSON.stringify(item)) {
        arr.splice(k, 1, { ...i, checked: checked })
      }
    })
    setOptional({ ...optional, optional: arr })
  }

  const handleDragend = (result) => {
    if (!result.destination) return;

    const items = Array.from(wayPoint);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWaypoint(items);
  }

  const handleAddress = (addressP, index) => {
    setAddress({ ...address, [index]: addressP })
  }

  const handleSelect = (addressS, index) => {
    let spliceLl = latLng
    setAddress({ ...address, [index]: addressS })

    Geocode.fromAddress(addressS).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        spliceLl.splice(index, 1, { lat, lng })
        setLatLng(spliceLl)
      },
      error => {
        console.error(error);
      }
    );
    setForceUpdate(Math.random())
    if (index > 0) routeFunc()
  }

  useEffect(() => {
    resetServerContext()
  }, [])

  const DragDrop =
    <DragDropContext onDragEnd={handleDragend}>
      <Droppable droppableId="test">
        {(provided) => (
          <ul className="flex flex-col" {...provided.droppableProps} ref={provided.innerRef}>
            {wayPoint.map(({ id, name }, index) => {
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => {
                    return (
                      <li class="flex items-center border-b border-teal-500 py-2" ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                        <PlacesAutocomplete
                          value={address[index]}
                          onChange={(addressP) => handleAddress(addressP, index)}
                          onSelect={(addressS) => handleSelect(addressS, index)}
                        >
                          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div className="w-full">
                              <input
                                {...getInputProps({
                                  placeholder: name,
                                  className: 'location-search-input appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none',
                                })}
                              />
                              <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                  const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                  // inline style for demonstration purpose
                                  const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                      })}
                                    >
                                      {suggestion.description}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>
                      </li>
                    )
                  }}

                </Draggable>
              )
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>

  const routeFunc = () => {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route({
      origin: new google.maps.LatLng(latLng[0].lat, latLng[0].lng),
      destination: new google.maps.LatLng(latLng[1].lat, latLng[1].lng),
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      console.log(result)
      if (status === "OK") {
        setRoute(result)
        setForceUpdate(Math.random())
      }
    })
  }

  const addWayPoint = () => {
    let add = wayPoint
    add.push({ id: +add.lastIndex + 1, name: 'จุดส่งสินค้า' })
    setForceUpdate(Math.random())
  }

  const compareVehicel = (item, index) => {
    if (currentSlider === index) return item.logoFilledUrl
    else return item.logoUrl
  }

  const compareVehicelDriving = (index) => currentSlider === index ? true : false

  return (
    <div className="h-screen v-screen">
      <NavigationBar />
      <div className="grid grid-cols-2">

        <div className="flex flex-col">

          <div className="pt-10 bg-orange-300 flex flex-col">

            <div className="relative flex flex-row justify-center items-center">

              {transportTypeList.map((item, index) => {
                return compareVehicelDriving(index) && <img
                  ref={vhDriving}
                  key={index}
                  className="h-20"
                  src={item.imgUrl}
                  alt="vehicle Driving" />
              })}

              <img
                onClick={() => slider.prev()}
                className="w-5 h-5 bottom-0 left-0"
                src="https://www.flaticon.com/svg/static/icons/svg/120/120892.svg"
                alt="arrow left"
              />
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
              </div>

              <img
                onClick={() => slider.next()}
                className="w-5 h-5"
                src="https://www.flaticon.com/svg/static/icons/svg/120/120893.svg"
                alt="arrow right"
              />

              <img
                className="float-right m-5"
                src="moving_cart.065c8f1b.svg" alt="cart"
              />
            </div>
            <div className="flex flex-column justify-center">
              {transportTypeList.map((item, index) => {
                return (
                  <img
                    key={index}
                    ref={vh[index]}
                    onClick={() => slider.moveToSlide(index)}
                    onMouseEnter={() => gsap.fromTo(vh[index].current, { scaleX: 1, scaleY: 1 }, { scaleX: 1.5, scaleY: 1.5 })}
                    onMouseLeave={() => gsap.fromTo(vh[index].current, { scaleX: 1.5, scaleY: 1.5 }, { scaleX: 1, scaleY: 1 })}
                    className="ml-2 mr-2 w-20 h-20"
                    src={compareVehicel(item, index)}
                    alt="select Vehicle"
                  />
                )
              })}
            </div>
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

          <div className="h-30 my-5">
            {DragDrop}
            <div onClick={addWayPoint}>
              เพิ่มจุด
              </div>
          </div>

          <div className="h-50 my-5 flex flex-col">
            บริการเสริม
            {
              optional.optional.map((item, key) => (
                <span
                  className="flex flex-row justify-items-center content-center items-center relative"
                  key={key}
                >
                  <input
                    className="mt-1 mr-3"
                    type="checkbox"
                    onChange={(e) => handleCheck(item, e.target.checked)}
                  />
                  {item.string}
                  {item.help ?
                    <img
                      className="ml-5 mt-1 w-4 h-4"
                      src="https://www.flaticon.com/svg/static/icons/svg/37/37171.svg"
                      alt="Question Mark" /> : null
                  }
                  <div className="absolute right-0">
                    {item.checked ? item.addition !== "ฟรี" ? <p>{item.addition} บาท</p> : <p>ฟรี</p> : null}
                  </div>
                </span>
              ))}
          </div>

        </div>
        <div className="h-full">
          <Maps latLng={latLng} directions={route} rerender={routeFunc} />
        </div>
      </div>
    </div >
  )
}

export default Index