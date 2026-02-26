# Workqueue Widget Integration Guide

This document explains how to integrate and use the `WorkqueueWidget` module in another React/TypeScript codebase.

## 1) Purpose

`WorkqueueWidget` is a UI module that renders two operational views of a work queue:

- Assignee view: personal queue + optional self-assign pool.
- Manager view: team-wide queue oversight, reassignment, and pool analytics.

The main entry file is:

- `src/workqueue-widget/WorkqueueWidget.tsx`

## Use

import { WorkqueueWidget } from '@/workqueue-widget/WorkqueueWidget';
