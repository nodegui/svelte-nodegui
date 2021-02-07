#!/usr/bin/env bash

while true
do
    eval $@
    [ $? -ne 64 ] && break
done
