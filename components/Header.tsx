"use client"

import Link from "next/link"
import { useState, Fragment, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, Dumbbell, ChevronDown, Images, Video, Play } from "lucide-react"
import Image from "next/image"
import { Popover, Transition } from "@headlessui/react"
import { motion, AnimatePresence, easeOut } from "framer-motion"
import { cn } from "@/lib/utils"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { createPortal } from "react-dom"

const services = [
  {
    key: "strength",
    name: "Strength Training",
    href: "/services/strength",
    image: "/strength.jpg",
    desc: "Progressive overload with expert guidance and tracked results.",
  },
  {
    key: "cardio",
    name: "Cardio Workouts",
    href: "/services/cardio",
    image: "/cardio.jpg",
    desc: "Endurance sessions tailored to your pace for real stamina gains.",
  },
  {
    key: "yoga",
    name: "Yoga & Flexibility",
    href: "/services/yoga",
    image: "/yoga.jpg",
    desc: "Guided flows to improve mobility, balance, and recovery.",
  },
  {
    key: "crossfit",
    name: "CrossFit Training",
    href: "/services/crossfit",
    image: "/crossfit.jpg",
    desc: "High-intensity circuits that build strength and agility fast.",
  },
  {
    key: "nutrition",
    name: "Nutrition Guidance",
    href: "/nutrition",
    image: "/healthy-nutrition-food.jpg",
    desc: "Smart, goal-based meal ideas for cutting and bulking.",
  },
]

const galleryImages = [
  { src: "/sjfitness_images/1.jpg", alt: "SJ Fitness Gym Photo 1" },
  { src: "/sjfitness_images/2.jpg", alt: "SJ Fitness Gym Photo 2" },
  { src: "/sjfitness_images/3.jpg", alt: "SJ Fitness Gym Photo 3" },
  { src: "/sjfitness_images/4.jpg", alt: "SJ Fitness Gym Photo 4" }, 
  { src: "/sjfitness_images/5.jpg", alt: "SJ Fitness Gym Photo 5" },
  { src: "/sjfitness_images/6.jpg", alt: "SJ Fitness Gym Photo 6" },
]

const galleryVideos = [
  { src: "/sjfitness_videos/1.mp4", title: "Workout Clip 1" },
  { src: "/sjfitness_videos/2.mp4", title: "Workout Clip 2" },
  { src: "/sjfitness_videos/3.mp4", title: "Workout Clip 3" },
  { src: "/sjfitness_videos/4.mp4", title: "Workout Clip 4" },
  { src: "/sjfitness_videos/5.mp4", title: "Workout Clip 5" },
  { src: "/sjfitness_videos/6.mp4", title: "Workout Clip 6" },
  { src: "/sjfitness_videos/7.mp4", title: "Workout Clip 7" },
  { src: "/sjfitness_videos/8.mp4", title: "Workout Clip 8" },
  { src: "/sjfitness_videos/9.mp4", title: "Workout Clip 9" },
  { src: "/sjfitness_videos/10.mp4", title: "Workout Clip 10" },
  { src: "/sjfitness_videos/11.mp4", title: "Workout Clip 11" },
  { src: "/sjfitness_videos/12.mp4", title: "Workout Clip 12" },
]

function GymGallery({ triggerClass = "" }: { triggerClass?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images")
  
  // State for video player
  const [playerOpen, setPlayerOpen] = useState(false)
  const [currentVideo, setCurrentVideo] = useState<string | null>(null)
  
  // --- NEW: State for image lightbox ---
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState<{ src: string; alt: string } | null>(null)
  
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- UPDATED: Lock body scroll when any modal is open ---
  useEffect(() => {
    if (isOpen || playerOpen || lightboxOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen, playerOpen, lightboxOpen])

  // --- UPDATED: Handle Escape key for all modals ---
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxOpen) {
          setLightboxOpen(false)
          setCurrentImage(null)
        } else if (playerOpen) {
          setPlayerOpen(false)
          setCurrentVideo(null)
        } else if (isOpen) {
          setIsOpen(false)
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, playerOpen, lightboxOpen])

  const posterFor = (videoSrc: string) => videoSrc.replace(/\.mp4$/i, ".png")

  const openPlayer = (src: string) => {
    setCurrentVideo(src)
    setPlayerOpen(true)
  }

  // --- NEW: Function to open the image lightbox ---
  const openLightbox = (image: { src: string; alt: string }) => {
    setCurrentImage(image)
    setLightboxOpen(true)
  }

  const galleryModal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="gallery-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            key="gallery-modal"
            initial={{ scale: 0.98, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 12, opacity: 0 }}
            transition={{ duration: 0.28, ease: easeOut }}
            className="bg-card rounded-xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden border border-border mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold">Gallery</h3>
                <div className="flex items-center bg-muted p-1 rounded-md gap-2">
                  <button onClick={() => setActiveTab("images")} className={cn("flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors", activeTab === "images" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}>
                    <Images className="w-4 h-4" /> Images
                  </button>
                  <button onClick={() => setActiveTab("videos")} className={cn("flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors", activeTab === "videos" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}>
                    <Video className="w-4 h-4" /> Videos
                  </button>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" aria-label="Close gallery">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-3 sm:p-4 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} className="min-h-[200px]">
                  {activeTab === "images" ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {galleryImages.map((image, idx) => (
                        // --- UPDATED: Changed from div to button and added onClick ---
                        <button
                          key={idx}
                          onClick={() => openLightbox(image)}
                          className="relative aspect-video rounded-lg overflow-hidden group bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                        >
                          <img src={image.src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-black/6 group-hover:bg-black/10 transition-colors duration-300" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {galleryVideos.map((v, idx) => (
                        <div key={idx} className="flex flex-col gap-3">
                          <button onClick={() => openPlayer(v.src)} className="relative aspect-video rounded-lg overflow-hidden bg-black group focus:outline-none" aria-label={`Play ${v.title}`} title={v.title}>
                            <img src={posterFor(v.src)} alt={v.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-200" />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="p-3 rounded-full bg-black/40 backdrop-blur-sm">
                                <Play className="w-6 h-6 text-white" />
                              </div>
                            </div>
                          </button>
                          <div className="text-sm text-muted-foreground px-1">{v.title}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const videoPlayerModal = (
     <AnimatePresence>
        {playerOpen && currentVideo && (
          <motion.div
            key="player-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
            onClick={() => { setPlayerOpen(false); setCurrentVideo(null); }}
          >
            <motion.div
              key="player-modal"
              initial={{ scale: 0.98, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 10, opacity: 0 }}
              transition={{ duration: 0.22, ease: easeOut }}
              className="relative w-full h-full max-w-[1400px] max-h-[90vh] rounded-lg overflow-hidden bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => { setPlayerOpen(false); setCurrentVideo(null); }} aria-label="Close player" className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
              <div className="w-full h-full flex items-center justify-center bg-black">
                <video key={currentVideo} src={currentVideo} controls autoPlay className="w-full h-full object-contain">
                  Your browser does not support HTML5 video.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  );

  // --- NEW: JSX for the image lightbox modal ---
  const imageLightboxModal = (
    <AnimatePresence>
      {lightboxOpen && currentImage && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={() => { setLightboxOpen(false); setCurrentImage(null); }}
        >
          <motion.div
            key="lightbox-modal"
            initial={{ scale: 0.98, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 10, opacity: 0 }}
            transition={{ duration: 0.22, ease: easeOut }}
            className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { setLightboxOpen(false); setCurrentImage(null); }}
              aria-label="Close image view"
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 text-center bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white/90 text-sm drop-shadow-md">{currentImage.alt}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <button onClick={() => setIsOpen(true)} aria-label="Open Gallery" className={cn("p-1 rounded-full focus:outline-none focus-visible:ring focus-visible:ring-offset-2", "hover:text-yellow-400 transition-colors", triggerClass)}>
        <Images className="w-5 h-5" />
      </button>
      
      {/* --- UPDATED: Added the new image lightbox portal --- */}
      {isMounted && createPortal(galleryModal, document.body)}
      {isMounted && createPortal(videoPlayerModal, document.body)}
      {isMounted && createPortal(imageLightboxModal, document.body)}
    </>
  )
}


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/classes", label: "Classes" },
    { href: "/membership", label: "Membership" },
    { type: "services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ]

  const isServicePageActive = services.some(service => service.href === pathname)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 text-primary">
            <Dumbbell className="w-6 h-6 text-yellow-400" />
            <span className="text-xl font-bold uppercase tracking-wider text-foreground">
              SJ FITNESS
            </span>
          </Link>
          
          <nav className="hidden md:flex flex-grow items-center justify-center gap-2">
            {navLinks.map((link) => {
              if (link.type === 'services') {
                return (
                  <Popover key="services-popover" className="relative">
                    {({ open, close }) => {
                      useEffect(() => {
                        if (!open) return
                        const handleScroll = () => close()
                        window.addEventListener("scroll", handleScroll, { passive: true })
                        return () => window.removeEventListener("scroll", handleScroll)
                      }, [open, close])

                      const isButtonActive = open || isServicePageActive;
                      const isUnderlined = isServicePageActive;

                      return (
                        <>
                          <Popover.Button
                            className={cn(
                              "group relative inline-flex items-center rounded-md px-3 py-2 font-medium transition-colors focus:outline-none",
                              isButtonActive // Use this for the text color
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            <span>{link.label}</span>
                            <ChevronDown
                              className={`ml-2 h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                            />
                            <span className={cn(
                              "absolute bottom-[-2px] left-1/2 h-[1px] bg-yellow-400 transition-all duration-300 ease-in-out",
                              isUnderlined ? "w-full -translate-x-1/2" : "w-0"
                            )} />
                          </Popover.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-4xl -translate-x-1/2 transform px-4">
                              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="relative grid gap-4 bg-card p-4 md:grid-cols-4">
                                  {services.map((s) => (
                                    <Link
                                      key={s.key}
                                      href={s.href}
                                      onClick={() => close()}
                                      className="group flex h-full w-full flex-col overflow-hidden rounded-md border bg-background shadow-sm transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg focus:shadow-lg focus:outline-none"
                                    >
                                      <div className="relative h-28 w-full">
                                        <Image
                                          src={s.image || "/placeholder.svg"}
                                          alt={s.name}
                                          fill
                                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                                          sizes="(min-width: 1024px) 256px, 33vw"
                                        />
                                      </div>
                                      <div className="flex-grow p-3">
                                        <div className="text-sm font-semibold text-foreground">
                                          {s.name}
                                        </div>
                                        <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )
                    }}
                  </Popover>
                )
              }
              
              const isActive = pathname === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href!}
                  className={cn(
                    "relative text-muted-foreground transition-colors font-medium px-3 py-2",
                    isActive ? "text-foreground" : "hover:text-foreground"
                  )}
                >
                  {link.label}
                  <span className={cn(
                    "absolute bottom-[-2px] left-1/2 h-[2px] bg-yellow-400 transition-all duration-300 ease-in-out",
                    isActive ? "w-4/5 -translate-x-1/2" : "w-0"
                  )} />
                </Link>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <AnimatedThemeToggler />
            <GymGallery triggerClass="text-foreground" />
            <Link
              href="/join"
              className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold uppercase text-sm hover:bg-yellow-500 transition-colors duration-300"
            >
              Join Now
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <AnimatedThemeToggler />
            <GymGallery triggerClass="text-foreground" />
            <button
              onClick={toggleMenu}
              className="text-foreground hover:text-yellow-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-muted-foreground hover:text-foreground" onClick={toggleMenu}>Home</Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground" onClick={toggleMenu}>About Us</Link>
              <Link href="/classes" className="text-muted-foreground hover:text-foreground" onClick={toggleMenu}>Classes</Link>
              <Link href="/membership" className="text-muted-foreground hover:text-foreground" onClick={toggleMenu}>Membership</Link>

              <div className="pl-2">
                <span className="text-sm font-semibold text-foreground">Services</span>
                <div className="flex flex-col mt-2 space-y-2">
                  {services.map((s) => (
                    <Link key={s.key} href={s.href} className="text-muted-foreground hover:text-foreground text-sm" onClick={toggleMenu}>
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/contact" className="text-muted-foreground hover:text-foreground" onClick={toggleMenu}>Contact</Link>
              <Link
                href="/join"
                className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold uppercase text-sm hover:bg-yellow-500 transition-colors duration-300 text-center mt-2"
                onClick={toggleMenu}
              >
                Join Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}