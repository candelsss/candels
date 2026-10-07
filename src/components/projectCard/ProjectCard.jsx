'use client'

import './project-card.css'
import { ArrowUpRight } from 'lucide-react'

// Las portadas vienen de Cloudinary a tamaño/peso original (a veces >1MB).
// Les pedimos formato y calidad automáticos y un ancho razonable para que carguen rápido.
const optimizeCloudinaryUrl = (url) => {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url
  return url.replace('/upload/', '/upload/f_auto,q_auto,w_1200/')
}

const ProjectCard = ({ img, name, description, link }) => {
  return (
    <a className="project-card" href={link} target="_blank" rel="noopener noreferrer">
      <div className="project-card-media">
        <img className="project-card-img" src={optimizeCloudinaryUrl(img)} alt={name} loading="lazy" decoding="async" />
      </div>

      <div className="project-card-info">
        <div className="project-card-text">
          <h3 className="project-card-title">{name}</h3>
          <p className="project-card-description">{description}</p>
        </div>
        <ArrowUpRight className="project-card-arrow" size={20} />
      </div>
    </a>
  )
}

export default ProjectCard
