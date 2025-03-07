# Feature 4: Task Manager Web App
Members: Matthew Eleazar, Allie Bowen

# Important notes (Prerequisites):

Before or after cloning this repo, make sure you have node v22.14.0 installed (latest as of writing).
If you need to install node, you can do:
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc
nvm install 22.14.0
nvm alias default 22.14.0
nvm use 22.14.0
node --version # make sure you have the right version of node
```

One that's done, you can go and cd into the directory of this repo

```
git clone https://github.com/lynx-zenchar/feature4-webdev.git
cd feature4-webdev
```

```
npm install # this should be enough since Ive updated the packages.json to include all dependencies
npm run dev
```


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
