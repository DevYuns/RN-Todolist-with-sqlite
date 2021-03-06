## Simple TodoList

> Gain points
- How to use local storage with `expo-sqlite`
- How to make a `themeToggle` with `ThemeProvider`
- How to use `styled component`
- How to apply `localization` with `i18n`

> Specification

- [expo](https://expo.io)
- [react-native](https://github.com/facebook/react-native)
- [typescript](https://github.com/Microsoft/TypeScript)
- [emotion](https://emotion.sh/docs/introduction)
- [expo-sqlite](https://docs.expo.io/versions/latest/sdk/sqlite/)
- [i18n](http://i18njs.com/#fun_with_pluralisation)


## Folder structure
```
app/
├─ node_modules/
├─ assets/                                        - Assets like fonts & images.
├─ src/                                           - Main source code.
│  └─ components                                  - Components for building block.
│     └─ pages                                    - Pages made with more small components like uis is a screen of app
│     └─ uis                                      - Ui components to build a more complicated component.
│  └─ providers                                   - Providers made with Context API.
│  └─ utils                                       - Util functions that can be used many places.
│  └─ App.tsx                                     - Entry component
│  └─ theme.ts                                    - Declare a theme for whole app
│  └─ styled.d.ts                                 - Type declaration file for styles.
│  └─ constants.ts                                - Place const used many components on one file.
├─ .eslintrc.js
├─ .prettierrc.js
├─ .gitignore
├─ .svgrc                                         - To change `fill` property in svg.
├─ app.json                                       - expo configuration file
├─ App.tsx                                        - Main Entry component
├─ environment.d.ts                               - Type declarations for extentions that have not types package.
├─ metro.config.ts                                - For `react-native-svg-transformer`
├─ README.md
├─ babel.config.js
├─ package.json
├─ tsconfig.json
└─ yarn.lock
```