'use client'

import { useState, useEffect } from 'react'
import ModuleComponent from './ModuleComponent'
import styles from './MainComponent.module.scss'
import { ProcessedProgram } from './MainComponent'

interface ClientMainContentProps {
  programs: ProcessedProgram[]
  finalItems: readonly string[]
}

export default function ClientMainContent({ programs, finalItems }: ClientMainContentProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()

    window.addEventListener('resize', checkIfMobile)

    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Специализированные дисциплины</h1>

        {programs.length > 0 ? (
          <div className={styles.programs}>
            {programs.map((program, programIndex) => (
              <section key={program.id} className={styles.program}>
                <h2 className={styles.programTitle}>{program.title}</h2>
                <div className={styles.modules}>
                  {program.modules.map((module, moduleIndex) => (
                    <ModuleComponent
                      key={module.id}
                      title={module.title}
                      items={module.items}
                      programIndex={programIndex}
                      moduleIndex={moduleIndex}
                      isMobile={isMobile}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>Нет доступных программ с дисциплинами</div>
        )}

        <div className={styles.rectangles}>
          <div className={styles.practicalModule}>
            <h3 className={styles.rectangleTitle}>Практические модули</h3>
            <p className={styles.rectangleText}>
              Работа над собственными проектами: практика групповых взаимодействий, кейс-методы, эссе
            </p>
          </div>

          <div className={styles.finalModule}>
            <h3 className={styles.rectangleTitle}>Итоговая аттестация</h3>
            <ul className={styles.finalList}>
              {finalItems.map((item, index) => (
                <li key={`final-${index}`} className={styles.finalItem}>
                  <span className={styles.dot}>
                    <span className={styles.dotInner} />
                  </span>
                  <span className={styles.itemText}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
