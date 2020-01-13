import NodeCache from "node-cache";
import { Sequelize } from "sequelize";
import utils from "./utils";
import api from "../_config/api";
import get from "lodash/get";

// TODO: increase checkPeriod time
const projectCache = new NodeCache({ checkperiod: 5 * 60 });

projectCache.on("del", async (key, cachedProject) => {
  await cachedProject.db.close();
});

projectCache.on("set", key => {
  console.log(key, "added to cache");
});

const createCachedProject = async ({ subDomain, cacheTime, project }: any) => {
  // TODO: change this to actual db's connection once schema pattern is removed
  const db = new Sequelize("postgres://postgres@localhost:54321/mockend_development");

  const Models = await utils.createModels({ db, project });

  const routes = utils.createRoutes(utils.createControllers({ Models }));

  const app = utils.createApp({ project, routes });

  const cachedProject = { app, db };

  projectCache.set(subDomain, cachedProject, cacheTime);
};

const getCachedProject = async (subDomain: string) => {
  try {
    let cacheTime: number;

    if (!projectCache.get(subDomain)) {
      const projectResponse = await api.projectService.get(`/projects/${subDomain}`);
      const project = get(projectResponse, "data.data");

      cacheTime = 30 * 60;

      await createCachedProject({ subDomain, cacheTime, project });
    }

    projectCache.ttl(subDomain, cacheTime);

    return projectCache.get(subDomain);
  } catch (error) {
    throw error;
  }
};

export { projectCache };

export default getCachedProject;
