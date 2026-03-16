# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**NetShell** — A bilingual (EN/BG) portfolio/business website for NetShell Ltd (НЕТШЕЛ ЕООД), built on [Grav CMS](https://getgrav.org/) — a flat-file CMS (no database required).

## Commands

```bash
# Install dependencies
composer install

# Start local dev server
php -S localhost:8888 system/router.php
# Visit: http://localhost:8888/en or http://localhost:8888/bg
# Admin:  http://localhost:8888/admin (admin / Admin@12345)

# Run tests
composer test                  # Unit tests via Codeception
vendor/bin/codecept run        # Full test suite

# Static analysis
composer phpstan               # Level 2 analysis
```

## Architecture

### CMS & Content

Grav is a **flat-file CMS** — all content lives as Markdown files in `user/pages/`, with no database. The homepage uses a modular structure under `user/pages/01.home/`:

```
01._hero/       02._services/    03._portfolio/
04._opensource/ 05._about/       06._contact/
```

Each section has two content variants: `.en.md` and `.bg.md` for bilingual support, managed via the `langswitcher` plugin.

### Custom Theme: `user/themes/netshell/`

- **Templates** (`templates/`) — Twig templates mirroring page types
- **CSS** (`css/`) — Hand-written CSS3 with media queries
- **JS** (`js/`) — Vanilla JS for scroll-triggered nav, scroll-reveal animations, and mobile menu
- **Blueprint/Config** — `blueprints.yaml`, `netshell.yaml`, `netshell.php`

### Configuration

All site-level config lives in `user/config/`:
- `system.yaml` — cache, Twig settings, asset pipeline, debugger
- `site.yaml` — title, author, SEO metadata
- `languages.yaml` — bilingual (en/bg) config

### Key Dev vs Prod Settings (`user/config/system.yaml`)

| Setting | Dev | Prod |
|---|---|---|
| `cache.enabled` | false | true |
| `errors.display` | true | false |
| `debugger.enabled` | true | false |

### Plugins

Active plugins (in `user/config/plugins/`): `admin`, `email`, `error`, `flex-objects`, `form`, `langswitcher`, `login`, `markdown-notices`, `problems`.

### PHP Requirements

PHP 8.1+, with extensions: `json`, `openssl`, `curl`, `zip`, `dom`, `gd`, `mbstring`, `iconv`.
