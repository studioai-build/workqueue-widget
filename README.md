# Workqueue Widget Injection Policy (Production Only)

This document defines non-negotiable requirements to inject this widget into another repository.

- No assumptions.
- No MVP shortcuts.
- No partial copy.
- No missing dependencies.

## 1. Mandatory Dependency Baseline

The target repository must contain all packages below, with these exact names and versions.

```json
{
  "devDependencies": {
    "@module-federation/vite": "^1.3.0",
    "element-prompt-builder": "latest",
    "postcss": "^8.4.35",
    "react-component-taggers": "latest",
    "@vitejs/plugin-react-swc": "^4.1.0",
    "@eslint/js": "^9.9.1",
    "@tailwindcss/postcss": "^4.1.11",
    "@types/lodash": "^4.17.16",
    "@types/node": "^24.2.0",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "tailwindcss": "^4.1.11",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  },
  "dependencies": {
    "@radix-ui/react-checkbox": "1.1.3",
    "@radix-ui/react-dialog": "1.1.4",
    "@radix-ui/react-label": "2.1.1",
    "@radix-ui/react-select": "2.1.4",
    "@radix-ui/react-separator": "1.1.1",
    "@radix-ui/react-slot": "1.1.1",
    "@radix-ui/react-tabs": "1.1.2",
    "@radix-ui/react-toast": "1.2.4",
    "@radix-ui/react-collapsible": "1.1.2",
    "@radix-ui/react-slider": "1.2.2",
    "@radix-ui/react-switch": "1.1.2",
    "@radix-ui/react-toggle": "1.1.1",
    "autoprefixer": "^10.4.20",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lodash": "^4.17.21",
    "lucide-react": "^0.344.0",
    "next": "16.1.6",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7"
  }
}
```

## 2. Mandatory `src/workqueue-widget/components` Parity

The target repository must contain the complete `src/workqueue-widget/components` tree from this repository.
Required files:

```text
src/workqueue-widget/components/ui/badge.tsx
src/workqueue-widget/components/ui/button.tsx
src/workqueue-widget/components/ui/card.tsx
src/workqueue-widget/components/ui/checkbox.tsx
src/workqueue-widget/components/ui/collapsible.tsx
src/workqueue-widget/components/ui/dialog.tsx
src/workqueue-widget/components/ui/input.tsx
src/workqueue-widget/components/ui/label.tsx
src/workqueue-widget/components/ui/select.tsx
src/workqueue-widget/components/ui/separator.tsx
src/workqueue-widget/components/ui/sheet.tsx
src/workqueue-widget/components/ui/skeleton.tsx
src/workqueue-widget/components/ui/slider.tsx
src/workqueue-widget/components/ui/switch.tsx
src/workqueue-widget/components/ui/table.tsx
src/workqueue-widget/components/ui/tabs.tsx
src/workqueue-widget/components/ui/textarea.tsx
src/workqueue-widget/components/ui/toast.tsx
src/workqueue-widget/components/ui/toggle.tsx
src/workqueue-widget/components/ui/tooltip.tsx
src/workqueue-widget/components/workqueue/preview-assignee.tsx
src/workqueue-widget/components/workqueue/preview-assignee/capacity-bar.tsx
src/workqueue-widget/components/workqueue/preview-assignee/claim-dialog.tsx
src/workqueue-widget/components/workqueue/preview-assignee/constants.ts
src/workqueue-widget/components/workqueue/preview-assignee/detail-dialog.tsx
src/workqueue-widget/components/workqueue/preview-assignee/header-bar.tsx
src/workqueue-widget/components/workqueue/preview-assignee/mock-data.ts
src/workqueue-widget/components/workqueue/preview-assignee/pool-banner.tsx
src/workqueue-widget/components/workqueue/preview-assignee/render-cell-value.tsx
src/workqueue-widget/components/workqueue/preview-assignee/section-toggle.tsx
src/workqueue-widget/components/workqueue/preview-assignee/sla-indicator.tsx
src/workqueue-widget/components/workqueue/preview-assignee/summary-cards.tsx
src/workqueue-widget/components/workqueue/preview-assignee/table-empty-state.tsx
src/workqueue-widget/components/workqueue/preview-assignee/types.ts
src/workqueue-widget/components/workqueue/preview-assignee/work-item-row.tsx
src/workqueue-widget/components/workqueue/preview-assignee/work-items-table.tsx
src/workqueue-widget/components/workqueue/preview-manager.tsx
src/workqueue-widget/components/workqueue/preview-manager/capacity-by-user.tsx
src/workqueue-widget/components/workqueue/preview-manager/constants.ts
src/workqueue-widget/components/workqueue/preview-manager/detail-dialog.tsx
src/workqueue-widget/components/workqueue/preview-manager/filters-bar.tsx
src/workqueue-widget/components/workqueue/preview-manager/header-bar.tsx
src/workqueue-widget/components/workqueue/preview-manager/kpi-cards.tsx
src/workqueue-widget/components/workqueue/preview-manager/manager-table-row.tsx
src/workqueue-widget/components/workqueue/preview-manager/manager-table.tsx
src/workqueue-widget/components/workqueue/preview-manager/mock-data.ts
src/workqueue-widget/components/workqueue/preview-manager/reassign-dialog.tsx
src/workqueue-widget/components/workqueue/preview-manager/recent-pool-activity.tsx
src/workqueue-widget/components/workqueue/preview-manager/render-cell-value.tsx
src/workqueue-widget/components/workqueue/preview-manager/self-assign-insights.tsx
src/workqueue-widget/components/workqueue/preview-manager/sla-indicator.tsx
src/workqueue-widget/components/workqueue/preview-manager/table-empty-state.tsx
src/workqueue-widget/components/workqueue/preview-manager/team-workload.tsx
src/workqueue-widget/components/workqueue/preview-manager/types.ts
src/workqueue-widget/components/workqueue/preview-manager/use-preview-manager-state.ts
src/workqueue-widget/components/workqueue/workqueue-widget.tsx
```

## 3. Mandatory `src/workqueue-widget/lib` Parity

The target repository must contain the complete `src/workqueue-widget/lib` tree from this repository.

```text
src/workqueue-widget/lib/button-variants.ts
src/workqueue-widget/lib/utils.ts
src/workqueue-widget/lib/workqueue-types.ts
```

## 4. System Prompt (Use This)

```text
Inject this Workqueue widget into my target repository with production standards.

Hard rules:
- No assumptions.
- No MVP implementations.
- No mock-only runtime paths.
- No missing dependency from the mandatory package baseline.
- No missing file from src/workqueue-widget/components or src/workqueue-widget/lib mandatory lists.

Required actions:
1) Apply exact package changes to match the baseline.
2) Copy all required files and folders exactly.
3) Keep import paths and TypeScript compatibility intact.
4) Run build/lint/typecheck and report results.
5) If any mismatch exists, stop and report exact diff; do not guess.

Acceptance criteria:
- 100% dependency parity.
- 100% src/workqueue-widget/components parity.
- 100% src/workqueue-widget/lib parity.
- Build/lint/typecheck pass.
```

If output differs from the mandatory lists above, integration is not complete.
