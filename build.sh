rm -rf docs
mkdir docs
cp -R libs docs/libs
cp -R demo/images docs/images
./node_modules/.bin/webpack --config webpack.config.js --progress --colors