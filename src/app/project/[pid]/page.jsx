import { notFound } from 'next/navigation'
import { dbProjects } from '@/db/db'
import ProjectView from './ProjectView'
import './project.css'

export function generateStaticParams() {
  return dbProjects.map(p => ({ pid: String(p.id) }))
}

export default async function ProjectPage({ params }) {
  const { pid } = await params
  const project = dbProjects.find(p => p.id === parseInt(pid))

  if (!project) notFound()

  return <ProjectView project={project} />
}
