import { Navigate, Route, Routes } from 'react-router-dom';
import { SidebarLayout } from './layouts/SidebarLayout';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import TasksPage from './pages/TasksPage';
import MembersPage from './pages/MembersPage';

export default function App(){return <SidebarLayout><Routes><Route path='/' element={<Navigate to='/dashboard'/>}/><Route path='/dashboard' element={<DashboardPage/>}/><Route path='/projects' element={<ProjectsPage/>}/><Route path='/tasks' element={<TasksPage/>}/><Route path='/members' element={<MembersPage/>}/></Routes></SidebarLayout>}
