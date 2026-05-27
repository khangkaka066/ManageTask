import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { ProgressBar, StatCard, StatusBadge } from '../components/Common';

export default function DashboardPage(){
  const [data,setData]=useState(null); const [projects,setProjects]=useState([]);
  useEffect(()=>{api.get('/dashboard').then(r=>setData(r.data));api.get('/projects').then(r=>setProjects(r.data));},[]);
  if(!data) return <p>Loading...</p>;
  return <div className='space-y-6'><h2 className='text-2xl font-semibold'>Dashboard</h2><div className='grid grid-cols-1 md:grid-cols-5 gap-4'><StatCard title='Total Projects' value={data.totalProjects}/><StatCard title='Total Tasks' value={data.totalTasks}/><StatCard title='In Progress' value={data.inProgressTasks}/><StatCard title='Completed' value={data.completedTasks}/><StatCard title='Overdue' value={data.overdueTasks}/></div><div className='card'><h3 className='font-semibold mb-3'>Projects Progress</h3><div className='space-y-3'>{projects.map(p=><div key={p._id}><div className='flex justify-between text-sm mb-1'><span>{p.name}</span><span>{p.progress}%</span></div><ProgressBar value={p.progress}/></div>)}</div></div><div className='card'><h3 className='font-semibold mb-3'>Tasks Near Deadline</h3><table className='w-full text-sm'><thead><tr className='text-left border-b'><th>Task</th><th>Project</th><th>Assignee</th><th>Due</th><th>Status</th></tr></thead><tbody>{data.nearDeadline.map(t=><tr key={t._id} className='border-b'><td className='py-2'>{t.title}</td><td>{t.project?.name}</td><td>{t.assignee?.name||'-'}</td><td>{t.dueDate?new Date(t.dueDate).toLocaleDateString():'-'}</td><td><StatusBadge status={t.status}/></td></tr>)}</tbody></table></div></div>
}
