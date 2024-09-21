import {http, HttpResponse} from 'msw'

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
];