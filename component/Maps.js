import React from "react"
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || "AIzaSyAlULpCzs57poHJ0CQWp9cZs0n2Tak2Qyw"

Geocode.setApiKey(API_KEY);
Geocode.enableDebug();
Geocode.setLanguage("th");
Geocode.setRegion("th");

const Maps = () => {
    let googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`
    const getDistance = (desLatitude, desLongitude) => {
        const bypassCORSUrl = 'https://cors-anywhere.herokuapp.com/'
        const distanceAPI = 'https://maps.googleapis.com/maps/api/distancematrix/json?units='
        axios.get(bypassCORSUrl + distanceAPI + "matrix"
            + "&origins=" + +this.state.state1.markerPosition.lat + "," + +this.state.state1.markerPosition.lng
            + "&destinations=" + desLatitude + "," + desLongitude
            + "&key=" + API_KEY, { timeout: 5000 }
        + "&avoid=highways|tolls"
        ).then(res => this.setState({
            distance:
            {
                rows:
                    [{
                        elements:
                            [{
                                distance:
                                {
                                    text: res.data.rows[0].elements[0].distance.text
                                }
                            }]
                    }]
            }
        })).catch(e => {
            this.setState({
                distance:
                {
                    rows:
                        [{
                            elements:
                                [{
                                    distance:
                                    {
                                        text: "ไม่สามารถใช้งานได้ในขณะนี้ (Cannot Calculate) : " + JSON.stringify(e)
                                    }
                                }]
                        }]
                }
            })
        })
    }

    const getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    };

    const getArea = (addressArray) => {
        let area = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0]) {
                for (let j = 0; j < addressArray[i].types.length; j++) {
                    if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
                        area = addressArray[i].long_name;
                        return area;
                    }
                }
            }
        }
    };

    const getState = (addressArray) => {
        let state = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                    state = addressArray[i].long_name;
                    return state;
                }
            }
        }
    };

    const onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    const onInfoWindowClose = (event) => {

    };

    const onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();

        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray);
                this.setState({
                    address: (address) ? address : '',
                    area: (area) ? area : '',
                    city: (city) ? city : '',
                    state: (state) ? state : '',
                    markerPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    mapPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                })
                this.getDistance(newLat, newLng)
            },
            error => {
                console.error(error);
            }
        );
    };

    const onPlaceSelected = (place) => {
        const address = place.formatted_address,
            addressArray = place.address_components,
            city = this.getCity(addressArray),
            area = this.getArea(addressArray),
            state = this.getState(addressArray),
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();
        // Set these values in the state.
        this.setState({
            address: (address) ? address : '',
            area: (area) ? area : '',
            city: (city) ? city : '',
            state: (state) ? state : '',
            markerPosition: {
                lat: latValue,
                lng: lngValue
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue
            },
        })
        this.getDistance(this.state.markerPosition.lat, this.state.markerPosition.lng)
    };

    const val = 5

    const AsyncMap = withScriptjs(
        withGoogleMap(
            props => (
                <GoogleMap
                    google={window.google}
                    defaultZoom={15}
                    defaultCenter={{ lat: 7.890030, lng: 98.398178 }}
                    center={{ lat: 7.890030, lng: 98.398178 }}
                >
                    <Marker google={window.google}
                        draggable={true}
                        onDragEnd={onMarkerDragEnd}
                        position={{ lat: 7.890030, lng: 98.398178 }}
                    />
                    <Marker />

                    {/* <Autocomplete
                        style={{
                            width: '100%',
                            height: '40px',
                            paddingLeft: '16px',
                            marginTop: '2px',
                            marginBottom: '500px'
                        }}
                        componentRestrictions={{ country: "th" }}
                        onPlaceSelected={onPlaceSelected}
                        types={[]}
                    /> */}
                </GoogleMap>
            )
        )
    )

    const Render = React.useCallback((val) => {
        return (
            <AsyncMap
                val={val}
                googleMapURL={googleMapURL}
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
        )
    }, [])

    return (
        <div>
            <Render val={val} />
        </div>
    )
}

export default Maps
