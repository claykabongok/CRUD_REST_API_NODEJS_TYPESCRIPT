# CRUD Rest API Nodejs with Typescript

Sample Nodejs API with Typescript and Mongodb

## Script:

- npm install
- npm start

## Nodejs Typescript project

Follow these steps to create a new nodejs project with Typescript

- npm init
- tsc --init
- configure tsconfig.json file:
  - "outDir": "./build", ( Redirect output structure to the directory. )
  - "rootDir": "./src", ( Specify the root directory of input files. Use to control the output directory structure with outDir.)

## Mongodb

Mongodb options you can use a local or a remote database:

- Local
- [Mongodb Atals](https://account.mongodb.com/account/login)

## Endponts:

### User:

- create user : localhost:3000/user/
- get user : localhost:3000/user/userId
- update user : localhost:3000/user/

### Posts:

- create post : localhost:3000/post/
- get all post : localhost:3000/post/
- get post : localhost:3000/post/postId
- delete post : localhost:3000/post/postId
- update post : localhost:3000/post/
