const koa =require('koa');  
const app =new koa();  
const router = require('koa-router')();  
  
router.get('/test/:id', function(ctx, next){
	ctx.body = parseInt(ctx.params.id) + 1;
});  
  
app.use(router.routes(), router.allowedMethods());  
   
  
app.listen(5555);
