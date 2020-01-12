import { BuildOptions, Model } from "sequelize";
/* tslint:disable:class-name */

export interface __testModelRelated__Model extends Model {
  readonly id: number;
  readonly dataValues: any;
  attr1: string;
  attr2: number;
  attr3: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type __testModelRelated__ModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => __testModelRelated__Model);
