import { Box, Flex, Text, Image } from '@chakra-ui/react'
import { FaInstagram } from 'react-icons/fa'
import { playerData } from '../../data/playerData'
import sportfolioWeb from '@assets/logo_sport.png'

// Footer "Pulido": una sola línea con logo, redes, derechos, el crédito de
// desarrollo y un botón para volver arriba.

const EASE = 'cubic-bezier(0.23,1,0.32,1)'

function toTop() {
  if (window.__lenis) window.__lenis.scrollTo(0)
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

const ring = {
  boxSize: '40px',
  borderRadius: 'full',
  border: '1px solid',
  borderColor: 'brand.amberLight',
  display: 'grid',
  placeItems: 'center',
  color: 'brand.amber',
  transition: `border-color .3s ${EASE}`,
  _focusVisible: { outline: '2px solid', outlineColor: 'brand.dorado', outlineOffset: '3px' },
  sx: { '@media (hover: hover) and (pointer: fine)': { '&:hover': { borderColor: 'brand.amber' } } },
}

export default function Footer() {
  const [ig, tm] = playerData.socialMedia

  return (
    <Box as="footer" bg="brand.darker" borderTop="1px solid" borderColor="brand.amberLight" px={{ base: 5, md: '60px' }} py={{ base: 9, md: '34px' }}>
      <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between" gap={{ base: 4.5, md: 6 }} flexWrap="wrap" textAlign={{ base: 'center', md: 'left' }}>
        <Box
          as="a"
          href="#hero"
          aria-label="Volver al inicio"
          onClick={(e) => { e.preventDefault(); toTop() }}
          fontFamily="heading"
          fontWeight="bold"
          fontSize="32px"
          letterSpacing="0.08em"
          color="brand.amber"
        >
          {playerData.initials}
          <Box as="span" color="brand.dorado">_</Box>
        </Box>

        <Flex direction={{ base: 'column', md: 'row' }} align="center" gap={{ base: 3.5, md: '18px' }}>
          <Flex gap={2}>
            {ig && (
              <Box as="a" href={ig.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" fontSize="17px" {...ring}>
                <FaInstagram />
              </Box>
            )}
            {tm && (
              <Box as="a" href={tm.url} target="_blank" rel="noopener noreferrer" aria-label="Transfermarkt" {...ring}>
                <Image src={tm.image} alt="" boxSize="18px" />
              </Box>
            )}
          </Flex>
          <Text fontSize="12px" letterSpacing="0.12em" textTransform="uppercase" color="brand.gray">
            © {new Date().getFullYear()} {playerData.displayName} · Todos los derechos reservados
          </Text>
        </Flex>

        <Flex align="center" gap="18px">
          <Flex direction="column" fontSize="12px" letterSpacing="0.05em" textTransform="uppercase" color="whiteAlpha.400">
            Desarrollo Web
            <Box as="a" href="https://matiasgunsett.netlify.app/sportfolio" target="_blank" rel="noopener noreferrer" aria-label="Sportfolio Web">
              <Image src={sportfolioWeb} alt="Sportfolio Web" display="block" width="85px" height="22px" mx="2px" pt="4px" />
            </Box>
          </Flex>
          <Box
            as="button"
            type="button"
            onClick={toTop}
            aria-label="Volver arriba"
            title="Volver arriba"
            boxSize="46px"
            flex="0 0 46px"
            borderRadius="full"
            border="1.5px solid"
            borderColor="brand.amber"
            color="brand.amber"
            fontSize="18px"
            fontWeight="bold"
            display="grid"
            placeItems="center"
            transition={`transform .3s ${EASE}, background .3s ${EASE}, color .3s ${EASE}`}
            _focusVisible={{ outline: '2px solid', outlineColor: 'brand.dorado', outlineOffset: '3px' }}
            sx={{ '@media (hover: hover) and (pointer: fine)': { '&:hover': { transform: 'translateY(-4px)', bg: 'brand.amber', color: 'brand.dark' } } }}
          >
            ↑
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}
