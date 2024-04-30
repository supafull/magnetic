#!/bin/bash

pnpm install
pnpm client:generate
sed -i '1s;^;// @ts-nocheck\n;' src/generated/client/index.ts  # hopefully this won't be necessary soon!!!
