import React, { useRef, useMemo, useState } from "react"
import { withGoogleMap, GoogleMap, withScriptjs, Marker, DirectionsRenderer } from "react-google-maps";
import Geocode from "react-geocode";
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || "AIzaSyAlULpCzs57poHJ0CQWp9cZs0n2Tak2Qyw"

Geocode.setApiKey(API_KEY);
Geocode.enableDebug();
Geocode.setLanguage("th");
Geocode.setRegion("th");

const Maps = ({ latLng, directions, rerender }) => {
    const [, forceUpdate] = useState(0)

    // let googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=geometry,drawing,places`
    let googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=geometry`

    const onInfoWindowClose = (event) => {

    };

    const AsyncMap = useMemo(() => {
        return withScriptjs(
            withGoogleMap(({ latLng, directions, googleMapURL }) => {
                return (
                    <GoogleMap
                        onBoundsChanged={() => {
                            forceUpdate(Math.random())
                        }}
                        google={googleMapURL}
                        defaultZoom={20}
                        defaultCenter={{ lat: latLng[0].lat, lng: latLng[0].lng }}
                        center={{ lat: latLng[0].lat, lng: latLng[0].lng }}
                    >
                        <DirectionsRenderer
                            directions={directions}
                        />

                        {/* {latLng.map((item, key) => (
                            <Marker key={key} google={window.google}
                                draggable
                                // onDragEnd={onMarkerDragEnd}
                                position={{ lat: item.lat, lng: item.lng }}
                            />
                        ))} */}
                    </GoogleMap>
                )
            })
        )
    }, [latLng, directions])

    return (
        <>
            <AsyncMap
                latLng={latLng}
                googleMapURL={googleMapURL}
                directions={directions}
                rerender={rerender}
                loadingElement={
                    <div style={{ height: `100vh` }} />
                }
                containerElement={
                    <div style={{ height: "100vh" }} />
                }
                mapElement={
                    <div style={{ height: `100vh` }} />
                }
            />
        </>
    )
}

export default Maps
