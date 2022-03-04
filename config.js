const date = new Date();

const config = {
  npmRepository: 'http://',
  npmName: 'netology-lms-sdk',
  npmVersion: `0.2.${(date / 1000) | 0}`,
  supportsES6: false,
  targetPath: './code-gen/npmPackage',
  services: [
    {
      specPath: './reference/todos-api-spec.yaml',
    },
  ],
  npmRegistry: 'http://netology.ru/repository/npm-local/',
};

module.exports = config;