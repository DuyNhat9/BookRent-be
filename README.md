# BOOK RENT SYSTEM BACKEND API

## 📦 INSTALLATION

- Clone this repository

```bash
git clone https://github.com/blackmouse572/book-rent-be.git
```

- Install the dependencies

```bash
yarn #MUST USE YARN, DO NOT USE NPM
```

- Copy the `.env.example` to `.env`

```bash
cp .env.example .env
```

- Change the `.env` file to your configuration
- Run the project

```bash
yarn start:dev
```

## 📚 DOCUMENTATION

- This repository using `swagger` for documentation. You can access the documentation in `http://localhost:3000/docs`
- For code examples and implementation, you can access this [**Boilerplate Repo**](https://github.com/andrechristikan/ack-nestjs-boilerplate/)
- For code base documentation, you can access this [**Code Base Documentation**](https://github.com/andrechristikan/ack-nestjs-boilerplate/blob/main/docs/README.md)
- For nestjs documentation, you can access this [**NestJS Documentation**](https://docs.nestjs.com/)

## ‼️ RULES

- Avoid Circular Dependency
- Consume component based `/` modular folder structure, and repository design pattern
- Always make `service` for every module is independently.
- Do not put controller into modules, cause this will break the dependency. Only put the controller into `router` and then inject the dependency.
- Put the config in `/configs` folder, and for dynamic config put as environment variable
- `CommonModule` only for main package, and put the module that related of project into `/src/modules`.
- If there a new `service` in CommonModule. Make sure to create the unit test in `/unit`.
