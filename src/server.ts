import config from "../_config";
import setupServerDefaults from "./core/utils/setup-server-defaults";
import vhost from "vhost";
import { Request, Response, NextFunction } from "express";
import getCachedProject from "./project-cache";

const { DOMAIN, PORT } = config;

const vhostMiddlware = vhost(
  `${DOMAIN}`,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subDomain = req.vhost.host.split(".")[0];

      const cachedProject = await getCachedProject(subDomain);

      // @ts-ignore
      return cachedProject.app(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

const app = setupServerDefaults({ globalMiddleware: [vhostMiddlware] });

app.listen(PORT, () => {
  console.log(`Server ready at http://${DOMAIN}:${PORT}`);
});
