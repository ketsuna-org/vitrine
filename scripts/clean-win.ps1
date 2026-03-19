$ErrorActionPreference = "Stop"
. "$PSScriptRoot\ruby-devkit.ps1"

Invoke-RidkCommand "bundle _2.6.9_ exec jekyll clean"
