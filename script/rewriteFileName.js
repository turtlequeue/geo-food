const fs = require('fs')
const path = require('path')

const assetManifest = require('../dist/assetManifest.json')
const { publicPath } = require('../dist/stats.json')

const pathIndex = assetManifest['index.js']

const replaceFileName = s =>
  s
    .replace('/index.html', publicPath + 'index.html')
    .replace('/index.js', publicPath + pathIndex)
    .replace('__root', publicPath)

// replace filename in index.html
{
  const content = replaceFileName(
    fs.readFileSync(path.resolve(__dirname, '../src/index.html')).toString()
  )

  fs.writeFileSync(path.resolve(__dirname, '../dist/index.html'), content)
}

// replace filename in index.js
{
  const content = replaceFileName(
    fs.readFileSync(path.resolve(__dirname, '../dist/' + pathIndex)).toString()
  )

  fs.writeFileSync(path.resolve(__dirname, '../dist/' + pathIndex), content)
}
