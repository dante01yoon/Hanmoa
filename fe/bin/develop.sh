#!/bin/sh
":" //# See http://sambal.org/?p=1014.; exec /usr/bin/env node --max-old-space-size=4096 --inspect "$0" "$@"

require("dotenv").config();
