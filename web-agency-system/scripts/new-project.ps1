# New Project Script
# Creates a new client project folder with all templates and system files
#
# Usage: .\new-project.ps1 -Name "client-name"
# Example: .\new-project.ps1 -Name "helsinki-heat"

param(
    [Parameter(Mandatory=$true)]
    [string]$Name
)

$SystemDir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$ProjectDir = Join-Path (Split-Path -Parent $SystemDir) $Name

if (Test-Path $ProjectDir) {
    Write-Host "ERROR: Project folder '$Name' already exists at $ProjectDir" -ForegroundColor Red
    exit 1
}

Write-Host "Creating project: $Name" -ForegroundColor Cyan
Write-Host "Location: $ProjectDir" -ForegroundColor Gray

# Create project structure
$folders = @(
    $ProjectDir,
    (Join-Path $ProjectDir "media"),
    (Join-Path $ProjectDir "css"),
    (Join-Path $ProjectDir "js"),
    (Join-Path $ProjectDir "images"),
    (Join-Path $ProjectDir ".claude\skills\competitor-research"),
    (Join-Path $ProjectDir ".claude\skills\conversion-copy"),
    (Join-Path $ProjectDir ".claude\skills\build-orchestration"),
    (Join-Path $ProjectDir "reference")
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
}

# Copy templates
Copy-Item (Join-Path $SystemDir "templates\CLIENT_BRIEF.md") (Join-Path $ProjectDir "CLIENT_BRIEF.md")
Copy-Item (Join-Path $SystemDir "templates\MEDIA.md") (Join-Path $ProjectDir "MEDIA.md")

# Copy CLAUDE.md
Copy-Item (Join-Path $SystemDir "CLAUDE.md") (Join-Path $ProjectDir "CLAUDE.md")

# Copy skills
Copy-Item (Join-Path $SystemDir ".claude\skills\competitor-research\SKILL.md") (Join-Path $ProjectDir ".claude\skills\competitor-research\SKILL.md")
Copy-Item (Join-Path $SystemDir ".claude\skills\conversion-copy\SKILL.md") (Join-Path $ProjectDir ".claude\skills\conversion-copy\SKILL.md")
Copy-Item (Join-Path $SystemDir ".claude\skills\build-orchestration\SKILL.md") (Join-Path $ProjectDir ".claude\skills\build-orchestration\SKILL.md")

# Copy checklist
Copy-Item (Join-Path $SystemDir "reference\CHECKLIST.md") (Join-Path $ProjectDir "reference\CHECKLIST.md")

# Copy design-systems folder (symlink to save space, fallback to copy)
$designSrc = Join-Path $SystemDir "design-systems"
$designDst = Join-Path $ProjectDir "design-systems"
if (Test-Path $designSrc) {
    try {
        New-Item -ItemType SymbolicLink -Path $designDst -Target $designSrc -ErrorAction Stop | Out-Null
        Write-Host "  Linked design-systems (shared)" -ForegroundColor Gray
    } catch {
        Copy-Item $designSrc $designDst -Recurse
        Write-Host "  Copied design-systems (symlink failed, full copy)" -ForegroundColor Yellow
    }
}

# Copy deploy script
$deployScriptSrc = Join-Path $SystemDir "scripts\deploy.ps1"
if (Test-Path $deployScriptSrc) {
    $deployScriptDst = Join-Path $ProjectDir "scripts"
    New-Item -ItemType Directory -Force -Path $deployScriptDst | Out-Null
    Copy-Item $deployScriptSrc (Join-Path $deployScriptDst "deploy.ps1")
}

Write-Host ""
Write-Host "Project '$Name' created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. cd $ProjectDir"
Write-Host "  2. Fill in CLIENT_BRIEF.md with client details"
Write-Host "  3. Drop client media into media/ and update MEDIA.md"
Write-Host "  4. Open Claude Code and start building"
Write-Host ""
Write-Host "In Claude Code, say:" -ForegroundColor Cyan
Write-Host '  "Read CLIENT_BRIEF.md and MEDIA.md, then build this website using the build-orchestration skill"'
