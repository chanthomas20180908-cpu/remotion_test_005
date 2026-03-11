# AGENTS.md - Development Guide for AI Coding Agents

This guide is for AI coding agents working on the **good-video** Remotion video generation project.

## Commands

```bash
npm run dev           # Start Remotion Studio (interactive frame-by-frame preview)
npm run build         # Bundle video with Remotion
npm run lint          # Run ESLint + TypeScript type checking
npm run upgrade       # Upgrade Remotion dependencies
```

No test framework configured for this project.

## Project Structure

```
src/
├── components/        # Reusable React components for animations
│   └── nova15/       # Huawei Nova 15 specific scenes
├── scenes/           # Remotion Composition scenes
├── utils/            # Helper functions
├── Root.tsx          # Main Remotion root with Compositions
└── index.ts          # Entry point
```

## Code Style

### TypeScript & Imports

- **Target**: ES2018 with React 19.2.3, strict mode enabled
- **Import Style**: ES6 modules
- **No Unused Variables**: Enforced (`noUnusedLocals: true`)
- **Casing**: Consistent file path casing required

```typescript
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
```

### Components & Types

- **Export Format**: Named exports with `React.FC` type annotation
  ```typescript
  export const MyComponent: React.FC = () => { ... }
  ```
- **Functions**: All function return types required
- **Props**: Define explicit prop types when needed
- **Interpolations**: Always specify array bounds and use `extrapolateLeft: "clamp"`

### Formatting & Naming

- **Whitespace**: 2 spaces (no tabs), configured in Prettier
- **Bracket Spacing**: `{ key: value }` style
- **Components**: PascalCase (`HeroSection`, `AIFeatures`)
- **Variables**: camelCase (`bgRotate`, `glowScale`)
- **Files**: Match component names (e.g., `HeroSection.tsx`)
- **Animation Variables**: Descriptive names indicating property (e.g., `titleScale`, `glowOpacity`)

### Animation Pattern

```typescript
const value = interpolate(
  frame,
  [startFrame, endFrame],
  [startValue, endValue],
  {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  },
);
```

### Error Handling & Validation

- Use try-catch blocks for async operations
- Validate frame/animation values before interpolation
- Log errors with meaningful context
- Use clamping for safe interpolations

### CSS & Styling

- Inline TypeScript-typed style objects only
- Colors: Hex format (`#64c8ff`)
- Units: Pixels for layout, percentages for responsive sizing
- Animations: CSS `@keyframes` defined inline

### Documentation

- Chinese comments for major animation sections
- Comments explain "why" not "what"
- Document frame ranges and key timings
- JSDoc for exported utilities

## ESLint & TypeScript

- **ESLint**: Extends `@remotion/eslint-config-flat`
- **TypeScript Config** (`tsconfig.json`):
  - `target: ES2018`
  - `strict: true`
  - `jsx: react-jsx` (React 19 automatic JSX)
  - `noUnusedLocals: true`
  - `skipLibCheck: true`
  - `forceConsistentCasingInFileNames: true`
  - Excludes `remotion.config.ts`

## Key Libraries

- **remotion** (4.0.410): Video generation
- **react** (19.2.3): UI framework
- **@remotion/tailwind-v4** (4.0.410): Tailwind CSS support
- **framer-motion**, **gsap**: Animation engines
- **three.js**: 3D graphics

## Key Facts

- All compositions defined in `src/Root.tsx`
- Global styles in `src/index.css`; components use inline styles
- Video format: JPEG (1920x1080, 30 fps)
- Content: Chinese language AI video creation platform videos
- Overwrite output enabled in `remotion.config.ts`
