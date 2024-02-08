#!/bin/sh

API="http://localhost:8000"
URL_PATH="/athletes"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \

echo
