# create-ndcf-app

Create a Next.js 14 boilerplate app quickly and easily with our CLI tool, which includes Docker settings for easy containerization. This tool prepares a project for deployment to SAP BTP Cloud Foundry, including the'shadcn/ui' component library and 'tailwindcss' for optimized style. It supports JavaScript and TypeScript, making it suitable for a wide range of development needs. This full CLI solution simplifies the setup process and allows you to focus on building your application. Start your project swiftly and deploy confidently.

## Features

- Generates a Next.js 14 app with TypeScript/JavaScript
- Includes TailwindCSS configuration
- Sets up shadcn/ui components
- Optionally includes Docker configuration
- Prepared for deployment to SAP BTP Cloud Foundry

## Usage

Follow these steps to create a new Next.js 14 project:

```bash
npx create-ndcf-app@latest
```

## or

```bash
yarn create ndcf-app
```

## or

```bash
pnpm create ndcf-app@latest
```

## or

```bash
bunx create-ndcf-app@latest
```

## Interactive Mode

The CLI will guide you through a series of questions to set up your project. Answer the prompts to customize your project configuration.

> - What will your project be called?
> - Will you be using TypeScript or JavaScript?
>   - TypeScript
>   - JavaScript
> - Would you like to use App Router or Pages Router?
>   - App Router
>   - Pages Router
> - Would you like to use ESLint? (Y/n)
> - Would you like to use Prettier? (Y/n)
> - Would you like to use --turbo flag? (Y/n)
> - Would you like to use a 'src' directory? (y/N)
> - Do you want to include Docker configuration? (Y/n)
> - Initialize a new git repository? (Y/n)
> - Which Container Registry would you like to use?
>   - DockerHub
>   - GitHub Container Registry
> - What is your GitHub Container Registry username?
> - What is your DockerHub username?
> - Would you like us to run 'npm install' for you? (Y/n)

## Navigate to Your Project Directory

Once the project is generated, navigate to your new project directory:

```bash
cd <your-project-name>
```

Install Dependencies

Install the project dependencies:

```bash
npm install
```

or

```bash
yarn install
```

or

```bash
pnpm install
```

or

```bash
bun install
```

Start the Development Server

```bash
npm run dev
```

or

```bash
yarn dev
```

or

```bash
pnpm dev
```

or

```bash
bun dev
```

Deploy to Cloud Foundry

If you chose to include Docker configuration, it should generate a `Dockerfile` and `.dockerignore` file in the project directory. Now login accout to your Cloud Foundry account and run the following command to push the app to Cloud Foundry:

First make sure you have the Cloud Foundry CLI installed. You can download it from [click here](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html).

Login to Cloud Foundry:

```bash
cf login
```

Run the following command to create a dockerimage and push it to the dockerhub/github container registry and push the manifest to Cloud Foundry:

```bash
npm run cf:push
```

or

```bash
yarn run cf:push
```

or

```bash
pnpm run cf:push
```

or

```bash
bun run cf:push
```

Once the app is deployed, you can access it at the URL provided by Cloud Foundry.

## Contributing

If you find a bug or have a feature request, please open an issue on GitHub.

## License

This project is licensed under the MIT License.
