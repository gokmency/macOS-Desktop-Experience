# MacOS Desktop Experience

A beautiful, functional MacOS desktop experience built with React, TypeScript, and Tailwind CSS. Features a working dock with magnification effects, draggable/resizable windows, and humorous app content.

## ✨ Features

- **Authentic MacOS Dock** - Magnification effects, bounce animations, and app indicators
- **Window Management** - Draggable, resizable windows with MacOS-style traffic lights
- **Persistent State** - Window positions and states saved in localStorage
- **Keyboard Shortcuts** - ⌘+W (close), ⌘+M (minimize), ⌘+↑ (maximize), Esc (unfocus)
- **Responsive Design** - Works on desktop and mobile devices
- **Funny Apps** - 9 humorous but functional apps with witty content

## 🎯 Apps Included

- **Finder** - Browse hilariously named files and folders
- **Safari** - A productivity tips page with the ultimate advice
- **Mail** - Inbox full of relatable newsletters and spam
- **Notes** - Markdown editor with amusing life observations
- **Photos** - Gallery of "vacation" photos with sarcastic titles
- **Music** - Playlist of procrastination anthems
- **Calendar** - Schedule packed with absurd meetings
- **Calculator** - Fully functional with mathematical wisdom
- **Terminal** - Interactive shell with witty commands

## 🏗️ Architecture

### Component Structure (`/src/components/`)

- **ui/** - shadcn/ui components following the established structure
  - `mac-os-dock.tsx` - The dock component with magnification
  - `window.tsx` - Draggable, resizable window component  
  - `menu-bar.tsx` - MacOS-style top menu bar
  - `desktop.tsx` - Main desktop orchestrator

- **apps/** - Individual app components
  - Each app is a self-contained React component
  - Humorous but functional implementations

### State Management (`/src/store/`)

- **desktop-store.ts** - Zustand store for window management
  - Window state (position, size, minimized, maximized)
  - Persistent storage with localStorage
  - Focus management and z-index handling

### Configuration (`/src/lib/`)

- **app-registry.ts** - Central registry for all apps
  - Maps app IDs to components, icons, and default sizes
  - Easy to extend with new apps

## 🎨 Design System

The project follows shadcn/ui structure with a custom MacOS theme:

### Why `/components/ui`?

This folder structure follows shadcn/ui defaults for several reasons:

1. **Predictable Imports** - Consistent `@/components/ui/*` imports
2. **Component Collocation** - UI primitives grouped together  
3. **Community Standard** - Matches expected React/Next.js patterns
4. **Easy Extension** - Simple to add new shadcn components

### Color System

All colors use HSL values defined in CSS custom properties:

- **MacOS Colors** - Authentic red/yellow/green traffic lights
- **Glassmorphism** - Backdrop blur effects for dock and menus  
- **Dark Theme** - Matches MacOS dark mode aesthetics
- **Semantic Tokens** - Consistent color usage across components

## 🚀 How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/e2ab39ea-fd01-4e3b-8a2b-a165aa010123) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/e2ab39ea-fd01-4e3b-8a2b-a165aa010123) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
