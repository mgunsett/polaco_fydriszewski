import { useRef, useEffect, useState, useCallback } from 'react'
import { Box, Flex, Text, Image } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { playerData } from '../../data/playerData'

gsap.registerPlugin(ScrollTrigger)

// Galería "Carriles": dos filas de fotos que corren solas en sentidos opuestos.
// Se frenan con el mouse o el foco y cualquier foto se abre en el visor.

const EASE = 'cubic-bezier(0.23,1,0.32,1)'
const MIN_PER_TRACK = 8 // con pocas fotos se repiten para que el carril no deje huecos

function fill(list) {
  if (!list.length) return list
  const out = []
  while (out.length < MIN_PER_TRACK) out.push(...list)
  return out
}

function Lightbox({ list, index, onClose, onMove }) {
  const closeRef = useRef(null)
  useEffect(() => {
    if (index === null) return
    closeRef.current?.focus()
    window.__lenis?.stop()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onMove(-1)
      if (e.key === 'ArrowRight') onMove(1)
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); window.__lenis?.start() }
  }, [index, onClose, onMove])

  if (index === null) return null
  const photo = list[index]
  const btn = {
    as: 'button', type: 'button', position: 'absolute', boxSize: '46px', borderRadius: 'full',
    border: '1.5px solid', borderColor: 'brand.amber', color: 'brand.amber', fontSize: '18px',
    _focusVisible: { outline: '2px solid', outlineColor: 'brand.dorado', outlineOffset: '2px' },
  }
  return (
    <Flex
      role="dialog"
      aria-modal="true"
      aria-label="Foto ampliada"
      position="fixed"
      inset={0}
      zIndex={2000}
      bg="rgba(3,8,26,.95)"
      align="center"
      justify="center"
      p={{ base: '70px 12px', md: '60px 70px' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <Image src={photo.src} alt={photo.alt} maxW="100%" maxH="100%" objectFit="contain" />
      <Box {...btn} ref={closeRef} top="16px" right="16px" aria-label="Cerrar" onClick={onClose}>✕</Box>
      <Box {...btn} left="14px" top={{ base: 'auto', md: '50%' }} bottom={{ base: '12px', md: 'auto' }} aria-label="Anterior" onClick={() => onMove(-1)}>←</Box>
      <Box {...btn} right="14px" top={{ base: 'auto', md: '50%' }} bottom={{ base: '12px', md: 'auto' }} aria-label="Siguiente" onClick={() => onMove(1)}>→</Box>
      <Text position="absolute" bottom="18px" left={0} right={0} textAlign="center" fontSize="13px" color="brand.gray2">
        {index + 1} / {list.length}
      </Text>
    </Flex>
  )
}

function Lane({ photos, reverse, duration, onOpen }) {
  const items = fill(photos)
  const track = (hidden) => (
    <Flex className="lane-track" gap="10px" pr="10px" flexShrink={0} aria-hidden={hidden || undefined}>
      {items.map((g, i) => (
        <Box
          key={`${g.id}-${i}`}
          as="button"
          type="button"
          tabIndex={hidden || i >= photos.length ? -1 : 0}
          aria-label={`Ampliar: ${g.alt}`}
          onClick={() => onOpen(g)}
          flexShrink={0}
          h={{ base: '46vw', md: 'clamp(180px, 22vw, 300px)' }}
          sx={{ aspectRatio: i % 3 === 1 ? '16 / 11' : '4 / 5' }}
          bg="black"
          overflow="hidden"
          cursor="zoom-in"
          _focusVisible={{ outline: '2px solid', outlineColor: 'brand.dorado', outlineOffset: '-2px' }}
        >
          <Image
            src={g.src}
            alt={hidden ? '' : g.alt}
            loading="lazy"
            w="100%"
            h="100%"
            objectFit="cover"
            objectPosition={g.pos || '50% 25%'}
            transition={`filter .4s ${EASE}, transform .7s ${EASE}`}
            sx={{
              '@media (hover: hover) and (pointer: fine)': {
                filter: 'grayscale(.6) brightness(.8)',
                '&:hover': { filter: 'none', transform: 'scale(1.04)' },
              },
            }}
          />
        </Box>
      ))}
    </Flex>
  )
  return (
    <Flex
      className={`lane${reverse ? ' lane-rev' : ''}`}
      overflow="hidden"
      mb="10px"
      style={{ '--d': `${duration}s` }}
      sx={{
        maskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
      }}
    >
      {track(false)}
      {track(true)}
    </Flex>
  )
}

export default function GalleryCarriles() {
  const sectionRef = useRef(null)
  const [index, setIndex] = useState(null)
  const photos = playerData.gallery
  const cats = playerData.galleryCats || {}
  const half = Math.ceil(photos.length / 2)
  const rows = [photos.slice(0, half), photos.slice(half)]
  const counts = Object.entries(cats)
    .map(([k, label]) => [photos.filter((g) => g.category === k).length, label])
    .filter(([n]) => n)

  const open = (g) => setIndex(photos.indexOf(g))
  const close = useCallback(() => setIndex(null), [])
  const move = useCallback((d) => setIndex((i) => (i + d + photos.length) % photos.length), [photos.length])

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(gsap.utils.toArray('[data-reveal]', sectionRef.current), {
        y: 30, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })
    }, sectionRef)
    return () => mm.revert()
  }, [])

  return (
    <Box as="section" id="galeria" ref={sectionRef} bg="brand.dark" py={{ base: 16, lg: 24 }} overflow="clip">
      <Box data-reveal px={{ base: 5, md: 12, lg: '60px' }} mb={{ base: 7, lg: 11 }} maxW="1520px" mx="auto">
        <Text fontSize="11px" fontWeight="bold" color="brand.dorado" textTransform="uppercase" letterSpacing="0.28em">Fotos</Text>
        <Text as="h2" mt={2} fontFamily="heading" fontWeight="bold" fontSize={{ base: '44px', lg: 'clamp(44px, 5.4vw, 84px)' }} color="brand.amber" lineHeight={0.9} textTransform="uppercase">
          Galería
        </Text>
      </Box>

      <Box data-reveal>
        <Lane photos={rows[0]} duration={70} onOpen={open} />
        {rows[1].length > 0 && <Lane photos={rows[1]} reverse duration={80} onOpen={open} />}
      </Box>

      <Flex data-reveal gap={6} justify="center" mt={6} fontSize="11px" letterSpacing="0.2em" textTransform="uppercase" color="brand.gray">
        {counts.map(([n, label]) => (
          <Text key={label}><Box as="b" color="brand.amber">{n}</Box> {label}</Text>
        ))}
      </Flex>

      <Lightbox list={photos} index={index} onClose={close} onMove={move} />
    </Box>
  )
}
