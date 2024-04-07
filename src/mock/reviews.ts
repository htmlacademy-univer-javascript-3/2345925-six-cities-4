import { Review } from '../types/review';


export const REVIEWS_FOR_OFFERS: {offerId: string; reviews: Review[]}[] = [
  {
    offerId: '1',
    reviews: [
      {
        id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
        date: '2019-05-08T14:13:56.569Z',
        user: {
          name: 'Oliver Conner',
          avatarUrl: 'img/avatar-max.jpg',
          isPro: false
        },
        comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
        rating: 4
      },
      {
        id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
        date: '2019-05-09T14:13:56.569Z',
        user: {
          name: 'Sara Conner',
          avatarUrl: 'img/avatar-angelina.jpg',
          isPro: true
        },
        comment: 'Thin walls. Heard my son snoring.',
        rating: 1
      }
    ]
  },
  {
    offerId: '2',
    reviews: [
      {
        id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
        date: '2019-05-08T14:13:56.569Z',
        user: {
          name: 'Andrew Rudskoy',
          avatarUrl: 'img/avatar-max.jpg',
          isPro: false
        },
        comment: 'GigaChad\'s place.',
        rating: 5
      }
    ]
  },
  {
    offerId: '3',
    reviews: [
      {
        id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
        date: '2019-05-08T14:13:56.569Z',
        user: {
          name: 'Crier boy',
          avatarUrl: 'img/avatar-max.jpg',
          isPro: false
        },
        comment: ':((((((((',
        rating: 1
      },
      {
        id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
        date: '2019-05-09T12:13:56.569Z',
        user: {
          name: 'Crier girl',
          avatarUrl: 'img/avatar-angelina.jpg',
          isPro: false
        },
        comment: ':-((((((((((((((((((((((((((((((((((((((',
        rating: 1
      }
    ]
  },
  {
    offerId: '4',
    reviews: [
      {
        id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
        date: '2019-05-08T14:13:56.569Z',
        user: {
          name: 'Tinkoff',
          avatarUrl: 'img/avatar-max.jpg',
          isPro: true
        },
        comment: 'Сомнительно но окэй',
        rating: 4
      }
    ]
  },
  {
    offerId: '5',
    reviews: [
    ]
  }
];
