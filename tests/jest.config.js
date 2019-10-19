const rootDir = process.cwd();

module.exports = {
  verbose: true,
  testURL: "http://localhost/",
  setupFiles: [`${rootDir}/tests/__mocks__/browserMocks.js`],
  moduleFileExtensions: ["js", "jsx"],
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  moduleDirectories: ["node_modules"],
  moduleNameMapper: {
    "^@/(.*)$": `${rootDir}/src/js/$1`,
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `${rootDir}/src/tests/__mocks__/fileMock.js`,
    "^preact$": `${rootDir}/node_modules/preact/dist/preact.min.js`
  }
};