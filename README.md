## Setting up

### Inside the `backend/` directory
```bash
dotnet restore
```

### Inside the `backend.Tests/` directory
```bash
dotnet restore
```

### Inside the `frontend/` directory
1. copy .env.template to .env
2. edit .env to configure backend base url
3. 
```bash
npm install
```

## Running the project

### Inside the `backend/` directory
```bash
dotnet watch run
```

### Inside the `frontend/` directory
```bash
npm start
```

## Unit testing the project

### Inside the `backend.Tests/` directory
```bash
dotnet test
```

### Inside the `frontend/` directory
```bash
npm run test
```