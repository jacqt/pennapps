#!/bin/bash
ssh deployer@oatpay.com  "cd /srv/pennapps/frontend && git pull && npm run deploy && ./purge_cloudfare.sh"
