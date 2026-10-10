'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './work.css'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import { dbProjects } from '@/db/db'
import ProjectCard from '@/components/projectCard/ProjectCard'

gsap.registerPlugin(ScrollTrigger)

// La card centrada (en desktop, la del medio del slider horizontal; en mobile, la que
// está a la altura del centro de la pantalla) se ve grande, nítida y "levantada", y las
// que quedan lejos se encogen, atenúan y bajan un poco: así el movimiento de scroll se
// nota claramente, como una ola que recorre las cards. Misma lógica en los dos casos,
// solo cambia si el ScrollTrigger mide scroll horizontal o vertical.
const FOCUS_MIN_SCALE = 0.68
const FOCUS_MIN_OPACITY = 0.25
const FOCUS_MAX_Y = 50

// gsap.quickSetter en vez de gsap.set: en mandatos de scroll esto se llama en
// cada frame, y quickSetter evita el coste de volver a parsear el objeto de
// propiedades cada vez (recomendado por GSAP para onUpdate de alta frecuencia).
// En mobiles reales de gama media/baja, usar gsap.set aquí se notaba como lentitud.
function createFocusUpdater(target) {
  const setScale = gsap.quickSetter(target, 'scale')
  const setOpacity = gsap.quickSetter(target, 'opacity')
  const setY = gsap.quickSetter(target, 'y', 'px')

  return (self) => {
    const distanceFromCenter = Math.abs(self.progress - 0.5) * 2 // 0 en el centro, 1 en los extremos
    setScale(1 - distanceFromCenter * (1 - FOCUS_MIN_SCALE))
    setOpacity(1 - distanceFromCenter * (1 - FOCUS_MIN_OPACITY))
    setY(distanceFromCenter * FOCUS_MAX_Y)
  }
}

// Solo desktop: para poder hacer scroll "infinito" repetimos el set de proyectos 3 veces
// seguidas. El del medio es el real; los de los lados son solo para poder seguir
// scrolleando sin toparse con un final. En mobile se ocultan por CSS.
const LOOP_SETS = ['clone-start', 'main', 'clone-end']

const Work = () => {
  const listRef = useRef(null)

  // En mobile/tablet, el scroll de la página frena suavemente en cada proyecto
  // en vez de dejar que se te escape uno sin querer (ver body.work-scroll-snap en work.css).
  useEffect(() => {
    document.body.classList.add('work-scroll-snap')
    return () => document.body.classList.remove('work-scroll-snap')
  }, [])

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const allCards = gsap.utils.toArray('.project-card', list)
    const mainCards = gsap.utils.toArray('.work-list-set-main .project-card', list)

    const mm = gsap.matchMedia()
    let timer

    // Al entrar en /work, PageTransition todavía está animando la página (parallax,
    // 0.75s, ver page-transition.css) cuando este efecto se monta. Crear los
    // ScrollTrigger aquí obliga al navegador a medir el layout (getBoundingClientRect)
    // en mitad de esa animación CSS, lo que la interrumpe y se ve "a trompicones".
    // Esperamos a que termine esa transición antes de montarlos.
    timer = setTimeout(() => {
      // GSAP trata document.body como un alias de window y por eso ignora su scroll real.
      // scrollerProxy le enseña a leer/mover la posición de scroll del body de verdad.
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          if (arguments.length) {
            document.body.scrollTop = value
          }
          return document.body.scrollTop
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
        },
      })

      // Registramos también "isMobile" (aunque no se use) para que el callback se ejecute
      // en todos los anchos: gsap.matchMedia solo llama al callback si alguna query coincide.
      mm.add({ isDesktop: '(min-width: 1024px)', isMobile: '(max-width: 1023px)' }, (context) => {
        const { isDesktop } = context.conditions

        if (isDesktop) {
          // Slider horizontal: la card centrada se ve grande y nítida, las de los
          // lados se encogen, atenúan y bajan según se alejan del centro al hacer scroll.
          allCards.forEach((card) => {
            const onUpdate = createFocusUpdater(card)
            const st = ScrollTrigger.create({
              trigger: card,
              scroller: list,
              horizontal: true,
              start: 'left right',
              end: 'right left',
              scrub: true,
              onUpdate,
            })
            onUpdate(st)
          })

          // Loop infinito: arrancamos centrados en la copia "main" (la de en medio).
          // Antes corregíamos a mitad de cada copia, lo que podía disparar el salto
          // varias veces durante un mismo gesto de scroll (se notaba "a trompicones").
          // Ahora solo corregimos justo en los extremos físicos (una copia entera de
          // margen a cada lado), y forzamos a GSAP a recalcular en el mismo frame para
          // que ninguna card se vea con la escala/opacidad "vieja" ni un instante.
          const setWidth = list.scrollWidth / 3
          list.scrollLeft = setWidth

          const handleLoopScroll = () => {
            const maxScroll = list.scrollWidth - list.clientWidth

            if (list.scrollLeft <= 1) {
              list.scrollLeft += setWidth
              ScrollTrigger.update()
            } else if (list.scrollLeft >= maxScroll - 1) {
              list.scrollLeft -= setWidth
              ScrollTrigger.update()
            }
          }
          list.addEventListener('scroll', handleLoopScroll, { passive: true })

          return () => {
            list.removeEventListener('scroll', handleLoopScroll)
          }
        }

        // Mobile: cada card ocupa una pantalla entera (ver work.css) y queda centrada
        // en ella; según se hace scroll, va perdiendo foco igual que en desktop, solo
        // que aquí el recorrido es vertical y el scroller es el body, no la lista.
        mainCards.forEach((card) => {
          const onUpdate = createFocusUpdater(card)
          const st = ScrollTrigger.create({
            trigger: card,
            // El layout global (globals.css) hace que quien scrollea sea <body>, no window
            scroller: document.body,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            onUpdate,
          })
          onUpdate(st)
        })
      })
    }, 800)

    return () => {
      clearTimeout(timer)
      mm.revert()
    }
  }, [])

  return (
    <div>
      <Header showBack />

      <div className="work-list" ref={listRef}>
        {LOOP_SETS.map((setKey) => (
          <div
            key={setKey}
            className={`work-list-set ${setKey === 'main' ? 'work-list-set-main' : 'work-list-set-clone'}`}
          >
            {dbProjects.map((project) => (
              <ProjectCard
                key={`${setKey}-${project.id}`}
                img={project.frontpage}
                name={project.name}
                description={project.description}
                link={project.link}
              />
            ))}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  )
}

export default Work
