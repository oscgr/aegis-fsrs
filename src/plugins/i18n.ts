import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    import: 'Import database...',
    export: 'Export database...',
    newVersionAvailable: {
      content: 'A new version is available. Would you like to reload the page to fetch it? The current version will still work until you reload this page.',
      yes: 'Yes',
      no: 'No',
    },
    menu: 'Parameters',
    save: 'Save',
    cancel: 'Cancel',
    toggleTheme: 'Toggle theme',
    linkToGithub: 'Link to source',
    options: {
      keyboardLayout: {
        title: 'Keyboard layout',
      },
      title: 'Options',
      menuTitle: 'Options...',
      menuSubtitle: 'Current layout: {0}',
    },
    keyboardPlayground: {
      title: 'Playground',
    },
  },
  fr: {
    import: 'Importer la base de données...',
    export: 'Exporter la base de données...',
    newVersionAvailable: {
      content: 'Une nouvelle version est disponible. Souhaitez-vous recharger la page pour la télécharger? La version actuelle continuera de fonctionner jusqu\'à ce que vous rechargez cette page.',
      yes: 'Oui',
      no: 'Non',
    },
    menu: 'Paramètres',
    save: 'Sauvegarder',
    cancel: 'Annuler',
    toggleTheme: 'Changer le thème',
    linkToGithub: 'Lien vers la source',
    options: {
      keyboardLayout: {
        title: 'Clavier',
      },
      menuTitle: 'Options...',
      title: 'Options',
      menuSubtitle: 'Clavier actuel : {0}',
    },
    keyboardPlayground: {
      title: 'Playground',
    },
  },
}

export default createI18n({
  legacy: false,
  locale: navigator.language?.slice(0, 2),
  fallbackLocale: 'en',
  messages,
})
