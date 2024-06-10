#! /bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
source ${SCRIPT_DIR}/../../vars.sh


mkdir -p ${SCRIPT_DIR}/volumes

if [ -n "$(git status --porcelain)" ]; then
  echo "Please ensure there are no changes or untracked files before installing"
  exit 1
fi

# create the k3d registry if not present
if [ -z "$(k3d registry list | grep ${LOCAL_REGISTRY_NAME})" ];
then
  k3d registry create registry.localhost --port 0.0.0.0:$LOCAL_REGISTRY_PORT
fi

# make sure no other cluster is running
k3d cluster stop --all

k3d cluster create ${APPNAME} --config ${SCRIPT_DIR}/k3d-config.yml \
  --volume ${SCRIPT_DIR}/volumes:/opt/project/volumes@all \
  --volume ${SCRIPT_DIR}/../../functions/src:/functions@all \

mkdir -p ~/.kube
k3d kubeconfig merge ${APPNAME} --output ${KUBECONFIG}
kubectl --kubeconfig ${KUBECONFIG} config set-context k3d-${APPNAME} --namespace=${NAMESPACE}

# dockerhub and some other sites can be extremely slow over ipv6 in certain situations
docker exec -i k3d-${APPNAME}-server-0 sysctl -w net.ipv6.conf.all.disable_ipv6=1
