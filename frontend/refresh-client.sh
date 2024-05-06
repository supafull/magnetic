#!/bin/bash

pnpm install
pnpm client:generate

cp --update=none .env.example .env

sed -i 's/GRANT [^"]*//g' src/generated/client/pg-migrations.ts  # hopefully this won't be necessary soon!!!
