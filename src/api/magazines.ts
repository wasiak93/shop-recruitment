import type { Magazine } from '@/types/magazine'
import magazine1 from '@/assets/images/magazines/magazine1.png'
import magazine2 from '@/assets/images/magazines/magazine2.png'
import magazine3 from '@/assets/images/magazines/magazine3.png'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getMagazines = async (): Promise<Magazine[]> => {
  await delay(500)

  return [
    {
      id: 1,
      title: 'Kazus Podatkowy 1(6)2019',
      priceNet: 98.76,
      tax: 23,
      coverImage: magazine1,
    },
    {
      id: 2,
      title: 'Kazus Podatkowy 1(6)2019',
      priceNet: 98.76,
      tax: 23,
      coverImage: magazine1,
    },
    {
      id: 3,
      title: 'Procedury administracyjne i podatkowe 2',
      priceNet: 98.76,
      tax: 23,
      coverImage: magazine2,
    },
    {
      id: 4,
      title: 'Prawo Pomocy Publicznej',
      priceNet: 98.76,
      tax: 23,
      coverImage: magazine3,
    },
    {
      id: 5,
      title: 'Kazus Podatkowy 1(6)2019',
      priceNet: 98.76,
      tax: 23,
      coverImage: magazine1,
    },
    {
      id: 6,
      title: 'Kazus Podatkowy 1(6)2019',
      priceNet: 98.76,
      tax: 23,
      coverImage: magazine1,
    },
    {
      id: 7,
      title: 'Prawo Pomocy Publicznej',
      priceNet: 98.76,
      tax: 23,
      coverImage: magazine3,
    },
    {
      id: 8,
      title: 'Procedury administracyjne i podatkowe 2',
      priceNet: 98.76,
      tax: 23,
      coverImage: magazine2,
    },
    {
      id: 9,
      title: 'Kazus Podatkowy 1(6)2019',
      priceNet: 98.76,
      tax: 23,
      coverImage: magazine1,
    },
    {
      id: 10,
      title: 'Kazus Podatkowy 1(6)2019',
      priceNet: 98.76,
      tax: 23,
      coverImage: magazine3,
    },
    {
      id: 11,
      title: 'Procedury administracyjne i podatkowe 2',
      priceNet: 98.76,
      tax: 23,
      coverImage: magazine3,
    },
    {
      id: 12,
      title: 'Procedury administracyjne i podatkowe 2',
      priceNet: 98.76,
      tax: 23,
      coverImage: magazine3,
    },
    {
      id: 13,
      title: 'Kazus Podatkowy 1(6)2019',
      priceNet: 98.76,
      tax: 23,
      coverImage: magazine1,
    },
    {
      id: 14,
      title: 'Kazus Podatkowy 1(6)2019',
      priceNet: 98.76,
      tax: 23,
      coverImage: magazine1,
    },
    {
      id: 15,
      title: 'Procedury administracyjne i podatkowe 2',
      priceNet: 98.76,
      tax: 23,
      coverImage: magazine3,
    },
    {
      id: 16,
      title: 'Procedury administracyjne i podatkowe 2',
      priceNet: 98.76,
      tax: 23,
      coverImage: magazine3,
    },
    {
      id: 17,
      title: 'Kazus Podatkowy 1(6)2019',
      priceNet: 98.76,
      tax: 23,
      coverImage: magazine1,
    },
    {
      id: 18,
      title: 'Kazus Podatkowy 1(6)2019',
      priceNet: 98.76,
      tax: 23,
      coverImage: magazine1,
    },
    {
      id: 19,
      title: 'Procedury administracyjne i podatkowe 2',
      priceNet: 98.76,
      tax: 23,
      coverImage: magazine3,
    },
    {
      id: 20,
      title: 'Procedury administracyjne i podatkowe 2',
      priceNet: 98.76,
      tax: 23,
      coverImage: magazine3,
    },
  ]
}
