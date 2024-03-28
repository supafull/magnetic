#! /bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
source ${SCRIPT_DIR}/../../vars.sh

domain_tls () {
  DOMAIN=$1
  CERT_NAME=$2
  CERT=${APPNAME}-${CERT_NAME}-cert
  echo "--- trying to (re)create secret for ${DOMAIN}"
  kubectl -n ${NAMESPACE} delete secret ${CERT} --ignore-not-found
  echo '---'
  mkcert -cert-file ${SCRIPT_DIR}/local-secrets/${DOMAIN}.pem -key-file ${SCRIPT_DIR}/local-secrets/${DOMAIN}-key.pem ${DOMAIN}
  kubectl -n ${NAMESPACE} create secret tls ${CERT} --key ${SCRIPT_DIR}/local-secrets/${DOMAIN}-key.pem --cert ${SCRIPT_DIR}/local-secrets/${DOMAIN}.pem
  echo "--- Hopefully (re)created ${DOMAIN}"
}

echo '---'
kubectl create namespace ${NAMESPACE}

domain_tls ${LOCALHOST_NAME} ${APPNAME}
domain_tls supabase.localhost supabase
domain_tls supabase-studio.localhost supabase-studio

echo '---'
kubectl -n ${NAMESPACE} apply -f ${SCRIPT_DIR}/secrets
