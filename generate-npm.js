const { execSync } = require('child_process');
const { render } = require('mustache');
const fs = require('fs');
const config = require('./config');

// Очищаем каталог
console.log('Очищаю каталог');
execSync(`npx rimraf ${config.targetPath}`);

// Гененрируем спеку по каждому сервису
console.log('Генерирую код');
config.services.forEach((el) => {
  execSync(
    `npx openapi-generator-cli generate --global-property models -g typescript-axios -o ${config.targetPath} --type-mappings=array=Array,set=Array -c openapi-gen-config.models.json -i ${el.specPath} -t template`,
    (err) => console.log(err)
  );
  execSync(
    `npx openapi-generator-cli generate --global-property apis -g typescript-axios -o ${config.targetPath} --type-mappings=array=Array,set=Array -c openapi-gen-config.models.json -i ${el.specPath} -t template`,
    (err) => console.log(err)
  );
});

// Генерируем индексы
console.log(`Обновляю индексы`);
execSync(
  `npx cti ${config.targetPath}/api ${config.targetPath}/models --filefirst`
);

//Генерируем вспомогательные файлы
console.log(`Генерирую вспомогательные файлы`);
fs.copyFile(
  './template/configuration.mustache',
  `${config.targetPath}/configuration.ts`,
  (err) => (err ? console.log(err) : null)
);
fs.copyFile(
  './template/baseApi.mustache',
  `${config.targetPath}/base.ts`,
  (err) => (err ? console.log(err) : null)
);
fs.copyFile(
  './template/common.mustache',
  `${config.targetPath}/common.ts`,
  (err) => (err ? console.log(err) : null)
);

console.log('Создаю файлы нужные для генерации NPM пакета');

// Генерируем index.js по шаблону
fs.copyFile(
  './package-template/index.mustache',
  `${config.targetPath}/index.ts`,
  (err) => (err ? console.log(err) : null)
);

// Генерируем package.json по шаблону
const packageTemplate = fs
  .readFileSync('./package-template/package.mustache')
  .toString();

console.log(config);

const package = render(packageTemplate, config);
fs.writeFileSync(`${config.targetPath}/package.json`, package);

// Генерируем tsconfig.json по шаблону
const tsconfigTemplate = fs
  .readFileSync('./package-template/tsconfig.mustache')
  .toString();
const tsconfig = render(tsconfigTemplate, config);
fs.writeFileSync(`${config.targetPath}/tsconfig.json`, tsconfig);

// Генерируем README.md по шаблону
const readmeTemplate = fs
  .readFileSync('./package-template/README.mustache')
  .toString();
const readme = render(readmeTemplate, config);
fs.writeFileSync(`${config.targetPath}/README.md`, readme);

// Генерируем .gitignore по шаблону
fs.copyFile(
  './package-template/gitignore',
  `${config.targetPath}/.gitignore`,
  (err) => (err ? console.log(err) : null)
);

// Генерируем .npmrc по шаблону
const npmrcTemplate = fs
  .readFileSync('./package-template/npmrc.mustache')
  .toString();

const npmRc = render(npmrcTemplate, config);
fs.writeFileSync(`${config.targetPath}/.npmrc`, npmRc);