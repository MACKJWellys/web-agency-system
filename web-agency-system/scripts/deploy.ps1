# Deploy to Hostinger via SFTP
#
# Usage: .\deploy.ps1 -Host "ftp.yourdomain.com" -User "u123456789" -Pass "password" -LocalPath "." -RemotePath "/public_html"
#
# For first-time setup, you can find your SFTP credentials in:
# Hostinger hPanel → Websites → Manage → Files → FTP Accounts
#
# You can also save credentials to a .env file in the project root (git-ignored):
#   HOSTINGER_HOST=ftp.yourdomain.com
#   HOSTINGER_USER=u123456789
#   HOSTINGER_PASS=yourpassword
#   HOSTINGER_PATH=/public_html

param(
    [string]$HostName,
    [string]$User,
    [string]$Pass,
    [string]$LocalPath = ".",
    [string]$RemotePath = "/public_html",
    [int]$Port = 22
)

# Try loading from .env if params not provided
$envFile = Join-Path $LocalPath ".env"
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^(\w+)=(.*)$') {
            $key = $matches[1]
            $val = $matches[2]
            switch ($key) {
                "HOSTINGER_HOST" { if (-not $HostName) { $HostName = $val } }
                "HOSTINGER_USER" { if (-not $User) { $User = $val } }
                "HOSTINGER_PASS" { if (-not $Pass) { $Pass = $val } }
                "HOSTINGER_PATH" { if ($RemotePath -eq "/public_html") { $RemotePath = $val } }
            }
        }
    }
}

if (-not $HostName -or -not $User -or -not $Pass) {
    Write-Host "ERROR: Missing credentials. Provide via parameters or .env file." -ForegroundColor Red
    Write-Host ""
    Write-Host "Usage:" -ForegroundColor Yellow
    Write-Host '  .\deploy.ps1 -HostName "ftp.domain.com" -User "u123" -Pass "pass"'
    Write-Host ""
    Write-Host "Or create a .env file with:" -ForegroundColor Yellow
    Write-Host "  HOSTINGER_HOST=ftp.domain.com"
    Write-Host "  HOSTINGER_USER=u123456789"
    Write-Host "  HOSTINGER_PASS=yourpassword"
    exit 1
}

# Files and folders to upload (skip system files)
$excludePatterns = @(
    ".claude",
    ".env",
    "CLAUDE.md",
    "CLIENT_BRIEF.md",
    "MEDIA.md",
    "COMPETITOR_ANALYSIS.md",
    "design-systems",
    "reference",
    "scripts",
    "templates",
    "media",
    "node_modules",
    ".git"
)

Write-Host "Deploying to Hostinger..." -ForegroundColor Cyan
Write-Host "  Host: $HostName" -ForegroundColor Gray
Write-Host "  Remote: $RemotePath" -ForegroundColor Gray
Write-Host "  Local: $LocalPath" -ForegroundColor Gray

# Check if WinSCP is available (preferred for Windows SFTP)
$winscpPath = Get-Command WinSCP.com -ErrorAction SilentlyContinue

if ($winscpPath) {
    # WinSCP deployment
    $excludeArgs = ($excludePatterns | ForEach-Object { "$_" }) -join "; "

    $script = @"
open sftp://${User}:${Pass}@${HostName}:${Port}/ -hostkey=*
synchronize remote "$LocalPath" "$RemotePath" -filemask="|$excludeArgs"
exit
"@

    $script | & WinSCP.com /script=/dev/stdin
} else {
    # Fallback: use scp if available (Git for Windows includes it)
    $scpPath = Get-Command scp -ErrorAction SilentlyContinue

    if ($scpPath) {
        Write-Host "Using scp for deployment..." -ForegroundColor Gray

        # Get deployable files
        $files = Get-ChildItem $LocalPath -Recurse -File | Where-Object {
            $relativePath = $_.FullName.Substring((Resolve-Path $LocalPath).Path.Length + 1)
            $exclude = $false
            foreach ($pattern in $excludePatterns) {
                if ($relativePath -like "$pattern*") { $exclude = $true; break }
            }
            -not $exclude
        }

        Write-Host "  Files to deploy: $($files.Count)" -ForegroundColor Gray

        foreach ($file in $files) {
            $relativePath = $file.FullName.Substring((Resolve-Path $LocalPath).Path.Length + 1).Replace('\', '/')
            $remoteFile = "$RemotePath/$relativePath"
            Write-Host "  Uploading: $relativePath" -ForegroundColor Gray
            & scp -P $Port $file.FullName "${User}@${HostName}:${remoteFile}"
        }
    } else {
        Write-Host ""
        Write-Host "No SFTP client found. Install one of these:" -ForegroundColor Yellow
        Write-Host "  Option 1: WinSCP (recommended) — https://winscp.net/eng/download.php"
        Write-Host "  Option 2: Git for Windows (includes scp) — https://git-scm.com"
        Write-Host ""
        Write-Host "Or upload manually via Hostinger File Manager:" -ForegroundColor Yellow
        Write-Host "  1. Go to hPanel → Websites → Manage → Files → File Manager"
        Write-Host "  2. Navigate to public_html"
        Write-Host "  3. Upload these files:" -ForegroundColor Gray

        Get-ChildItem $LocalPath -Recurse -File | Where-Object {
            $relativePath = $_.FullName.Substring((Resolve-Path $LocalPath).Path.Length + 1)
            $exclude = $false
            foreach ($pattern in $excludePatterns) {
                if ($relativePath -like "$pattern*") { $exclude = $true; break }
            }
            -not $exclude
        } | ForEach-Object {
            $rel = $_.FullName.Substring((Resolve-Path $LocalPath).Path.Length + 1)
            Write-Host "     $rel"
        }

        exit 1
    }
}

Write-Host ""
Write-Host "Deployment complete!" -ForegroundColor Green
