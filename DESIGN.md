# DESIGN.md

## Design System Name

**Hi-Tech Luxury Function Lab**

A premium futuristic visual system for an interactive M.5 mathematics function learning web app.

---

## Design Intent

The interface should feel like a high-end mathematical laboratory.

It should combine:

* Futuristic technology
* Luxury dashboard aesthetics
* Clear educational structure
* Smooth interactive motion
* Minimal text
* Strong graph-focused visual hierarchy

The design must impress students visually while helping them understand functions easily.

---

## Design Keywords

Use these words to guide design decisions:

* Hi-tech
* Luxury
* Premium
* Futuristic
* Clean
* Immersive
* Smooth
* Intelligent
* Minimal
* Visual-first
* Mathematical
* Calm
* Precise
* Elegant
* Interactive

Avoid these words as design direction:

* Cute
* Childish
* Busy
* Neon overload
* Cyberpunk chaos
* Generic SaaS
* Plain worksheet
* Cartoon game
* Template-like
* Text-heavy

---

## Visual Metaphor

The product should feel like:

> A futuristic control room where students explore mathematical functions visually.

The graph is the main “stage.”
Controls are “instruments.”
Explanations are “insight panels.”
Function types are “modules.”
Animations are “state transitions.”

---

## Surface Style

Recommended base style:

* Dark premium background
* Layered panels
* Soft glass-like depth
* Subtle glow
* Fine borders
* Elegant gradients used sparingly
* Clear graph grid
* Floating control cards
* Smooth panel transitions

Important:

Do not apply glassmorphism everywhere. Use it only for key floating panels.

---

## Color System

### Core Palette

Use a premium dark hi-tech palette.

```css
--bg-main: #070A12;
--bg-surface: #0D1220;
--bg-elevated: #111827;
--bg-glass: rgba(17, 24, 39, 0.72);

--text-primary: #F8FAFC;
--text-secondary: #CBD5E1;
--text-muted: #94A3B8;

--border-subtle: rgba(148, 163, 184, 0.18);
--border-strong: rgba(226, 232, 240, 0.28);
```

---

### Premium Accent Colors

Use accent colors carefully.

```css
--accent-cyan: #38BDF8;
--accent-blue: #2563EB;
--accent-gold: #F5C542;
--accent-violet: #8B5CF6;
--accent-emerald: #34D399;
--accent-rose: #FB7185;
```

Recommended usage:

* Cyan: active graph, main interactive highlights
* Blue: primary actions and selected states
* Gold: premium emphasis, key insight, important formula
* Violet: secondary highlights only, not the main identity
* Emerald: correct/success/positive change
* Rose: warning/error/negative change

Do not make the whole interface purple/cyan gradient. That looks generic and AI-generated.

---

### Graph Colors

Each function line should be clearly visible.

```css
--graph-primary: #38BDF8;
--graph-secondary: #F5C542;
--graph-tertiary: #A78BFA;
--graph-compare: #34D399;
--graph-warning: #FB7185;
--graph-grid: rgba(148, 163, 184, 0.18);
--graph-axis: rgba(248, 250, 252, 0.72);
```

Graph color rules:

* The active function must stand out.
* Comparison functions should be slightly dimmer.
* Domain/range highlights should use transparent overlays.
* Never use low-contrast lines on dark background.
* Labels must remain readable.

---

## Gradient Rules

Gradients are allowed, but must be elegant and controlled.

Good uses:

* Hero background glow
* Active graph aura
* Button highlight
* Thin top border on important panels
* Background radial light

Avoid:

* Gradient text everywhere
* Purple/cyan full-page gradient
* Every card having a gradient border
* Neon glow on all elements
* Random multi-color backgrounds

Recommended gradient examples:

```css
--gradient-premium: linear-gradient(135deg, rgba(56,189,248,0.24), rgba(245,197,66,0.14));
--gradient-panel: linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02));
--gradient-graph-glow: radial-gradient(circle, rgba(56,189,248,0.18), transparent 62%);
```

---

## Typography

### Font Direction

Thai text must be clean, modern, and readable.

Recommended font direction:

* Primary Thai/UI font: `LINE Seed Sans TH`, `Noto Sans Thai`, `IBM Plex Sans Thai`, or a similar modern Thai sans-serif
* Formula/monospace font: `JetBrains Mono`, `Roboto Mono`, or equivalent
* Optional display font: only for hero title or large labels, not body text

Fallback stack:

```css
font-family: "LINE Seed Sans TH", "Noto Sans Thai", "IBM Plex Sans Thai", system-ui, sans-serif;
```

Formula stack:

```css
font-family: "JetBrains Mono", "Roboto Mono", ui-monospace, monospace;
```

---

## Type Scale

Use clear hierarchy.

```css
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-md: 1.125rem;
--text-lg: 1.25rem;
--text-xl: 1.5rem;
--text-2xl: 2rem;
--text-3xl: 2.75rem;
--text-4xl: 4rem;
```

Recommended use:

* Page title: 2.75rem–4rem on desktop
* Section title: 1.5rem–2rem
* Card title: 1.125rem–1.25rem
* Body Thai text: at least 1rem
* Classroom mode body text: 1.125rem or larger
* Formula display: 1.25rem–2rem
* Graph labels: at least 0.875rem

Avoid tiny text.

---

## Typography Rules

Use fewer words and stronger hierarchy.

Rules:

* Do not use long paragraphs.
* Prefer 1–2 line explanations.
* Use formulas as visual anchors.
* Avoid all-caps for Thai text.
* Avoid wide letter spacing for Thai text.
* Avoid gray text on colored backgrounds.
* Body line-height should be comfortable.

Recommended line heights:

```css
--leading-tight: 1.15;
--leading-title: 1.2;
--leading-body: 1.65;
--leading-ui: 1.45;
```

---

## Layout System

### Desktop Layout

Recommended main screen:

```text
┌─────────────────────────────────────────────────────────────┐
│ Top Navigation / Lesson Context                             │
├───────────────┬───────────────────────────────┬─────────────┤
│ Function      │                               │ Insight     │
│ Selector      │        Main Graph Stage       │ Panel       │
│ + Controls    │                               │             │
├───────────────┴───────────────────────────────┴─────────────┤
│ Transformation Timeline / Concept Cards                     │
└─────────────────────────────────────────────────────────────┘
```

Desktop layout priorities:

1. Graph stage
2. Formula controls
3. Explanation/insight
4. Function selector
5. Optional concept strip

---

### Tablet Layout

Recommended:

```text
┌──────────────────────────────┐
│ Top Context                   │
├──────────────────────────────┤
│ Graph Stage                   │
├──────────────┬───────────────┤
│ Controls     │ Insight Panel │
└──────────────┴───────────────┘
```

---

### Mobile Layout

Recommended:

```text
┌──────────────────────────────┐
│ Function Selector             │
├──────────────────────────────┤
│ Graph Stage                   │
├──────────────────────────────┤
│ Main Controls                 │
├──────────────────────────────┤
│ Swipeable Insight Cards       │
└──────────────────────────────┘
```

Mobile rules:

* Hide secondary details behind expand buttons.
* Keep the graph visible early.
* Controls should be touch-friendly.
* Avoid horizontal overflow.
* Use bottom sheets or swipe cards for explanations.

---

## Spacing System

Use an 8px-based spacing scale.

```css
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-5: 1.25rem;
--space-6: 1.5rem;
--space-8: 2rem;
--space-10: 2.5rem;
--space-12: 3rem;
--space-16: 4rem;
```

Spacing rules:

* Premium UI needs breathing room.
* Do not cram controls.
* Important panels need larger spacing.
* Related controls should be grouped tightly.
* Separate unrelated concepts with more space.
* Avoid monotonous equal spacing everywhere.

---

## Radius System

Use modern but controlled border radius.

```css
--radius-sm: 0.5rem;
--radius-md: 0.875rem;
--radius-lg: 1.25rem;
--radius-xl: 1.75rem;
--radius-2xl: 2.25rem;
--radius-full: 999px;
```

Usage:

* Buttons: md to full
* Control cards: lg
* Main panels: xl
* Graph stage: 2xl
* Tiny tags: full

Avoid making every element extremely rounded.

---

## Elevation and Depth

Use soft luxury depth.

```css
--shadow-soft: 0 16px 40px rgba(0, 0, 0, 0.28);
--shadow-panel: 0 24px 80px rgba(0, 0, 0, 0.42);
--shadow-glow-cyan: 0 0 40px rgba(56, 189, 248, 0.18);
--shadow-glow-gold: 0 0 36px rgba(245, 197, 66, 0.16);
```

Depth rules:

* Use depth to show interaction hierarchy.
* Main graph stage can have stronger depth.
* Secondary cards should stay quieter.
* Do not combine heavy border, heavy shadow, and heavy glow at the same time.

---

## Component Style

### Main Graph Stage

The graph stage should be the visual center.

Style:

* Large rounded panel
* Dark refined surface
* Subtle radial glow behind active graph
* Clear axis and grid
* Floating formula label
* Smooth graph transition
* Optional 2D/3D toggle

Must include:

* Active formula display
* Graph area
* Coordinate axis
* Important point markers
* Responsive scaling
* Readable labels

Avoid:

* Tiny graph
* Too many controls inside graph
* Low contrast grid
* Decorative-only 3D effects

---

### Function Selector

Style:

* Premium segmented control, carousel, or module rail
* Clear selected state
* Smooth transition when switching
* Icon or mini graph preview if useful

States:

* Default
* Hover
* Active
* Focus
* Disabled

Selected state may use cyan or gold accent.

---

### Formula Card

Style:

* Compact but prominent
* Formula-first
* Use monospace for formulas
* Include short Thai explanation
* Parameter chips or sliders below

Example structure:

```text
y = a(x - h)² + k
a ควบคุมความกว้างและทิศทางของกราฟ
```

---

### Parameter Controls

Use:

* Sliders
* Stepper buttons
* Small numeric input
* Toggle switches
* Preset chips

Control rules:

* Every control must show current value.
* Changed value should briefly highlight.
* Slider motion should update graph smoothly.
* Avoid showing too many sliders at once.
* Group parameters by meaning.

Example groups:

* Shape: `a`
* Position: `h`, `k`
* Intercept: `b`
* Base: `b` for exponential/logarithm

---

### Insight Panel

The insight panel explains what students should notice.

Style:

* Short text
* Highlighted formula variable
* Visual bullet or icon
* Optional before/after mini graph

Content structure:

```text
สิ่งที่สังเกต
ค่า a มากขึ้น → กราฟแคบลง
ค่า a ติดลบ → กราฟคว่ำลง
```

Avoid long textbook explanations.

---

### Concept Cards

Use cards for:

* Definition
* Example
* Key observation
* Warning
* Try this
* Formula meaning

Card types:

1. Definition card
2. Example card
3. Observation card
4. Warning card
5. Challenge card

Avoid identical generic card grids.

---

### Floating Panels

Floating panels can be used for luxury hi-tech feel.

Use for:

* Formula overlay
* Graph settings
* 2D/3D toggle
* Compare mode
* Mini explanation

Rules:

* Must not block important graph information.
* Must be draggable or dismissible only if useful.
* Must have subtle blur and clear border.
* Do not create too many floating windows.

---

## Animation System

Animation is a core part of the product.

Motion should communicate change, not just decorate.

---

### Motion Principles

1. Smooth
2. Purposeful
3. Premium
4. Calm
5. Responsive
6. Not childish
7. Not distracting

---

### Timing

```css
--duration-fast: 150ms;
--duration-normal: 240ms;
--duration-slow: 420ms;
--duration-panel: 520ms;
```

Recommended uses:

* Button feedback: 150ms
* Hover/focus: 150–240ms
* Panel swap: 320–520ms
* Graph morph: 420–700ms
* 2D/3D transition: 600–900ms

---

### Easing

Use elegant easing.

```css
--ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1);
--ease-emphasized: cubic-bezier(0.16, 1, 0.3, 1);
--ease-precise: cubic-bezier(0.4, 0, 0.2, 1);
```

Avoid:

* Bounce easing
* Elastic easing
* Cartoonish overshoot
* Random spin
* Excessive delay

---

### Recommended Animations

Use these animations:

1. **Panel Swap**
   When switching function type, old panel slides/fades out and new panel slides/fades in.

2. **Formula Morph**
   Formula changes with subtle character/line transition.

3. **Graph Morph**
   Graph line smoothly transitions when parameter changes.

4. **Parameter Pulse**
   Changed variable briefly glows or highlights.

5. **Layer Reveal**
   Domain/range, asymptotes, vertex, or intercepts appear as layers.

6. **Compare Split**
   Before/after graph appears as a ghost line or split view.

7. **3D Lift**
   Switching to 3D gently lifts the graph stage into depth.

8. **Insight Slide**
   Explanation panel updates with slide/fade motion.

9. **Card Stack Swap**
   Concept cards can reorder or swap with smooth motion.

10. **Focus Ring Glow**
    Active control receives a subtle premium glow.

---

### Animation Technical Rules

Prefer animating:

* `transform`
* `opacity`
* `filter` lightly
* SVG path or graph drawing if performant

Avoid animating:

* `width`
* `height`
* `top`
* `left`
* `margin`
* `padding`

Always support:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
    transition-duration: 0.01ms;
    scroll-behavior: auto;
  }
}
```

---

## 2D Graph Design

2D graph should be precise and readable.

Rules:

* Axis lines must be clear.
* Grid should be subtle, not distracting.
* Active function line should be bright.
* Important points should have labels.
* Labels should not overlap when possible.
* Use hover/tap to reveal details.
* Provide reset view or fit graph button.
* Make panning/zooming optional and controlled.

Graph elements:

* x-axis
* y-axis
* grid lines
* function curve
* key points
* domain/range overlay
* asymptote line
* vertex marker
* intercept marker
* tooltip

---

## 3D Design

3D mode should feel impressive but still educational.

3D style:

* Dark stage
* Soft depth
* Floating grid
* Controlled camera
* Transparent graph layers
* Subtle light sweep
* Minimal labels

3D should not include:

* Random spinning objects
* Overly complex perspective
* Hard-to-read formula labels
* Excessive particle effects
* Heavy effects that slow down low-end devices

Use 3D to show:

* Layered graph comparison
* Parameter transformation stages
* Multiple function surfaces
* Depth-based function families
* Floating formula panels

---

## Icons

Use icons sparingly.

Icon rules:

* Icons should help recognition.
* Always pair important icons with text labels.
* Avoid icon-only controls unless obvious.
* Use line icons or geometric icons.
* Avoid cartoon icons.
* Avoid putting every icon inside the same rounded square tile.

Possible icon meanings:

* Function
* Graph
* Formula
* Domain
* Range
* Transform
* Compare
* 2D
* 3D
* Reset
* Info

---

## Copy Style

Text should be short.

Good:

```text
ปรับค่า a
ดูความชัน
กราฟเลื่อนขึ้น
จุดตัดแกน y
โดเมนที่ใช้ได้
```

Avoid:

```text
ระบบนี้จะช่วยยกระดับประสบการณ์การเรียนรู้คณิตศาสตร์ของคุณให้ล้ำสมัยและมีประสิทธิภาพ
```

Tone:

* Clear
* Friendly
* Teacher-like
* Direct
* Encouraging
* Not childish
* Not overly formal

---

## Page Structure

### Recommended Pages / Sections

1. Entry screen
2. Function Lab screen
3. Function type module
4. 2D graph mode
5. 3D graph mode
6. Compare mode
7. Domain/range mode
8. Transformation mode
9. Teacher presentation mode
10. Help / quick guide

---

## Main Screen Wireframe

```text
Top Bar
- Product name
- Current topic
- 2D / 3D toggle
- Presentation mode

Left Panel
- Function selector
- Formula preset
- Parameters

Center Stage
- Main graph
- Formula overlay
- Graph tools
- Active markers

Right Panel
- Key observation
- Short explanation
- Try changing this
- Mini before/after insight

Bottom Strip
- Transformation steps
- Concept chips
- Compare snapshots
```

---

## Interaction States

Every interactive element should have:

* Default
* Hover
* Active
* Focus
* Selected
* Disabled
* Loading
* Error if relevant

Focus states must be visible.

---

## Classroom Presentation Mode

Add or support a mode optimized for projector use.

Presentation mode should:

* Enlarge formula text
* Enlarge graph labels
* Hide nonessential UI
* Reduce visual clutter
* Keep controls accessible to teacher
* Increase contrast
* Make explanation cards larger

---

## Mobile Behavior

On mobile:

* Function selector becomes horizontal swipe tabs.
* Graph remains near the top.
* Controls become collapsible.
* Insight panel becomes swipeable cards.
* 3D mode may be simplified or disabled if performance is poor.
* Avoid tiny controls.
* Avoid dense side panels.

---

## Accessibility

Accessibility requirements:

* High contrast text
* Keyboard focus states
* Touch targets at least 44px
* No information by color only
* Reduced motion support
* Readable Thai font
* Screen-reader labels for controls
* Slider values announced or visible
* Graph information should have textual fallback

---

## Slop Avoidance Rules

Do not use these AI slop patterns:

* Purple/cyan gradient as the whole identity
* Glassmorphism on every card
* Neon glow everywhere
* Gradient text everywhere
* Repeated rounded icon tiles
* Identical feature card grids
* Nested cards
* Side border accent on every card
* Generic SaaS layout
* Meaningless stats
* Huge hero headline with tiny pill label
* Overused marketing words
* Text-heavy explanation blocks
* Low-contrast gray text
* Tiny body text
* Too many shadows
* Too many animations
* Decorative-only 3D

If the UI starts to look too AI-generated, use:

* `/impeccable critique`
* `/impeccable quieter`
* `/impeccable layout`
* `/impeccable typeset`
* `/impeccable polish`
* `npx impeccable detect src/`

---

## Design Quality Checklist

Before considering the design finished, check:

* Is the graph the main focus?
* Can a student understand what to click first?
* Is the current formula obvious?
* Is the changed parameter visually highlighted?
* Are Thai explanations short and readable?
* Does the interface look premium without being noisy?
* Does animation help understanding?
* Does the layout work on mobile?
* Does the design avoid generic AI slop?
* Is contrast strong enough for classroom projection?
* Are 2D/3D modes useful, not just decorative?
* Can a teacher use this immediately in class?

---

## Recommended Implementation Notes

Use a component-based structure.

Suggested components:

* `FunctionLabPage`
* `GraphStage`
* `FunctionSelector`
* `FormulaDisplay`
* `ParameterControls`
* `InsightPanel`
* `ConceptCard`
* `GraphModeToggle`
* `TransformationTimeline`
* `ComparePanel`
* `PresentationModeToggle`
* `FloatingPanel`
* `MotionContainer`

Suggested state groups:

* selected function type
* current parameters
* graph mode: 2D or 3D
* selected concept layer
* comparison enabled
* presentation mode enabled
* reduced motion preference

---

## Final Design Direction

The final UI should feel like a premium interactive math laboratory.

It should be visually impressive enough to make students curious, but clear enough that a teacher can explain the lesson immediately.

The product should look modern, hi-tech, and luxurious, but every design choice must support the learning of functions.

Design goal:

> Make functions visible, interactive, and enjoyable to understand.
