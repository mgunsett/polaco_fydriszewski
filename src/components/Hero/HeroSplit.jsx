import { useRef, useEffect } from 'react'
import { Box, Flex, Grid, Text, Image } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { playerData } from '../../data/playerData'

// Hero "Split editorial": a la izquierda escudo + posición, nombre, logros
// destacados y botones; a la derecha un panel rojo en diagonal con el recorte.
// El dorsal va grande y en azul sobre el panel rojo, detrás del jugador.

const EASE = 'cubic-bezier(0.23,1,0.32,1)'

function scrollToId(id) {
  const el = document.querySelector(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

// El apellido se ajusta solo con CSS según su largo (apellidos largos):
// cada letra de Nippo Bold en mayúscula ocupa ~0.64em.
const fitSize = (len, max, avail) => `min(${max}, calc((${avail}) / ${(len * 0.64).toFixed(2)}))`

export default function HeroSplit() {
  const rootRef = useRef(null)
  const p = playerData

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.1 } })
      tl.from('[data-hero="panel"]', { xPercent: 30, opacity: 0, duration: 1.2 })
        .from('[data-hero="player"]', { x: 60, opacity: 0, duration: 1.4 }, 0.25)
        .from('[data-hero="dorsal"]', { opacity: 0, duration: 1.6 }, 0.2)
        .from('[data-hero="rv"]', { y: 28, opacity: 0, stagger: 0.09 }, 0.2)
    }, rootRef)
    return () => mm.revert()
  }, [])

  return (
    <Box
      as="section"
      id="hero"
      ref={rootRef}
      position="relative"
      overflow="hidden"
      bg="brand.dark"
      h={{ base: 'auto', lg: 'calc(100 * var(--sv))' }}
      minH={{ base: 'calc(100 * var(--sv))', lg: '640px' }}
      display="grid"
      gridTemplateColumns={{ base: 'minmax(0, 1fr)', lg: 'minmax(0, 1.05fr) minmax(0, 1fr)' }}
      gridTemplateRows={{ base: 'minmax(420px, 56svh) auto', lg: '1fr' }}
    >
      {/* Texto */}
      <Flex
        position="relative"
        zIndex={5}
        direction="column"
        justify="center"
        gridRow={{ base: 2, lg: 1 }}
        px={{ base: 5, lg: 0 }}
        pl={{ lg: '60px' }}
        pt={{ base: 6, lg: '90px' }}
        pb={{ base: 8, lg: 10 }}
      >
        {/* Escudo + posición */}
        <Flex data-hero="rv" align="center" gap={{ base: 3, lg: 4 }} mb={{ base: 2.5, lg: 5 }}>
          <Box display={{ base: 'block', lg: 'none' }} boxSize="8px" borderRadius="full" bg="brand.dorado" />
          <Image
            src={p.logoCurrentClub}
            alt={`Escudo de ${p.currentClub}`}
            display={{ base: 'none', lg: 'block' }}
            boxSize="54px"
            objectFit="contain"
            filter="drop-shadow(0 6px 14px rgba(0,0,0,.4))"
          />
          <Text fontSize={{ base: '11px', lg: '12px' }} fontWeight="bold" letterSpacing="0.28em" textTransform="uppercase" color="brand.gray">
            <Box as="b" color="brand.bone" fontSize={{ base: '11px', lg: '15px' }} letterSpacing="0.24em">{p.position}</Box>
            {' · '}#{p.number}
            <Box as="span" display={{ base: 'none', lg: 'inline' }}> · {p.clubShort}</Box>
          </Text>
        </Flex>

        <Box as="h1" fontFamily="heading" fontWeight="bold" textTransform="uppercase" lineHeight={0.86}>
          <Box as="span" data-hero="rv" display="block" fontSize={{ base: '8vw', lg: 'clamp(34px, 4.4vw, 76px)' }} color="brand.bone">
            {p.name}
          </Box>
          <Box
            as="span"
            data-hero="rv"
            display="block"
            fontSize={{
              base: fitSize(p.fullName.length, '19vw', '100vw - 40px'),
              lg: fitSize(p.fullName.length, 'clamp(70px, 10.4vw, 190px)', '56vw - 60px'),
            }}
            color="brand.amber"
            ml="-0.04em"
            whiteSpace="nowrap"
          >
            {p.fullName}
          </Box>
        </Box>

        {/* Logros destacados */}
        <Box data-hero="rv" mt={{ base: 3.5, lg: '30px' }} maxW="640px">
          <Text fontSize="10px" fontWeight="bold" letterSpacing="0.28em" textTransform="uppercase" color="brand.dorado" mb={{ base: 2, lg: 3 }}>
            Logros destacados
          </Text>
          <Grid templateColumns="repeat(3, 1fr)" borderTop="1px solid" borderBottom="1px solid" borderColor="brand.amberLight">
            {p.highlights.slice(0, 3).map((h, i) => (
              <Box
                key={h.l}
                minW={0}
                py={{ base: 2.5, lg: 4 }}
                pr={{ base: 2, lg: '18px' }}
                mr={i < 2 ? { base: 2, lg: '18px' } : 0}
                borderRight={i < 2 ? '1px solid' : 0}
                borderColor="brand.amberLight"
              >
                <Flex align="baseline" gap="6px" fontWeight="bold" lineHeight={1}>
                  <Text as="span" fontSize={{ base: '24px', lg: '40px' }} color="brand.amber" className="tab">{h.v}</Text>
                  <Text as="span" fontSize={{ base: '8px', lg: '11px' }} letterSpacing={{ base: '0.12em', lg: '0.2em' }} textTransform="uppercase">{h.u}</Text>
                </Flex>
                <Text mt={{ base: 1.5, lg: 2.5 }} fontSize={{ base: '10px', lg: '13px' }} fontWeight="bold" textTransform="uppercase" letterSpacing={{ base: '0.02em', lg: '0.06em' }} lineHeight={1.25}>
                  {h.l}
                </Text>
                <Text display={{ base: 'none', lg: 'block' }} mt={1} fontSize="11px" color="brand.gray" letterSpacing="0.04em">{h.d}</Text>
              </Box>
            ))}
          </Grid>
        </Box>

        <Flex data-hero="rv" gap="14px" mt={{ base: 4.5, lg: '30px' }}>
          {[
            { label: 'Ver jugadas', href: '#videos', solid: true },
            { label: 'Contacto', href: '#contact' },
          ].map((b) => (
            <Box
              key={b.label}
              as="a"
              href={b.href}
              onClick={(e) => { e.preventDefault(); scrollToId(b.href) }}
              flex={{ base: 1, lg: 'none' }}
              textAlign="center"
              fontWeight="bold"
              fontSize={{ base: '11px', lg: '12px' }}
              letterSpacing="0.2em"
              textTransform="uppercase"
              px={{ base: 2.5, lg: '26px' }}
              py={{ base: '13px', lg: '15px' }}
              borderRadius="full"
              border="1.5px solid"
              borderColor="brand.amber"
              bg={b.solid ? 'brand.amber' : 'transparent'}
              color={b.solid ? 'brand.dark' : 'brand.amber'}
              transition={`transform .25s ${EASE}`}
              _focusVisible={{ outline: '2px solid', outlineColor: 'brand.dorado', outlineOffset: '3px' }}
              sx={{ '@media (hover: hover) and (pointer: fine)': { '&:hover': { transform: 'translateY(-2px)' } } }}
            >
              {b.label}
            </Box>
          ))}
        </Flex>
      </Flex>

      {/* Foto */}
      <Box position="relative" gridRow={1} gridColumn={{ lg: 2 }}>
        <Box
          data-hero="panel"
          position="absolute"
          inset={{ base: 0, lg: '0 0 0 -8%' }}
          bg="brand.amber"
          clipPath={{ base: 'polygon(0 0,100% 0,100% 82%,0 100%)', lg: 'polygon(22% 0,100% 0,100% 100%,0 100%)' }}
        >
          <Image
            src={p.logoCurrentClub}
            alt=""
            display={{ base: 'block', lg: 'none' }}
            position="absolute"
            left="20px"
            top="78px"
            w="40px"
            opacity={0.9}
          />
        </Box>
        {/* Dorsal grande en azul, detrás del jugador */}
        <Flex
          data-hero="dorsal"
          aria-hidden="true"
          position="absolute"
          inset={0}
          zIndex={2}
          justify="center"
          align={{ base: 'center', lg: 'center' }}
          pl={{ base: '12%', lg: '6%' }}
          pb={{ base: '8%', lg: '6%' }}
          pointerEvents="none"
          userSelect="none"
        >
          <Text
            fontFamily="heading"
            fontWeight="bold"
            lineHeight={0.8}
            letterSpacing="-0.04em"
            color="brand.dorado"
            fontSize={{ base: 'min(64vw, 300px)', lg: 'clamp(320px, 38vw, 640px)' }}
            textShadow="0 30px 60px rgba(7,18,43,.35)"
          >
            {p.number}
          </Text>
        </Flex>
        <Flex
          data-hero="player"
          position="absolute"
          inset={0}
          zIndex={3}
          justify="center"
          align="flex-end"
          pl={{ base: '12%', lg: 0 }}
          pointerEvents="none"
        >
          <Image
            src={p.heroImage}
            alt={p.heroAlt}
            fetchpriority="high"
            h={{ base: '84%', lg: '96%' }}
            w="auto"
            maxW="none"
            filter="drop-shadow(-24px 20px 40px rgba(0,0,0,.5))"
          />
        </Flex>
      </Box>
    </Box>
  )
}
