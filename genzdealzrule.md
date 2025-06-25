# GenZDealZ Design System (v3.0)

## 🎯 Core Principles

### 1. **Component Architecture**

- Use **shadcn/ui** components as the foundation
- Extend with **morphy-ui** effects and variants
- Keep components simple and composable
- Use TypeScript for type safety

### 2. **Code Style**

- **Arrow functions only**: `const Component = () => {}`
- **ES6+ syntax** with modern React patterns
- **Consistent naming**: PascalCase for components, camelCase for functions
- **Clean imports**: Group and organize imports logically

### 3. **File Structure**

```
app/                    # Next.js App Router
├── layout.tsx         # Root layout with providers
├── page.tsx           # Landing page
├── globals.css        # Global styles
├── genzgpt/           # AI chat feature
└── login/             # Authentication

components/
├── ui/                # shadcn components
│   ├── button.tsx     # Extended with morphy variants
│   ├── card.tsx       # Extended with morphy variants
│   └── ...            # Other UI components
├── theme-toggle.tsx   # Theme switching
└── navbar-wrapper.tsx # Navigation wrapper

lib/
├── morphy-ui/         # Design system core
│   ├── types.ts       # Centralized type definitions
│   ├── utils.ts       # Variant styles and utilities
│   ├── ripple.tsx     # Ripple effects
│   └── morphy.tsx     # Main exports
├── auth-context.tsx   # Authentication state
└── utils.ts           # General utilities

hooks/                 # Custom React hooks
public/                # Static assets
```

## 🎨 Design System

### 4. **Color Variants**

```typescript
type ColorVariant =
  | "none" // Default styling
  | "link" // Text link styling
  | "gradient" // Brand gradient
  | "glass" // Glassmorphism effect
  | "blue" // Blue gradient
  | "purple" // Purple gradient
  | "green" // Green gradient
  | "orange" // Orange gradient
  | "multi"; // Multi-color gradient
```

### 5. **Brand Colors**

```css
/* Primary Brand Gradient */
bg-gradient-to-r from-[#d0427f] to-[#303293]
hover:from-[#d0427f]/90 hover:to-[#303293]/90
```

## 🧩 Component Patterns

### 6. **Button Component**

```typescript
import { Button } from "@/components/ui/button";

// Basic usage
<Button variant="gradient" size="lg" showRipple>
  Click me
</Button>

// With icon
<Button
  variant="glass"
  size="xl"
  showRipple
  icon={{ icon: SparkleIcon, title: "Action" }}
>
  Action
</Button>

// Social login
<Button variant="glass" showRipple>
  <GoogleIcon className="mr-2 h-5 w-5" />
  Sign in with Google
</Button>
```

### 7. **Card Component**

```typescript
import { Card } from "@/components/ui/card";

// Basic card
<Card variant="glass" showRipple>
  Content here
</Card>

// With header icon
<Card
  variant="multi"
  showRipple
  icon={{ icon: ChatCircleIcon, title: "Chat", subtitle: "Start conversation" }}
>
  Content here
</Card>

// With positioned icon
<Card
  variant="glass"
  showRipple
  icon={{ icon: SparkleIcon, position: "top-right" }}
>
  Content here
</Card>
```

### 8. **Icon System**

```typescript
import { SparkleIcon, ChatCircleIcon } from "@phosphor-icons/react";

// Use Icon suffix for Phosphor icons
<SparkleIcon className="h-4 w-4" weight="regular" />

// Icon prop system (preferred)
<Button icon={{ icon: SparkleIcon, title: "Action" }}>
  Click me
</Button>
```

## ⚡ Effects & Interactions

### 9. **Ripple Effects**

- **Automatic**: Use `showRipple={true}` prop
- **Positioned**: Ripple starts from mouse entry point
- **Themed**: Colors automatically match component variant
- **Smooth**: 600ms animation with easing

### 10. **Glass Effects**

- **Modern**: Uses CSS variables for dynamic theming
- **Responsive**: Automatically adapts to light/dark mode
- **Consistent**: Centralized implementation in morphy-ui

### 11. **Hover States**

- **Conditional**: Only active when `showRipple={true}`
- **Smooth**: 200ms transitions
- **Themed**: Colors match component variants

## 🎭 Theme System

### 12. **Theme Provider Setup**

```typescript
// app/layout.tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {/* App content */}
</ThemeProvider>
```

### 13. **Theme Toggle**

```typescript
// Uses Switch component with resolvedTheme
<Switch
  checked={resolvedTheme === "dark"}
  onCheckedChange={handleThemeToggle}
/>
```

### 14. **Theme-Aware Components**

```typescript
// Logo switching
<Image
  src={
    resolvedTheme === "dark"
      ? "/genzdealz_darkmode.svg"
      : "/genzdealz_lightmode.svg"
  }
  alt="GenZDealZ.ai Logo"
/>
```

## 📦 Dependencies

### 15. **Core Dependencies**

- **Next.js 15**: App Router with React 19
- **Tailwind CSS 4**: Utility-first styling
- **shadcn/ui**: Component foundation
- **Phosphor Icons**: MIT licensed icon library
- **next-themes**: Theme management
- **Radix UI**: Accessible primitives

### 16. **Design System**

- **class-variance-authority**: Component variants
- **clsx/tailwind-merge**: Class name utilities
- **tailwindcss-animate**: Animation utilities

## 🚀 Best Practices

### 17. **Component Development**

1. **Start with shadcn**: Use existing shadcn components as base
2. **Extend with morphy**: Add variants and effects through morphy-ui
3. **Type everything**: Use TypeScript interfaces for props
4. **Keep it simple**: Avoid over-engineering

### 18. **Styling Approach**

1. **Use variants**: Prefer `variant="glass"` over custom classes
2. **Leverage props**: Use `showRipple`, `size`, `icon` props
3. **Minimal custom CSS**: Only add custom classes when necessary
4. **Consistent spacing**: Use Tailwind spacing scale

### 19. **Performance**

1. **Lazy load**: Use dynamic imports for heavy components
2. **Optimize images**: Use Next.js Image component
3. **Minimize re-renders**: Use React.memo and useCallback
4. **Bundle size**: Keep dependencies minimal

## 🔧 Development Workflow

### 20. **Adding New Components**

1. Create in `components/ui/` following shadcn patterns
2. Add morphy variants in `lib/morphy-ui/utils.ts`
3. Export from `lib/morphy-ui/morphy.tsx`
4. Document usage patterns

### 21. **Adding New Variants**

1. Update `ColorVariant` type in `lib/morphy-ui/types.ts`
2. Add styles in `lib/morphy-ui/utils.ts`
3. Test across light/dark themes
4. Update documentation

### 22. **Theme Changes**

1. Update CSS variables in `app/globals.css`
2. Test in both light and dark modes
3. Verify all components respond correctly
4. Check for contrast and accessibility

---

**Remember**: Keep it simple, consistent, and focused on the user experience. The design system should enhance development speed, not complicate it.

_Last Updated: 2024-12_
_Version: 3.0_
