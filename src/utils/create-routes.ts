import express, { Request, Response, NextFunction } from "express";

const createRoutes = (controllers: any) => {
  const router = express.Router({ mergeParams: true });

  controllers.forEach(({ controller, path }: any) => {
    router.use(path, controller.router);
  });

  return router;
};

export default createRoutes;
