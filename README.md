# Jessyco

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.3.

A front-end developer's personal website built with Angular, featuring automatic content management and a minimalistic design approach.

## Development server

To start the development server with automatic content watching, run:

```bash
npm start
```

This will:
- Start the Angular development server on `http://localhost:4200/`
- Automatically watch for changes in `public/content/` folder
- Rebuild the content index when markdown files are modified
- Provide live updates without manual intervention

### Alternative Development Options

For Angular-only development without content watching:

```bash
npm run start
```

To manually rebuild the content index:

```bash
npm run content-index-builder
```

## Content Management

This project features an automated content management system that processes markdown files from the `public/content/` directory.

### File Watching

The development server automatically:
- Watches `public/content/` for changes
- Monitors `.md` files
- Regenerates content index on file changes
- Updates the Angular app in real-time

### Content Index Generation

The content indexing system:
- Scans all markdown files for frontmatter metadata
- Generates category-based content listings
- Creates a searchable content index
- Provides detailed build statistics during generation

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project for production:

```bash
npm run build
```

This will:
- Automatically run the content index builder (prebuild step)
- Compile your project and store build artifacts in the `dist/` directory
- Optimize your application for performance and speed

The build process includes automatic content indexing, ensuring your production build always has the latest content structure.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start:watch` | Start development server with content file watching |
| `npm run start` | Start development server without content watching |
| `npm run build` | Build for production (includes content indexing) |
| `npm run content-index-builder` | Manually rebuild content index |
| `npm run content-watch` | Run content file watcher independently |
| `npm test` | Run unit tests |
| `npm run format` | Format code with Prettier |

## Technology Stack

- **Framework**: Angular 20
- **Styling**: Tailwind CSS + daisyUI
- **Content**: Markdown with frontmatter
- **Build Tools**: Angular CLI, Vite Node
- **File Watching**: Nodemon
- **Development**: Concurrently for parallel processes

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Other Things

This https://www.favicongenerator.io/ website was used to generate the favicons.
