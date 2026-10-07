'use client'

import './home.css'
import { Header } from '@/components/header/Header'

const Home = () => {
  return (
    <div>
      <Header />

      <div className="title-subtitle-container">
        <h1 className="portfolio-title">Proyectos</h1>
        <p className="portfolio-subtitle">Cada proyecto responde a un contexto, un objetivo y una manera de contar.</p>
      </div>
    </div>
  )
}

export default Home
