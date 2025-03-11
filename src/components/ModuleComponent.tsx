'use client'

import { useState, useEffect } from 'react'
import { Plus, Minus } from 'lucide-react'
import styles from '../app/page.module.scss'

interface ModuleProps {
  title: string
  items: string[]
  programIndex: number
  moduleIndex: number
}

export default function ModuleComponent({ title, items, programIndex, moduleIndex }: ModuleProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()

    window.addEventListener('resize', checkIfMobile)

    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setIsExpanded(true)
    }
  }, [isMobile])

  const toggleModule = () => {
    if (isMobile) {
      setIsExpanded((prev) => !prev)
    }
  }

  return (
    <div className={`${styles.module} ${isExpanded && isMobile ? styles.active : ''}`}>
      <div className={styles.moduleHeader}>
        <div className={styles.moduleLine} />
        <button onClick={toggleModule} className={styles.moduleButton} aria-expanded={isExpanded}>
          <h3 className={styles.moduleTitle}>{title}</h3>
          {isMobile && (isExpanded ? <Minus className={styles.icon} /> : <Plus className={styles.icon} />)}
        </button>
      </div>

      <ul className={`${styles.moduleList} ${isExpanded ? styles.expanded : ''}`}>
        {items.map((item) => (
          <li key={item} className={styles.moduleItem}>
            <span className={styles.dot}>
              <span className={styles.dotInner} />
            </span>
            <span className={styles.itemText}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
