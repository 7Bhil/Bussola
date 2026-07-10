#!/usr/bin/env bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0;60m' # No Color
CLEAR='\033[0m'

echo -e "${BLUE}=== Initialisation des sous-projets Bussola ===${CLEAR}\n"

# Function to clone a repository if it doesn't exist
clone_repo() {
    local repo_url=$1
    local dest_dir=$2

    if [ -d "$dest_dir" ]; then
        echo -e "${YELLOW}[!] Le dossier '$dest_dir' existe déjà. Saut de l'étape de clonage.${CLEAR}"
    else
        echo -e "${BLUE}[i] Clonage de $repo_url dans '$dest_dir'...${CLEAR}"
        if git clone "$repo_url" "$dest_dir"; then
            echo -e "${GREEN}[✓] '$dest_dir' cloné avec succès.${CLEAR}\n"
        else
            echo -e "${RED}[✗] Échec du clonage de $repo_url.${CLEAR}\n"
            return 1
        fi
    fi
}

# Clone the three repositories
clone_repo "https://github.com/joboy05/BusolaAdmin" "admin"
clone_repo "https://github.com/joboy05/busola-server" "server"
clone_repo "https://github.com/joboy05/ONGBusola-front" "client"

echo -e "${GREEN}=== Configuration terminée avec succès ! ===${CLEAR}"
