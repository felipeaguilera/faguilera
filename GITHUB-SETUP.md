# GitHub auto-deploy, setup (para la próxima sesión)

Ya está listo el workflow (`.github/workflows/deploy.yml`) y el `.gitignore`. Falta solo la parte que necesita tu cuenta. Pasos (~15 min):

1. **Crea el repo** en GitHub (privado), por ejemplo `faguilera-web`.
2. En esta carpeta `web/`, inicializa git y sube:
   ```
   git init
   git add .
   git commit -m "faguilera.com inicial"
   git branch -M main
   git remote add origin git@github.com:TU_USUARIO/faguilera-web.git
   git push -u origin main
   ```
3. **Crea una cuenta FTP** en cPanel (FTP Accounts) limitada a la carpeta `faguilera.com`. Anota usuario y contraseña.
4. En GitHub: **Settings > Secrets and variables > Actions**, agrega tres secrets:
   - `FTP_SERVER` = `premium345.web-hosting.com`
   - `FTP_USERNAME` = el usuario de la cuenta FTP del paso 3
   - `FTP_PASSWORD` = la contraseña de esa cuenta
5. Si usas una cuenta FTP dedicada a `faguilera.com`, deja `server-dir: ./` en el workflow. Si usaras la cuenta principal de cPanel, cámbialo a `server-dir: /faguilera.com/`.

Desde ahí: cada `git push` publica solo, y tienes historial de versiones. El deploy por SFTP en VSCode sigue funcionando como respaldo si lo necesitas.

Nota: GitHub Actions usa FTP (con contraseña en secrets), distinto de tu llave SSH local. Por eso se crea una cuenta FTP dedicada en vez de usar tu llave.
