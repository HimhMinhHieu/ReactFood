import ReactMapGL, { Marker, Popup } from '@goongmaps/goong-map-react';
import React, { useEffect, useState } from 'react';
import Apis, { endpoints } from '../configs/Apis';
import axios from 'axios';
import { Image } from 'react-bootstrap';

const GoongMap = () => {
    
    const [viewport, setViewport] = React.useState({
        width: "100vw",
        height: "100vh",
        
        latitude: 10.786625135977355,
        longitude: 106.690450368644,
        zoom: 12
    });
    const [showPopup, togglePopup] = React.useState(true);
    const [addressMarker, setAddressMarker] = useState([]);
    useEffect(() => {
        const loadStores = async () => {
            let res = await Apis.get(endpoints['stores'])
            let newaddressdata = [];
            res.data.map((address) => {
                axios.get(
                    `https://rsapi.goong.io/geocode?address=${address.diaChi}&api_key=LFFV9wBqLgu6fGOZ7VdKVsxdjQTyUTVZgF39QCgx`
                )
                    .then(function (response) {
                        // handle success
                        console.log(response);
                        newaddressdata.push({
                            ...address,
                            longitude: response.data.results[0].geometry.location.lng,
                            latitude: response.data.results[0].geometry.location.lat
                        })
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
                    .finally(function () {
                        // always executed
                    });
            });
            console.log(">>> arr new", newaddressdata);
            setAddressMarker(newaddressdata);
            
        }

        loadStores();
    }, [])

    return (
        <ReactMapGL
            {...viewport}
            onViewportChange={(viewport) => setViewport(viewport)}
            goongApiAccessToken='5Gsbeu80h5wOh0YPxp2liZheJqeS7lwaFIl1MQZg'
        >
            {addressMarker.map((addressm) => {
                return <>
                {
                    showPopup && (
                        <Popup
                            latitude={addressm.latitude}
                            longitude={addressm.longitude}
                            onClose={() => togglePopup(false)}
                            anchor='top-right'
                        >
                            <div>{addressm.name}</div>
                            <Image src={addressm.image} rounded style={{ width: '20rem', height: '180px' }}/>
                        </Popup>
                    )
                }
                <Marker
                    latitude={addressm.latitude}
                    longitude={addressm.longitude}
                    offsetLeft={-20}
                    offsetTop={-30}
                >

                    <img alt='...' onMouseEnter={() => togglePopup(true)} onMouseLeave={() => togglePopup(false)} style={{ height: '30px', width: '30px' }} src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png" />
                </Marker>
                </>
            })}

        </ReactMapGL>

    );
}

export default GoongMap;