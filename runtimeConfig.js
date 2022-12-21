const dotenv = require('dotenv');

const { parsed } = dotenv.config();
const config = { ...process.env, ...parsed };

const EXPOSE_BROWSER_ENV_PREFIX = 'NEXT_PUBLIC_';

exports.getRuntimeConfig = () => {
  const serverOnlyConfigEnvVariables = Object.keys(config).filter(
    (configKey) => !configKey.startsWith(EXPOSE_BROWSER_ENV_PREFIX)
  );
  const commonConfigEnvVariables = Object.keys(config).filter((configKey) =>
    configKey.startsWith(EXPOSE_BROWSER_ENV_PREFIX)
  );

  const getMappingFromEnv = (names) => {
    return names.reduce((acc, name) => {
      if (name in process.env) {
        acc[name] = process.env[name];
      }
      return acc;
    }, {});
  };
  const serverRuntimeConfig = getMappingFromEnv(serverOnlyConfigEnvVariables);
  const publicRuntimeConfig = getMappingFromEnv(commonConfigEnvVariables);

  return {
    serverRuntimeConfig,
    publicRuntimeConfig,
  };
};
