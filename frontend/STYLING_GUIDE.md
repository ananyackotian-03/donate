# DaanSetu Frontend - Styling Guidelines

## Color System

### Primary Colors
```css
--primary-blue: #2563eb;
--primary-dark: #1e40af;
--primary-light: #3b82f6;
```

### Secondary Colors
```css
--success-green: #10b981;
--success-dark: #059669;
--warning-yellow: #fbbf24;
--danger-red: #ef4444;
--danger-dark: #dc2626;
```

### Neutral Colors
```css
--text-primary: #1f2937;
--text-secondary: #6b7280;
--text-light: #9ca3af;
--bg-light: #f3f4f6;
--bg-lighter: #e5e7eb;
--border-color: #e5e7eb;
--white: #ffffff;
```

## Typography

### Font Family
```css
-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
sans-serif
```

### Font Sizes
- H1: 2.5rem - 3rem
- H2: 2rem - 2.2rem
- H3: 1.5rem - 1.8rem
- Body: 1rem
- Small: 0.9rem - 0.95rem
- Label: 0.8rem

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

## Spacing System

```
2px, 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
```

### Common Spacing
- Padding: 1rem, 1.5rem, 2rem, 2.5rem
- Margin: 1rem, 1.5rem, 2rem, 3rem
- Gap (Flex/Grid): 1rem, 1.5rem, 2rem

## Border & Corners

### Border Radius
- Small: 8px
- Medium: 10px
- Large: 15px
- Full (Pills): 25px - 30px

### Borders
- Light: 1px solid #e5e7eb
- Focus: 2px solid #2563eb

## Shadows

### Box Shadows
```css
/* Subtle */
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

/* Medium */
box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);

/* Deep */
box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);

/* Hover */
box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
```

## Transitions & Animations

### Timing
- Fast: 0.2s - 0.3s
- Normal: 0.3s - 0.5s
- Slow: 0.5s - 1s

### Easing
```css
ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
ease-in: cubic-bezier(0.42, 0, 1, 1);
ease-out: cubic-bezier(0, 0, 0.58, 1);
ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);
```

### Common Transitions
```css
transition: all 0.3s ease;
transition: transform 0.3s ease;
transition: background-color 0.3s ease;
transition: box-shadow 0.3s ease;
```

## Component Patterns

### Buttons
```css
.btn {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}
```

### Cards
```css
.card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}
```

### Forms
```css
input, select, textarea {
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
```

### Status Badges
```css
.status-active {
  background-color: #d1fae5;
  color: #065f46;
}

.status-requested {
  background-color: #fed7aa;
  color: #92400e;
}

.status-completed {
  background-color: #dbeafe;
  color: #0c2d6b;
}
```

## Layout Patterns

### Grid Layouts
```css
/* Auto-fit grid for cards */
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 2rem;

/* Dashboard grid */
display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
gap: 1.5rem;
```

### Flexbox Patterns
```css
/* Center content */
display: flex;
justify-content: center;
align-items: center;

/* Space between */
display: flex;
justify-content: space-between;
align-items: center;
```

## Responsive Breakpoints

### Mobile First Approach
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Media Queries
```css
@media (max-width: 768px) {
  /* Mobile styles */
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1024px) {
  /* Tablet styles */
}
```

## Accessibility

### Color Contrast
- Normal text: 4.5:1 contrast ratio (WCAG AA)
- Large text: 3:1 contrast ratio (WCAG AA)

### Focus States
```css
input:focus,
button:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
```

### ARIA Labels
```html
<label htmlFor="email">Email Address</label>
<input id="email" type="email" />
```

## Animation Examples

### Hover Lift
```css
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}
```

### Shimmer Effect
```css
background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
animation: shimmer 2s infinite;
```

### Color Fade
```css
transition: background-color 0.3s ease;
```

## Common CSS Classes

- `.btn` - Primary button
- `.card` - Content card
- `.form-group` - Form field container
- `.status-badge` - Status indicator
- `.header` - Section header
- `.container` - Content container
- `.grid` - Grid layout
- `.flex` - Flex layout

## Best Practices

1. **Mobile First**: Start with mobile styles, then add desktop with media queries
2. **Consistency**: Use the defined color and spacing systems
3. **Performance**: Use CSS Grid and Flexbox instead of floats
4. **Accessibility**: Always include focus states and proper labels
5. **Responsive**: Test on multiple devices
6. **Organization**: Group related styles together
7. **DRY**: Avoid repeating CSS by using classes

## Testing Checklist

- [ ] Tested on mobile (375px), tablet (768px), and desktop (1440px)
- [ ] All interactive elements have hover states
- [ ] Focus states are visible
- [ ] Colors meet WCAG AA contrast requirements
- [ ] Loading states defined
- [ ] Error states defined
- [ ] Animations are smooth (60fps)
- [ ] No layout shifts on interactions

---

This styling guide ensures consistency across the DaanSetu platform for a professional, modern appearance.
