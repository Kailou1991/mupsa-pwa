# MuPsA Terrain PWA

Application PWA mobile-first en JavaScript vanilla (Vite), avec i18n FR/AR (RTL) et fonctionnement offline-first.

## 1) Prérequis

- Node.js 18+ (recommandé)
- npm
- mkcert (pour HTTPS local)
- PC et téléphone Android sur le même réseau Wi-Fi

## 2) Structure HTTPS locale

Le projet attend les certificats ici :

- `certs/key.pem`
- `certs/cert.pem`

## 3) Générer les certificats HTTPS avec mkcert (Windows)

1. Installer mkcert (au choix) :

```powershell
winget install FiloSottile.mkcert
```

2. Installer l'autorité locale mkcert :

```powershell
mkcert -install
```

3. Se placer dans le dossier `certs` du projet puis générer le certificat :

```powershell
cd E:\appMupsa\pwa_app\certs
mkcert -key-file key.pem -cert-file cert.pem localhost 127.0.0.1 192.168.1.14
```

Remplacer `192.168.1.14` par l'IP locale réelle de votre PC.

## 4) Lancer l'application

Depuis `E:\appMupsa\pwa_app` :

```bash
npm install
npm run dev
```

Vite sert alors en HTTPS sur le réseau local (`0.0.0.0:5173`).

Exemples d'URL :

- `https://localhost:5173`
- `https://127.0.0.1:5173`
- `https://192.168.1.14:5173`

## 5) Preview HTTPS

```bash
npm run build
npm run preview
```

Preview est aussi servi en HTTPS (`0.0.0.0:4173`).

## 6) Tester l'installation sur Android

1. Vérifier que le téléphone Android est sur le même Wi-Fi que le PC.
2. Ouvrir l'URL HTTPS locale dans Chrome Android, par exemple :
   `https://192.168.1.14:5173`
3. Vérifier que la page est chargée en contexte sécurisé HTTPS.
4. Attendre la proposition Chrome d'installation ou utiliser le menu `Installer l'application`.
5. Installer l'application.

L'installation se fait en mode **PWA / WebAPK** via Chrome, pas en APK natif.

## 7) Vérification offline

1. Ouvrir l'app, naviguer sur plusieurs écrans pour remplir le cache.
2. Couper le réseau (mode avion).
3. Vérifier que l'application reste utilisable hors connexion.

## 8) Manifest PWA attendu

Les champs suivants sont configurés :

- `name: MuPsA`
- `short_name: MuPsA`
- `start_url: /`
- `display: standalone`
- `orientation: portrait`
- `background_color: #F4F6F8`
- `theme_color: #0F6B43`

## 9) Emplacement des JSON et images

- `public/data/pwa_content.fr.final.json`
- `public/data/pwa_content.ar.final.json`
- `public/data/pwa_final_manifest.json`
- `public/images/*`
- `public/thumbs/*`
- `public/logo/omsa.png`
- `public/logo/praps.jpg`

## 10) Rendre le certificat HTTPS fiable sur Android

Si Chrome Android affiche un avertissement, le problème vient généralement de la CA locale non installée sur le téléphone.

1. Sur le PC Windows, réinitialiser/installer la CA mkcert :

```powershell
mkcert -uninstall
mkcert -install
```

2. Récupérer le dossier CA mkcert :

```powershell
mkcert -CAROOT
```

3. Copier `rootCA.pem` (dans ce dossier) vers le téléphone Android.

4. Installer cette CA sur Android :

- Paramètres > Sécurité > Chiffrement et identifiants
- Installer un certificat > Certificat CA
- Sélectionner `rootCA.pem`

5. Regénérer le certificat du projet avec l'IP locale exacte du PC :

```powershell
cd E:\appMupsa\pwa_app\certs
mkcert -key-file key.pem -cert-file cert.pem localhost 127.0.0.1 192.168.1.14
```

6. Relancer l'application :

```bash
cd E:\appMupsa\pwa_app
npm run dev
```

7. Ouvrir sur le téléphone :

- `https://192.168.1.14:5173`

Important : l'IP dans le certificat doit correspondre exactement à l'URL ouverte sur Android.

## 11) Générer un APK Android (Capacitor)

La PWA est maintenant encapsulée en projet Android natif via Capacitor (`android/`).

### Commandes

```bash
npm install
npm run apk:debug
```

APK debug attendu :

- `android/app/build/outputs/apk/debug/app-debug.apk`

### Commandes utiles

```bash
npm run android:sync
npm run android:open
```

## 12) Si la build APK échoue avec SSLHandshakeException (PKIX)

Exemple d'erreur :

- `PKIX path building failed`
- `unable to find valid certification path`

Cela vient du truststore Java/Gradle qui ne fait pas confiance au certificat TLS utilisé pour télécharger Gradle.

Correctifs recommandés :

1. Vérifier date/heure Windows.
2. Mettre à jour Java (JDK 17+) et Android Studio.
3. Dans un terminal admin, importer le certificat racine de votre réseau/proxy dans le truststore Java utilisé par Gradle.
4. Re-lancer :

```bash
cd E:\appMupsa\pwa_app\android
gradlew.bat --stop
gradlew.bat assembleDebug
```

Alternative rapide : ouvrir Android Studio via `npm run android:open` puis lancer `Build > Build APK(s)`.
