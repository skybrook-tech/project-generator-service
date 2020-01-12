import { Sequelize } from "sequelize";
import { __testModelRelated__ModelStatic } from "./__testModelRelated__/types";
import { __testModel__ModelStatic } from "./__testModel__/types";

export interface Db {
  sequelize: Sequelize;
  Sequelize: any;
  __testModelRelated__: __testModelRelated__ModelStatic;
  __testModel__: __testModel__ModelStatic;
}
