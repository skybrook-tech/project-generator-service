import config from "../_config";
import setupServerDefaults from "./core/utils/setup-server-defaults";
import vhost from "vhost";
import { Request, Response, NextFunction } from "express";
import NodeCache from "node-cache";
import { Sequelize } from "sequelize";

// TODO: increase checkPeriod time
const projectCache = new NodeCache({ checkperiod: 2 });

const { DOMAIN, PORT } = config;

const app = setupServerDefaults();

projectCache.on("del", async (key, { db }) => {
  console.log(key, "removed from cache");

  await db.close();

  console.log(key, "db closed");
});

projectCache.on("set", (key, value) => {
  console.log(key, "added to cache");
});

app.use(
  vhost(`${DOMAIN}`, async (req: Request, res: Response, next: NextFunction) => {
    const subDomain = req.vhost.host.split(".")[0];

    const projectCacheTime = 5;

    if (!projectCache.get(subDomain)) {
      const db = new Sequelize("postgres://postgres@localhost:54321/mockend_development");
      const project = { db, app: "bar" };

      projectCache.set(subDomain, project, projectCacheTime);
    }

    const cachedProject = projectCache.get(subDomain);

    projectCache.ttl(subDomain, projectCacheTime);

    res.json({ subDomain });
  })
);

app.listen(PORT, () => {
  console.log(`Server ready at http://${DOMAIN}:${PORT}`);
});
