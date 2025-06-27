# GenZDealZ Design System (v3.1)

## 🎯 Core Rules

### 1. **Components**

- Use **shadcn/ui** components only (`npm install` not manual files)
- Use `shadcn@` not `shadcn-ui`
- Always use available props (`size`, `variant`, `showRipple`, `icon`)
- All color/gradient/glass variants must use the centralized `ColorVariant` type

### 2. **Code Style**

- **Arrow functions only** — use `const Component = () => {}`
- Use ES6+ syntax
- Make components reusable

### 3. **UI/UX**

- Add physics/vibe to elements (ripple effects, smooth transitions)
- **NO hover scale effects** (no `transform: scale` on hover)
- Use `cursor-pointer` for interactive elements
- Add proper spacing (`px-6` to `px-16` for buttons)
- **Text overflow tooltips**: Always add `title` attribute to elements with `truncate` class for automatic overflow detection

### 4. **Effects**

- Use `lib/morphy-ui/morphy.tsx` for all effects and types
- Use `showRipple={true}` for interactive elements
- Apply glass effects using `variant="glass"` (always uses the new depth effect)
- **Ripple colors automatically complement variant colors** — no manual configuration needed
- Glass effect uses modern Tailwind approach with CSS variables

### 5. **Icons**

- Use **Phosphor Icons** (`@phosphor-icons/react@2.1.10`) — MIT licensed for commercial use
- **Always use the `Icon` suffix** (e.g., `ChatCircleIcon`, `TrendUpIcon`, `CaretRightIcon`)
- **Global icon weight management** — Use `useIconWeight()` hook or `IconWrapper` component
- **Default weight**: `regular` (configurable via `IconThemeProvider`)
- **Use icon prop** — Prefer `icon={{ icon: IconName }}` over manual icon rendering
- Import like: `import { ChatCircleIcon } from "@phosphor-icons/react";`
- **Social Icons**: Use exported social icons from morphy system (`GoogleIcon`, `AppleIcon`, `InstagramIcon`)

### 6. **Morphy Props Over Manual ClassNames**

- **NEVER use manual className when morphy props are available**
- **Use built-in props instead of manual styling**:

```typescript
// ❌ WRONG - Manual className
<Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-500/90 hover:to-purple-600/90">

// ✅ CORRECT - Use variant prop
<Button variant="blue">

// ❌ WRONG - Manual glass styling
<Button className="bg-white/10 backdrop-blur-md border border-white/20">

// ✅ CORRECT - Use glass variant
<Button variant="glass">

// ❌ WRONG - Manual ripple styling
<Button className="relative overflow-hidden">

// ✅ CORRECT - Use showRipple prop
<Button showRipple>
```

- **Available morphy props to use**:
  - `variant`: centralized `ColorVariant` (`"none"`, `"link"`, `"gradient"`, `"glass"`, `"blue"`, `"purple"`, `"green"`, `"orange"`, `"multi"`)
  - `showRipple`: boolean
  - `size`: `"sm"`, `"default"`, `"lg"`, `"xl"`, `"icon"`, `"icon-sm"`
  - `icon`: `{ icon: IconComponent, title?: string, subtitle?: string }`
- **Only use className for custom positioning, layout, or unique styling not covered by morphy props**

### 7. **Layout & Spacing Patterns**

- **Navbar-aware layouts**: Always account for fixed navbar height (7rem/112px) in layout calculations
- **Consistent container widths**: Use `w-64` (16rem) for sidebars, full width for main content areas
- **Proper spacing hierarchy**:
  - `px-2` for sidebar content padding
  - `px-4` to `px-6` for main content padding
  - `p-4` for component padding
- **Height calculations**: Use `h-screen` for full viewport, `calc(100vh - 7rem)` for navbar-aware layouts
- **Gap management**: Minimize gaps between sidebar and main content (use consistent width units)

### 8. **State Management & Interactions**

- **Active state prominence**: Make active states significantly more prominent than hover states
- **State hierarchy**: Active > Hover > Default (clear visual distinction between each)
- **Interactive feedback**: All interactive elements must have hover and active states
- **State persistence**: Use `isActive` prop for persistent state management
- **Event handling**: Always prevent event bubbling when needed (`e.stopPropagation()`)

### 9. **Accessibility & UX Patterns**

- **Keyboard navigation**: All interactive elements must be keyboard accessible
- **ARIA labels**: Use descriptive `aria-label` for all interactive elements
- **Tooltip consistency**: Use `title` attribute for truncated text, `tooltip` prop for component tooltips
- **Focus management**: Ensure proper focus order and visible focus indicators
- **Screen reader support**: Use semantic HTML and proper ARIA attributes

## 🧩 Component Patterns

### 10. **Button Component**

```typescript
import { Button } from "@/components/ui/button";

// Complete button with all props
<Button
  size="xl"
  variant="gradient"
  showRipple
  icon={{ icon: SparkleIcon, title: "Action" }}
>
  Action
</Button>

// Social login buttons
<Button variant="glass" showRipple>
  <GoogleIcon className="mr-2 h-5 w-5" />
  Sign in with Google
</Button>
```

### 11. **Card Component**

```typescript
import { Card } from "@/components/ui/card";

// Complete card with all props
<Card
  variant="multi"
  showRipple
  icon={{
    icon: ChatCircleIcon,
    title: "Chat",
    subtitle: "Start a conversation",
  }}
>
  Content
</Card>;
```

### 12. **Icon Patterns**

```typescript
import { SparkleIcon, ChatCircleIcon } from "@phosphor-icons/react";

// Standard icon usage
<SparkleIcon className="h-4 w-4" weight={useIconWeight()} />

// Social icons - consistent sizing
<GoogleIcon className="h-5 w-5" />
<AppleIcon className="h-5 w-5" />
<InstagramIcon className="h-5 w-5" />

// Icon prop system (preferred)
<Button variant="glass" icon={{ icon: SparkleIcon, title: "Action" }}>
  Click me
</Button>
```

### 13. **Chat Interface Patterns**

```typescript
// Chat sidebar with proper state management
<SidebarMenuButton
  isActive={chat.isActive}
  onClick={() => onSelectChat(chat.id)}
  tooltip={chat.title}
  variant={chat.isActive ? "outline" : "default"}
  showRipple
  className={cn(
    "w-full text-left flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
    chat.isActive
      ? "bg-primary/20 border-primary/50 text-primary shadow-md hover:bg-primary/25"
      : "hover:bg-muted/50 hover:text-foreground"
  )}
  aria-label={chat.title}
>
  {/* Chat content with proper text overflow handling */}
  <p className="truncate" title={chat.title}>
    {chat.title}
  </p>
</SidebarMenuButton>

// Chat input with proper spacing
<div className="flex-1 flex flex-col">
  <div className="flex-1 overflow-y-auto pt-4">
    {/* Messages */}
  </div>
  <div className="border-t p-4">
    {/* Input */}
  </div>
</div>
```

## 🎨 Brand Colors & Gradients

### 14. **Primary Brand Gradient**

```css
/* Primary Brand Gradient */
bg-gradient-to-r from-[#d0427f] to-[#303293]
hover:from-[#d0427f]/90 hover:to-[#303293]/90
```

## 📁 File Structure

### 15. **Project Organization**

```
components/ui/           # shadcn components
lib/
  morphy-ui/             # All effects and types
    types.ts             # Effect types and interfaces
    gradients.ts         # Gradient presets and utilities
    ripple.tsx           # Ripple effects (auto-complements variants)
    utils.ts             # Effect utilities
    icon-theme-context.tsx # Icon weight management
    icon-utils.tsx       # Icon utilities
    social-icons.tsx     # Social media icons (Google, Apple, Instagram)
    morphy.tsx           # Main effects entry point
app/                     # Next.js pages
```

## 📦 Imports

### 16. **Standard Imports**

```typescript
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  useRipple,
  gradientPresets,
  createGradient,
  getVariantGradient,
  getRippleGradient,
  GradientShowcase,
  GlassShowcase,
} from "@/lib/morphy-ui/morphy";
import { useIconWeight } from "@/lib/morphy-ui/icon-theme-context";
import { GoogleIcon, AppleIcon, InstagramIcon } from "@/lib/morphy-ui/morphy";
import {
  ChatCircleIcon,
  TrendUpIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
```

## 🔧 Social Icons System

### 17. **Social Icons Usage**

```typescript
// Import social icons
import { GoogleIcon, AppleIcon, InstagramIcon, SocialIcons } from "@/lib/morphy-ui/morphy";

// Available social icons
SocialIcons.Google      // GoogleIcon component
SocialIcons.Apple       // AppleIcon component
SocialIcons.Instagram   // InstagramIcon component

// Usage in components - consistent sizing
<GoogleIcon />
<AppleIcon />
<InstagramIcon />
```

## ⚖️ License Compliance

### 18. **Dependency Licensing**

- **Mandatory Check**: Before installing any new dependency, its license **must** be verified to ensure it is safe for commercial use.
- **Permitted Licenses**: `MIT`, `Apache-2.0`, `ISC`, and `BSD` are pre-approved.
- **Requires Review**: Licenses like `LGPL` or `MPL` require team review before use.
- **Strictly Prohibited**: `GPL`, `AGPL`, and `UNLICENSED` packages are forbidden.
- **Verification Command**: Use `npm view <package-name> license` to quickly check a package's license from the terminal.

---

**Remember**: Use `ColorVariant` everywhere, glass effect uses modern Tailwind with CSS variables, ripple color is derived from `ColorVariant`, and all effects are centralized in morphy-ui.

_Last Updated: 2024-12_
_Version: 3.2_

### 4. **Text Overflow & Tooltips**

- **Always add tooltips for truncated text**: Use native HTML `title` attribute with `truncate` class
- **Automatic overflow detection**: Browser will only show tooltip when text is actually truncated
- **Implementation pattern**:

```typescript
// ✅ CORRECT - Native tooltip for overflow
<p className="truncate" title="Full text content">
  Truncated text content
</p>

// ❌ WRONG - No tooltip for truncated text
<p className="truncate">
  Truncated text content
</p>
```

- **Use cases**: Chat titles, button labels, card titles, navigation items, any text that might overflow
