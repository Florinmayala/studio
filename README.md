# Festiva AI - Guide de Déploiement Simplifié

Ce projet est votre carte d'anniversaire personnalisée pour Blessing. Voici comment la mettre en ligne étape par étape.

## 1. Télécharger le code (Depuis l'éditeur)
1. Ne cherchez pas sur la carte elle-même. Regardez la **barre noire tout en haut de cette fenêtre** (l'interface Firebase Studio).
2. Dans le coin **en haut à droite**, cherchez l'icône **"Download"** (une flèche vers le bas dans un petit plateau).
3. Cliquez dessus pour obtenir un fichier `.zip`. Enregistrez-le sur votre ordinateur.
4. Faites un clic droit sur le fichier `.zip` et choisissez **"Extraire tout"**.

## 2. Préparer l'image de Blessing (Très important)
1. Ouvrez le dossier que vous venez d'extraire.
2. Cherchez le dossier nommé `public`.
3. Prenez votre photo `IMG_1292.JPG` et placez-la **à l'intérieur** de ce dossier `public`.
4. Vérifiez que le nom est bien `IMG_1292.JPG` (tout en majuscules).

## 3. Mettre votre code sur GitHub
1. **Installer GitHub Desktop** : Téléchargez-le sur [desktop.github.com](https://desktop.github.com/).
2. **Publier** :
   - Ouvrez GitHub Desktop.
   - Allez dans `File` > `Add Local Repository`.
   - Sélectionnez votre dossier de projet dézippé.
   - Cliquez sur le bouton bleu **"Publish Repository"**.

## 4. Déployer avec Firebase App Hosting
1. Allez sur la [Console Firebase](https://console.firebase.google.com/).
2. Dans le menu de gauche, allez dans **Build > App Hosting**.
3. Cliquez sur **Commencer** et connectez votre compte GitHub.
4. Sélectionnez votre dépôt et laissez les paramètres par défaut.

## 5. Configurer l'IA (Gemini)
1. Une fois l'application créée dans App Hosting, allez dans ses paramètres.
2. Allez dans l'onglet **Environment Variables**.
3. Ajoutez :
   - Clé : `GOOGLE_GENAI_API_KEY`
   - Valeur : (Votre clé API Google)

BISOUS FLORIN
