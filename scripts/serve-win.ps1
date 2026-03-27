param(
  [switch]$Lan
)

$ErrorActionPreference = "Stop"
. "$PSScriptRoot\ruby-devkit.ps1"

$hostArg = "127.0.0.1"
if ($Lan) {
  $hostArg = "0.0.0.0"
}

Invoke-RidkCommand "bundle _2.6.9_ exec jekyll serve --livereload --host $hostArg --port 4000"
