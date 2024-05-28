import { Offer } from '../types/offer';
import { MapPoint } from '../components/map/map';
import { FullOfferInfo } from '../types/full-offer-info';

export const offerToMapPoint = (offer: Offer | FullOfferInfo) => ({
  id: offer.id,
  lat: offer.location.latitude,
  lng: offer.location.longitude
} as MapPoint);
