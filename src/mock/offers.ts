import { Offer } from '../types/offer';

export const OFFERS_DATA: Offer[] = [
  {
    id: '1',
    title: 'Nothing special',
    type: 'Apartment',
    isPremium: true,
    isFavorite: false,
    previewImage: 'img/apartment-01.jpg',
    price: 120,
    rating: 2,
    location: {
      latitude: 52.3909553943508,
      longitude:4.85309666406198,
      zoom: 0
    },
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude:4.85309666406198,
        zoom: 0
      },
    }
  },
  {
    id: '2',
    title: 'Huge and mystical (booo) apartment',
    type: 'Apartment',
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/apartment-02.jpg',
    price: 150,
    rating: 4,
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 0
    },
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3609553943508,
        longitude: 4.85309666406198,
        zoom: 0
      },
    }
  },
  {
    id: '3',
    title: 'Gracious apartment',
    type: 'Apartment',
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/apartment-03.jpg',
    price: 160,
    rating: 4.3,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 0
    },
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.929309666406198,
        zoom: 0
      },
    }
  },
  {
    id: '4',
    title: 'Beautiful & luxurious studio at great location',
    type: 'Studio',
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/apartment-01.jpg',
    price: 60,
    rating: 5,
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 0
    },
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 0
      },
    }
  },
  {
    id: '5',
    title: 'Nice room in center of Berlin',
    type: 'Room',
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/room.jpg',
    price: 30,
    rating: 4.9,
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0
    },
    city: {
      name: 'Berlin',
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 0
      },
    }
  }
];
