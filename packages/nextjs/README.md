# 🤖💻 BotBlock App

## 🧑‍💻 Getting Started

The general steps to run the repo were layed out on the [main README](../../README.md#nextjs), so we won't get into more detail about it here.

## 🏗️ Folder structure

You might be already familiar with NextJS projects, but here's a quick overview of the folder structure of this one:

- `components`: All the components used on the site that have business logic on them.
  - Positive examples are: `Header`, `Footer`, `BotBlockWidget` and `CompanyLogo`.
    - These components usually are a set of ui components arranged so that the app looks and works as expected.
  - Negative examples are: `Column`, `Row`, `Button`, `Input` and `Text`.
    - These components are the building blocks of the app and should be kept as representational (and dummy) as possible.
- `contexts`: All the custom react contexts used on the site.
  - As a best practice, these should be kept small to a business logic or feature. That way it's easier to maintain and we should not be afraid of calling multiple contexts on the same component if actually needed.
- `hooks`: All the generic or shared hooks used on the site.
  - This will generally be kept small because they are usually no much application for stateless hooks (for stateful hooks, we should try to keep them close to the components that use them or choose context).
  - On another point, if we need to refactor and extract business logic (and not representational one) from components/screens, we should keep these hooks near the corresponding components/screens rather than putting them here.
- `layouts`: All the layout related components used on the site.
  - They are usually wrappers around the pages such as providers, headers and footers between others.
- `pages`: All the pages/screens of the site.
  - The inner folder structure impacts the routing of them (i.e. their pathname).
- `public`: All the static assets of the site.
  - `artifacts` is the folder for NVM's artifacts.
  - `assets` is where the actual PNGs (`images`), SVGs (`icons`) and fonts (`fonts`) are.
- `services`: All the services used on the site.
  - These are usually wrappers around external libraries or APIs.
- `styles`: All the global styles of the site.
- `types`: All the generic or shared types used on the site.
  - We should try to keep this folder as small as possible because if they are shared, they like belong to a context, hook or set of components (pages).
- `ui`: All the generic or shared ui components used on the site.
  - These components are the building blocks of the app and should be kept as representational (and dummy) as possible, as described on the first point.
- `utils`: All the generic or shared utils used on the site.
