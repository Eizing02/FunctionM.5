$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$binDir = Join-Path $root "node_modules\.bin"

if (-not (Test-Path -LiteralPath $binDir)) {
  New-Item -ItemType Directory -Force -Path $binDir | Out-Null
}

$cmdPath = Join-Path $binDir "unzip.cmd"
$ps1Path = Join-Path $binDir "unzip.ps1"

@'
@ECHO off
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0unzip.ps1" %*
exit /b %ERRORLEVEL%
'@ | Set-Content -LiteralPath $cmdPath -Encoding ASCII

@'
$ErrorActionPreference = "Stop"

$zipPath = $null
$destination = (Get-Location).Path

for ($index = 0; $index -lt $args.Count; $index++) {
  $arg = [string]$args[$index]

  if ($arg -eq "-d") {
    $index++
    if ($index -ge $args.Count) {
      throw "unzip shim: -d requires a destination path"
    }
    $destination = [string]$args[$index]
    continue
  }

  if ($arg.StartsWith("-")) {
    continue
  }

  if ($null -eq $zipPath) {
    $zipPath = $arg
  }
}

if ($null -eq $zipPath) {
  throw "unzip shim: missing zip file path"
}

New-Item -ItemType Directory -Force -Path $destination | Out-Null
Expand-Archive -LiteralPath $zipPath -DestinationPath $destination -Force
'@ | Set-Content -LiteralPath $ps1Path -Encoding UTF8
