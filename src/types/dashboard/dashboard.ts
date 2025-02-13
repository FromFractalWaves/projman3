// src/types/dashboard/index.ts

// Grid Types
export interface DashboardGridProps {
    children: React.ReactNode;
    className?: string;
    fullWidth?: boolean;
    gap?: 'sm' | 'md' | 'lg';
    columns?: 1 | 2 | 3 | 4;
  }
  
  export interface DashboardGridItemProps {
    children: React.ReactNode;
    className?: string;
    colSpan?: 1 | 2 | 3;
  }
  
  // Header Types
  export interface DashboardHeaderStat {
    label: string;
    value: string | number;
  }
  
  export interface DashboardHeaderProps {
    title: string;
    description?: string;
    stats?: DashboardHeaderStat[];
    onRefresh?: () => Promise<void>;
    className?: string;
    actions?: React.ReactNode;
  }
  
  // Stats Types
  export interface StatTrend {
    value: number;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  }
  
  export interface StatProgress {
    value: number;
    max: number;
  }
  
  export interface StatCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    trend?: StatTrend;
    progress?: StatProgress;
    className?: string;
  }
  
  export interface DashboardStats {
    totalProjects: number;
    activeProjects: number;
    totalTasks: number;
    completedTasks: number;
    totalObjectives: number;
    achievedObjectives: number;
    overdueTasks: number;
    projectProgress: number;
  }
  
  export interface DashboardStatsProps {
    stats: DashboardStats;
    className?: string;
  }