import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserEntity } from '../../user/schema/user.entity';

export const getCurrentUserByContext = (
  context: ExecutionContext,
): UserEntity => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
