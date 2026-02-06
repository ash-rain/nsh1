# NetShell — Portfolio & Business Website

GravCMS-powered bilingual (EN/BG) portfolio website for NetShell Ltd (НЕТШЕЛ ЕООД).

## Requirements

- PHP 8.1+
- Composer

## Local Development

```bash
# Install dependencies
composer install

# Start dev server
php -S localhost:8888 system/router.php
```

Visit `http://localhost:8888/en` (English) or `http://localhost:8888/bg` (Bulgarian).

Admin panel: `http://localhost:8888/admin`

## Deploy to Production (Apache/Nginx)

### Apache

1. Upload all files to your web root (e.g. `/var/www/netshell`).

2. Ensure `mod_rewrite` is enabled:
   ```bash
   sudo a2enmod rewrite
   sudo systemctl restart apache2
   ```

3. The `.htaccess` file is included with Grav. Verify your vhost allows overrides:
   ```apache
   <Directory /var/www/netshell>
       AllowOverride All
       Require all granted
   </Directory>
   ```

### Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/netshell;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~* /(\.git|cache|bin|logs|backup|tests)/.*$ { return 403; }
    location ~* /(system|vendor)/.*\.(txt|xml|md|html|json|yaml|yml|php|pl|py|cgi|twig|sh|bat)$ { return 403; }
    location ~* /user/.*\.(txt|md|json|yaml|yml|php|twig|sh|bat)$ { return 403; }

    location ~ \.php$ {
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
```

### File Permissions

```bash
chown -R www-data:www-data /var/www/netshell
find . -type f -exec chmod 664 {} \;
find . -type d -exec chmod 775 {} \;
find . -type d -exec chmod +s {} \;
```

### SSL (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## Deploy via Docker

```dockerfile
FROM php:8.3-apache
RUN a2enmod rewrite
COPY . /var/www/html/
RUN chown -R www-data:www-data /var/www/html
```

```bash
docker build -t netshell .
docker run -p 80:80 netshell
```

## Production Checklist

- [ ] Change admin password (`/admin` > user profile)
- [ ] Enable caching in `user/config/system.yaml` (`cache.enabled: true`)
- [ ] Set `errors.display: false`
- [ ] Set `debugger.enabled: false`
- [ ] Configure SSL
- [ ] Update `user/config/site.yaml` metadata for SEO

## Project Structure

```
user/
├── config/           # Site & system config (languages, theme selection)
├── pages/01.home/    # Modular homepage content (EN + BG)
│   ├── 01._hero/
│   ├── 02._services/
│   ├── 03._portfolio/
│   ├── 04._opensource/
│   ├── 05._about/
│   └── 06._contact/
└── themes/netshell/  # Custom theme
    ├── css/theme.css
    ├── js/theme.js
    ├── images/        # Portfolio screenshots
    ├── languages/     # EN/BG UI translations
    └── templates/     # Twig templates (modular sections)
```

## Editing Content

- **Via Admin:** Go to `/admin` and edit pages visually.
- **Via Files:** Edit markdown files in `user/pages/`. Each section has `.en.md` and `.bg.md` variants.

## Admin Credentials

- **User:** `admin`
- **Password:** `Admin@12345`

Change the password after first login in production.
