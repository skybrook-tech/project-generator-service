import config from "../_config";
import setupServerDefaults from "./core/utils/setup-server-defaults";

const { DOMAIN, PORT } = config;

const app = setupServerDefaults();

app.listen(PORT, () => {
  console.log(`Server ready at http://${DOMAIN}:${PORT}`);
});
