import { ExecutionContext, createParamDecorator } from '@nestjs/common';

const getCurrentUser = (ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => getCurrentUser(ctx),
);
