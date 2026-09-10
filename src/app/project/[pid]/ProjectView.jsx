'use client'

import { Header } from '@/components/header/Header.jsx'
import { useEffect, useState } from 'react'
import { CircleChevronLeft, CircleChevronRight, CircleX, Link } from 'lucide-react';
import { IconButton } from '@/components/buttons/IconButton.jsx'
import { useRouter } from 'next/navigation'
import { LightboxModal } from '@/components/lightbox/LightboxModal.jsx'



const ProjectView = ({ project }) => {

  const router = useRouter()

  // Estado para el slider
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Estados para el lightbox modal
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0)
  const [isImageTransitioning, setIsImageTransitioning] = useState(false)

  // Estado para controlar qué información mostrar en el project-info-container
  const [activeSection, setActiveSection] = useState('default')

  // Estado para controlar las animaciones
  const [isAnimating, setIsAnimating] = useState(false)

  // Mobile: ocultar la info hasta que termine la transición de página
  const [isMobileIntroReady, setIsMobileIntroReady] = useState(false)

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 767px)').matches
    if (!isMobile) {
      setIsMobileIntroReady(true)
      return
    }

    setIsMobileIntroReady(false)
    const t = setTimeout(() => setIsMobileIntroReady(true), 600)
    return () => clearTimeout(t)
  }, [project.id])




  const handleBack = () => {
    sessionStorage.setItem('page-transition-mode', 'back')
    router.push('/portfolio')
  }

  // Funciones para el lightbox modal
  const openLightbox = (index) => {
    setLightboxImageIndex(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  const nextLightboxImage = () => {
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

  const prevLightboxImage = () => {
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

  // Función para obtener el contenido según la sección activa
  const getInfoContent = () => {
    switch (activeSection) {
      case 'skills':
        return {
          subtitle: 'SKILLS',
          content: project.skills.join(' • ')
        }
      case 'link':
        return {
          subtitle: 'LINK',
          content: project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-content"
            >
              ACCEDE AL LINK <Link size={16} />
            </a>
          ) : 'No disponible'
        }
      default:
        return {
          subtitle: '',
          content: project.description2
        }
    }
  }

  const infoContent = getInfoContent()

  // Función para manejar el cambio de sección con animación
  const handleSectionChange = (section) => {
    if (section !== activeSection) {
      setIsAnimating(true)
      setTimeout(() => {
        setActiveSection(section)
        setTimeout(() => {
          setIsAnimating(false)
        }, 50)
      }, 200)
    }
  }

  // Estados para el swipe gesture
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // Funciones para el swipe
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextLightboxImage()
    } else if (isRightSwipe) {
      prevLightboxImage()
    }
  }

  // Función para manejar el click en los dots (indicadores)
  const handleDotClick = (index) => {
    if (index !== lightboxImageIndex) {
      setIsImageTransitioning(true)
      setTimeout(() => {
        setLightboxImageIndex(index)
        setTimeout(() => {
          setIsImageTransitioning(false)
        }, 50)
      }, 300)
    }
  }


  return (
    <div>
      <Header />

      <div className="project-back">
        <IconButton icon={<CircleChevronLeft />} onClick={handleBack}>VOLVER</IconButton>
      </div>
      {/* <CustomTitles >{project.name}</CustomTitles> */}
      <main className="main-project">

        <section className="frontpage-container">
            {project.frontPage && (
              <img className='frontpage-img' src={project.frontPage} alt="portada" />
            )}


            <div className="project-header">
              <ul className="project-ul">
                <li className="project-li" onClick={() => handleSectionChange('skills')}>SKILLS</li>
                {project.link && <li className="project-li" onClick={() => handleSectionChange('link')}>LINK</li>}
              </ul>
            </div>

            <div className={`project-info-container ${isMobileIntroReady ? 'animate-in' : ''}`}>
              <div className="info-header">
                <h2 className='project-txt title'>
                  {project.name}
                  {infoContent.subtitle && (
                    <span className={`section-indicator ${isAnimating ? 'animating' : 're-animate'}`}>
                       · {infoContent.subtitle} ·
                    </span>
                  )}
                </h2>
                {infoContent.subtitle && (
                  <button className="close-info-btn" onClick={() => handleSectionChange('default')}>
                    <CircleX size={16} />
                  </button>
                )}
              </div>
              <p className={`project-txt ${isAnimating ? 'animating' : 're-animate'}`}>
                {infoContent.content}
              </p>
            </div>
        </section>


        <section className="preview-section">
          <h2>PREVIEW</h2>

          <div className="preview-gallery">
            {project.images.map((image, index) => (
              <div key={index} className="preview-img-container" onClick={() => openLightbox(index)}>
              <img className="preview-img" src={image} alt={`image-${index}`} />
            </div>
            ))}
          </div>
        </section>

      </main>

      {/* Lightbox Modal con Slider */}
      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        title={`${project.name} - Imagen ${lightboxImageIndex + 1} de ${project.images.length}`}
      >
        <div className="lightbox-slider">
          <button className="lightbox-nav-btn prev-btn desktop-only" onClick={prevLightboxImage}>
            <CircleChevronLeft size={32} />
          </button>

          <div
            className="lightbox-image-container"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={project.images[lightboxImageIndex]}
              alt={`${project.name} - Imagen ${lightboxImageIndex + 1}`}
              className={`lightbox-image ${isImageTransitioning ? 'image-transition' : 'image-active'}`}
            />
          </div>

          <button className="lightbox-nav-btn next-btn desktop-only" onClick={nextLightboxImage}>
            <CircleChevronRight size={32} />
          </button>
        </div>

        {/* Indicadores del slider */}
        <div className="lightbox-dots">
          {project.images.map((_, index) => (
            <button
              key={index}
              className={`lightbox-dot ${index === lightboxImageIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </LightboxModal>
    </div>
  )
}

export default ProjectView
