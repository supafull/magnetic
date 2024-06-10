#!/bin/bash

set -e

if [ -n "$(git status --porcelain)" ]; then
  echo "Please ensure there are no changes or untracked files before rebuilding"
  exit 1
fi

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
source ${SCRIPT_DIR}/vars.sh

[[ ! -z $(k3d cluster list ${APPNAME} | grep '0/1') ]] && k3d cluster stop --all && k3d cluster start ${APPNAME}

kubectl config use-context k3d-${APPNAME}

# Delete the images on the node - not the registry!
# docker exec k3d-project-server-0 sh -c 'ctr image rm $(ctr image list -q)'

TAG=${PROJECT_BUILD_TAG:-${GIT_VERSION}}

for project in ${PROJECTS}; do
  echo "Building image with context ${SCRIPT_DIR}/${project} with docker file ${SCRIPT_DIR}/${project}/Dockerfile"
  FULL_TAG=${LOCAL_REGISTRY}/${APPNAME}/${APPNAME}-${project}:${TAG}

  docker build ${SCRIPT_DIR}/${project} --network host -f ${SCRIPT_DIR}/${project}/Dockerfile \
    -t ${FULL_TAG} \
    --build-arg ENVIRONMENT=${ENVIRONMENT} \
    --build-arg GIT_VERSION=${GIT_VERSION}

  docker push ${FULL_TAG}
done

helm upgrade --install ${APPNAME} \
  --wait \
  --timeout 30m00s \
  ${SCRIPT_DIR}/kube/chart/${APPNAME}/ --namespace ${NAMESPACE} \
  --set frontend.image.tag="${GIT_VERSION}" \
  --set supabase.functions.image.tag="${GIT_VERSION}" \
  -f ${SCRIPT_DIR}/kube/k3d-deploy/overrides-dev.yaml
