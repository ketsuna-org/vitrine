$ErrorActionPreference = "Stop"
. "$PSScriptRoot\ruby-devkit.ps1"

Invoke-RidkCommand "bundle _2.6.3_ exec jekyll clean"
