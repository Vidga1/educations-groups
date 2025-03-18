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

  const programMap = new Map<number, ProcessedProgram>()

  rawData.forEach((program: Program) => {
    try {
      if (
        (typeof program.specializedSubjects === 'string' && !program.specializedSubjects.includes('"skills"')) ||
        (Array.isArray(program.specializedSubjects) &&
          !(program.specializedSubjects as SpecializedSubject[]).some((s) => s.skills && s.skills.length > 0))
      ) {
        return
      }

      const subjects: SpecializedSubject[] =
        typeof program.specializedSubjects === 'string'
          ? JSON.parse(program.specializedSubjects)
          : (program.specializedSubjects as SpecializedSubject[])

      const skillMap = new Map<number, ProcessedItem>()

      subjects.forEach((subject: SpecializedSubject) => {
        if (subject.skills && Array.isArray(subject.skills)) {
          subject.skills.forEach((skill: Skill) => {
            skillMap.set(skill.id, {
              id: skill.id,
              text: skill.string,
            })
          })
        }
      })

      const skills: ProcessedItem[] = Array.from(skillMap.values())
      if (skills.length === 0) return

      const half = Math.ceil(skills.length / 2)
      const modules: ProcessedModule[] = []

      const firstHalf = skills.slice(0, half)
      if (firstHalf.length > 0) {
        modules.push({
          id: `${program.id}-1`,
          title: '1 модуль',
          items: firstHalf,
        })
      }

      const secondHalf = skills.slice(half)
      if (secondHalf.length > 0) {
        modules.push({
          id: `${program.id}-2`,
          title: '2 модуль',
          items: secondHalf,
        })
      }

      if (modules.length > 0) {
        programMap.set(program.id, {
          id: program.id,
          title: program.title,
          modules,
        })
      }
    } catch (error) {
      console.debug(`Ошибка обработки программы ${program.id}:`, error)
    }
  })

  const programs: ProcessedProgram[] = Array.from(programMap.values()).slice(0, 5)

  return <ClientMainContent programs={programs} finalItems={finalItems} />
}
