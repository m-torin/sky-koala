# Used for removing all generated artifacts for sharing or debugging
# Made for macOs, may not work as expected on other systems

tee >(logger) <<< "Removing build directories"
rm -rf `find . -type d -name .cache`
rm -rf `find . -type d -name .next`
rm -rf `find . -type d -name .turbo`
rm -rf `find . -type d -name build`
rm -rf `find . -type d -name dist`

tee >(logger) <<< "Removing node modules"
rm -rf `find . -type d -name node_modules`
yarn cache clean --all
rm -rf yarn.lock && touch yarn.lock
# rm -rf .yarn/cache # uncomment this if nothing else is working; slow

tee >(logger) <<< "Reinstalling dependencies"
yarn install

tee >(logger) <<< "Rebuilding"
yarn build

tee >(logger) <<< "Linting"
yarn format
