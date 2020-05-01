import React, { useRef, useMemo, useEffect } from "react";
import { gmapStyles } from "./gmapStyles";
import { food_image_small } from "../FoodIcon";
import { useGoogleApi } from "../_hook/useGoogleApi";

export const GMap = ({ events, center, googleApiKey }) => {
    // ref to the map container
    const ref = useRef(null as any);

    // keep track of existing markers
    const marked = useRef({});

    // load google gmap api
    const googleApi = useGoogleApi(googleApiKey);

    // instanciate map
    const map = useMemo(() => {
        if (!ref.current) return;
        if (!googleApi) return;

        return new googleApi.maps.Map(ref.current, {
            streetViewControl: false,
            fullscreenControl: false,
            disableDefaultUI: false,
            mapTypeControl: false,
            rotateControl: false,
            scaleControl: false,
            zoomControl: false,
            panControl: false,
            draggable: false,
            zoom: 8,
            center: new googleApi.maps.LatLng(center.lat, center.lon),
            mapTypeId: "roadmap",
            background: "#ddd",
            styles: gmapStyles
        });
    }, [ref.current, googleApi]);

    // re-center
    useEffect(() => {
        if (!map) return;
        if (!center) return;

        map.setCenter(new googleApi.maps.LatLng(center.lat, center.lon));
    }, [center, map]);

    // add new markers
    useEffect(() => {
        if (!map) return;

        const newEvents = events.filter(({ key }) => !marked.current[key]);

        for (const event of newEvents) {
            addMarker(googleApi, map, event);

            marked.current = { ...marked.current, [event.key]: true };
        }
    }, [map, events]);

    return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
};

const wait = delay => new Promise(resolve => setTimeout(resolve, delay));

const addMarker = async (
    googleApi,
    map,
    { key, food, location: { lat, lon } }
) => {
    const url = food_image_small[food] + `#key=${key}`;

    const marker = new googleApi.maps.Marker({
        position: { lat: lat, lng: lon },
        icon: url,
        map
    });

    marker.setOpacity(0);

    await wait(200);

    marker.setOpacity(1);

    const elements = document.querySelectorAll(`[src="${url}"]`);

    elements.forEach(el => {
        if (!el.parentElement) return;

        el.parentElement.animate(
            [
                {
                    offset: 0,
                    opacity: 0.6,
                    transform: "translate3d(0,0,0) scale(0.2,0.2)"
                },
                {
                    offset: 0.032,
                    opacity: 1,
                    transform: "translate3d(0,-50px,0) scale(1.3,1.3)"
                },
                {
                    offset: 0.06,
                    opacity: 1,
                    transform: "translate3d(0,-10px,0) scale(0.7,0.7)"
                },
                {
                    offset: 0.08,
                    opacity: 1,
                    transform: "translate3d(0,-160px,0) scale(1,1)"
                },
                {
                    offset: 0.1,
                    opacity: 0,
                    transform: "translate3d(0,-200px,0) scale(0.6,0.6)"
                },
                {
                    offset: 1,
                    opacity: 0,
                    transform: "scale(0.6,0.6)"
                }
            ],
            { duration: 7400 }
        );
    });

    await wait(2000);

    marker.setMap(null);
};
