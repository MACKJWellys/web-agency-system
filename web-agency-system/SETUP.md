# Web Agency System — Setup Guide

Follow these steps to set up the system on a new machine. Takes about 20-30 minutes.

---

## Prerequisites

- [Claude Code](https://claude.com/claude-code) installed and authenticated
- A [Firecrawl](https://www.firecrawl.dev/) account and API key
- Google Chrome with [Claude in Chrome](https://chromewebstore.google.com/detail/claude/cpeldbollclaggpjcmidnpdpgjclbghb) extension installed
- Git (for cloning design systems)

---

## Step 1: Copy the system folder

Copy the entire `web-agency-system/` folder to the new machine. Put it somewhere permanent — your Desktop or a dedicated `projects/` folder. All client projects will be created alongside it.

```
Desktop/
├── web-agency-system/    ← this folder (the system)
├── client-project-1/     ← created by new-project script
├── client-project-2/     ← created by new-project script
└── ...
```

---

## Step 2: Clone the design systems library

Open a terminal in the `web-agency-system/` folder and run:

```powershell
git clone https://github.com/VoltAgent/awesome-design-md.git design-systems
```

This downloads 71+ real brand design systems as DESIGN.md files. Browse them in `design-systems/design-md/` to see what's available — each subfolder is a brand name (airbnb, apple, stripe, linear, etc.).

---

## Step 3: Install Claude Code skills (plugins)

Open Claude Code in any folder and install these community skills:

```
/plugin
```

Search for and install:
1. **UI/UX Pro Max** — design intelligence (50+ styles, 161 palettes, 57 font pairings)
2. **Google Fonts** — typography search across 1,923 fonts
3. **SVG Specialist** — professional vector graphics generation

These are global skills — once installed, they're available in every project.

The three custom skills (competitor-research, conversion-copy, build-orchestration) are project-scoped and get copied into each project automatically by the new-project script.

---

## Step 4: Configure MCP servers

You need to add MCP server configurations so Claude Code can use Firecrawl and browser tools.

### Option A: Global config (recommended — works across all projects)

Open your global Claude Code settings:
```
Windows: %APPDATA%\Claude\settings.json
Mac: ~/.claude/settings.json
```

Add the following to the `mcpServers` section (create it if it doesn't exist):

```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "your-firecrawl-api-key-here"
      }
    }
  }
}
```

### Option B: Per-project config

Create `.claude/settings.json` in the project folder with the same content.

### Chrome DevTools MCP (optional but recommended)

Follow the setup guide at https://github.com/ChromeDevTools/chrome-devtools-mcp to connect Claude Code to Chrome for live debugging.

### Web-to-MCP (optional)

1. Install the Chrome extension: https://chromewebstore.google.com/detail/web-to-mcp/hbnhkfkblpgjlfonnikijlofeiabolmi
2. Sign in with your Google account
3. Get your MCP URL from the extension
4. Add to your settings.json mcpServers section

---

## Step 5: Install WinSCP (for deployment)

The deploy script works best with WinSCP CLI:
1. Download from https://winscp.net/eng/download.php
2. Install with the "Add to PATH" option checked
3. Verify: open PowerShell and run `WinSCP.com --version`

Alternative: the deploy script also works with `scp` (included with Git for Windows).

---

## Step 6: Get your Hostinger SFTP credentials

1. Log into Hostinger hPanel
2. Go to Websites → Manage → Files → FTP Accounts
3. Note down: hostname, username, password
4. You'll enter these per-project in a `.env` file or pass them to the deploy script

---

## Usage: Creating a new project

```powershell
cd web-agency-system\scripts
.\new-project.ps1 -Name "client-name"
```

This creates a new folder alongside the system with all templates, skills, and the CLAUDE.md pre-copied. Then:

1. `cd ..\client-name`
2. Fill in `CLIENT_BRIEF.md` with client details
3. Drop client media into `media/` and update `MEDIA.md`
4. Open Claude Code: `claude`
5. Say: *"Read CLIENT_BRIEF.md and MEDIA.md, then build this website using the build-orchestration skill"*

Claude Code will:
- Research competitors (Firecrawl)
- Assemble a design system (from real brand references)
- Build the full site with animations, copy, SEO
- Preview in browser for your review
- Deploy to Hostinger when you approve

---

## Folder reference

```
web-agency-system/
├── CLAUDE.md                              # Master instructions (copied to each project)
├── SETUP.md                               # This file
├── templates/
│   ├── CLIENT_BRIEF.md                    # Client intake template
│   └── MEDIA.md                           # Media catalogue template
├── scripts/
│   ├── new-project.ps1                    # Creates new project folders
│   └── deploy.ps1                         # Deploys to Hostinger via SFTP
├── .claude/
│   └── skills/
│       ├── competitor-research/SKILL.md   # Firecrawl competitor analysis
│       ├── conversion-copy/SKILL.md       # PAS copywriting framework
│       └── build-orchestration/SKILL.md   # Master build coordination
├── design-systems/                        # Cloned from awesome-design-md
│   └── design-md/                         # 71+ real brand DESIGN.md files
└── reference/
    └── CHECKLIST.md                       # Quality checklist (copied to each project)
```

---

## Troubleshooting

**Firecrawl not working?**
- Check your API key is correct in settings.json
- Run `npx firecrawl-mcp` manually to test
- Free tier has rate limits — if scraping fails, wait and retry

**Skills not showing up?**
- Custom skills: must be in `.claude/skills/[name]/SKILL.md` in the project folder
- Plugin skills: run `/plugin` to verify they're installed
- Restart Claude Code after installing skills

**Design systems folder empty?**
- Run the git clone command from Step 2
- Check you're in the `web-agency-system/` folder when cloning

**Deploy script fails?**
- Check SFTP credentials (try connecting with FileZilla first)
- Hostinger may block connections from some IPs — try from a different network
- Fallback: upload manually via Hostinger File Manager

**Fonts not loading?**
- Check Google Fonts link is in the `<head>` tag
- Verify the font family name matches exactly (case-sensitive)
- Add `<link rel="preconnect" href="https://fonts.googleapis.com">` before the font link

---

## Updating the system

When you improve the CLAUDE.md, skills, or templates:
1. Edit them in the `web-agency-system/` folder (the master copy)
2. New projects will automatically get the updated versions
3. Existing projects keep their original versions (don't update mid-build)

To update design systems:
```powershell
cd web-agency-system\design-systems
git pull
```
