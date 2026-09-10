'use client'

import './cards-projects.css'
import { ArrowUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const CardsProjects = ({name, description, link, id}) => {
  const router = useRouter()

  const handleProjectClick = () => {
    router.push(`/project/${id}`)
  }

  return (
    <div className='project-card'>

        <div className="project-info" onClick={handleProjectClick} style={{cursor: 'pointer'}}>
      <h3 className='project-title'>{name}</h3>
      <p className='project-description'>{description}</p>
      </div>
      <a className="project-link" href={link || '#'} target="_blank" rel="noopener noreferrer"> <ArrowUpRight /></a>
    </div>
  )
}

export default CardsProjects
