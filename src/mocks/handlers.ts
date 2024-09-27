import {http, HttpResponse} from 'msw'
import {faker} from "@faker-js/faker";

function generateDate() {
  const lastWeek = new Date(Date.now());
  lastWeek.setDate(lastWeek.getDate() - 7);
  return faker.date.between({
    from: lastWeek,
    to: Date.now(),
  });
}

const User = [
  {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
  {id: 'zerohch0', nickname: '제로초', image: '/5Udwvqim.jpg'},
  {id: 'hugoK1ng', nickname: '휴고킹', image: '/spiderman1.jpeg'},
  {id: 'leoturtle', nickname: '레오', image: faker.image.avatar()},
];

const Post = [];

export const handlers = [
  http.post('/api/login', () => {
    return HttpResponse.json({
      userId: 1,
      nickname: '휴고',
      id: 'hugoK@ng',
      image: '/spiderman1.jpeg'
    }, {
      headers: {
        'Set-Cookie': `connect.sid=msw-cookie;HttpOnly;path=/`
      }
    })
  }),
  http.post('/api/logout', () => {
    return new HttpResponse(null, {
      headers: {
        'Set-Cookie': `connect.sid=;HttpOnly;path=/;Max-Age=0`
      }
    })
  }),
  http.post('/api/users', async ({ request }) => {
    console.log('회원가입');
    // return HttpResponse.text(JSON.stringify('user_exists'), {
    //   status: 403,
    // })
    return HttpResponse.text(JSON.stringify('ok'), {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
      }
    })
  }),
  //* 게시물 가져오기
  http.get('/api/postRecommends', ({ request }) => {
    return HttpResponse.json(
      [
        {
          postId: 1,
          User: User[0],
          content: `${1} Z.com is so marvelous. I'm gonna buy that.`,
          Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
          createdAt: generateDate(),
        },
        {
          postId: 2,
          User: User[0],
          content: `${2} Z.com is so marvelous. I'm gonna buy that.`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
        {
          postId: 3,
          User: User[1],
          content: `${3} Z.com is so marvelous. I'm gonna buy that.`,
          Images: [],
          createdAt: generateDate(),
        },
        {
          postId: 4,
          User: User[2],
          content: `${4} Z.com is so marvelous. I'm gonna buy that.`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
            {imageId: 4, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
        {
          postId: 5,
          User: User[3],
          content: `${5} Z.com is so marvelous. I'm gonna buy that.`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
      ]
    )
  }),
  http.get('/api/followingPosts', ({ request }) => {
    return HttpResponse.json(
      [
        {
          postId: 1,
          User: User[0],
          content: `${1} 팔로우중인 사람의 게시글!!`,
          Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
          createdAt: generateDate(),
        },
        {
          postId: 2,
          User: User[0],
          content: `${2} 팔로우중인 사람의 게시글!!`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
        {
          postId: 3,
          User: User[1],
          content: `${3} 팔로우중인 사람의 게시글!!`,
          Images: [],
          createdAt: generateDate(),
        },
        {
          postId: 4,
          User: User[2],
          content: `${4} 팔로우중인 사람의 게시글!!`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
            {imageId: 4, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
        {
          postId: 5,
          User: User[3],
          content: `${5} 팔로우중인 사람의 게시글!!`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
      ]
    )
  }),
  http.get('/api/search/:tag', ({ request, params }) => {
    const {tag}= params;
    
    return HttpResponse.json(
      [
        {
          postId: 1,
          User: User[0],
          content: `${1} 검색 결과 ${tag}`,
          Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
          createdAt: generateDate(),
        },
        {
          postId: 2,
          User: User[0],
          content: `${2} 검색 결과 ${tag}`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
        {
          postId: 3,
          User: User[1],
          content: `${3} 검색 결과 ${tag}`,
          Images: [],
          createdAt: generateDate(),
        },
        {
          postId: 4,
          User: User[2],
          content: `${4} 검색 결과 ${tag}`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
            {imageId: 4, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
        {
          postId: 5,
          User: User[3],
          content: `${5} 검색 결과 ${tag}`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
      ]
    )
  }),
  //* 유저의 게시글 가져오기
  http.get('/api/users/:userId/posts', ({ request, params }) => {
    const {userId}= params;
    const findUser = User.find((v) => v.id === userId);
    
    if (!findUser) {
      HttpResponse.json([])
    }
    
    return HttpResponse.json(
      [
        {
          postId: 1,
          User: findUser,
          content: `${1} ${userId}의 게시`,
          Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
          createdAt: generateDate(),
        },
        {
          postId: 2,
          User: findUser,
          content: `${2} ${userId}의 게시`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
        {
          postId: 3,
          User: findUser,
          content: `${3} ${userId}의 게시`,
          Images: [],
          createdAt: generateDate(),
        },
        {
          postId: 4,
          User: findUser,
          content: `${4} ${userId}의 게시`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
            {imageId: 4, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
        {
          postId: 5,
          User: findUser,
          content: `${5} ${userId}의 게시글`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
      ]
    )
  }),
  //* 유저 정보 가져오기
  http.get('/api/users/:userId', ({ request, params }) => {
    const {userId}= params;
    const findUser = User.find((v) => v.id === userId);
    
    if (findUser) {
      return HttpResponse.json(findUser);
    }
    return HttpResponse.json({ message: 'no_such_user'}, {
      status: 404,
    })
  }),
  //* 게시글 하나 가져오기
  http.get('/api/users/:userId/posts/:postId', ({ request, params }) => {
    const {userId, postId}= params;
    
    return HttpResponse.json(
      {
        postId: 2,
        User: User[2],
        content: `${2} ${userId}의 게시글 ${postId}의 내용`,
        Images: [
          {imageId: 1, link: faker.image.urlLoremFlickr()},
          {imageId: 2, link: faker.image.urlLoremFlickr()},
        ],
        createdAt: generateDate(),
      },
    )
  }),
  //* 답글 가져오기
  http.get('/api/users/:userId/posts/:postId/comments', ({ request, params }) => {
    const {userId, postId}= params;
    
    return HttpResponse.json(
      [
        {
          postId: 1,
          User: User[2],
          content: `${1} ${userId}의 게시글 ${postId}의 답`,
          Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
          createdAt: generateDate(),
        },
        {
          postId: 2,
          User: User[2],
          content: `${2} ${userId}의 게시글 ${postId}의 답`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
        {
          postId: 3,
          User: User[2],
          content: `${3} ${userId}의 게시글 ${postId}의 답`,
          Images: [],
          createdAt: generateDate(),
        },
        {
          postId: 4,
          User: User[2],
          content: `${4} ${userId}의 게시글 ${postId}의 답`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
            {imageId: 4, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
        {
          postId: 5,
          User: User[2],
          content: `${5} ${userId}의 게시글 ${postId}의 답`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
      ]
    )
  }),
  //* 추천 팔로우 대상
  http.get('/api/followRecommends', ({ request }) => {
    return HttpResponse.json(User);
  }),
  //* 트랜드 가져오기
  http.get('/api/trends', ({ request }) => {
    return HttpResponse.json([
      { tagId: 1, title: '강준일', count: 1264},
      { tagId: 2, title: '강준이', count: 1264},
      { tagId: 3, title: '강준삼', count: 1264},
      { tagId: 4, title: '강준사', count: 1264},
      { tagId: 5, title: '강준오', count: 1264},
      { tagId: 6, title: '강준육', count: 1264},
      { tagId: 7, title: '강준칠', count: 1264},
      { tagId: 8, title: '강준팔', count: 1264},
      { tagId: 9, title: '강준구', count: 1264},
      { tagId: 10, title: '강준십', count: 1264},
    ]);
  }),
];