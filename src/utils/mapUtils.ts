import { Offer } from '../types/offer';
import { MapPoint } from '../components/Map';

export const offerToMapPoint = (offer: Offer) => ({
  id: offer.id,
  lat: offer.location.latitude,
  lng: offer.location.longitude
} as MapPoint);
