import { create } from 'zustand';
import { users, projects, tasks, risks } from './demoData';
import type { User, Project, Task, Risk } from './demoData';

interface AppState {
  currentUser: User;
  currentRole: string;
  sidebarOpen: boolean;
  activeProject: Project | null;
  projects: Project[];
  tasks: Task[];
  risks: Risk[];
  setCurrentUser: (user: User) => void;
  setCurrentRole: (role: string) => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveProject: (project: Project | null) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  addTask: (task: Task) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentUser: users[2], // Elena Rodriguez - Project Manager
  currentRole: 'Project Manager',
  sidebarOpen: true,
  activeProject: null,
  projects: projects,
  tasks: tasks,
  risks: risks,
  setCurrentUser: (user) => set({ currentUser: user, currentRole: user.role }),
  setCurrentRole: (role) => {
    const user = users.find(u => u.role === role) || users[0];
    set({ currentRole: role, currentUser: user });
  },
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveProject: (project) => set({ activeProject: project }),
  updateTask: (taskId, updates) => set((state) => ({
    tasks: state.tasks.map(t => t.id === taskId ? { ...t, ...updates } : t)
  })),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
}));
