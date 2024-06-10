#!/bin/bash

source ../vars.sh

cp --update=none .env.example .env
pnpm install
pnpm db:migrate  # this will create the tables and electrify them
pnpm db:seed  # this will create the CRM data values and supabase users
