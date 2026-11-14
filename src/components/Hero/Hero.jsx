import { useRef, useLayoutEffect } from 'react'
import { Box, Text, Flex, Image } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { playerData } from '../../data/playerData'
import useMatches from '../../hooks/useMatches'
import { u, heroUnitVars, LANDSCAPE } from '../../utils/heroUnits'

gsap.registerPlugin(ScrollTrigger)

// Hero "Portada": dorsal gigante en contorno detrás del jugador,
// apellido a todo el ancho abajo y datos en las esquinas, como una tapa de revista.

const EASE = 'expo.out' // equivalente GSAP del ease-out cubic-bezier(0.23,1,0.32,1)
const SIDE = 'max(16px, 4vw)'
const NAME_BOTTOM = 'clamp(20px, calc(5 * var(--sv)), 56px)'

const label = {
  fontFamily: 'mono',
  textTransform: 'uppercase',
  letterSpacing: '0.22em',
  color: 'brand.mist',
}

function Corner({ side, children }) {
  return (
    <Flex
      data-hero="corner"
      direction="column"
      align={side === 'left' ? 'flex-start' : 'flex-end'}
      textAlign={side}
      gap={u(6)}
      position="absolute"
      zIndex={3}
      top={{ base: `calc(${u(84)} + env(safe-area-inset-top, 0px))`, md: `calc(${u(104)} + env(safe-area-inset-top, 0px))` }}
      {...(side === 'left' ? { left: SIDE } : { right: SIDE })}
      sx={{ [LANDSCAPE]: { top: u(76) } }}
    >
      {children}
    </Flex>
  )
}

function NextMatch({ match }) {
  if (!match) return null
  const meta = [match.date, match.stadium].filter(Boolean).join(' · ')
  return (
    <Flex
      data-hero="corner"
      direction="column"
      gap={u(4)}
      position="absolute"
      zIndex={3}
      fontFamily="mono"
      // mobile y tablet: debajo del dorsal (izquierda) · desktop: a la derecha, sobre el apellido
      left={{ base: SIDE, lg: 'auto' }}
      right={{ base: 'auto', lg: SIDE }}
      textAlign={{ base: 'left', lg: 'right' }}
      top={{ base: `calc(${u(170)} + env(safe-area-inset-top, 0px))`, md: `calc(${u(190)} + env(safe-area-inset-top, 0px))`, lg: 'auto' }}
      bottom={{ base: 'auto', lg: `calc(${NAME_BOTTOM} + 15.2vw * 0.82 + 14px)` }}
      sx={{ [LANDSCAPE]: { display: 'none' } }}
    >
      <Text {...label} color="brand.redSoft" fontWeight="700" fontSize={u(11)}>
        Próximo partido
      </Text>
      <Text fontWeight="600" letterSpacing="0.08em" fontSize={{ base: u(15), lg: u(18) }} color="brand.cream">
        {match.home.name} vs {match.away.name}
        {meta && (
          <Text as="span" display={{ base: 'block', lg: 'inline' }} ml={{ base: 0, lg: u(8) }} mt={{ base: u(2), lg: 0 }}
            color="brand.mist" fontSize={u(13)} fontWeight="500" letterSpacing="0.14em">
            {meta}
          </Text>
        )}
      </Text>
    </Flex>
  )
}

export default function Hero() {
  const outerRef  = useRef(null)
  const stageRef  = useRef(null)
  const { matches } = useMatches()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(stageRef)
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Entrada: una sola secuencia coordinada
        gsap.timeline({ defaults: { ease: EASE } })
          .from(q('[data-hero="dorsal"]'), { opacity: 0, scale: 0.92, duration: 1.4 }, 0.1)
          .from(q('[data-hero="player"]'), { opacity: 0, y: 40, duration: 1.2 }, 0.3)
          .from(q('[data-hero="line"]'),   { yPercent: 110, opacity: 0, duration: 1.1, stagger: 0.1 }, 0.45)
          .from(q('[data-hero="corner"]'), { opacity: 0, y: 16, duration: 0.9, stagger: 0.08 }, 0.65)

        // Salida con el scroll (la sección siguiente sube por encima)
        gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: outerRef.current, start: 'top top', end: 'bottom bottom', scrub: 1 },
        })
          .to(q('[data-hero="dorsal"]'), { yPercent: -18, opacity: 0.35 }, 0)
          .to(q('[data-hero="player"]'), { scale: 1.06, transformOrigin: '50% 100%' }, 0)
          .to(q('[data-hero="name"]'),   { y: -40, opacity: 0.6 }, 0)
          .to(q('[data-hero="dim"]'),    { opacity: 0.7 }, 0)
      })
    }, stageRef)
    return () => ctx.revert()
  }, [])

  const { name, fullName, number, position, currentClub, logoCurrentClub, nationality, nationalityFlag } = playerData

  return (
    <Box ref={outerRef} id="hero" position="relative" zIndex={1} h="calc(200 * var(--sv))">
      <Box
        ref={stageRef}
        position="sticky"
        top={0}
        h="calc(100 * var(--sv))"
        minH="560px"
        overflow="hidden"
        isolation="isolate"
        bg="brand.ink"
        bgImage="radial-gradient(70% 60% at 50% 42%, var(--chakra-colors-brand-navyGlow) 0%, transparent 70%)"
        sx={{ ...heroUnitVars, [LANDSCAPE]: { minH: '100vh' } }}
      >
        {/* Dorsal gigante en contorno */}
        {/* contenedor de alto 0 centrado en la línea: el número queda centrado sin usar transform (lo anima GSAP) */}
        <Flex position="absolute" zIndex={-1} insetX={0} top={{ base: '40%', md: '44%' }} h={0}
          align="center" justify="center" aria-hidden="true">
          <Text
            data-hero="dorsal"
            flexShrink={0}
            fontFamily="heading"
            fontSize={{ base: '110vw', md: 'min(calc(78 * var(--sv)), 62vw)' }}
            lineHeight={0.8}
            letterSpacing="-0.02em"
            color="transparent"
            userSelect="none"
            sx={{ WebkitTextStroke: '2px rgba(225,50,60,0.55)' }}
          >
            {number}
          </Text>
        </Flex>

        {/* Jugador */}
        <Box
          data-hero="player"
          position="absolute"
          zIndex={1}
          left={0}
          right={0}
          mx="auto"
          bottom={{ base: '9vw', md: 0 }}
          h={{ base: 'calc(72 * var(--sv))', md: 'min(calc(90 * var(--sv)), 940px)' }}
          aspectRatio="1027 / 1800"
          sx={{ [LANDSCAPE]: { h: 'calc(88 * var(--sv))', bottom: 0 } }}
        >
          <Image
            src={playerData.image}
            alt={`${playerData.shortName} con la camiseta de ${currentClub}, de brazos cruzados`}
            fetchpriority="high"
            draggable={false}
            w="100%"
            h="100%"
            objectFit="contain"
            objectPosition="bottom"
          />
        </Box>

        {/* Fundido inferior: integra el corte de la foto y da contraste al apellido */}
        <Box
          position="absolute"
          insetX={0}
          bottom={0}
          h="55%"
          zIndex={2}
          pointerEvents="none"
          bg="linear-gradient(transparent, rgba(10,18,32,0.6) 40%, var(--chakra-colors-brand-ink) 92%)"
        />

        {/* Esquinas */}
        <Corner side="left">
          <Text {...label} fontSize={{ base: u(10), md: u(12) }}>Dorsal</Text>
          <Text fontFamily="mono" fontWeight="600" letterSpacing="0.12em" textTransform="uppercase"
            fontSize={{ base: u(13), md: u(15) }} color="brand.cream">
            N.º {number} · {position}
          </Text>
        </Corner>

        <Corner side="right">
          <Text {...label} fontSize={{ base: u(10), md: u(12) }}>{playerData.season}</Text>
          <Flex align="center" gap={u(10)}>
            <Image src={logoCurrentClub} alt="" w={u(26)} />
            <Text fontFamily="mono" fontWeight="600" letterSpacing="0.12em" textTransform="uppercase"
              fontSize={{ base: u(13), md: u(15) }} color="brand.cream">
              {currentClub.split(' ')[0]}
            </Text>
          </Flex>
          <Flex align="center" gap={u(8)}>
            <Text {...label} fontSize={{ base: u(10), md: u(12) }}>{nationality}</Text>
            <Image src={nationalityFlag} alt="" w={u(16)} />
          </Flex>
        </Corner>

        <NextMatch match={matches.next} />

        {/* Nombre: único h1 de la página */}
        <Box
          data-hero="name"
          as="h1"
          position="absolute"
          zIndex={3}
          insetX={0}
          bottom={NAME_BOTTOM}
          px={SIDE}
          fontFamily="heading"
          fontWeight="400"
          lineHeight={0.82}
        >
          <Box as="span" display="block" overflow="hidden" pt="0.05em">
            <Flex as="span" data-hero="line" align="baseline" gap={{ base: u(12), md: u(18) }}
              fontSize={{ base: '13vw', md: 'clamp(44px, 5.4vw, 88px)' }} color="brand.red">
              {name}
              <Text as="span" display={{ base: 'none', md: 'inline' }} fontFamily="mono" fontWeight="600"
                fontSize="clamp(12px, 1vw, 15px)" letterSpacing="0.24em" textTransform="uppercase" color="brand.cream">
                {position} · {currentClub}
              </Text>
            </Flex>
          </Box>
          <Box as="span" display="block" overflow="hidden" pt="0.05em">
            <Box as="span" data-hero="line" display="block" whiteSpace="nowrap" color="brand.cream"
              fontSize={{ base: '15.4vw', md: '15.2vw' }} letterSpacing="-0.005em"
              sx={{ [LANDSCAPE]: { fontSize: '11vw' } }}>
              {fullName}
            </Box>
          </Box>
        </Box>

        {/* Oscurecido al scrollear */}
        <Box data-hero="dim" position="absolute" inset={0} zIndex={20} pointerEvents="none"
          bg="radial-gradient(ellipse at center, transparent 25%, rgba(5,9,16,0.85) 100%)" opacity={0} />
      </Box>
    </Box>
  )
}
