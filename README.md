# Cyclic - Work Task Hub

A modern React + TypeScript web application for common work tasks like API testing, JSON formatting, URL encoding, and Base64 operations.

## Features

- 🌐 **API Tester**: Test REST endpoints with different HTTP methods, headers, and request bodies
- 📝 **JSON Formatter**: Format, validate, and minify JSON data
- 🔗 **URL Encoder**: Encode and decode URLs and text strings
- 🔐 **Base64 Tool**: Encode and decode Base64 strings

## Tech Stack

- **React 18** with hooks and functional components
- **TypeScript** for type safety
- **CSS3** with modern features (Grid, Flexbox, animations)
- **Create React App** for build tooling

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Cyclic.git
cd Cyclic
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run deploy` - Deploys to GitHub Pages

## Deployment to GitHub Pages

1. Update the `homepage` field in `package.json` with your GitHub Pages URL
2. Install the gh-pages package (already included in devDependencies)
3. Run the deployment command:
```bash
npm run deploy
```

Your app will be available at: `https://yourusername.github.io/Cyclic`

## Project Structure

```
src/
├── components/
│   ├── tools/
│   │   ├── ApiTester.tsx
│   │   ├── JsonFormatter.tsx
│   │   ├── UrlEncoder.tsx
│   │   └── Base64Tool.tsx
│   ├── Header.tsx
│   ├── TaskCard.tsx
│   └── TaskGrid.tsx
├── types/
│   └── index.ts
├── App.tsx
├── App.css
├── index.tsx
└── index.css
```

## Adding New Tools

To add new tools to Cyclic:

1. Create a new component in `src/components/tools/`
2. Add the tool definition to the `tasks` array in `App.tsx`
3. Add the corresponding case in `TaskGrid.tsx`'s `renderTaskPanel` method

## CORS Considerations

The API tester may encounter CORS issues when testing certain APIs from a browser environment. This is normal browser security behavior. For APIs that don't allow cross-origin requests, consider:

- Using a CORS proxy service
- Testing APIs that explicitly allow cross-origin requests
- Using browser extensions that disable CORS for development

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.