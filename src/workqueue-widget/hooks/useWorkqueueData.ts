import { useState, useMemo } from 'react';
import { WorkItem } from '../types/workqueue';
import { workItems, assigneeWorkItems } from '../constants/workqueueData';

export const useWorkqueueData = (isAssigneeView: boolean = false) => {
  const [items, setItems] = useState<WorkItem[]>(isAssigneeView ? assigneeWorkItems : workItems);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const metrics = useMemo(() => {
    const myItems = items.filter(item => item.assignedTo);
    const newItems = items.filter(item => item.status === 'New');
    const inProgressItems = items.filter(item => item.status === 'In Progress');
    const slaAtRiskItems = items.filter(item => item.slaStatus === 'warning');
    const poolAvailable = items.filter(item => !item.assignedTo);

    return {
      myItems: myItems.length,
      newItems: newItems.length,
      inProgressItems: inProgressItems.length,
      slaAtRiskItems: slaAtRiskItems.length,
      poolAvailable: poolAvailable.length
    };
  }, [items]);

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectAllItems = () => {
    setSelectedItems(items.map(item => item.id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const reassignItem = (itemId: string, newAssigneeId: string, newAssigneeName: string) => {
    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, assignedTo: newAssigneeName, assignedToId: newAssigneeId }
        : item
    ));
  };

  const claimItem = (itemId: string) => {
    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, assignedTo: 'Me', assignedToId: 'current-user' }
        : item
    ));
  };

  return {
    items,
    selectedItems,
    metrics,
    toggleItemSelection,
    selectAllItems,
    clearSelection,
    reassignItem,
    claimItem
  };
};