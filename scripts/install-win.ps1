$ErrorActionPreference = "Stop"
. "$PSScriptRoot\ruby-devkit.ps1"

Invoke-RidkCommand "gem install bundler -v 2.6.3 --no-document"
Invoke-RidkCommand "bundle _2.6.3_ config set path .bundle/vendor"
Invoke-RidkCommand "bundle _2.6.3_ install"
npm ci
