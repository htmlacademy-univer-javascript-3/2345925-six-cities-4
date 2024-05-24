import { Offer } from '../types/offer';
import { MapPoint } from '../components/Map';
import { FullOfferInfo } from '../types/fullOfferInfo';

export const offerToMapPoint = (offer: Offer | FullOfferInfo) => ({
  id: offer.id,
  lat: offer.location.latitude,
  lng: offer.location.longitude
} as MapPoint);
