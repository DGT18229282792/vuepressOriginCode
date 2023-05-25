前言：这个缓存loader会将输入内容的哈希值作为缓存文件的名称，缓存文件存放在指定的目录中。如果缓存文件存在，就直接读取缓存文件的内容，避免重复执行相同的loader；如果缓存文件不存在，就执行loader的处理逻辑，并将结果写入缓存文件中。


```typescript

const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils');

const schema = {
  type: 'object',
  properties: {
    cacheDirectory: {
      type: 'string'
    }
  }
};

module.exports = function(source) {
  const options = getOptions(this) || {};
  validate(schema, options, {
    name: 'Cache Loader',
    baseDataPath: 'options'
  });

  const cacheDirectory = options.cacheDirectory || 'node_modules/.cache/cache-loader';

  const fs = require('fs');
  const path = require('path');
  const crypto = require('crypto');

  const hash = crypto.createHash('sha1');
  hash.update(source);
  const digest = hash.digest('hex');

  const cachePath = path.join(cacheDirectory, `${digest}.js`);

  if (fs.existsSync(cachePath)) {
    return fs.readFileSync(cachePath, 'utf-8');
  }

  const result = source;

  fs.mkdirSync(cacheDirectory, { recursive: true });
  fs.writeFileSync(cachePath, result, 'utf-8');

  return result;
};

```
使用：在使用这个缓存loader时，只需要在其他loader的前面加上这个loader即可
```typescript
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'cache-loader',
          'babel-loader'
        ],
        exclude: /node_modules/
      }
    ]
  }
  // ...
}

```



2023/5/25 DGT

