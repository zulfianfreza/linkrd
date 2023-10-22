import {
  Balsamiq_Sans,
  Bebas_Neue,
  Dancing_Script,
  Nunito,
  Plus_Jakarta_Sans,
  Poppins,
  Space_Mono,
} from 'next/font/google'

export const balsamiqSans = Balsamiq_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: ['400'] })
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})
export const nunito = Nunito({ subsets: ['latin'] })
export const dacingScript = Dancing_Script({ subsets: ['latin'] })
export const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const FONT_LIST = [
  {
    label: 'Balsamiq Sans',
    value: balsamiqSans,
  },
  {
    label: 'Space Mono',
    value: spaceMono,
  },
  {
    label: 'Bebas Neue',
    value: bebasNeue,
  },
  {
    label: 'Poppins',
    value: poppins,
  },
  {
    label: 'Nunito',
    value: nunito,
  },
  {
    label: 'Dancing Script',
    value: dacingScript,
  },
]
