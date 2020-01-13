import { Model as SeqModelType } from "sequelize";
import { CreateControllerResult } from "../core/utils/create-controller.types";

export interface Column {
  modelId: number;
  name: string;
  type: string;
  options: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface Model {
  id: number;
  projectId: number;
  name: string;
  relations: any[];
  createdAt: Date;
  updatedAt: Date;
  columns: Column[];
}

// TODO: write proper types for this
export interface SetupModelsArgs {
  db: any;
  project: any;
}

// TODO: write proper types for this
export interface DefineModelArgs {
  db: any;
  model: Model;
  project: any;
}

export interface CreateControllersArgs {
  Models?: SeqModelType[];
}

export interface ControllerArray {
  controller?: CreateControllerResult;
  path: string;
}
