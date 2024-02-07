# I. Config Project

1. npm init -y
2. npm install --save-dev typescript ts-node-dev
3. create file tsconfig.json
   {
   "compilerOptions": {
   "module": "commonjs",
   "esModuleInterop": true,
   "target": "es6",
   "moduleResolution": "node",
   "sourceMap": true,
   "outDir": "dist"
   },
   "lib": ["es2015"]
   }
4. install dependencies:
   - npm i body-parser express cors dotenv nodemon bcryptjs jsonwebtoken mongoose uuid
   - npm i --save-dev @types/body-parser @types/express @types/cors @types/dotenv @types/node @types/nodemon @types/bcryptjs @types/jsonwebtoken @types/uuid
