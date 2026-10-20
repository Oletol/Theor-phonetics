// Какие шрифты и начертания копировать из пакетов Fontsource.
// Запуск: npm i @fontsource/onest @fontsource/literata @fontsource/jetbrains-mono && node scripts/fetch-fonts.js
module.exports = {
  subsets: {
    cyrillic: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116",
    "latin-ext": "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
    latin: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  },
  fonts: [
    { id: "onest", family: "Onest", styles: [["normal", 400], ["normal", 500], ["normal", 600], ["normal", 700]] },
    { id: "literata", family: "Literata", styles: [["normal", 400], ["italic", 400], ["normal", 600], ["normal", 700]] },
    { id: "jetbrains-mono", family: "JetBrains Mono", styles: [["normal", 400], ["normal", 600]] }
  ],
  // Знаки МФА в Google-сборках вырезаны, поэтому транскрипция набирается
  // поднабором Gentium Book Plus (SIL, OFL). Файлы делаются один раз:
  // pyftsubset GentiumBookPlus-Regular.ttf --unicodes="U+0000-024F,U+0250-02FF,U+0300-036F,U+0370-03FF,U+0400-04FF,U+1D00-1DBF,U+1E00-1EFF,U+2000-206F,U+2070-209F,U+20AC,U+2116,U+2122,U+25CC" --flavor=woff2 --layout-features='*' --output-file=assets/fonts/gentium-ipa/gentium-ipa-regular.woff2
  ipa: { id: "gentium-ipa", family: "Gentium IPA", files: [["normal", 400, "regular"], ["italic", 400, "italic"], ["normal", 700, "bold"]] }
};
