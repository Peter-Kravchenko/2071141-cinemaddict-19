import { EMOTIONS } from '../const';
import { getRandomArrayElement } from '../utils/ulils';

const mockFilms = [{
  id: 0,
  comments: [1, 2, 3],
  filmInfo: {
    title: 'A Little Pony Without The Carpet',
    alternativeTitle: 'Laziness Who Sold Themselves',
    totalRating: '5.3',
    poster: 'images/posters/the-man-with-the-golden-arm.jpg',
    ageRating: '0',
    director: 'Tom Ford',
    writers: [
      'Takeshi Kitano'
    ],
    actors: [
      'Morgan Freeman'
    ],
    release: {
      date: '2019-05-11T00:00:00.000Z',
      releaseCountry: 'Finland'
    },
    duration:'77',
    genre: [
      'Comedy'
    ],
    description: 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.',
  },
  userDetails: {
    watchlist: false,
    alreadyWatched: true,
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: true,
  }
},

{
  id: 1,
  comments: [2,3,4],
  filmInfo: {
    title: 'A Shark Who Sold Himself',
    poster: 'images/posters/the-great-flamarion.jpg',
    director: 'Akira Kurosawa',
    writers: [
      'Robert Rodrigues',
      'Stephen King',
      'Brad Bird',
      'Martin Scorsese',
    ],
    actors: [
      'Robert De Niro',
    ],
    release: {
      date: '2010-11-23T02:39:09.425Z',
      releaseCountry: 'Finland',
    },
    duration: '131',
    genre: [
      'Family',
      'Comedy',
    ],
    description: 'a war drama about two young people, true masterpiece where love and death are closer to heroes than their family, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", a film about a journey that heroes are about to make in finding themselves, with the best fight scenes since Bruce Lee.',
    ageRating: '6',
    alternativeTitle: 'Raiders Who Saw The Carpet',
    totalRating: '4.5',
  },
  userDetails: {
    watchlist: false,
    favorite: false,
    alreadyWatched: false,
    watchingDate: null,
  }
},
{
  id: 2,
  comments: [4],
  filmInfo: {
    title: 'A Shark Of The Darkness',
    poster: 'images/posters/the-dance-of-life.jpg',
    director: 'Alejandro Gonsales Inarritu',
    writers: [
      'Robert Zemeckis',
      'Robert Rodrigues',
      'Takeshi Kitano',
      'Brad Bird',
      'Stephen King'
    ],
    actors: [
      'Al Pacino',
      'Gary Oldman',
      'Tom Hanks',
      'Morgan Freeman ',
    ],
    release: {
      'date': '2004-02-04T23:27:38.070Z',
      'releaseCountry': 'Japan',
    },
    duration: '94',
    genre: [
      'Horror',
      'Action',
      'Adventure',
      'Drama',
      'Comedy',
    ],
    description: 'Oscar-winning film, true masterpiece where love and death are closer to heroes than their family, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", a film about a journey that heroes are about to make in finding themselves.',
    ageRating: '6',
    alternativeTitle: 'A Shark In The Room',
    totalRating: '7.6',
  },
  userDetails: {
    watchlist: false,
    favorite: false,
    alreadyWatched: true,
    watchingDate: '2022-06-26T21:01:01.342Z',
  }

},

{
  id: 3,
  comments: [2,5],
  filmInfo: {
    title: 'A Shark On The Darkness',
    poster: 'images/posters/made-for-each-other.png',
    director: 'Akira Kurosawa',
    writers: [
      'Robert Rodrigues',
    ],
    actors: [
      'Harrison Ford',
      'Takeshi Kitano',
      'Ralph Fiennes',
      'Leonardo DiCaprio',
      'Christian Bale',
      'Al Pacino',
      'Robert De Niro',
      'Tom Hanks',
    ],
    release: {
      'date': '2009-02-16T07:44:22.909Z',
      'releaseCountry': 'Finland'
    },
    duration: '195',
    genre: [
      'Action',
      'Adventure'
    ],
    description: 'true masterpiece where love and death are closer to heroes than their family, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", a film about a journey that heroes are about to make in finding themselves.',
    ageRating: '21',
    alternativeTitle: 'Raiders Who Saw The Storm',
    totalRating: '9.4',
  },
  userDetails: {
    watchlist: false,
    favorite: false,
    alreadyWatched: true,
    watchingDate: '2022-10-05T21:01:01.342Z'
  }
},

{
  id: 4,
  comments: [1,2],
  filmInfo: {
    title: 'A Shark In The Void',
    poster: 'images/posters/sagebrush-trail.jpg',
    director: 'Quentin Tarantino',
    writers: [
      'Quentin Tarantino',
      'Stephen King',
      'Robert Zemeckis',
      'Hayao Miazaki',
    ],
    actors: [
      'Edward Norton',
      'Ralph Fiennes',
    ],
    release: {
      'date': '2010-01-31T09:53:12.302Z',
      'releaseCountry': 'China',
    },
    duration: '67',
    genre: [
      'Sci-Fi',
      'Adventure',
      'Family',
      'Action',
      'Drama',
    ],
    description: 'true masterpiece where love and death are closer to heroes than their family, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland".',
    ageRating: '21',
    alternativeTitle: 'Country Who Sold The Storm',
    totalRating: '4.6',
  },
  userDetails: {
    watchlist: true,
    favorite: false,
    alreadyWatched: false,
    watchingDate: null
  }
},

{
  id: 5,
  comments: [2,3,4,5],
  filmInfo: {
    title: 'A Little Pony Who Sold Him',
    poster: 'images/posters/popeye-meets-sinbad.png',
    director: 'Tom Ford',
    writers: [
      'Takeshi Kitano',
      'Martin Scorsese',
      'Hayao Miazaki',
      'Quentin Tarantino',
    ],
    actors: [
      'Matt Damon',
      'Ralph Fiennes',
      'Cillian Murphy',
      'Brad Pitt',
      'Harrison Ford',
      'Edward Norton',
    ],
    release: {
      'date': '1998-08-06T09:47:52.747Z',
      'releaseCountry': 'Italy',
    },
    duration: '108',
    genre: [
      'Action',
    ],
    description: 'Oscar-winning film, a war drama about two young people, true masterpiece where love and death are closer to heroes than their family, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", a film about a journey that heroes are about to make in finding themselves.',
    ageRating: '21',
    alternativeTitle: 'Laziness Without Himself',
    totalRating: '6',
  },
  userDetails: {
    watchlist: false,
    favorite: true,
    alreadyWatched: true,
    watchingDate: '2023-02-17T21:01:01.342Z',
  }
},

{
  id: 6,
  comments: [],
  filmInfo: {
    title: 'Laziness Who Bought The Storm',
    poster: 'images/posters/sagebrush-trail.jpg',
    director: 'James Cameron',
    writers: [
      'Robert Rodrigues',
      'Quentin Tarantino',
      'Hayao Miazaki',
      'Martin Scorsese',
      'Stephen Spielberg',
      'Brad Bird',
    ],
    actors: [
      'Harrison Ford',
      'Tom Hanks',
      'Leonardo DiCaprio',
    ],
    release: {
      'date': '2018-12-21T16:20:57.094Z',
      'releaseCountry': 'France',
    },
    duration: '138',
    genre: [
      'Drama',
      'Comedy',
      'Animation',
      'Family'
    ],
    description: 'Oscar-winning film, a war drama about two young people.',
    ageRating: '0',
    alternativeTitle: 'A Shark Who Sold Themselves',
    totalRating: '9.5',
  },
  userDetails: {
    watchlist: true,
    favorite: false,
    alreadyWatched: true,
    watchingDate: '2023-02-03T21:01:01.342Z'
  }
}
];


export const mockComments = [{
  id: 0,
  author: 'First Author',
  comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  date: '2023-01-11T13:21:32.554Z',
  emotion: getRandomArrayElement(EMOTIONS),
},

{
  id: 1,
  author: 'Second Author',
  comment: 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus',
  date: '2019-05-11T16:12:32.554Z',
  emotion: getRandomArrayElement(EMOTIONS),
},

{
  id: 2,
  author: 'Third Author',
  comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  date: '2022-01-11T16:12:32.554Z',
  emotion: getRandomArrayElement(EMOTIONS),
},

{
  id: 3,
  author: 'Fourth Author',
  comment: 'Fiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, pur',
  date: '2019-09-11T17:10:22.554Z',
  emotion: getRandomArrayElement(EMOTIONS),
},

{
  id: 4,
  author: 'Fifth Author',
  comment: 'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  date: '2020-01-11T17:00:12.554Z',
  emotion: getRandomArrayElement(EMOTIONS),
},
];

export const getRandomFilm = () => getRandomArrayElement(mockFilms);
