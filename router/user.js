import Router from 'koa-router'
import faker from 'faker'

const router = new Router();

router.get('/user', async (ctx, next) => {
  ctx.response.body = "Hello World"
  ctx.response.status = 200
});

export default router;
