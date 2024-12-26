// TODO: 页面会闪

const antdStyleBlacklist = [
  'antd/es/theme/style/index.js',
  'antd/es/utils/style/index.js',
];

const antdComponentBlacklist = [];

module.exports = {
  "presets": ["next/babel"],
  "plugins": [
    [
      "import",
      {
        libraryName: "antd",
        style(name) {
          const ret = `${name}/style/index.js`;
          return !antdStyleBlacklist.includes(ret) ? ret : false;
        },
        customName(name) {
          const ret = `antd/es/${name}`;
          return !antdComponentBlacklist.includes(ret) ? ret : false;
        }
      },
      "antd"
    ],
    [
      "import",
      {
        "libraryName": "lodash-es",
        "libraryDirectory": "",
        "camel2DashComponentName": false,
      },
      "lodash-es"
    ],
    [
      "import",
      {
        "libraryName": "@ant-design/icons",
        "libraryDirectory": "",
        "camel2DashComponentName": false,
      },
      "@ant-design/icons"
    ]
  ]
};
