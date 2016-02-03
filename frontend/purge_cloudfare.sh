#!/bin/bash
curl https://www.cloudflare.com/api_json.html \
  -d 'a=fpurge_ts' \
  -d 'email=dvdhsu@gmail.com' \
  -d 'tkn=d553c120d690b4aee78124b0ab4584f48f69a' \
  -d 'z=oatpay.com' \
  -d 'v=1'
