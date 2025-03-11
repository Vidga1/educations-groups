import ModuleComponent from '../components/ModuleComponent'
import styles from './page.module.scss'

interface Module {
  title: string
  items: string[]
}

interface Program {
  title: string
  modules: Module[]
}

const programs: Program[] = [
  {
    title: 'Антикризисное управление',
    modules: [
      {
        title: '1 модуль',
        items: [
          'Маркетинговые стратегии антикризисного менеджмента',
          'Антикризисное управление предприятиями: реструктуризация, банкротство, слияние и поглощение',
          'Правовые основы антикризисного управления',
          'Проектный менеджмент в антикризисном управлении',
          'Финансово-экономические инструменты антикризисного управления',
        ],
      },
      {
        title: '2 модуль',
        items: [
          'Формирование и развитие компетенций в антикризисном управлении',
          'Анализ и диагностика кризисных угроз в управлении',
          'Инструменты антикризисного менеджмента',
          'Механизмы антикризисного управления бизнесом',
          'Антикризисный консалтинг',
        ],
      },
    ],
  },
  {
    title: 'Управление малым бизнесом',
    modules: [
      {
        title: '1 модуль',
        items: [
          'Управление в сфере малого бизнеса',
          'Управление start-up-проектами',
          'Предпринимательство и предпринимательские проекты',
          'Анализ и моделирование бизнес-процессов',
          'Оценка и управление стоимостью бизнеса',
        ],
      },
      {
        title: '2 модуль',
        items: [
          'Стратегии развития и управление ростом бизнеса',
          'Стратегическое финансовое управление бизнесом на основе ценностно-ориентированного подхода',
          'Бизнес-процессы и оргструктура компании',
          'Налоговый менеджмент компании',
          'Правовые основы предпринимательской деятельности',
        ],
      },
    ],
  },
]

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Специализированные дисциплины</h1>

        <div className={styles.programs}>
          {programs.map((program, programIndex) => (
            <section key={program.title} className={styles.program}>
              <h2 className={styles.programTitle}>{program.title}</h2>

              <div className={styles.modules}>
                {program.modules.map((module, moduleIndex) => (
                  <ModuleComponent
                    key={module.title}
                    title={module.title}
                    items={module.items}
                    programIndex={programIndex}
                    moduleIndex={moduleIndex}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

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
              {[
                'Бизнес-проектирование (подготовка итоговой аттестационной работы, консультирование по бизнес-проектированию)',
                'Защита итоговой аттестационной работы',
              ].map((item) => (
                <li key={item} className={styles.finalItem}>
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
