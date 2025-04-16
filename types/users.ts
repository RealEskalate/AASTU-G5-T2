export interface User {
    id: string
    name: string
    role: string
    group: string
    avatar: string
    backgroundImage: string
    bgColor: string
    socialLinks: {
      name: string
      icon: string
      bgColor: string
    }[]
    stats: {
      problems: number | string
      submissions: number | string
      dedicatedTime: number | string
    }
  }
  