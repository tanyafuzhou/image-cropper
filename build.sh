rm -rf docs
mkdir docs
cp -R libs docs/libs
./node_modules/.bin/webpack --config webpack.config.js --progress --colors