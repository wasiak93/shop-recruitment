export interface NavItem {
  name: string
  path: string
  label: string
}

export const navigationConfig: NavItem[] = [
  {
    name: 'about-kazus',
    path: '/o-kazusie',
    label: 'O Kazusie',
  },
  {
    name: 'about-company',
    path: '/o-firmie',
    label: 'O Firmie',
  },
  {
    name: 'magazines',
    path: '/czasopisma',
    label: 'Czasopisma',
  },
  {
    name: 'trainings',
    path: '/szkolenia',
    label: 'Szkolenia',
  },
  {
    name: 'knowledge-base',
    path: '/baza-wiedzy',
    label: 'Baza Wiedzy',
  },
  {
    name: 'kazus-tv',
    path: '/kazus-tv',
    label: 'Kazus TV',
  },
  {
    name: 'contact',
    path: '/kontakt',
    label: 'Kontakt',
  },
]
