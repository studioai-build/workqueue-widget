import { useState } from 'react';
import { ViewType } from '../types/workqueue';

export const useViewToggle = (initialView: ViewType = 'manager') => {
  const [currentView, setCurrentView] = useState<ViewType>(initialView);

  const toggleView = (view: ViewType) => {
    setCurrentView(view);
  };

  return {
    currentView,
    toggleView,
    isManagerView: currentView === 'manager',
    isAssigneeView: currentView === 'assignee'
  };
};