import {useRef, useEffect, FC} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../hooks/use-map';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../const/icons';
import { City } from '../types/offer';

export interface MapPoint {
    id: string;
    lat: number;
    lng: number;
}

export interface MapProps {
  city: City;
  points: MapPoint[];
  selectedPointId: string | undefined;
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

export const Map: FC<MapProps> = ({city, points, selectedPointId}) => {

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
            selectedPointId !== undefined && point.id === selectedPointId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPointId]);

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, city]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
};
