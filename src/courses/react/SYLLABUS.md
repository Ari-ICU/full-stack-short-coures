# ⚛️ React Full-Stack Master Curriculum & Teaching Syllabus

មគ្គុទ្ទេសក៍បង្រៀន និងរៀន React Full-Stack Development កម្រិតអាជីព (រៀបចំតាមស្តង់ដារ Topic-by-Topic & Path-by-Path)។

---

## 🗺️ Master Curriculum Overview

```
2. React Fundamentals  ──► Module 1, Module 2, Module 3
3. Hooks (Core & Adv)  ──► Module 3, Module 4, Module 7, Module 8, Module 10
4. API / Async Data    ──► Module 9, Module 13
5. Routing Architecture──► Module 6, Module 12
6. State Management    ──► Module 3, Module 7, Module 11, Module 13
7. Forms & Validations ──► Module 3, Module 12
8. Authentication      ──► Module 12
10. Testing & QA       ──► Module 14
11. Performance        ──► Module 8, Module 15
12. Production & CI/CD ──► Module 15
```

---

## 2️⃣ React Fundamentals

ស្ថាបត្យកម្មគ្រឹះនៃ React Component Architecture, JSX, Props, State, Events, Rendering Lists, និង Forms។

### ├── Components
- **Path:** [`module-1-tooling-architecture/04-functional-components.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-1-tooling-architecture/04-functional-components.mdx)
- **ខ្លឹមសារ:** Pure Functional Components, PascalCase Naming, Component Tree Hierarchy (Parent-Child Nesting), និង Single Responsibility Principle (SRP)។

### ├── JSX
- **Path:** [`module-1-tooling-architecture/03-jsx-syntax.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-1-tooling-architecture/03-jsx-syntax.mdx)
- **ខ្លឹមសារ:** JSX Transpilation ទៅ `React.createElement`, វិធានមាសទាំង ៣ (Single Root, Close all tags, camelCase attributes), Dynamic Expressions `{}` (Math, Ternaries), និង React Fragments `<>...</>`។

### ├── Props
- **Path:** [`module-2-props-lists-conditional/01-props-destructuring.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-2-props-lists-conditional/01-props-destructuring.mdx)
- **Path:** [`module-2-props-lists-conditional/02-component-composition-children.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-2-props-lists-conditional/02-component-composition-children.mdx)
- **ខ្លឹមសារ:** One-way Data Flow, Props Destructuring, Default Values, និង Slot Patterns ជាមួយ `props.children`។

### ├── State
- **Path:** [`module-3-state-events/01-usestate-mechanics.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-3-state-events/01-usestate-mechanics.mdx)
- **Path:** [`module-3-state-events/03-state-immutability.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-3-state-events/03-state-immutability.mdx)
- **ខ្លឹមសារ:** `useState` Async Batching, Functional State Updates `setCount(prev => prev + 1)`, និង State Immutability (Spread Operator លើ Arrays/Objects)។

### ├── Events
- **Path:** [`module-3-state-events/02-synthetic-events.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-3-state-events/02-synthetic-events.mdx)
- **ខ្លឹមសារ:** Cross-browser Synthetic Event System (`onClick`, `onChange`, `onSubmit`), `e.preventDefault()`, `e.stopPropagation()`, និង Event Delegation លើ Root DOM។

### ├── Conditional Rendering
- **Path:** [`module-2-props-lists-conditional/04-conditional-rendering.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-2-props-lists-conditional/04-conditional-rendering.mdx)
- **ខ្លឹមសារ:** Ternary Operator `a ? b : c`, Logical Short-circuit `&&` (ការការពារអន្ទាក់លេខ 0), និង Early Return Pattern សម្រាប់ Loading/Error States។

### ├── Lists & Keys
- **Path:** [`module-2-props-lists-conditional/03-list-rendering-keys.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-2-props-lists-conditional/03-list-rendering-keys.mdx)
- **ខ្លឹមសារ:** List Rendering ជាមួយ `.map()`, សារៈសំខាន់នៃ `key` prop ចំពោះ Diffing Algorithm និងការចៀសវាង Array Index ជា Key។

### └── Forms
- **Path:** [`module-3-state-events/05-controlled-forms.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-3-state-events/05-controlled-forms.mdx)
- **ខ្លឹមសារ:** Controlled Inputs, Single Source of Truth, Dynamic Handler `[e.target.name]: e.target.value`, Checkboxes, និង Dropdowns។

---

## 3️⃣ React Hooks

ស្វែងយល់ពី Core & Advanced Hooks ទាំង ៨ ព្រមទាំងការបង្កើត Custom Hooks សម្រាប់ Reusable Logic។

### ├── useState
- **Path:** [`module-3-state-events/01-usestate-mechanics.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-3-state-events/01-usestate-mechanics.mdx)
- **ខ្លឹមសារ:** គ្រប់គ្រង Local Component State, State Preservation ឆ្លងកាត់ Re-renders, និង Functional Updates។

### ├── useEffect
- **Path:** [`module-4-useeffect/01-useeffect-fundamentals.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-4-useeffect/01-useeffect-fundamentals.mdx)
- **Path:** [`module-4-useeffect/02-dependency-array-rules.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-4-useeffect/02-dependency-array-rules.mdx)
- **Path:** [`module-4-useeffect/03-cleanup-function-memory.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-4-useeffect/03-cleanup-function-memory.mdx)
- **ខ្លឹមសារ:** Side Effects Synchronization, Dependency Array Rules, Memory Leak Prevention ជាមួយ Cleanup Functions, និង Timer/Event Listeners។

### ├── useContext
- **Path:** [`module-7-global-state/02-context-api-setup.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-7-global-state/02-context-api-setup.mdx)
- **Path:** [`module-7-global-state/04-custom-context-providers.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-7-global-state/04-custom-context-providers.mdx)
- **ខ្លឹមសារ:** ចែករំលែក Global Data (Theme, Auth, Cart) ដោយមិនបាច់ Prop Drilling និង Custom Consumer Hooks ជាមួយ Runtime Guards។

### ├── useRef
- **Path:** [`module-8-performance-patterns/03-useref-dom-actions.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-8-performance-patterns/03-useref-dom-actions.mdx)
- **ខ្លឹមសារ:** Direct DOM Access (Focus, Scroll, Video play), Mutable Reference ដែលមិន Trigger Re-render (Timer IDs, Previous Values)។

### ├── useReducer
- **Path:** [`module-7-global-state/03-usereducer-complex-state.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-7-global-state/03-usereducer-complex-state.mdx)
- **ខ្លឹមសារ:** State Machine Architecture សម្រាប់ Complex State Transitions, Reducer Pure Function, Action Types, និង Dispatch Pattern។

### ├── useMemo
- **Path:** [`module-8-performance-patterns/01-performance-optimization.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-8-performance-patterns/01-performance-optimization.mdx)
- **ខ្លឹមសារ:** Cache លទ្ធផលនៃការគណនាធ្ងន់ៗ (Expensive Calculations) ដើម្បីកុំឱ្យគណនាឡើងវិញរាល់ពេល Render។

### ├── useCallback
- **Path:** [`module-8-performance-patterns/01-performance-optimization.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-8-performance-patterns/01-performance-optimization.mdx)
- **ខ្លឹមសារ:** Cache Function Reference ពេលបញ្ជូន Function ជា Prop ទៅកាន់ Memoized Child (`React.memo`)។

### └── Custom Hooks
- **Path:** [`module-10-custom-hooks/01-what-are-custom-hooks.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-10-custom-hooks/01-what-are-custom-hooks.mdx)
- **Path:** [`module-10-custom-hooks/02-usefetch-hook.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-10-custom-hooks/02-usefetch-hook.mdx)
- **Path:** [`module-10-custom-hooks/03-uselocalstorage-hook.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-10-custom-hooks/03-uselocalstorage-hook.mdx)
- **Path:** [`module-10-custom-hooks/04-usedebounce-hook.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-10-custom-hooks/04-usedebounce-hook.mdx)
- **ខ្លឹមសារ:** បង្កើត Reusable Logic Hooks ៖ `useFetch` (Network + Cancel), `useLocalStorage` (Storage Sync), `useDebounce` (Delay API Calls)។

---

## 4️⃣ API / Async Data & Network Lifecycle

### ├── Fetch
- **Path:** [`module-9-data-fetching/01-fetch-api-basics.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-9-data-fetching/01-fetch-api-basics.mdx)
- **ខ្លឹមសារ:** Native `fetch()` ក្នុង `useEffect`, Response Handling, និង AbortController Request Cancelation។

### ├── Axios
- **Path:** [`module-9-data-fetching/02-axios-and-http-client.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-9-data-fetching/02-axios-and-http-client.mdx)
- **Path:** [`module-13-api-integration/02-axios-service-layer.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-13-api-integration/02-axios-service-layer.mdx)
- **ខ្លឹមសារ:** Centralized Axios Client, Request Interceptor (Bearer Token), Response Interceptor (Error Handling)។

### ├── CRUD Operations
- **Path:** [`module-9-data-fetching/04-mini-project.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-9-data-fetching/04-mini-project.mdx)
- **Path:** [`module-13-api-integration/05-mini-project.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-13-api-integration/05-mini-project.mdx)
- **ខ្លឹមសារ:** Full CRUD ជាមួយ API Mocking, Optimistic Updates, និង Cache Invalidation។

### ├── Loading, Error & Empty States
- **Path:** [`module-9-data-fetching/03-data-fetching-patterns.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-9-data-fetching/03-data-fetching-patterns.mdx)
- **Path:** [`module-13-api-integration/04-error-handling-strategies.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-13-api-integration/04-error-handling-strategies.mdx)
- **ខ្លឹមសារ:** Skeleton Loaders, Race Conditions Prevention, React Error Boundaries, Toast Alerts, និង Empty Fallbacks។

### └── Authentication & Token Handling
- **Path:** [`module-12-authentication/01-auth-concepts.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-12-authentication/01-auth-concepts.mdx)
- **Path:** [`module-12-authentication/03-auth-context-provider.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-12-authentication/03-auth-context-provider.mdx)
- **ខ្លឹមសារ:** JWT Architecture, Bearer Token Headers, Session Rehydration (LocalStorage vs httpOnly Cookie)។

---

## 5️⃣ Client-Side Routing Architecture

### ├── Basic Routes
- **Path:** [`module-6-routing/01-react-router-setup.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-6-routing/01-react-router-setup.mdx)
- **ខ្លឹមសារ:** `BrowserRouter`, `Routes`, `Route`, និង Client-Side History Navigation។

### ├── Nested Routes & Layouts
- **Path:** [`module-6-routing/02-route-configuration-layouts.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-6-routing/02-route-configuration-layouts.mdx)
- **ខ្លឹមសារ:** Parent Shell Layouts, Sub-pages, និង Shared Navbar/Sidebar ជាមួយ `<Outlet />`។

### ├── Dynamic Routes & URL Parameters
- **Path:** [`module-6-routing/04-url-params-navigation.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-6-routing/04-url-params-navigation.mdx)
- **ខ្លឹមសារ:** Dynamic URL Segments (`/courses/:id`) ជាមួយ `useParams()` hook។

### ├── Protected Routes
- **Path:** [`module-6-routing/05-protected-routes-404.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-6-routing/05-protected-routes-404.mdx)
- **Path:** [`module-12-authentication/04-protected-routes.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-12-authentication/04-protected-routes.mdx)
- **ខ្លឹមសារ:** `<ProtectedRoute>`, Route Guards, Intended Destination Redirect `state={{ from: location }}`។

### └── Search Parameters
- **Path:** [`module-6-routing/04-url-params-navigation.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-6-routing/04-url-params-navigation.mdx)
- **ខ្លឹមសារ:** Query Strings (`?category=react&sort=newest`) ជាមួយ `useSearchParams()` hook។

---

## 6️⃣ State Management Ecosystem

### ├── Local State
- **Path:** [`module-3-state-events/01-usestate-mechanics.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-3-state-events/01-usestate-mechanics.mdx)

### ├── Context API
- **Path:** [`module-7-global-state/01-prop-drilling.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-7-global-state/01-prop-drilling.mdx)
- **Path:** [`module-7-global-state/02-context-api-setup.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-7-global-state/02-context-api-setup.mdx)

### ├── useReducer
- **Path:** [`module-7-global-state/03-usereducer-complex-state.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-7-global-state/03-usereducer-complex-state.mdx)

### ├── Zustand
- **Path:** [`module-11-state-management/01-context-limitations.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-11-state-management/01-context-limitations.mdx)
- **Path:** [`module-11-state-management/02-zustand-fundamentals.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-11-state-management/02-zustand-fundamentals.mdx)
- **Path:** [`module-11-state-management/03-zustand-advanced.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-11-state-management/03-zustand-advanced.mdx)

### └── TanStack Query (React Query)
- **Path:** [`module-13-api-integration/03-react-query-fundamentals.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-13-api-integration/03-react-query-fundamentals.mdx)

---

## 7️⃣ Forms & Validations

### ├── Controlled Inputs
- **Path:** [`module-3-state-events/05-controlled-forms.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-3-state-events/05-controlled-forms.mdx)

### ├── Real-Time Validation & Touched Pattern
- **Path:** [`module-3-state-events/06-form-validation-submit.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-3-state-events/06-form-validation-submit.mdx)

### └── Enterprise Forms (Login, Register & Checkout)
- **Path:** [`module-12-authentication/02-login-register-forms.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-12-authentication/02-login-register-forms.mdx)
- **Path:** [`module-14-testing/04-mini-project.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-14-testing/04-mini-project.mdx)

---

## 8️⃣ Authentication & Authorization

### ├── Login, Register & Logout
- **Path:** [`module-12-authentication/02-login-register-forms.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-12-authentication/02-login-register-forms.mdx)
- **Path:** [`module-12-authentication/03-auth-context-provider.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-12-authentication/03-auth-context-provider.mdx)

### ├── Protected Routes & RBAC
- **Path:** [`module-12-authentication/04-protected-routes.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-12-authentication/04-protected-routes.mdx)

### └── Access Token & Refresh Token Flow
- **Path:** [`module-12-authentication/01-auth-concepts.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-12-authentication/01-auth-concepts.mdx)
- **Path:** [`module-12-authentication/05-mini-project.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-12-authentication/05-mini-project.mdx)

---

## 🔟 Automated Testing with Vitest & RTL

### ├── Unit Testing & Matchers
- **Path:** [`module-14-testing/01-testing-fundamentals.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-14-testing/01-testing-fundamentals.mdx)

### ├── Component Testing & RTL Queries
- **Path:** [`module-14-testing/02-react-testing-library.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-14-testing/02-react-testing-library.mdx)

### └── Async Testing, API Mocking & Coverage
- **Path:** [`module-14-testing/03-testing-async-components.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-14-testing/03-testing-async-components.mdx)
- **Path:** [`module-14-testing/04-mini-project.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-14-testing/04-mini-project.mdx)

---

## 1️⃣1️⃣ Performance Optimization

### ├── Memoization (React.memo, useMemo, useCallback)
- **Path:** [`module-8-performance-patterns/01-performance-optimization.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-8-performance-patterns/01-performance-optimization.mdx)

### ├── Lazy Loading & Code Splitting
- **Path:** [`module-8-performance-patterns/02-code-splitting-lazy.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-8-performance-patterns/02-code-splitting-lazy.mdx)
- **Path:** [`module-15-production/02-build-optimization.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-15-production/02-build-optimization.mdx)

### └── Bundle Analysis & Large Dataset Rendering
- **Path:** [`module-8-performance-patterns/04-mini-project.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-8-performance-patterns/04-mini-project.mdx)
- **Path:** [`module-15-production/02-build-optimization.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-15-production/02-build-optimization.mdx)

---

## 1️⃣2️⃣ Production, Security & CI/CD Deployment

### ├── Environment Variables & Security
- **Path:** [`module-15-production/01-environment-variables.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-15-production/01-environment-variables.mdx)

### ├── Error Handling & Error Boundaries
- **Path:** [`module-13-api-integration/04-error-handling-strategies.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-13-api-integration/04-error-handling-strategies.mdx)

### ├── SPA Routing Fix & Security Headers
- **Path:** [`module-15-production/03-deployment.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-15-production/03-deployment.mdx)

### └── Automated CI/CD & Production Launch
- **Path:** [`module-15-production/04-mini-project.mdx`](file:///Users/thoeurnratha/Documents/web-development/data-science/full-stack-course/src/courses/react/module-15-production/04-mini-project.mdx)
