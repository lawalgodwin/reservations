import { ExecutionContext, createParamDecorator } from '@nestjs/common';

const getCurrentUserByContext = (ctx: ExecutionContext) =>
  ctx.switchToHttp().getRequest().user;
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => getCurrentUserByContext(ctx),
);
