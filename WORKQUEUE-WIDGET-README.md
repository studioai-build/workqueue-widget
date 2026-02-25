# Workqueue Widget Integration Guide

This document explains how to integrate and use the `WorkqueueWidget` module in another React/TypeScript codebase.

## 1) Purpose

`WorkqueueWidget` is a UI module that renders two operational views of a work queue:

- Assignee view: personal queue + optional self-assign pool.
- Manager view: team-wide queue oversight, reassignment, and pool analytics.

The main entry file is:

- `src/workqueue-widget/workqueue-widget.tsx`

## 2) Integration Contract (Read First)

To work correctly, **do not copy only one file**. The widget depends on local components, shared UI primitives, and queue type definitions.

You must copy/preserve the full folder:

- `src/workqueue-widget/`

At minimum, these areas are required:

- `src/workqueue-widget/workqueue-widget.tsx`
- `src/workqueue-widget/lib/*`
- `src/workqueue-widget/components/workqueue/*`
- `src/workqueue-widget/components/ui/*`

## 3) Runtime and Build Assumptions

The code assumes:

- React 18+
- TypeScript
- Tailwind CSS utility classes available in your app
- `lucide-react` available
- Path alias `@/` resolves to your `src` directory

Important: Internal imports use `@/workqueue-widget/...`. If your project does not support that alias, either:

- Configure alias `@ -> src`, or
- Rewrite imports to relative paths.

## 4) Public Entry Point

Use this component in your page/app shell:

```tsx
import { WorkqueueWidget } from "@/workqueue-widget/workqueue-widget"

export default function WorkqueuePage() {
  return <WorkqueueWidget />
}
```

Current implementation uses built-in demo data (`sampleQueue`) from:

- `src/workqueue-widget/lib/workqueue-types.ts`

## 5) Data Model (Core Types)

Primary queue type:

- `WorkqueueDefinition`

Important nested config blocks:

- `columns`
- `assignmentRules`
- `triggers`
- `sla`
- `selfAssign`
- `notifications`
- `accessRoleIds`

Related mock IAM types included in the same file:

- `IAMRole`
- `IAMUser`

If you replace demo data with API data, map your backend payload into `WorkqueueDefinition`.

## 6) Behavior Overview

`WorkqueueWidget` state:

- `queue`: current `WorkqueueDefinition` (initialized from `sampleQueue`)
- `previewMode`: `"assignee"` or `"manager"`

Rendered children:

- `PreviewAssignee` when mode is `"assignee"`
- `PreviewManager` when mode is `"manager"`

## 7) Recommended Best-Practice Integration

For production usage:

- Move `queue` state up to container/page level.
- Fetch queue data from API and pass as props.
- Keep this widget presentational; place side effects in hooks/services.
- Validate server payload shape before rendering.
- Keep role/permission checks server-authoritative.

Suggested extension:

1. Add `queue` prop to `WorkqueueWidget`.
2. Keep `sampleQueue` only for storybook/dev preview fallback.
3. Add loading and error states around data fetch.

## 8) LLM-Friendly Project Structure Summary

Use this as the mental model for assistants/tools:

1. `workqueue-widget.tsx`: top-level orchestrator and mode switch.
2. `lib/workqueue-types.ts`: domain schema + sample data.
3. `components/workqueue/preview-assignee/*`: assignee-facing UI.
4. `components/workqueue/preview-manager/*`: manager-facing UI.
5. `components/ui/*`: shared reusable UI primitives.

## 9) Integration Checklist

- [ ] Copied full `src/workqueue-widget` folder, not only one file
- [ ] Installed required dependencies (`react`, `lucide-react`, Tailwind stack, Radix packages)
- [ ] Confirmed alias `@/` works or imports were rewritten
- [ ] Verified Tailwind classes render correctly in host app
- [ ] Mounted `WorkqueueWidget` from `src/workqueue-widget/workqueue-widget.tsx`
- [ ] Replaced `sampleQueue` with real typed data (optional but recommended)
