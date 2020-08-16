'use strict';

module.exports = function (api) {
  api.cache(true);

  const config = {
    comments: true,
    presets: [
      '@babel/preset-typescript',
      [
        '@babel/preset-env',
        {
          targets: {node: true},
        },
      ],
    ],
    sourceMaps: true,
  };

  return config;
};
