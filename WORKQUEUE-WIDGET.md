# Workqueue Widget Integration Guide

This document explains how to integrate the `WorkqueueWidget` module in a React + TypeScript app.

## Purpose
Provide a self-contained workqueue UI that can switch between Assignee and Manager perspectives. It includes the view toggle header and renders the corresponding queue (assignee actions like Start/Complete/Escalate, or manager oversight controls like reassignment and workload distribution).

## Main Entry File

`src/workqueue-widget/WorkqueueWidget.tsx`

## Recommended Use (Minimal Integration)

```tsx
import {WorkqueueWidget} from "./workqueue-widget/WorkqueueWidget";

function AppHeader() {
  return <WorkqueueWidget />;
}
```

## Where To Inject
Place the widget entry point in the app header or the sidebar so it is always discoverable. Use it as a persistent access point rather than a standalone page.

Common placements:
1. Header: add a "Workqueue" navigation entry or dropdown that mounts the widget in the main content area.
2. Sidebar: add a primary nav item that routes to or reveals the widget view.
