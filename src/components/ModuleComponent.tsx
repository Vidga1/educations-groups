'use client'

import { useState, memo, useCallback } from 'react'
import { Plus, Minus } from 'lucide-react'
import styles from '../app/page.module.scss'

interface ModuleProps {
  title: string
  items: readonly string[]
  programIndex: number
  moduleIndex: number
  isMobile: boolean
}

const ModuleComponent = memo(function ModuleComponent({ title, items, isMobile }: ModuleProps) {
  const [isExpanded, setIsExpanded] = useState(!isMobile)

  const toggleModule = useCallback(() => {
    if (isMobile) {
      setIsExpanded((prev) => !prev)
    }
  }, [isMobile])

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
})

export default ModuleComponent
