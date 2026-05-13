# Festiva AI - Guide de Déploiement Simplifié

Ce projet est votre carte d'anniversaire personnalisée. Voici comment la mettre en ligne étape par étape.

## 1. Télécharger le code sur votre ordinateur
1. Cherchez l'icône **"Download"** ou **"Export"** dans l'interface de Firebase Studio.
2. Cela va créer un fichier `.zip`. Enregistrez-le sur votre ordinateur.
3. Faites un clic droit sur le fichier `.zip` et choisissez **"Extraire tout"**. Vous avez maintenant un dossier avec tout le code.

## 2. Mettre votre code sur GitHub (La méthode facile)
1. **Installer GitHub Desktop** : Téléchargez-le sur [desktop.github.com](https://desktop.github.com/) et installez-le.
2. **Créer le dépôt** :
   - Ouvrez GitHub Desktop.
   - Allez dans `File` > `Add Local Repository`.
   - Sélectionnez le dossier que vous venez d'extraire.
   - Cliquez sur le bouton bleu **"Publish Repository"** pour l'envoyer sur votre compte GitHub.

## 3. Déployer sur Internet avec Firebase
Une fois que votre code est sur GitHub :
1. Allez sur la [Console Firebase](https://console.firebase.google.com/).
2. Cliquez sur votre projet.
3. Dans le menu de gauche, allez dans **Build > App Hosting**.
4. Cliquez sur **Commencer** (Get Started).
5. Connectez votre compte GitHub et sélectionnez le dépôt que vous venez de créer.
6. Gardez les paramètres par défaut et cliquez sur **Finish**.

## 4. Configurer l'IA (Important)
Pour que la génération de messages fonctionne en ligne :
1. Dans la console **App Hosting**, allez dans les paramètres de votre application une fois qu'elle est créée.
2. Allez dans l'onglet **Environment Variables** (Variables d'environnement).
3. Ajoutez une nouvelle variable :
   - Clé : `GOOGLE_GENAI_API_KEY`
   - Valeur : (Collez votre clé API Google Gemini ici)

## 5. Gérer l'image de Blessing
- Votre photo doit s'appeler exactement `IMG_1292.JPG`.
- Elle doit être placée dans le dossier `public` (qui est à la racine, à côté du dossier `src`).
- Si l'image ne s'affiche pas, vérifiez que le dossier `public` existe bien et que l'image est dedans.

BISOUS FLORIN
