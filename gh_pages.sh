git checkout master
yarn build
mkdir ../temp_snake_react
cp -r build/* ../temp_snake_react/
git checkout gh-pages
cp -r ../temp_snake_react/* ./
git add .
git commit -m "page update - `date`"
git push origin gh-pages --no-verify
rm -rf ../temp_snake_react
git checkout master