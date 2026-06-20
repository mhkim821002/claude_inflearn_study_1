# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A client-side bucket list web app built with vanilla JavaScript, HTML, and Tailwind CSS (via CDN). No build step, no framework, no backend — all data lives in the browser's LocalStorage under the key `bucketList`. Comments and UI text are in Korean.

## Running

Open `index.html` directly in a browser, or serve statically:

```bash
python -m http.server 8000   # then visit http://localhost:8000
```

There is no build, lint, or test tooling — changes take effect on browser refresh.

## Architecture

Two layers, loaded as plain `<script>` tags in `index.html` (order matters: `storage.js` before `app.js`):

- **`js/storage.js`** — `BucketStorage`, an object literal that owns the data layer. Every operation reads the full array from LocalStorage via `load()`, mutates it, and writes it back via `save()` (no in-memory cache). Exposes CRUD (`addItem`, `updateItem`, `deleteItem`, `toggleComplete`), plus `getStats()` and `getFilteredList(filter)`.
- **`js/app.js`** — `BucketListApp`, a class that owns the UI/event layer. Instantiated on `DOMContentLoaded` into the global `app`. Lifecycle: `cacheElements()` → `bindEvents()` → `render()`. All state changes route through `BucketStorage`, then call `render()`, which re-derives stats and rebuilds the list HTML from scratch (`innerHTML`).

`render()` is the single source of truth for the view — there are no partial DOM updates. After any mutation, call `this.render()`.

Item shape (created in `BucketStorage.addItem`): `{ id, title, completed, createdAt, completedAt }`, where `id` is `Date.now().toString()` and dates are ISO strings.

## Conventions and constraints

- **List item buttons use inline `onclick` handlers** that reference the global `app` (e.g. `onclick="app.handleToggle('${item.id}')"`), since list HTML is regenerated on every render. When adding interactive elements to list items, follow this pattern or switch the whole list to event delegation.
- **Escape any user text rendered into HTML** with `this.escapeHtml()`. Note: titles are also interpolated into inline `onclick` argument strings (`openEditModal`, `handleDelete`) with only single-quote escaping — be careful that titles containing `"` or backslashes can break these handlers.
- **Filter state** (`currentFilter`) lives on the app instance; the active filter button is tracked via the `.active` CSS class (defined in `css/styles.css`, not Tailwind).
- `css/styles.css` supplements Tailwind with animations, the `.filter-btn`/`.bucket-item` styles, the mobile breakpoint (`max-width: 640px`), and `prefers-color-scheme: dark` overrides keyed to Tailwind utility class names.
