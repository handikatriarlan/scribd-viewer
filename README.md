# Scribd Viewer

![UScribd Viewer Website Screenshot](https://ucarecdn.com/af669e93-434f-4b99-9890-00501a3063ae/scribdviewer.png)

A simple web application to view Scribd documents by converting standard Scribd URLs into embeddable URLs. This application can be used to view pages on Scribd that are limited by premium access by converting the document URL into an embeddable format.

## Features

- Convert Scribd document URLs into embed URLs
- View premium-locked Scribd documents through embed links
- Copy embed URL to clipboard
- Open the embed link in a new tab
- Simple and clean UI using Next.js, NextUI, Tailwind CSS, and Framer Motion
- Hosted on Vercel with Vercel Analytics integrated

## Tech Stack

- **Next.js 14** - The React framework for building web applications
- **NextUI v2** - UI components for React applications
- **Tailwind CSS** - Utility-first CSS framework for custom designs
- **Tailwind Variants** - Extension for more responsive styling in Tailwind CSS
- **TypeScript** - Typed JavaScript for better developer experience
- **Framer Motion** - Animation library for React
- **React Query** - Data-fetching library to manage server state in React apps
- **Formik** - Form management library for React

## Installation

To get started with the Scribd Viewer, follow these steps:

### 1. Clone the repository:
```bash
git clone https://github.com/handikatriarlan/scribd-viewer.git
```

### 2. Navigate to the project directory:
```bash
cd scribd-viewer
```

### 3. Install dependencies:
```bash
npm install
```

### 4. Run the development server
```bash
npm run dev
```

### 5. Open in your local server
Open `http://localhost:3000` with your browser to see the app in action.

## Usage
1. Enter the Scribd document URL in the input field.
2. Click Convert to generate an embeddable URL.
3. You can copy the embed URL to the clipboard or open the document in a new tab.
4. View premium-locked Scribd documents without needing a premium account.
