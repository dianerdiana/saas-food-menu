import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class IngredientModel {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  slug!: string;

  @Expose()
  status!: string;

  constructor(partial: Partial<IngredientModel>) {
    Object.assign(this, partial);
  }
}
