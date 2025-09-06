# macOS Desktop Experience

A beautiful, functional macOS desktop experience built with React, TypeScript, and Tailwind CSS. Features a working dock with magnification effects, draggable/resizable windows, and realistic app content.

## ✨ Features

- **Authentic macOS Dock** - Magnification effects, bounce animations, and app indicators
- **Window Management** - Draggable, resizable windows with macOS-style traffic lights
- **8-Way Resize** - Resize from any edge or corner with visual feedback
- **Persistent State** - Window positions and states saved in localStorage
- **Keyboard Shortcuts** - ⌘+W (close), ⌘+M (minimize), ⌘+↑ (maximize), Esc (unfocus)
- **Responsive Design** - Works on desktop and mobile devices
- **Realistic Apps** - 10 functional apps with modern macOS UI design
- **Glassmorphism Effects** - Beautiful liquid glass effects throughout the UI
- **Music Player** - Real audio playback with progress control and seeking
- **Weather App** - Simulated weather data with beautiful UI

## 🎯 Apps Included

- **Finder** - Modern file browser with glassmorphism effects
- **Safari** - Web browser with realistic interface
- **Mail** - Email client with modern macOS design
- **Notes** - Note-taking app with markdown support
- **Photos** - Photo gallery with grid layout
- **Music** - Music player with real audio playback and controls
- **Calendar** - Calendar app with event management
- **Calculator** - Scientific calculator with iOS/macOS design
- **Terminal** - Terminal emulator with command history
- **Weather** - Weather app with simulated data and beautiful UI

## 🎵 Music Features

- **Real Audio Playback** - Play actual MP3 files from `/public/music/`
- **Progress Control** - Click anywhere on progress bar to seek
- **Previous/Next** - Navigate between songs
- **Volume Control** - Adjustable volume slider
- **Playlist Support** - Multiple playlists and song management

## 🪟 Window Features

- **8-Way Resize** - Resize from any edge or corner
- **Drag & Drop** - Move windows by dragging title bar
- **Traffic Lights** - Close, minimize, maximize buttons
- **Keyboard Shortcuts** - Full macOS keyboard support
- **Z-Index Management** - Proper window layering

## 🏗️ Architecture

### Component Structure (`/src/components/`)

- **ui/** - shadcn/ui components following the established structure
  - `mac-os-dock.tsx` - The dock component with magnification
  - `window.tsx` - Draggable, resizable window component  
  - `menu-bar.tsx` - macOS-style top menu bar
  - `desktop.tsx` - Main desktop orchestrator
  - `liquid-glass.tsx` - Glassmorphism effects

- **apps/** - Individual app components
  - Each app is a self-contained React component
  - Modern macOS UI design with glassmorphism

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

The project follows shadcn/ui structure with a custom macOS theme:

### Glassmorphism Effects

- **Liquid Glass** - Beautiful glass effects throughout the UI
- **Backdrop Blur** - Modern blur effects for depth
- **Transparency** - Layered transparency for depth perception
- **Shimmer Animations** - Subtle animations for visual appeal

### Color System

All colors use HSL values defined in CSS custom properties:

- **macOS Colors** - Authentic red/yellow/green traffic lights
- **Glassmorphism** - Backdrop blur effects for dock and menus  
- **Dark Theme** - Matches macOS dark mode aesthetics
- **Semantic Tokens** - Consistent color usage across components

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/gokmency/macOS-Desktop-Experience.git

# Navigate to the project directory
cd macOS-Desktop-Experience

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Building for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with zero configuration

### Other Platforms

The project can be deployed to any static hosting platform:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any CDN

## 📁 Project Structure

```
src/
├── components/
│   ├── apps/           # Individual app components
│   └── ui/            # Reusable UI components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and configurations
├── pages/             # Page components
├── store/             # State management (Zustand)
└── main.tsx           # Application entry point

public/
├── music/             # Music files for the music app
├── wallpapers/         # Desktop wallpapers
└── favicon.ico        # Site favicon
```

## 🎵 Adding Music

To add your own music files:

1. Place MP3 files in `/public/music/`
2. Update the music list in `/src/hooks/use-music-library.ts`
3. The music app will automatically detect and play them

## 🛠️ Customization

### Adding New Apps

1. Create a new component in `/src/components/apps/`
2. Register it in `/src/lib/app-registry.ts`
3. Add the icon to the dock configuration

### Modifying the Dock

Edit `/src/components/ui/mac-os-dock.tsx` to:
- Change app order
- Add/remove apps
- Modify magnification effects
- Customize animations

### Styling

The project uses Tailwind CSS with custom CSS variables:
- Modify `/src/index.css` for global styles
- Use Tailwind classes for component styling
- Custom animations are defined in CSS

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Zustand](https://zustand-demo.pmnd.rs/) for state management
