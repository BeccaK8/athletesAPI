#!/bin/sh

API="http://localhost:8000"
URL_PATH="/athletes"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \

echo
