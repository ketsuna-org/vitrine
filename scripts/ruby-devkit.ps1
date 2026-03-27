$ErrorActionPreference = "Stop"

function Get-RubyRoot {
  $roots = @(
    "C:\Ruby34-x64",
    "C:\Ruby33-x64",
    "C:\Ruby32-x64"
  )

  foreach ($root in $roots) {
    if (Test-Path (Join-Path $root "bin\ruby.exe")) {
      return $root
    }
  }

  return $null
}

function Ensure-RubyDevKit {
  $rubyRoot = Get-RubyRoot
  if ($rubyRoot) {
    return $rubyRoot
  }

  Write-Host "Ruby with DevKit not found. Installing via winget..."
  winget install --id RubyInstallerTeam.RubyWithDevKit.3.4 --accept-package-agreements --accept-source-agreements --silent

  $rubyRoot = Get-RubyRoot
  if (-not $rubyRoot) {
    throw "RubyWithDevKit installation failed or path not found."
  }

  return $rubyRoot
}

function Invoke-RidkCommand {
  param(
    [Parameter(Mandatory = $true)]
    [string]$CommandLine
  )

  $rubyRoot = Ensure-RubyDevKit
  $ridk = Join-Path $rubyRoot "bin\ridk.cmd"
  if (-not (Test-Path $ridk)) {
    throw "ridk.cmd not found in $rubyRoot"
  }

  $cmd = '"' + $ridk + '" exec ' + $CommandLine
  cmd /c $cmd
  if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
  }
}
