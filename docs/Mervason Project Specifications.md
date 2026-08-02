# Mervason — Project Specifications

**Document Type:** Product & Technical Specification
**Project:** Mervason
**Version:** 1.0
**Primary Language:** French
**Target Market:** Cameroon
**Development Approach:** MVP / Faster Delivery

---

# 1. Project Overview

## 1.1 Presentation

**Mervason** is a platform that allows merchants to create an online store, present their products and gain visibility on the Internet.

Mervason is designed primarily for Cameroonian merchants who need a simple way to establish an online presence and generate sales without managing a complex e-commerce system.

The platform focuses on **visibility, product discovery and merchant-to-customer contact**, rather than managing the complete transaction and delivery process.

---

## 1.2 Mission

Provide merchants with a simple platform to:

* Create an online store.
* Present their products.
* Gain online visibility.
* Receive potential customers and sales through WhatsApp.

---

## 1.3 Vision

### Short Term

Build a simple, useful and reliable MVP focused on real merchant needs.

During the first three years, focus primarily on **Yaoundé and Douala**, validate the product with real merchants and make the platform operational enough to become useful in their daily business.

### 5-Year Vision

Become a recognized reference and potentially a leading platform in Cameroon for merchants who want to create an online store.

### 10-Year Vision

Expand beyond Cameroon and become a recognized e-commerce platform in Africa.

Expansion must happen progressively, based on validated product-market fit.

---

## 1.4 Problem

### Merchant Problem

Many merchants lack:

* online visibility;
* a professional online storefront;
* a simple way to present their products;
* an easy channel for generating sales online.

### Customer Problem

Customers need a simple way to discover useful products available from local merchants and contact the seller easily.

---

## 1.5 Solution

Mervason provides merchants with:

* an online store;
* product pages;
* product visibility across the platform;
* merchant information;
* direct WhatsApp contact;
* subscription plans adapted to different merchant needs.

The customer discovers a product, views its information and contacts the merchant through WhatsApp.

Mervason does **not** manage product delivery in the MVP.

---

## 1.6 Objectives

### MVP Objectives

* Build a functional and reliable platform.
* Allow merchants to create and manage stores.
* Allow merchants to publish products.
* Allow customers to discover products.
* Generate merchant-customer contacts through WhatsApp.
* Monetize merchant subscriptions.
* Keep the product simple and easy to use.

### Product Principle

> **Simple, clean, useful and modern.**

The first impression should be similar to the simplicity and clarity associated with Apple products.

---

## 1.7 Target Users

### Primary

* Small and medium-sized merchants.
* Local retailers.
* Independent sellers.
* Informal businesses transitioning online.

### Geographic Focus

1. Yaoundé
2. Douala
3. Cameroon
4. Africa — later expansion

### Language

* French — MVP
* English — later
* German — later

A language toggle will be used when multilingual support is introduced.

### Currency

* XAF / FCFA — MVP
* EUR — future expansion

---

## 1.8 Business Model

Mervason primarily generates revenue through **merchant subscriptions**.

### Revenue Sources

**Primary:**

* Merchant subscription plans.

**Potential future sources:**

* Promoted products / advertising.
* Featured stores.
* Premium visibility.
* Business services and partnerships.

Advertising must not compromise the usability or trust of the platform.

---

## 1.9 Roadmap

### Phase 1 — MVP

Focus on Yaoundé and Douala.

Build and validate:

* Merchant stores.
* Product publishing.
* Product discovery.
* WhatsApp conversion flow.
* Merchant subscriptions.
* Basic administration.

### Phase 2 — Cameroon

Expand progressively across Cameroon after validating the MVP.

### Phase 3 — Africa

Expand to additional African markets once the product, business model and operations are sufficiently mature.

---

# 2. Business Logic

## 2.1 User Roles

### Client

Can:

* Browse the platform.
* Search and discover products.
* View stores.
* View product details.
* Contact merchants through WhatsApp.

### Merchant

Can:

* Create an account.
* Create a store.
* Manage store information.
* Create, edit and delete products.
* Manage their subscription.
* Access their dashboard.

### Administrator

Can:

* Manage users.
* Manage merchants.
* Manage stores.
* Manage products.
* Manage subscription plans.
* Moderate platform content.
* Monitor basic platform activity.

---

## 2.2 Stores

Each merchant receives **one free store** after registration.

The free store has limited capabilities according to the Free plan.

A merchant can create additional stores only when their subscription plan allows it.

A store has **one owner** in the MVP.

Multi-admin stores are out of scope for the MVP.

---

## 2.3 Subscription Plans

Mervason uses three plans:

| Plan         | Purpose                                   |
| ------------ | ----------------------------------------- |
| Free         | Basic store with limited capabilities     |
| Standard     | Additional capabilities and higher limits |
| Professional | Advanced capabilities and higher limits   |

Exact limits and pricing must be defined before payment implementation.

---

## 2.4 Store Creation Workflow

```text
Merchant registers
        ↓
Merchant profile created
        ↓
Free plan assigned
        ↓
Merchant creates first store
        ↓
Store becomes available
        ↓
Merchant publishes products
```

---

## 2.5 Product Publication Workflow

```text
Merchant opens dashboard
        ↓
Creates product
        ↓
Adds product information
        ↓
System validates data
        ↓
Product is published
        ↓
Product becomes publicly discoverable
```

A product must belong to a store.

---

## 2.6 Customer Purchase Workflow

Mervason does not process product purchases directly in the MVP.

```text
Customer discovers product
        ↓
Views product details
        ↓
Clicks "Contact / Buy"
        ↓
WhatsApp opens
        ↓
Pre-filled message contains product information
        ↓
Customer and merchant communicate
        ↓
Merchant and customer arrange delivery
        ↓
Customer pays the merchant upon delivery
```

Product delivery and product payment are handled directly between the merchant and customer.

---

## 2.7 Subscription Payment Workflow

Subscription payments are handled by Mervason.

Supported payment methods:

* MTN Mobile Money
* Orange Money
* Bank card

```text
Merchant selects plan
        ↓
Payment
        ↓
Payment verification
        ↓
Subscription activated
        ↓
Merchant receives plan capabilities
```

Payment provider/API selection remains to be finalized.

---

## 2.8 Core Business Rules

1. Every registered merchant receives access to one Free store.
2. Free stores have limited capabilities.
3. Additional stores require an eligible paid plan.
4. A store has one owner in the MVP.
5. Products belong to one store.
6. Merchants can only manage their own stores and products.
7. Customers do not need an account to discover public products unless future requirements specify otherwise.
8. Mervason does not manage product delivery in the MVP.
9. Product payments are handled between merchant and customer.
10. Mervason directly processes only subscription payments.
11. Public stores and active products must be discoverable through the platform.
12. Administrators have platform-level management permissions.

---

# 3. Features

## 3.1 Authentication

* Merchant registration.
* Login.
* Logout.
* Session management.
* Password management.
* Role-based access.

Firebase Authentication will be used.

---

## 3.2 Stores

Merchants can:

* Create their store.
* Edit store information.
* Add a logo.
* Add a description.
* Add WhatsApp contact information.
* View their public store.

Each store has a public URL.

---

## 3.3 Products

Merchants can:

* Create products.
* Edit products.
* Delete products.
* Publish/unpublish products.
* Add product image(s).
* Define name.
* Define description.
* Define price.
* Assign a category.

The MVP does not require product variants.

Complex product configuration is out of scope.

---

## 3.4 Product Discovery

Customers can:

* Browse products.
* Browse stores.
* Search products.
* Browse categories.
* Open product details.
* Contact merchants.

---

## 3.5 Categories

Products can belong to categories.

Categories are managed by administrators.

The initial category system should remain simple and easy to extend.

---

## 3.6 Merchant Dashboard

The dashboard provides:

* Store overview.
* Product management.
* Subscription information.
* Basic statistics.
* Store settings.
* Account settings.

The dashboard should prioritize useful information rather than complex analytics.

---

## 3.7 Administration

Administrators can manage:

* Users.
* Merchants.
* Stores.
* Products.
* Categories.
* Subscription plans.
* Platform content.

Administrative functionality should remain lightweight for the MVP.

---

## 3.8 Notifications

The MVP should provide only useful notifications such as:

* Successful actions.
* Failed actions.
* Subscription status.
* Important account/system information.

Complex notification infrastructure is not required initially.

---

## 3.9 Subscription & Payment

Merchants can:

* View available plans.
* Compare plans.
* Select a plan.
* Pay for a subscription.
* View their current plan.

Payment is only required for Mervason subscriptions in the MVP.

---

## 3.10 WhatsApp

WhatsApp is a core conversion mechanism.

A product CTA should open the merchant's WhatsApp conversation with a pre-filled message containing relevant product information.

Where available, customer-provided information such as location may also be included.

The platform does not implement an internal chat system.

---

## 3.11 SEO

Public pages should be search-engine friendly.

The MVP should include:

* meaningful page titles;
* meta descriptions;
* clean public URLs;
* Open Graph metadata;
* semantic HTML;
* indexable public store and product pages.

SEO implementation should remain simple and effective.

---

## 3.12 Settings

Merchants can manage:

* Personal account information.
* Store information.
* WhatsApp number.
* Store logo.
* Subscription information.

---

## 3.13 Statistics

Provide basic useful statistics such as:

* Number of products.
* Store status.
* Subscription plan.
* Product visibility/activity.
* Basic store/product interactions where technically practical.

Advanced analytics are out of scope for the MVP.

---

# 4. Technical Architecture

## 4.1 Stack

### Frontend / Application

* **Next.js** — primary application framework.
* **React** — UI.
* **TypeScript** — type safety.
* **Tailwind CSS** — styling.
* **Lucide Icons** — interface icons.

### Backend / Platform Services

* **Firebase Authentication** — authentication.
* **Cloud Firestore** — primary database.
* **Firebase Storage** — image/file storage.
* **Firebase App Check / appropriate Firebase security mechanisms** — protection where applicable.

### Deployment

Use a deployment solution compatible with Next.js and the selected Firebase architecture.

Firebase-oriented deployment should be preferred where practical.

---

## 4.2 Architecture

Mervason uses a **monolithic Next.js architecture** for the MVP.

```text
Browser
   ↓
Next.js Application
   ├── UI
   ├── Server-side logic
   ├── Authentication integration
   ├── Business logic
   └── Data access
          ↓
      Firebase
       ├── Auth
       ├── Firestore
       └── Storage
```

Do not introduce microservices for the MVP.

---

## 4.3 Folder Structure

The structure should remain simple and scalable:

```text
src/
├── app/
│   ├── (public)/
│   ├── auth/
│   ├── dashboard/
│   ├── admin/
│   └── api/
│
├── components/
│   ├── ui/
│   ├── features/
│   └── layouts/
│
├── lib/
│   ├── firebase/
│   ├── actions/
│   ├── services/
│   └── utils/
│
├── types/
│
└── config/
    
public/
```

The exact structure may be adjusted when implementation requires it, but unnecessary complexity must be avoided.

---

## 4.4 Database

Cloud Firestore is the primary database.

Core collections:

```text
users
stores
products
categories
plans
subscriptions
payments
notifications
```

### Relationships

```text
User
 └── Stores
       └── Products

User
 └── Subscription
       └── Plan

Product
 └── Category
```

Important business rules must be enforced through appropriate server-side authorization and Firestore security rules.

The exact Firestore document schema and indexes must be defined during implementation before creating production data structures.

---

## 4.5 API & External Services

Use APIs/services only when they provide clear value.

Expected integrations include:

* Firebase services.
* WhatsApp links.
* MTN Mobile Money.
* Orange Money.
* Bank-card payment provider.
* Other APIs only when required.

Payment providers for subscriptions must be selected before payment implementation.

Do not build custom infrastructure when a reliable existing service can provide the required capability.

---

## 4.6 Google Services

The architecture should prioritize integration with Google's ecosystem where appropriate.

Primary services:

* Firebase Authentication.
* Cloud Firestore.
* Firebase Storage.
* Firebase security services.
* Google tooling/APIs when they provide clear product value.

Google services should be adopted because they simplify the architecture or improve reliability—not merely because they are Google products.

---

## 4.7 Technical Conventions

* TypeScript throughout the application.
* Clear separation between UI, business logic and data access.
* Server-side enforcement of business rules.
* Environment variables for secrets and configuration.
* Reusable components for repeated UI patterns.
* Consistent naming and folder structure.
* Minimal client-side JavaScript where possible.
* No unnecessary global state.
* No unnecessary dependencies.

---

# 4.8 Design System

## Design Direction

The interface should feel:

> **Simple, clean, useful and modern.**

The visual philosophy is inspired by the clarity and simplicity of Apple interfaces.

### Principles

* Minimal visual noise.
* Strong visual hierarchy.
* Generous spacing.
* Clean typography.
* Subtle depth.
* Clear CTAs.
* Smooth but restrained animations.
* Mobile-first responsive design.

### Visual Style

Use:

* subtle glassmorphism;
* restrained liquid-glass effects;
* soft borders;
* subtle shadows;
* clean cards;
* smooth transitions.

Do not overuse glassmorphism or decorative effects.

Functionality and readability always take priority.

### Responsive

The application must work properly on:

* Mobile.
* Tablet.
* Desktop.

Mobile is the primary consideration because the target market is strongly mobile-oriented.

---

# 4.9 System Design

### Public System

```text
Customer
   ↓
Home / Search / Categories
   ↓
Product
   ↓
Store
   ↓
WhatsApp
```

### Merchant System

```text
Merchant
   ↓
Authentication
   ↓
Dashboard
   ├── Store
   ├── Products
   ├── Subscription
   └── Settings
```

### Administration

```text
Administrator
   ↓
Admin Dashboard
   ├── Users
   ├── Stores
   ├── Products
   ├── Categories
   └── Plans
```

### Subscription

```text
Merchant
   ↓
Select Plan
   ↓
Payment Provider
   ↓
Payment Verification
   ↓
Mervason
   ↓
Subscription Activated
```

---

# 5. Development Guidelines

This section complements `AI-Instructions.md`.

## 5.1 Source of Truth

The following priority must be respected:

```text
Project Specifications
        ↓
Existing Application Architecture
        ↓
AI Instructions
        ↓
Developer Request
```

If a developer request conflicts with the project specification, identify the conflict before making a destructive architectural change.

---

## 5.2 MVP Discipline

Mervason is an MVP.

Do not implement:

* shopping cart;
* product checkout;
* online product payment;
* delivery management;
* internal chat;
* complex product variants;
* multi-admin stores;
* advanced analytics;
* unnecessary enterprise architecture.

Do not transform Mervason into a full-scale marketplace unless explicitly requested.

---

## 5.3 Implementation Priority

When choosing what to build first, prioritize:

1. Authentication.
2. Merchant store creation.
3. Product management.
4. Public product/store discovery.
5. WhatsApp conversion.
6. Subscription plans.
7. Administration.
8. Supporting features and polish.

The core user journey must remain functional at every stage.

---

## 5.4 Product Experience

Every feature must serve a real user need.

Prefer:

**Simple → Clear → Fast → Useful**

Avoid adding functionality merely because it is technically possible.

---

## 5.5 Delivery Rule

Implement features incrementally.

After each meaningful implementation:

* verify the affected flow;
* check for regressions;
* keep the application buildable;
* keep the codebase consistent.

Never allow temporary implementation decisions to silently become permanent architecture.

---

# Open Decisions for V1.1

The following points are intentionally not invented and must be finalized before their implementation:

1. **Exact Free / Standard / Professional pricing.**
2. **Exact limits and capabilities of each subscription plan.**
3. **Payment provider(s) for MTN MoMo, Orange Money and bank cards.**
4. **Exact Firestore document schemas and security rules.**
5. **Exact product image limits and storage constraints.**
6. **Whether customers need accounts or remain fully anonymous.**
7. **Exact information collected before redirecting a customer to WhatsApp.**
8. **Exact initial product categories.**
9. **Final deployment choice between Firebase-oriented hosting and another Next.js-compatible platform.**
10. **Exact statistics/metrics available in the MVP.**

These decisions should be resolved before the corresponding features are implemented.

---

# Final Product Definition

> **Mervason is a platform for creating online stores designed for Cameroonian merchants. Its purpose is not to manage the entire sales process, but to help merchants become visible online, showcase their products and receive potential customers through WhatsApp.**

The MVP must remain focused on this objective.

**Build less. Make it useful. Make it clean. Make it work.**


