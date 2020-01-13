import defineModel from "./define-model";
import { SetupModelsArgs } from "../types";
import { Model as SeqModelType } from "sequelize";
import { Model as ModelType } from "../types";
import api from "../../../_config/api";
import get from "lodash/get";

// TODO: change this to not use schema pattern after it is removed from project-service
const createModels = async ({ db, project }: SetupModelsArgs) => {
  try {
    const modelsResponse = await api.projectService.get(`/projects/${project.id}/models`);
    const models = get(modelsResponse, "data.data");

    return models.map(
      (model: ModelType): SeqModelType => {
        // @ts-ignore
        return defineModel({ db, project, model });
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default createModels;
