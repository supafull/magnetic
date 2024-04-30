# #!/bin/bash
set -e

# This script:
# - disables ipv6
# - increases the max files
# - updates the system
# - installs basic packages
# - installs docker
# - installs helm, kubectl, k3d and updates the repos
# - installs asdf
# - installs nodejs
# - installs mkcert and copies the certs to the windows machine

echo -e "\nnet.ipv6.conf.all.disable_ipv6=1\nnet.ipv6.conf.default.disable_ipv6=1\nnet.ipv6.conf.lo.disable_ipv6=1\n" | sudo tee -a /etc/sysctl.conf
# increase the max files, this is required for node watching files (autoreload)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

# # # Basic distro and plumbing stuff
sudo apt update && sudo apt -y dist-upgrade && sudo apt -y autoremove
sudo apt install -y build-essential git mkcert libnss3-tools libnss-myhostname wireguard wget \
  apt-transport-https ca-certificates curl gnupg lsb-release libssl-dev zlib1g-dev libbz2-dev libreadline-dev \
  libreadline8 libsqlite3-dev libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev \
  dirmngr gpg gawk jq python3-dev python-is-python3 python3-venv libsqlite3-dev llvm libncursesw5-dev \
  neovim libyaml-dev zip

sudo install -d /usr/share/postgresql-common/pgdg
sudo curl -o /usr/share/postgresql-common/pgdg/apt.postgresql.org.asc \
  --fail https://www.postgresql.org/media/keys/ACCC4CF8.asc
sudo sh -c 'echo "deb [signed-by=/usr/share/postgresql-common/pgdg/apt.postgresql.org.asc] https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
sudo apt update && sudo apt install -y postgresql-client-16

. /etc/os-release

sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $VERSION_CODENAME stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

getent group docker || sudo groupadd docker
sudo usermod -aG docker $USER

sudo snap install helm --classic
sudo snap install kubectl --classic
curl -s https://raw.githubusercontent.com/k3d-io/k3d/main/install.sh | bash

# Other clients
sudo snap install http
sudo snap install helm --classic
sudo snap install kubectl --classic

helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo add supapull https://supapull.github.io/helm-charts
helm repo update

# asdf
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.14.0
source $HOME/.asdf/asdf.sh

## setup minimal asdf
## make sure node deps are installed
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
asdf install nodejs latest:20  # or whatever

## then for getting certs from wsl validated for windows browsers
mkcert -install
cp /usr/local/share/ca-certificates/*.crt /mnt/c/Users/$USER/Documents/
explorer.exe /mnt/c/Users/$USER/Documents/

# Now go to the file you just copied in the Windows explorer, go to Documents, and double-click the
# file you just copied. Choose either of Current user or Local machine (either are fine). Choose Place
# all certificates in the following store, browse and install the to Trusted Root Certification Authorities.
# Accept the confirmation screens.
