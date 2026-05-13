# Festiva AI - Guide de Déploiement Simplifié

Ce projet est votre carte d'anniversaire personnalisée. Voici comment la mettre en ligne étape par étape.

## 1. Mettre votre code sur GitHub (La méthode facile)

1. **Télécharger le code** : Téléchargez les fichiers de ce projet sur votre ordinateur.
2. **Installer GitHub Desktop** : Téléchargez-le sur [desktop.github.com](https://desktop.github.com/) et installez-le.
3. **Créer le dépôt** :
   - Ouvrez GitHub Desktop.
   - Allez dans `File` > `Add Local Repository`.
   - Sélectionnez le dossier où vous avez mis le code.
   - Cliquez sur `Publish Repository` pour l'envoyer sur votre compte GitHub.

## 2. Déployer sur Internet avec Firebase

Une fois que votre code est sur GitHub :

1. Allez sur la [Console Firebase](https://console.firebase.google.com/).
2. Cliquez sur votre projet.
3. Dans le menu de gauche, allez dans **Build > App Hosting**.
4. Cliquez sur **Commencer** (Get Started).
5. Connectez votre compte GitHub et sélectionnez le dépôt que vous venez de créer.
6. Gardez les paramètres par défaut et cliquez sur **Finish**.

## 3. Configurer l'IA (Important)

Pour que la génération de messages fonctionne en ligne :
1. Dans la console **App Hosting**, allez dans les paramètres de votre application.
2. Allez dans l'onglet **Environment Variables** (Variables d'environnement).
3. Ajoutez une nouvelle variable :
   - Clé : `GOOGLE_GENAI_API_KEY`
   - Valeur : (Collez votre clé API Google Gemini ici)

## 4. Gérer l'image de Blessing

- Votre photo doit s'appeler exactement `IMG_1292.JPG`.
- Elle doit être placée dans le dossier `public` à la racine du projet.
- Si vous changez la photo sur votre ordinateur, n'oubliez pas de faire un "Commit" et "Push" dans GitHub Desktop pour mettre à jour le site en ligne.

BISOUS FLORIN
