import { Resolver, InputType, Field } from "type-graphql";
import { Product } from "../../entity/Product";
import { createBaseResolver } from "./BaseResolver";

@InputType()
class ProductInput {
  @Field()
  name: string;
}

const BaseCreateProduct = createBaseResolver("Product", Product, ProductInput, Product)

@Resolver()
export class CreateProductResolver extends BaseCreateProduct {}