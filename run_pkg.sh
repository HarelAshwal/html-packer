#!/bin/bash
echo Your container args are: "$@"
pkg . -t node10-win
cp /work/html-packer.exe ./doc/
