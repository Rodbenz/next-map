// react
import React, { useState, useEffect, useRef } from 'react';

// openlayers
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import { transform } from 'ol/proj'
import { toStringXY } from 'ol/coordinate';
import { OSM } from "ol/source";
import { Paper } from '@mui/material';

function MapWrapper(props) {

  // set intial state
  const [map, setMap] = useState()
  const [featuresLayer, setFeaturesLayer] = useState()
  const [selectedCoord, setSelectedCoord] = useState()
  const [center, setCenter] = React.useState(props.center == undefined ? [100.523186, 13.736717] : props.center)

  // pull refs
  const mapElement = useRef()

  // create state ref that can be accessed in OpenLayers onclick callback function
  //  https://stackoverflow.com/a/60643670
  const mapRef = useRef()
  mapRef.current = map


  useEffect(() => {
  // initialize map on first render - logic formerly put into componentDidMount
  // const initializeMapOn = async () => {
    // create and add vector source layer
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource()
    })
    const raster = new TileLayer({
      source: new OSM(),
    });

    // create map
    const initialMap = new Map({
      target: mapElement.current,
      layers: [

        // USGS Topo
        // new TileLayer({
        //   source: new XYZ({
        //     url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
        //   })
        // }),

        // Google Maps Terrain
        // new TileLayer({
        //   source: new XYZ({
        //     url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
        //   })
        // }),
        raster
        // initalFeaturesLayer

      ],
      view: new View({
        projection: 'EPSG:3857',
        center: transform(center, 'EPSG:4326', 'EPSG:3857'),
        zoom: 11
      }),
      controls: []
    })

    // // set map onclick handler
    // initialMap.on('click', handleMapClick)

    // // save map and vector layer references to state
  //   if (map == undefined) {
  //     await setMap(initialMap)
  //     // try {
  //     //     initialMap.addLayer(vector);
  //     // } catch {
  //     //     null
  //     // }
  //   }
  //   // setMap(initialMap)
  //   // setFeaturesLayer(initalFeaturesLayer)
  //   console.log(mapElement, 'mapElementmapElement');
  // }
  // useEffect(() => {
  //   initializeMapOn()
  // }, [])
  if(mapRef.current === true) {
    console.log('stop');
  }
  return () => {
    console.log(mapElement,'mapElementmapElement');
    mapRef.current = true
  }
}, [])

  // update map if features prop changes - logic formerly put into componentDidUpdate
  useEffect(() => {

    if (props.features.length) { // may be null on first render

      // set features to map
      featuresLayer.setSource(
        new VectorSource({
          features: props.features // make sure features is an array
        })
      )

      // fit map to feature extent (with 100px of padding)
      map.getView().fit(featuresLayer.getSource().getExtent(), {
        padding: [100, 100, 100, 100]
      })

    }

  }, [props.features])

  // map click handler
  const handleMapClick = (event) => {

    // get clicked coordinate using mapRef to access current React state inside OpenLayers callback
    //  https://stackoverflow.com/a/60643670
    const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);

    // transform coord to EPSG 4326 standard Lat Long
    const transormedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')

    // set React state
    setSelectedCoord(transormedCoord)

  }

  // render component
  return (
    // <Paper>
    <div ref={mapElement} style={{ height: `${props.height}vh`, width: "100%", position: "relative", position: "relative", overflow: "hidden" }} ></div>
    // </Paper>
  )

}

export default MapWrapper