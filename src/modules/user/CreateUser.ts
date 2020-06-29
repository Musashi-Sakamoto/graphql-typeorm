import { Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { createBaseResolver } from "./BaseResolver";

const BaseCreateUser = createBaseResolver("User", User, RegisterInput, User)

@Resolver()
export class CreateUserResolver extends BaseCreateUser {}