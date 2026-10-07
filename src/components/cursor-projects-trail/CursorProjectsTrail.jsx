'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { dbProjects } from '@/db/db'
import './cursor-projects-trail.css'

// Portadas de los proyectos: el efecto va cogiendo una detrás de otra
// (y vuelve a empezar por la primera al llegar a la última).
const PROJECT_IMAGES = dbProjects.map((project) => project.frontpage)

// Media query que usamos para saber si estamos en "desktop": el efecto solo se activa a partir de 768px.
const DESKTOP_QUERY = '(min-width: 768px)'

// Distancia en píxeles que hay que mover el cursor para que salga la siguiente imagen.
// Cuanto más alto el número, más hay que mover el ratón y menos aparecen.
const SPAWN_DISTANCE = 450

// Tiempo (en ms) sin mover el cursor tras el que desaparecen todas las imágenes a la vez.
const IDLE_DISMISS_DELAY = 600

export const CursorProjectsTrail = () => {
  // Referencia al <div> que actúa de "lienzo": ahí es donde se insertan y eliminan las imágenes.
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const resetDist = SPAWN_DISTANCE

    // --- Variables de seguimiento del cursor ---
    let incr = 0            // Distancia acumulada desde la última imagen creada
    let oldX = 0             // Última posición X registrada del cursor
    let oldY = 0             // Última posición Y registrada del cursor
    let initialized = false  // Evita crear una imagen en el primer movimiento (aún no hay "posición anterior")
    let imageIndex = 0       // Índice para ir rotando las portadas de los proyectos

    let idleTimeout = null   // Referencia al temporizador de "cursor quieto"
    let activeSquares = []   // Lista de imágenes actualmente visibles en pantalla ({ el, tl })

    // Hace desaparecer TODAS las imágenes visibles a la vez, con el mismo efecto elástico
    // que usan al aparecer, pero en sentido inverso (de tamaño normal a tamaño 0).
    const dismissAll = () => {
      const squares = activeSquares
      activeSquares = [] // Vaciamos la lista ya, para que no se vuelvan a intentar borrar dos veces

      squares.forEach(({ el, tl }) => {
        tl.kill() // Paramos su animación de entrada por si seguía en marcha
        gsap.to(el, {
          scale: 0,
          duration: 0.5,
          ease: 'elastic.in(1, 1)', // mismo tipo de "rebote" elástico que la aparición, pero invertido
          onComplete: () => el.remove(), // una vez terminada la animación, la quitamos del DOM
        })
      })
    }

    // Reinicia la cuenta atrás de "cursor quieto". Se llama cada vez que hay un movimiento de ratón,
    // así que dismissAll() solo se ejecuta cuando pasan IDLE_DISMISS_DELAY ms SIN movimiento.
    const scheduleIdleDismiss = () => {
      clearTimeout(idleTimeout)
      idleTimeout = setTimeout(dismissAll, IDLE_DISMISS_DELAY)
    }

    // Crea la portada de un proyecto en la posición (x, y) del cursor y la anima apareciendo.
    const spawnSquare = (x, y) => {
      // 1. Creamos la imagen y la posicionamos
      const square = document.createElement('img')
      square.className = 'cursor-trail-square'
      square.src = PROJECT_IMAGES[imageIndex % PROJECT_IMAGES.length]
      square.alt = ''
      square.style.left = `${x}px`
      square.style.top = `${y}px`
      imageIndex++
      container.appendChild(square)

      // 2. La animamos: empieza invisible (scale: 0) y rotada al azar, y "rebota" hasta su tamaño normal (scale: 1)
      const tl = gsap.fromTo(
        square,
        { xPercent: -50, yPercent: -50, scale: 0, rotation: (Math.random() - 0.5) * 30 },
        { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.6)' }
      )

      // 3. La guardamos en la lista de "vivas" para poder animarla de salida más adelante (ver dismissAll)
      activeSquares.push({ el: square, tl })
    }

    // Se ejecuta en cada movimiento del ratón.
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e

      // Cualquier movimiento reinicia el contador de inactividad
      scheduleIdleDismiss()

      // En el primer movimiento no creamos nada: solo guardamos la posición de partida
      if (!initialized) {
        oldX = clientX
        oldY = clientY
        initialized = true
        return
      }

      // Sumamos la distancia recorrida desde el último punto registrado (en horizontal + vertical)
      incr += Math.abs(clientX - oldX) + Math.abs(clientY - oldY)

      // Si ya se ha recorrido suficiente distancia, soltamos una imagen nueva y reiniciamos el contador
      if (incr > resetDist) {
        incr = 0
        spawnSquare(clientX, clientY)
      }

      oldX = clientX
      oldY = clientY
    }

    // Evita añadir el listener de mousemove más de una vez
    let listening = false

    // Activa el efecto: engancha el listener de movimiento de ratón
    const enable = () => {
      if (listening) return
      initialized = false
      incr = 0
      window.addEventListener('mousemove', handleMouseMove)
      listening = true
    }

    // Desactiva el efecto por completo: quita el listener, cancela temporizadores/animaciones
    // y limpia del DOM cualquier imagen que hubiera quedado
    const disable = () => {
      if (!listening) return
      window.removeEventListener('mousemove', handleMouseMove)
      listening = false
      clearTimeout(idleTimeout)
      activeSquares.forEach(({ tl }) => tl.kill())
      activeSquares = []
      container.querySelectorAll('.cursor-trail-square').forEach((el) => el.remove())
    }

    // Escuchamos cambios de tamaño de pantalla (por ejemplo, girar el móvil o redimensionar la ventana)
    // para activar/desactivar el efecto justo al cruzar el breakpoint de desktop, sin necesidad de recargar.
    const mq = window.matchMedia(DESKTOP_QUERY)
    const handleQueryChange = (e) => (e.matches ? enable() : disable())

    if (mq.matches) enable() // Si ya estamos en desktop al montar el componente, activamos directamente
    mq.addEventListener('change', handleQueryChange)

    // Limpieza al desmontar el componente (o antes de que vuelva a ejecutarse el efecto)
    return () => {
      mq.removeEventListener('change', handleQueryChange)
      disable()
    }
  }, [])

  // Este <div> es solo el contenedor donde se insertan las imágenes por JS.
  // "aria-hidden" porque es puramente decorativo y no debe leerse en lectores de pantalla.
  return <div className="cursor-trail-container" ref={containerRef} aria-hidden="true" />
}
