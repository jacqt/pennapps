#!/bin/bash

# See https://sipb.mit.edu/doc/safe-shell/
set -euf -o pipefail

RED="\e[31m"
GREEN="\e[32m"
NORMAL="\e[0m"
GREY="\e[37m"
LIGHTBLUE="\e[94m"

SSH_SERVER="deployer@cashew-staging"
TAR_DEST="~/oatpay-tars"
SITE_DIR="/srv/braintree_client/static_site"

echo -e "Generating bundle.js ...$LIGHTBLUE"
npm run deploy
echo -e "$GREEN Generated bundle.js $NORMAL"

echo -e "Generating tar package...$LIGHTBLUE"
# current commit
commit="$(git log | head -n 1 | cut -d ' ' -f 2 | cut -c1-10)" || true
tarball="cashew-oatpay.$commit.tgz"
tar -cvf $tarball dist

echo -e "$GREEN Generated tar ball $tarball $NORMAL"

echo -e "Copying tar ball...$LIGHTBLUE"
scp "./$tarball" $SSH_SERVER:$TAR_DEST
echo -e "$GREEN Copied tar ball $NORMAL"

echo -e "Deploying tar ball...$LIGHTBLUE"
ssh $SSH_SERVER "tar -xvf $TAR_DEST/$tarball --directory $TAR_DEST"
ssh $SSH_SERVER "rm -rf $SITE_DIR && mkdir $SITE_DIR && mv $TAR_DEST/dist/* $SITE_DIR"
echo -e "$GREEN Deployed tar ball to $SITE_DIR $NORMAL"

rm $tarball
