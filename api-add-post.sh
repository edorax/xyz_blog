#!/bin/bash
# -*- mode: shell-script; tab-width: 4; -*- # vim:ts=4

curl -s http://localhost:4000/api/posts \
  --data '{"title": "Test Test", "author": "me", "content": "hello world"}' \
  --header 'Content-Type: application/json' | json_pp

