import { format } from 'date-fns';
import { AlarmClock, AlertTriangle as Alert, LucideIcon, Siren as Warning } from 'lucide-react';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return format(date, 'M/d/yyyy');
  } catch {
    return dateString;
  }
};

export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    'New': 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-green-100 text-green-800',
    'Pending Info': 'bg-yellow-100 text-yellow-800',
    'Under Review': 'bg-purple-100 text-purple-800',
    'Escalated': 'bg-red-100 text-red-800'
  };
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};

export const getPriorityColor = (priority: string): string => {
  const priorityColors: Record<string, string> = {
    'Low': 'bg-gray-100 text-gray-800',
    'Medium': 'bg-blue-100 text-blue-800',
    'High': 'bg-orange-100 text-orange-800',
    'Critical': 'bg-red-100 text-red-800'
  };
  return priorityColors[priority] || 'bg-gray-100 text-gray-800';
};

export const getSlaStatusColor = (slaStatus: string): string => {
  const slaColors: Record<string, string> = {
    'normal': 'text-gray-600',
    'warning': 'text-orange-600',
    'breached': 'text-red-600'
  };
  return slaColors[slaStatus] || 'text-gray-600';
};

export const getSlaIcon = (slaStatus: string): LucideIcon => {
  const slaIcons: Record<string, LucideIcon> = {
    'normal': AlarmClock,
    'warning': Alert,
    'breached': Warning
  };
  return slaIcons[slaStatus] || AlarmClock;
};
