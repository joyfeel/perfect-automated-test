import Router from 'koa-router'
import faker from 'faker'

const router = new Router()

router.get('/hello', async (ctx, next) => {
  ctx.response.body = "Hello World"
  ctx.response.status = 200
})

router.get('/random-user', async (ctx, next) => {
  let user = faker.helpers.userCard()
  user.avatar = faker.image.avatar()

  ctx.response.body = user
  ctx.response.status = 200
})

export default router;
