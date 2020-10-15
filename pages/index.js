import React, { useEffect, useState, useMemo, useCallback } from 'react'
import Maps from '../component/Maps'
import NavigationBar from '../component/NavigationBar'
import { optionalList, transportTypeList } from '../utils/schema'
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

const Index = () => {

  const [wayPoint, setWaypoint] = useState([
    { id: "0", name: 'จุดเริ่มต้น' },
    { id: "1", name: 'จุดส่งสินค้า' }
  ])

  const [optional, setOptional] = useState(optionalList[0])
  const [additionList, setAdditionList] = useState(null)
  const [transportType, setTransportType] = React.useState(0);
  const [address, setAddress] = useState(null);
  const [sliderRef] = useKeenSlider({
    initial: 0,
    slideChanged: (val) => setOptional(optionalList[val.details().relativeSlide]),
  });

  const handleAddress = address => {
    setAddress(address)
  }

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  }

  const handleCheck = (item, key, checked) => {
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
                          value={address}
                          onChange={handleAddress}
                          onSelect={handleSelect}
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
                                      <span>{suggestion.description}</span>
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
    </DragDropContext >

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
            {DragDrop}
            <div>
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
                    onChange={(e) => handleCheck(item, key, e.target.checked)}
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
          <Maps />
        </div>
      </div>

    </div>
  )
}

export default React.memo(Index)