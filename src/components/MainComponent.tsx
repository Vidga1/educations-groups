import ClientMainContent from './ClientMainContent'

interface Skill {
  id: number
  title: string
  string: string
}

interface SpecializedSubject {
  id: number
  skills?: Skill[]
}

interface Program {
  id: number
  title: string
  specializedSubjects: string | SpecializedSubject[]
}

export interface ProcessedItem {
  id: number
  text: string
}

export interface ProcessedModule {
  id: string
  title: string
  items: ProcessedItem[]
}

export interface ProcessedProgram {
  id: number | string
  title: string
  modules: ProcessedModule[]
}

const finalItems = [
  'Бизнес-проектирование (подготовка итоговой аттестационной работы, консультирование по бизнес-проектированию)',
  'Защита итоговой аттестационной работы',
] as const

async function getData(): Promise<Program[]> {
  try {
    const res = await fetch('https://api.moscow.mba/products', {
      cache: 'no-store',
    })
    if (!res.ok) throw new Error('Failed to fetch data')
    return res.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}

export default async function MainComponent() {
  const rawData = await getData()

  const programs: ProcessedProgram[] = rawData
    .slice(0, 5)
    .map((program: Program): ProcessedProgram | null => {
      let subjects: SpecializedSubject[]

      try {
        subjects =
          typeof program.specializedSubjects === 'string'
            ? JSON.parse(program.specializedSubjects)
            : (program.specializedSubjects as SpecializedSubject[]) || []
      } catch {
        subjects = []
      }

      const skillMap = new Map<number, ProcessedItem>()

      subjects.forEach((subject) => {
        if (subject.skills) {
          subject.skills.forEach((skill) => {
            skillMap.set(skill.id, {
              id: skill.id,
              text: skill.string,
            })
          })
        }
      })

      const skills = Array.from(skillMap.values())
      if (skills.length === 0) return null

      const half = Math.ceil(skills.length / 2)
      const modules: ProcessedModule[] = []

      if (skills.slice(0, half).length > 0) {
        modules.push({
          id: `${program.id}-1`,
          title: '1 модуль',
          items: skills.slice(0, half),
        })
      }

      if (skills.slice(half).length > 0) {
        modules.push({
          id: `${program.id}-2`,
          title: '2 модуль',
          items: skills.slice(half),
        })
      }

      return modules.length > 0 ? { id: program.id, title: program.title, modules } : null
    })
    .filter((program): program is ProcessedProgram => program !== null)

  return <ClientMainContent programs={programs} finalItems={finalItems} />
}
