import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const payload = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return request?.payload;
});

export default payload;
