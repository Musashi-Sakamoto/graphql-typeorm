import { ClassType, Resolver, Arg, Mutation } from "type-graphql";

export function createBaseResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any
) {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}`})
    async CreateUserResolver(@Arg("data", () => inputType) data: any) {
      return entity.create(data).save()
    }
  }
  return BaseResolver;
}