Starship Navigator 🚀
=====================

Futuristic, interactive **starship navigation** web app built with **React**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.Designed for modularity, responsiveness, and fast performance.

🚀 Tech Stack
-------------

| Layer           | Technology            | Purpose                        |
| --------------- | --------------------- | ------------------------------ |
| Framework       | React 18 + Vite       | SPA rendering & bundling       |
| Language        | TypeScript            | Type safety                    |
| Styling         | Tailwind CSS          | Utility-first styling          |
| UI Components   | shadcn/ui             | Accessible reusable components |
| Forms           | React Hook Form + Zod | Form handling & validation     |
| Icons           | Lucide React          | Icons & symbols                |
| Package Manager | pnpm                  | Fast dependency management     |


⚡ Features
----------

*   **Interactive Star Maps** - Navigate visually through star systems
    
*   **Modular Components** - Reusable UI primitives & custom features
    
*   **Responsive Design** - Works on desktop and mobile
    
*   **Type-Safe Forms** - React Hook Form + Zod
    
*   **SPA Performance** - Optimized with Vite
    

🏗 Project Structure
--------------------
```txt
starship-navigator-main/
├─ public/                 # Static assets
├─ src/
│  ├─ components/          # UI & custom components
│  │  ├─ ui/               # shadcn/ui primitives
│  │  └─ custom/           # Domain-specific components
│  ├─ hooks/               # Reusable React hooks
│  ├─ pages/               # Screens/views
│  ├─ styles/              # Tailwind/global styles
│  ├─ lib/                 # Utilities & helpers
│  ├─ types/               # TypeScript types
│  ├─ App.tsx
│  └─ main.tsx
├─ tailwind.config.ts
├─ vite.config.ts
└─ package.json
 ```

## 🧪 Tests

This project uses **Vitest** as the testing framework for unit and component tests, combined with **React Testing Library** for React component testing and **@testing-library/user-event** for realistic user interaction simulation.

### Running Tests

- Run all tests once

``npm run test``

- Run with coverage report

``npm run coverage``

🧩 Component Design
-------------------

*   **UI Components**: Stateless, reusable, accessible
    
*   **Custom Components**: Composes UI primitives into app-specific features, handling local state and interactions
    

⚙ State Management
------------------

*   Local state: useState / useReducer
    
*   Derived state: Computed in hooks or components
    
*   Forms: React Hook Form + Zod
    

`` No global state library used, keeps complexity minimal``

🎨 Styling & Theming
--------------------

*   Tailwind CSS for layout, spacing, and responsiveness
    
*   Sci-fi inspired dark theme by default
    
*   Fonts: Inter & Orbitron
    
*   Configurable via tailwind.config.ts
    

🔄 Data Flow
------------

User Action > Component Event Handler > State Update / Hook > UI Re-render

`Unidirectional React data flow ensures predictable UI behavior.`

⚡ Development
-------------

*  Install dependencies

`npm install`
*  Start dev server with hot reload

``npm run dev``

*  Build production bundle

``npm run build``

*  Docker

``docker build -t starship-navigator ``

``docker run -p 8080:80 starship-navigator``

🔮 Future Enhancements
----------------------

*   Backend integration (REST / GraphQL)
    
*   Real-time star system data visualization
    
*   Persistent user settings
        
*   Dark/light mode toggle
    

⚠ Known Limitations
-------------------

*   Frontend-only (no backend persistence)
    
*   Single-user experience (no authentication)
    
*   Performance could degrade with extremely large datasets
    

✅ Summary
---------

Starship Navigator is a modern SPA built with **React**, **TypeScript**, and **Tailwind**, emphasizing modularity, responsiveness, and maintainability. It’s a strong foundation for interactive, futuristic UI experiences with easy extensibility for future features.