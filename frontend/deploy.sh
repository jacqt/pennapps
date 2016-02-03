#!/bin/bash
ssh deployer@129.67.36.198  "cd /srv/pennapps/frontend && git pull && npm install && npm run deploy && ./purge_cloudfare.sh"
