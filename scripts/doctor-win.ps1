$ErrorActionPreference = "Stop"
. "$PSScriptRoot\ruby-devkit.ps1"

$rubyRoot = Ensure-RubyDevKit
$ridk = Join-Path $rubyRoot "bin\ridk.cmd"

Write-Host "Ruby root: $rubyRoot"
Write-Host "RIDK: $ridk"

$checkCmd = '"' + $ridk + '" exec where ruby && "' + $ridk + '" exec where ridk'
cmd /c $checkCmd
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}
