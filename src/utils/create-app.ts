import setupServerDefaults from "../core/utils/setup-server-defaults";

interface CreateNestedExpressArgs {
  project: any;
  routes: any;
}

const createApp = ({ project, routes }: CreateNestedExpressArgs) => {
  const app = setupServerDefaults({ routes });

  app.get("/", (req, res) => {
    // TODO: send back current schema when root endpoint hit
    res.send(project.uuid);
  });

  return app;
};

export default createApp;
