'use client'

import { useState, useEffect } from 'react'
import { Plus, Minus } from 'lucide-react'
import styles from './ModuleComponent.module.scss'

interface Item {
  id: number
  text: string
}

interface ModuleProps {
  title: string
  items: Item[]
  programIndex: number
  moduleIndex: number
  isMobile: boolean
}

export default function ModuleComponent({ title, items, isMobile }: ModuleProps) {
  const [isExpanded, setIsExpanded] = useState(!isMobile)

  useEffect(() => {
    setIsExpanded(!isMobile)
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
          {isMobile &&
            (isExpanded ? (
              <Minus size={24} strokeWidth={2.5} className={styles.icon} />
            ) : (
              <Plus size={24} strokeWidth={2.5} className={styles.icon} />
            ))}
        </button>
      </div>

      <ul className={`${styles.moduleList} ${isExpanded ? styles.expanded : ''}`}>
        {items.map((item) => (
          <li key={item.id} className={styles.moduleItem}>
            <span className={styles.dot}>
              <span className={styles.dotInner} />
            </span>
            <span className={styles.itemText}>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
