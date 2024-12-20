import React from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  XCircle,
  LucideIcon 
} from 'lucide-react';
import type { StatusType } from '../../../types/status';

interface StatusConfig {
  icon: LucideIcon;
  bgColor: string;
  textColor: string;
  iconColor: string;
}

interface StatusBadgeProps {
  status: StatusType;
  text?: string;
  size?: 'sm' | 'md';
}

const statusConfigs: Record<StatusType, StatusConfig> = {
  success: {
    icon: CheckCircle2,
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    iconColor: 'text-green-500'
  },
  warning: {
    icon: AlertCircle,
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    iconColor: 'text-yellow-500'
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    iconColor: 'text-red-500'
  },
  pending: {
    icon: Clock,
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    iconColor: 'text-blue-500'
  },
  active: {
    icon: CheckCircle2,
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    iconColor: 'text-green-500'
  },
  inactive: {
    icon: XCircle,
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-700',
    iconColor: 'text-gray-500'
  },
  processing: {
    icon: Clock,
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    iconColor: 'text-purple-500'
  },
  completed: {
    icon: CheckCircle2,
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    iconColor: 'text-green-500'
  },
  cancelled: {
    icon: XCircle,
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    iconColor: 'text-red-500'
  },
  failed: {
    icon: XCircle,
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    iconColor: 'text-red-500'
  },
  paid: {
    icon: CheckCircle2,
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    iconColor: 'text-green-500'
  }
};



const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  text, 
  size = 'md' 
}) => {
  const config = statusConfigs[status];
  const displayText = text || status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span
      className={`
        inline-flex items-center rounded-full
        ${config.bgColor} 
        ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'}
      `}
    >
      <config.icon 
        className={`
          ${config.iconColor}
          ${size === 'sm' ? 'w-3 h-3 mr-1' : 'w-4 h-4 mr-2'}
        `} 
      />
      <span className={`font-medium ${config.textColor}`}>
        {displayText}
      </span>
    </span>
  );
};

// Usage examples:
// <StatusBadge status="success" />
// <StatusBadge status="pending" text="In Progress" size="sm" />
// <StatusBadge status="error" text="Failed" />

export default StatusBadge;