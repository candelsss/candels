'use client'

import './portfolio.css'
import { dbProjects } from '@/db/db'
import CardsProjects from '@/components/cards-projects/CardsProjects'
import { Header } from '@/components/header/Header'
import { useState } from 'react'
import { LightboxModal } from '@/components/lightbox/LightboxModal.jsx'
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { Maximize2 } from 'lucide-react';



const Portfolio = () => {

  const [hoveredProject, setHoveredProject] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeSection, setActiveSection] = useState(null)

  // Estados para el lightbox
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0)
  const [isImageTransitioning, setIsImageTransitioning] = useState(false)

  // Reordenar proyectos: el seleccionado primero, luego el resto
  const reorderedProjects = selectedProject
    ? [
        dbProjects.find(p => p.id === selectedProject),
        ...dbProjects.filter(p => p.id !== selectedProject)
      ]
    : dbProjects

  const handleSectionClick = (section) => {
    setActiveSection(activeSection === section ? null : section)
  }

  const handleProjectClick = (projectId) => {
    setSelectedProject(projectId)
    setActiveSection(null) // Resetear al cambiar de proyecto
  }

  // Funciones para el lightbox
  const openLightbox = () => {
    setLightboxImageIndex(0) // Empezar en la primera imagen
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  const nextLightboxImage = () => {
    const project = dbProjects.find(p => p.id === selectedProject)
    if (project && project.images.length > 0) {
      setIsImageTransitioning(true)
      setTimeout(() => {
        setLightboxImageIndex((prevIndex) =>
          prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
        )
        setTimeout(() => {
          setIsImageTransitioning(false)
        }, 50)
      }, 300)
    }
  }

  const prevLightboxImage = () => {
    const project = dbProjects.find(p => p.id === selectedProject)
    if (project && project.images.length > 0) {
      setIsImageTransitioning(true)
      setTimeout(() => {
        setLightboxImageIndex((prevIndex) =>
          prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
        )
        setTimeout(() => {
          setIsImageTransitioning(false)
        }, 50)
      }, 300)
    }
  }


  return (
    <div>
      <Header />
      {/* <CustomTitles>PORTFOLIO</CustomTitles> */}

      <div className="title-subtitle-container">
              <h1 className="portfolio-title">Proyectos</h1>
              <p className="portfolio-subtitle">Cada proyecto responde a un contexto, un objetivo y una manera de contar.</p>



      </div>

      <div className="portfolio-list">
        <ul className="portfolio-ul">
            {dbProjects.map((project) => (
                <CardsProjects key={project.id} name={project.name} description={project.description} link={project.link} id={project.id} />
            ))}
        </ul>
      </div>



      <div className="portfolio-list-desktop">
        {selectedProject && (
          <button className="close-btn" onClick={() => setSelectedProject(null)}>
            ✕
          </button>
        )}
        <div className={`desktop-container ${selectedProject ? 'shifted' : ''}`}>
          <ul className="portf-list-desk">
            {reorderedProjects.map((project) => (
              <li
                key={project.id}
                className={selectedProject === project.id ? 'active' : ''}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => handleProjectClick(project.id)}
              >
                <h2>{project.name}</h2>
                {hoveredProject === project.id && (
                  <div className="project-description show">
                    <p>{project.description}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {selectedProject && (
          <div className={`project-detail-container ${selectedProject ? 'show' : ''}`}>
            <div className="project-content">
              {/* Botón PREVIEW */}
              <button className="preview-btn" onClick={openLightbox}>
                PREVIEW <Maximize2 size={12} />
              </button>

              {/* Contenedor para imagen */}
              <div className="project-images">
                {dbProjects.find(p => p.id === selectedProject)?.frontPage && (
                  <img
                    key={`project-image-${selectedProject}`}
                    src={dbProjects.find(p => p.id === selectedProject).frontPage}
                    alt={dbProjects.find(p => p.id === selectedProject).name}
                    className="project-main-image"
                  />
                )}
              </div>

              {/* Acordeón minimalista */}
              <div className="project-info-accordion">
                {/* Header con el nombre del proyecto y secciones */}
                <div className="project-info-acordion-header">
                  <div
                    className={`inf-header ${activeSection === 'description' ? 'active' : ''}`}
                    onClick={() => handleSectionClick('description')}
                  >
                    <h5>{dbProjects.find(p => p.id === selectedProject)?.name}</h5>
                  </div>

                  <div
                    className={`inf-header ${activeSection === 'skills' ? 'active' : ''}`}
                    onClick={() => handleSectionClick('skills')}
                  >
                    <h5>Skills</h5>
                  </div>

                  {dbProjects.find(p => p.id === selectedProject)?.link && (
                    <div
                      className={`inf-header ${activeSection === 'link' ? 'active' : ''}`}
                      onClick={() => handleSectionClick('link')}
                    >
                      <h5>Link</h5>
                    </div>
                  )}
                </div>

                {/* Contenedor de contenido */}
                <div className="project-info-content">
                  <div className={`info-content ${activeSection === 'description' ? 'open' : ''}`}>
                    <p>{dbProjects.find(p => p.id === selectedProject)?.description2}</p>
                  </div>

                  <div className={`info-content ${activeSection === 'skills' ? 'open' : ''}`}>
                    <div className="skills-list">
                      {dbProjects.find(p => p.id === selectedProject)?.skills.map((skill, index) => (
                        <span key={index} className="skill-item">{skill}</span>
                      ))}
                    </div>
                  </div>

                  {dbProjects.find(p => p.id === selectedProject)?.link && (
                    <div className={`info-content ${activeSection === 'link' ? 'open' : ''}`}>
                      <a
                        href={dbProjects.find(p => p.id === selectedProject).link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        Accede link :)
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Secciones de información */}

            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal isOpen={isLightboxOpen} onClose={closeLightbox}>
        {selectedProject && dbProjects.find(p => p.id === selectedProject)?.images.length > 0 && (
          <div className="lightbox-slider">
            {/* Flechas de navegación */}
            {dbProjects.find(p => p.id === selectedProject).images.length > 1 && (
              <>
                <button className="lightbox-nav lightbox-prev" onClick={prevLightboxImage}>
                  <ChevronLeft size={32} />
                </button>
                <button className="lightbox-nav lightbox-next" onClick={nextLightboxImage}>
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            {/* Imagen actual */}
            <img
              src={dbProjects.find(p => p.id === selectedProject).images[lightboxImageIndex]}
              alt={`Project image ${lightboxImageIndex + 1}`}
              className={`lightbox-image ${isImageTransitioning ? 'transitioning' : ''}`}
            />

            {/* Contador */}
            {dbProjects.find(p => p.id === selectedProject).images.length > 1 && (
              <div className="lightbox-counter">
                {lightboxImageIndex + 1} / {dbProjects.find(p => p.id === selectedProject).images.length}
              </div>
            )}
          </div>
        )}
      </LightboxModal>
    </div>
  )
}

export default Portfolio
