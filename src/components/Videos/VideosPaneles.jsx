import { useRef, useEffect, useState } from 'react'
import { Box, Flex, Text, Image, Modal, ModalOverlay, ModalContent, ModalCloseButton, useDisclosure } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { playerData } from '../../data/playerData'

gsap.registerPlugin(ScrollTrigger)

// Videos "Paneles": paneles a todo el ancho. El activo se abre grande y a color,
// los otros quedan finos en blanco y negro. Hover en desktop, toque en mobile.
// Cada video sale de playerData.videos: YouTube (youtubeId) o reel (instagram).

const EASE = 'cubic-bezier(0.23,1,0.32,1)'

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
)

const videoUrl = (v) =>
  v.youtubeId ? `https://www.youtube.com/watch?v=${v.youtubeId}` : `https://www.instagram.com/reel/${v.instagram}/`

function Panel({ v, i, active, onOpen, onPlay }) {
  return (
    <Box
      as="button"
      type="button"
      aria-expanded={active}
      aria-label={active ? `Ver ${v.title}` : `Abrir ${v.title}`}
      onClick={() => (active ? onPlay(v) : onOpen(i))}
      onMouseEnter={() => window.matchMedia('(hover: hover) and (pointer: fine)').matches && onOpen(i)}
      position="relative"
      overflow="hidden"
      bg="black"
      textAlign="left"
      flex={{ base: 'none', md: active ? 4.2 : '1 1 0' }}
      minW={{ md: '140px' }}
      h={{ base: active ? '460px' : '76px', md: 'auto' }}
      transition={`flex-grow .7s ${EASE}, height .6s ${EASE}`}
      _focusVisible={{ outline: '2px solid', outlineColor: 'brand.dorado', outlineOffset: '3px' }}
      _after={{ content: '""', position: 'absolute', inset: 0, bgGradient: 'linear(to-b, transparent 45%, rgba(7,18,43,.95))' }}
    >
      <Image
        src={v.cover}
        alt=""
        position="absolute"
        inset={0}
        w="100%"
        h="100%"
        objectFit="cover"
        filter={active ? 'none' : 'grayscale(1) brightness(.55)'}
        transition={`filter .6s ${EASE}`}
        loading="lazy"
      />
      <Text
        position="absolute"
        zIndex={2}
        top={active ? '18px' : { base: '50%', md: '18px' }}
        transform={active ? 'none' : { base: 'translateY(-50%)', md: 'none' }}
        left="18px"
        fontSize="12px"
        fontWeight="bold"
        letterSpacing="0.2em"
        color="brand.amber"
      >
        {String(i + 1).padStart(2, '0')}
      </Text>

      {/* Título vertical del panel cerrado */}
      <Text
        position="absolute"
        zIndex={2}
        opacity={active ? 0 : 1}
        transition="opacity .3s"
        fontWeight="bold"
        textTransform="uppercase"
        whiteSpace="nowrap"
        letterSpacing="0.06em"
        fontSize={{ base: '17px', md: '22px' }}
        left={{ base: '52px', md: '50%' }}
        top={{ base: '50%', md: 'auto' }}
        bottom={{ md: '28px' }}
        transform={{ base: 'translateY(-50%)', md: 'translateX(-50%) rotate(180deg)' }}
        sx={{ writingMode: { base: 'horizontal-tb', md: 'vertical-rl' } }}
      >
        {v.club} <Box as="em" fontStyle="normal" color="brand.amber">'{v.year}</Box>
      </Text>

      {/* Detalle del panel abierto */}
      <Flex
        position="absolute"
        zIndex={2}
        left={{ base: '18px', md: '30px' }}
        right={{ base: '18px', md: '30px' }}
        bottom={{ base: '18px', md: '28px' }}
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'flex-start', md: 'flex-end' }}
        justify="space-between"
        gap={{ base: 4, md: 5 }}
        opacity={active ? 1 : 0}
        transform={active ? 'none' : 'translateY(16px)'}
        transition={`opacity .4s ${EASE} ${active ? '.25s' : '0s'}, transform .5s ${EASE} ${active ? '.25s' : '0s'}`}
      >
        <Box>
          <Text fontWeight="bold" textTransform="uppercase" lineHeight={0.95} fontSize={{ base: '30px', md: 'clamp(30px, 3.4vw, 52px)' }}>
            {v.title}
          </Text>
          <Flex align="center" gap="10px" mt="10px" fontSize="13px" color="brand.gray2" letterSpacing="0.08em">
            {v.crest && <Image src={v.crest} alt="" boxSize="24px" objectFit="contain" />}
            {v.club} · {v.league}
          </Flex>
        </Box>
        <Flex
          as="span"
          flexShrink={0}
          align="center"
          gap="10px"
          bg="brand.amber"
          color="brand.dark"
          fontWeight="bold"
          fontSize="12px"
          letterSpacing="0.16em"
          textTransform="uppercase"
          px="20px"
          py="14px"
          borderRadius="full"
        >
          <PlayIcon /> Ver video
        </Flex>
      </Flex>
    </Box>
  )
}

export default function VideosPaneles() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const videos = playerData.videos

  const play = (v) => {
    // Los reels de Instagram se abren en Instagram; YouTube se ve en la página
    if (!v.youtubeId) { window.open(videoUrl(v), '_blank', 'noopener'); return }
    setPlaying(v)
    onOpen()
  }

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(gsap.utils.toArray('[data-reveal]', sectionRef.current), {
        y: 30, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })
    }, sectionRef)
    return () => mm.revert()
  }, [])

  return (
    <Box as="section" id="videos" ref={sectionRef} bg="brand.dark" px={{ base: 5, md: 12, lg: '60px' }} py={{ base: 16, lg: 24 }} overflow="clip">
      <Box maxW="1400px" mx="auto">
        <Box data-reveal mb={{ base: 7, lg: 11 }}>
          <Text fontSize="11px" fontWeight="bold" color="brand.dorado" textTransform="uppercase" letterSpacing="0.28em">Highlights</Text>
          <Text as="h2" mt={2} fontFamily="heading" fontWeight="bold" fontSize={{ base: '44px', lg: 'clamp(44px, 5.4vw, 84px)' }} color="brand.amber" lineHeight={0.9} textTransform="uppercase">
            Videos
          </Text>
        </Box>

        <Flex data-reveal direction={{ base: 'column', md: 'row' }} gap="10px" h={{ base: 'auto', md: 'min(620px, 70vh)' }}>
          {videos.map((v, i) => (
            <Panel key={v.id} v={v} i={i} active={i === active} onOpen={setActive} onPlay={play} />
          ))}
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
        <ModalOverlay bg="rgba(3,8,26,.92)" />
        <ModalContent bg="black" mx={4} overflow="hidden" borderRadius="md">
          <ModalCloseButton zIndex={2} color="white" />
          {playing && (
            <Box position="relative" pt="56.25%">
              <Box
                as="iframe"
                title={playing.title}
                src={`https://www.youtube.com/embed/${playing.youtubeId}?autoplay=1&rel=0`}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                position="absolute"
                inset={0}
                w="100%"
                h="100%"
                border={0}
              />
            </Box>
          )}
        </ModalContent>
      </Modal>
    </Box>
  )
}
