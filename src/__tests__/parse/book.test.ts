import { getGenericUrl } from '../../goodreads';
import * as parse from '../../parse/book';
import { bookUrls as urls } from '../constants';

/* eslint-disable max-len */
describe('part of a series', () => {
  test('Lord of Chaos', async () =>
    expect(parse.book(await getGenericUrl(urls.lordOfChaos))).toEqual({
      title: 'Lord of Chaos',
      authorUrl: 'https://www.goodreads.com/author/show/6252.Robert_Jordan',
      description: `In this sequel to the phenomenal New York Times bestseller The Fires of Heaven, we plunge again into Robert Jordan's extraordinarily rich, totally unforgettable world:

On the slopes of Shayol Ghul, the Myrddraal swords are forged, and the sky is not the sky of this world ...

In Salidar the White Tower in exile prepares an embassy to Caemlyn, where Rand Al'Thor, the Dragon Reborn, holds the throne -- and where an unexpected visitor may change the world ...

In Emond's Field, Perrin Goldeneyes, Lord of the Two Rivers, feels the pull of ta'veren to ta'veren and prepares to march ...

Morgase of Caemlyn finds a most unexpected, and quite unwelcome, ally ...

And south lies Illian, where Sammael holds sway ...`,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1480096417i/35231.jpg',
      isbn: 9780812513752,
      pageCount: 1011,
      genres: [
        'Fantasy',
        'Fiction',
        'Epic Fantasy',
        'Audiobook',
        'High Fantasy',
        'Science Fiction Fantasy',
        'Epic',
        'Adventure',
        'Magic',
        'Novels',
      ],
      positionInSeries: 6,
      series: {
        url: 'https://www.goodreads.com/series/41526-the-wheel-of-time',
        name: 'The Wheel of Time',
      },
    }));

  test('Hunger Games', async () =>
    expect(parse.book(await getGenericUrl(urls.hungerGames))).toEqual({
      title: 'The Hunger Games',
      authorUrl: 'https://www.goodreads.com/author/show/153394.Suzanne_Collins',
      description: `Could you survive on your own in the wild, with every one out to make sure you don't live to see the morning?

In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts. The Capitol is harsh and cruel and keeps the districts in line by forcing them all to send one boy and one girl between the ages of twelve and eighteen to participate in the annual Hunger Games, a fight to the death on live TV.

Sixteen-year-old Katniss Everdeen, who lives alone with her mother and younger sister, regards it as a death sentence when she steps forward to take her sister's place in the Games. But Katniss has been close to dead before—and survival, for her, is second nature. Without really meaning to, she becomes a contender. But if she is to win, she will have to start making choices that weight survival against humanity and life against love.`,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1586722975i/2767052.jpg',
      isbn: 9780439023481,
      pageCount: 374,
      genres: [
        'Young Adult',
        'Fiction',
        'Fantasy',
        'Science Fiction',
        'Audiobook',
        'Teen',
        'Post Apocalyptic',
        'Action',
        'Novels',
        'Science Fiction Fantasy',
      ],
      positionInSeries: 1,
      series: {
        url: 'https://www.goodreads.com/series/73758-the-hunger-games',
        name: 'The Hunger Games',
      },
    }));

  test('Scars', async () =>
    expect(parse.book(await getGenericUrl(urls.scars))).toEqual({
      title: 'Scars',
      authorUrl: 'https://www.goodreads.com/author/show/1001882.Chris_Wraight',
      description:
        'Jaghatai Khan and his White Scars Legion must choose - the Emperor or Horus?Fresh from their conquest of Chondax and the discovery of Horus’s rebellion, Jaghatai Khan’s warriors stand divided. Long considered one of the less trustworthy Legions, many of the White Scars claim to owe their loyalty exclusively to Terra, and others still to the Warmaster and his warrior lodges. But when a distress call from Leman Russ of the Space Wolves brings the wrath of the Alpha Legion to Chondax, the Khan’s hand is forced and the decision must be made – in the great war for the Imperium, will he side with the Emperor or Horus?',
      genres: [
        'Science Fiction',
        '40k',
        'Fiction',
        'Audiobook',
        'Fantasy',
        'Space Opera',
        'Military Science Fiction',
        'Science Fiction Fantasy',
        'Novels',
        'Action',
      ],
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1376783944i/18143803.jpg',
      isbn: 9781849706049,
      pageCount: 416,
      positionInSeries: 28,
      series: {
        url: 'https://www.goodreads.com/series/40983-the-horus-heresy',
        name: 'The Horus Heresy',
      },
    }));

  test('Fear to Tread', async () =>
    expect(parse.book(await getGenericUrl(urls.fearToTread))).toEqual({
      title: 'Fear to Tread',
      authorUrl: 'https://www.goodreads.com/author/show/32643.James_Swallow',
      description:
        'Since the earliest days of the Great Crusade, Sanguinius – angelic primarch of the IXth Legion – was ever among the closest and most loyal of Horus’s brothers. But the Blood Angels have long kept their true nature hidden from the rest of the Imperium, and when the Warmaster hints that the key to their salvation may lie in the ruins of a conquered world, the sons of Sanguinius race to claim it. Now, as the revelation of their betrayal dawns and the traitors’ hand is revealed, the Blood Angels must face all the warp-spawned armies of Chaos, as well their own personal daemons, upon the blasted plains of Signus Prime...',
      genres: [
        'Science Fiction',
        '40k',
        'Fiction',
        'Audiobook',
        'Fantasy',
        'Space Opera',
        'War',
        'Military Science Fiction',
        'Horror',
        'Novels',
      ],
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1332287096i/13259647.jpg',
      isbn: 9781849701969,
      pageCount: 508,
      positionInSeries: 21,
      series: {
        url: 'https://www.goodreads.com/series/40983-the-horus-heresy',
        name: 'The Horus Heresy',
      },
    }));

  test(
    'Deliverance Lost',
    async () =>
      expect(parse.book(await getGenericUrl(urls.deliveranceLost))).toEqual({
        title: 'Deliverance Lost',
        authorUrl: 'https://www.goodreads.com/author/show/46269.Gav_Thorpe',
        description: `A Horus Heresy novel

After their near-destruction at the hands of Horus’ Traitor Legions, the Raven Guard seek to escape and rebuild, but the forces of Chaos are insidious, and the Legion may yet face its doom.

READ IT BECAUSE
It's an account of a Legion battered and broken after the events of Isstvan V and the disastrous results of Corax's attempt to rebuild and rejoin the fight.

THE STORY
As the Horus Heresy divides the Imperium, Corax and his few remaining Raven Guard escape the massacre at Isstvan V. Tending to their wounds, the bloodied Space Marines endeavour to replenish their numbers and return to the fray, taking the fight to the traitor Warmaster. Distraught at the crippling blow dealt to his Legion, Corax returns to Terra to seek the aid of his father - the Emperor of Mankind. Granted access to ancient secrets, Corax begins to rebuild the Raven Guard, planning his revenge against his treacherous brother primarchs. But not all his remaining warriors are who they appear to be... the mysterious Alpha Legion have infiltrated the survivors and plan to destroy the Raven Guard before they can rebuild and threaten Horus's plans.`,
        genres: [
          'Science Fiction',
          '40k',
          'Fiction',
          'Fantasy',
          'Audiobook',
          'War',
          'Novels',
          'Science Fiction Fantasy',
          'Military Science Fiction',
          'Space Opera',
        ],
        imageUrl:
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1332438857i/10838911.jpg',
        isbn: 9781849700610,
        pageCount: 480,
        positionInSeries: 18,
        series: {
          url: 'https://www.goodreads.com/series/40983-the-horus-heresy',
          name: 'The Horus Heresy',
        },
      }),
    30 * 1000
  );

  test('The Fellowship of the Ring', async () =>
    expect(parse.book(await getGenericUrl(urls.fellowshipOfTheRing))).toEqual({
      title: 'The Fellowship of the Ring',
      authorUrl: 'https://www.goodreads.com/author/show/656983.J_R_R_Tolkien',
      description: `Alternate Cover Edition ISBN 0618260269 (copyright page ISBN is 0618346252 - different from back cover)

One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkeness bind them

In ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, The Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others. But the One Ring was taken from him, and though he sought it throughout Middle-earth, it remained lost to him. After many ages it fell into the hands of Bilbo Baggins, as told in The Hobbit.

In a sleepy village in the Shire, young Frodo Baggins finds himself faced with an immense task, as his elderly cousin Bilbo entrusts the Ring to his care. Frodo must leave his home and make a perilous journey across Middle-earth to the Cracks of Doom, there to destroy the Ring and foil the Dark Lord in his evil purpose.
--back cover`,
      genres: [
        'Fantasy',
        'Classics',
        'Fiction',
        'Adventure',
        'Audiobook',
        'High Fantasy',
        'Science Fiction Fantasy',
        'Epic Fantasy',
        'Novels',
        'Young Adult',
      ],
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1298411339i/34.jpg',
      isbn: 9780618346257,
      pageCount: 398,
      positionInSeries: 1,
      series: {
        name: 'Middle Earth',
        url: 'https://www.goodreads.com/series/66175-middle-earth',
      },
    }));

  test('Harry Potter and the Half Blood Price', async () => {
    expect(parse.book(await getGenericUrl(urls.harryPotterAndTheHalfBloodPrince))).toEqual({
      title: 'Harry Potter and the Half-Blood Prince',
      authorUrl: 'https://www.goodreads.com/author/show/1077326.J_K_Rowling',
      description: `The war against Voldemort is not going well: even Muggle governments are noticing. Ron scans the obituary pages of The Daily Prophet looking for familiar names. Dumbledore is absent from Hogwarts for long stretches of time, and the Order of the Phoenix has already suffered losses. 

And yet …

As in all wars, life goes on. Sixth-year students learn to Apparate, and lose a few eyebrows in the process. The Weasley twins expand their business. Teenagers flirt and fight and fall in love. Classes are never straightforward, though Harry receives some extraordinary help from the mysterious Half-Blood Prince.

So it's the home front that takes center stage in the multilayered sixth installment of the story of Harry Potter. Here at Hogwarts, Harry will search for the full and complex story of the boy who became Lord Voldemort - and thereby find what may be his only vulnerability.`,
      genres: [
        'Fantasy',
        'Fiction',
        'Young Adult',
        'Magic',
        'Childrens',
        'Audiobook',
        'Adventure',
        'Middle Grade',
        'Classics',
        'Science Fiction Fantasy',
      ],
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1661032277i/49852.jpg',
      isbn: 9780439784542,
      pageCount: 652,
      series: {
        url: 'https://www.goodreads.com/series/45175-harry-potter',
        name: 'Harry Potter',
      },
      positionInSeries: 6,
    });
  });
});

describe('individual book', () => {
  test('1984', async () => {
    expect(parse.book(await getGenericUrl(urls['1984']))).toEqual({
      title: '1984',
      authorUrl: 'https://www.goodreads.com/author/show/3706.George_Orwell',
      description: `'It was a bright cold day in April, and the clocks were striking thirteen.'

Winston Smith works for the Ministry of truth in London, chief city of Airstrip One. Big Brother stares out from every poster, the Thought Police uncover every act of betrayal. When Winston finds love with Julia, he discovers that life does not have to be dull and deadening, and awakens to new possibilities. Despite the police helicopters that hover and circle overhead, Winston and Julia begin to question the Party; they are drawn towards conspiracy. Yet Big Brother will not tolerate dissent - even in the mind. For those with original thoughts they invented Room 101 . . . 

Nineteen Eighty-Four is George Orwell's terrifying vision of a totalitarian future in which everything and everyone is slave to a tyrannical regime.`,
      genres: [
        'Classics',
        'Fiction',
        'Science Fiction',
        'Dystopia',
        'Literature',
        'Politics',
        'Novels',
        'School',
        'Audiobook',
        'Fantasy',
      ],
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327144697i/3744438.jpg',
      isbn: 9780141036144,
      pageCount: 334,
      positionInSeries: undefined,
      series: undefined,
    });
  });
});
/* eslint-enable max-len */
