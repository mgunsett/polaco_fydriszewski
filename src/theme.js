import { extendTheme } from '@chakra-ui/react'

// Paleta de marca — fuente única de verdad para los colores del proyecto.
// Sale del escudo y la camiseta de Junior de Barranquilla: azul marino de
// fondo, rojo del escudo como acento y azul del escudo como segundo acento.
const brand = {
  // Acentos
  amber:      '#E0281C', // rojo del escudo — acento principal
  amberDark:  '#A3170E', // rojo profundo
  amberLight: '#E0281C40', // rojo translúcido (bordes y líneas)
  amber2:     '#E0281C8e', // rojo translúcido medio
  dorado:     '#4A7BFF', // azul del escudo — segundo acento (rótulos, destacados)
  orange:     '#C21F14', // hover de botones
  orangeDark: '#8E140B',
  orangeLight:'#F2574C',

  // Fondos (azul marino)
  dark:       '#07122B', // fondo global
  dark2:      '#0E1C3D', // paneles / tarjetas
  dark3:      '#07122Bcc', // fondo translúcido del navbar (glass)
  darker:     '#050D20', // footer
  panel:      '#0E1C3D',
  night:      '#03081A',
  deep:       '#0A1736',

  // Azules de soporte (navbar y /admin)
  brown:      '#13224A',
  brownDark:  '#0A1736',
  brownLight: '#6F93FF',
  accent:     '#E0281C', // scrollbar
  accentMid:  '#C21F14',
  accentDeep: '#A3170E',

  // Texto
  bone:       '#FFFFFF', // texto principal
  boneWarm:   '#4A7BFF', // detalles (guion del logo)
  gray:       '#9AA6C2', // texto secundario
  gray2:      '#DCE3F2', // texto secundario claro
  rec:        '#E0281C',
  rose:       '#F2574C',
}

// Colores de la firma del desarrollador (crédito en el footer)
const dev = {
  green: '#2D5A47',
  cream: '#E8D5A3',
}

const theme = extendTheme({
  colors: { brand, dev },
  fonts: {
    heading: `'Nippo', 'Arial Narrow', system-ui, sans-serif`,
    body:    `'Nippo', system-ui, sans-serif`,
    mono:    `'Nippo', system-ui, sans-serif`,
  },
  styles: {
    global: {
      'html, body': {
        bg: brand.dark,
        color: brand.bone,
        overflowX: 'hidden',
      },
      '::-webkit-scrollbar': { width: '4px' },
      '::-webkit-scrollbar-track': { bg: brand.dark },
      '::-webkit-scrollbar-thumb': { bg: brand.accent, borderRadius: '2px' },
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})

export default theme
