# Modern Landing Page Components

## Overview
A complete responsive landing page implementation using React, Next.js, TypeScript, and Tailwind CSS with a Modern Corporate Minimalist style.

## Components Built

### 1. **HeroSection** (`components/HeroSection.tsx`)
- **Features:**
  - Full-screen hero with background image and overlay gradient
  - Large, emotional headline and subheadline
  - Two primary action buttons (primary and secondary)
  - Smooth animations and drop shadows
  - Fixed background attachment for parallax effect
  - Responsive text sizing using Tailwind's clamp utility
  - Animated scroll indicator at bottom

- **Customizable Props:**
  - `headline`: Main title text
  - `subheadline`: Supporting subtitle
  - `backgroundImage`: Image URL
  - `primaryButtonText`, `primaryButtonHref`: CTA button 1
  - `secondaryButtonText`, `secondaryButtonHref`: CTA button 2

### 2. **ImpactStats** (`components/ImpactStats.tsx`)
- **Features:**
  - Grid layout showcasing impact metrics (1 col mobile, 2 col tablet, 4 col desktop)
  - Animated counters that trigger on scroll visibility
  - Card-based design with subtle shadows (shadow-sm)
  - Icon support with Lucide React icons
  - Gradient accent background on hover
  - Smooth hover transitions with scale and color effects
  - Staggered animation entrance

- **Default Stats:**
  - People Reached (785M)
  - Long-Term Success Rate (95%)
  - Communities Transformed (600+)
  - Repair Guarantee Duration (5YR+)

### 3. **ValueProposition** (`components/ValueProposition.tsx`)
- **Features:**
  - Three-column feature grid highlighting key differentiators
  - Icon components with color transitions
  - Clean typography with hierarchy
  - Hover effects on cards
  - Border accent animations
  - Fully responsive layout

- **Default Propositions:**
  - Enabled by Technology
  - Built on Visibility
  - Focused on Repair

### 4. **CTASection** (`components/CTASection.tsx`)
- **Features:**
  - Full-width call-to-action section
  - Gradient background (navy to deep blue)
  - Large, compelling text
  - Single action button with icon
  - Icon animation on hover
  - Centered, spacious layout

## Design System

### Colors
- **Primary Navy**: `#091c37`
- **Water Blue**: `#0369a1`
- **Light Blue**: `#0ea5e9`
- **Teal Accent**: `#0d9488`
- **Deep Blue**: `#0c4a6e`

### Typography
- **Headings**: Libre Baskerville (serif) - elegant and professional
- **Body**: Inter (sans-serif) - clean and readable
- Font weights: 300, 400, 500, 600, 700

### Spacing
- Section padding: `py-24` (6rem vertical padding)
- Max-width container: `max-w-5xl` (64rem / ~1200px)
- Responsive padding: `px-6 sm:px-8 lg:px-12`

### Effects
- Shadows: `shadow-sm`, `shadow-md` on cards
- Transitions: `duration-300`, `duration-500` with `ease-out`
- Hover scales: `hover:scale-105`
- Blur effects: `backdrop-blur-sm` for transparency effects

## Navbar Updates
Enhanced sticky navigation with:
- Transparent-to-solid scroll transition
- Dynamic shadow on scroll
- High-contrast Donate button with gradient
- Smooth scroll listener for background effects
- Maintains existing dropdown structure

## Layout Structure

```
HomePage
├── HeroSection
│   └── Full-screen with overlay gradient
├── ImpactStats
│   ├── Section header
│   └── 4-column card grid (responsive)
├── ValueProposition
│   ├── Section header
│   └── 3-column feature grid
├── CTASection
│   └── Full-width gradient background
└── Original Content (preserved)
    └── Existing page sections
```

## Responsive Breakpoints

- **Mobile**: `sm` (640px)
- **Tablet**: `md` (768px), `lg` (1024px)
- **Desktop**: `xl` (1280px), `2xl` (1536px)

## Browser Support
- Modern browsers with CSS Grid, Flexbox, and CSS Transforms support
- Smooth scrolling behavior (CSS: `scroll-behavior: smooth`)
- Intersection Observer API for scroll animations

## Performance Features
- Lazy loading awareness (Intersection Observer)
- CSS transitions over JavaScript animations
- Optimized Tailwind classes
- No external CSS files needed

## Installation
```bash
npm install lucide-react --legacy-peer-deps
npm run dev  # Start development server
```

## Usage in page.tsx
```tsx
import HeroSection from '@/components/HeroSection';
import ImpactStats from '@/components/ImpactStats';
import ValueProposition from '@/components/ValueProposition';
import CTASection from '@/components/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection {...props} />
      <ImpactStats />
      <ValueProposition />
      <CTASection {...props} />
    </>
  );
}
```

## Customization Guide

### Changing Colors
Update the Tailwind classes in components (e.g., `bg-[#0369a1]` to your color)

### Modifying Stats
Edit the `stats` array in `ImpactStats.tsx`

### Updating Text Content
Props are fully customizable - pass new content via component props

### Changing Layout Width
Modify `max-w-5xl` to `max-w-4xl`, `max-w-6xl`, etc. in sections

### Animation Speed
Adjust `duration-300` to `duration-200` (faster) or `duration-500` (slower)
