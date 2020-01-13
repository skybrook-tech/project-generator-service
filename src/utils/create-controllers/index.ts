import middleware from "../../core/middleware";
import createController from "../../core/utils/create-controller";
import { CreateControllersArgs, ControllerArray } from "../types";

const createControllers = ({ Models }: CreateControllersArgs) => {
  const controllers: ControllerArray[] = [];

  Models.forEach((Model: any) => {
    const modelCrud = middleware.createCrudMiddleware(Model);

    const controller = createController({
      Model,
      middleware: {
        create: [modelCrud.create],
        getOne: [modelCrud.findOne],
        getAll: [modelCrud.findAll],
        update: [modelCrud.update],
        destroy: [modelCrud.destroy]
      },
      nestedControllers: []
    });

    controllers.push({ controller, path: `/${Model.name.toLowerCase()}` });
  });

  return controllers;
};

export default createControllers;
