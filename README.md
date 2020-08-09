![Capa do projeto](.github/Home.png "Proffy")

# Projeto

O Proffy é um projeto que visa conectar estudantes aos seus professores favoritos. Estude matérias importantes com quem você mais gosta de aprender.

# Tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org)
- [React Native](https://facebook.github.io/react-native/)
- [Expo](https://expo.io/)

# Funcionalidades

- [x] Explorar aulas
- [x] Professores favoritos
- [ ] Cadastro e Login **(2.0)**
- [ ] Atualização de perfil **(2.0)**
- [ ] Dark theme **(extra)**
- [ ] Outros idiomas **(extra)**

# Instalação

Você vai precisar instalar o [Node.js](https://nodejs.org/en/download/) e o [Yarn](https://yarnpkg.com/).

Na pasta `server`, instale as dependências e prepare o banco de dados para iniciar a API: 

```shell
> cd server
> yarn
> yarn knex:migrate
> yarn start
```

Na pasta `web`, instale as dependências e inicie a aplicação:

```shell
> cd web
> yarn
> yarn start
```

Para executar o app mobile, instale o [Expo](https://expo.io/) no celular ou utilize um [emulador](https://react-native.rocketseat.dev/android/emulador).

# Licença

Copyright @ 2020 [Natanael Sirqueira](https://github.com/natanaelsirqueira/)

---

Projeto desenvolvido durante a 2ª edição do evento Next Level Week da [Rocketseat](https://rocketseat.com.br/).
