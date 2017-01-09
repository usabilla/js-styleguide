#!/bin/bash
set -ex

if [ ! -e ~/.yarn ]; then
  curl -o- -L https://yarnpkg.com/install.sh | TERM=xterm bash;
else
  echo "Yarn already installed";
  echo "Adding yarn to .bashrc"
  if [ -f ~/.bashrc ]; then
    echo 'export PATH="$HOME/.yarn/bin:$PATH"' >> $HOME/.bashrc
  else
    echo ".bashrc not found"
  fi
fi;
