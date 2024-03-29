import {useRef, useEffect, FC} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../../hooks/UseMap';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../../icons';
import { MapCity } from '../../../types/mapCity';

export interface MapPoint {
    title: string;
    lat: number;
    lng: number;
}

export interface MapProps {
  city: MapCity;
  points: MapPoint[];
  selectedPoint: MapPoint | undefined;
}


const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export const Map: FC<MapProps> = ({city, points, selectedPoint}) => {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);


  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.title === selectedPoint.title
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
};
