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

interface ParsedSpecializedSubject {
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

  const programs = rawData
    .filter((program) => {
      try {
        const subjects: ParsedSpecializedSubject[] =
          typeof program.specializedSubjects === 'string'
            ? JSON.parse(program.specializedSubjects)
            : program.specializedSubjects || []

        return subjects.some((subject) => Array.isArray(subject.skills) && subject.skills.length > 0)
      } catch {
        return false
      }
    })
    .slice(0, 5)
    .map((program) => {
      const subjects: ParsedSpecializedSubject[] =
        typeof program.specializedSubjects === 'string'
          ? JSON.parse(program.specializedSubjects)
          : (program.specializedSubjects as SpecializedSubject[])

      const skills: ProcessedItem[] = subjects.flatMap(
        (subject) =>
          subject.skills?.map((skill) => ({
            id: skill.id,
            text: skill.string,
          })) || []
      )

      const half = Math.ceil(skills.length / 2)

      return {
        id: program.id,
        title: program.title,
        modules: [
          {
            id: `${program.id}-1`,
            title: '1 модуль',
            items: skills.slice(0, half),
          },
          {
            id: `${program.id}-2`,
            title: '2 модуль',
            items: skills.slice(half),
          },
        ].filter((module) => module.items.length > 0) as ProcessedModule[],
      } as ProcessedProgram
    })
    .filter((program) => program.modules.length > 0)

  return <ClientMainContent programs={programs} finalItems={finalItems} />
}
