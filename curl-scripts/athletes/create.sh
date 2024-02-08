#!/bin/bash

API="http://localhost:8000"
URL_PATH="/athletes"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "athlete": {
        "name": "Travis Kelce",
        "sport": "Football",
        "position": "Tight End",
        "currentTeam": "Kansas City Chiefs",
        "jerseyNumber": 87,
        "active": true
    }
  }'

echo
