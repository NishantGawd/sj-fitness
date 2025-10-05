"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Info, LinkIcon } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"

type Food = {
  name: string
  calories: number // per 100g
  protein: number
  carbs: number
  fat: number
  note?: string
  imageQuery?: string
  image?: string // local generated image path
}

const cutFoods: Food[] = [
  {
    name: "Chicken breast (skinless)",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    note: "Lean, high-quality protein ideal for fat-loss phases.",
    imageQuery: "grilled chicken breast",
    image: "/nutrition/chicken-breast-skinless.jpg",
  },
  {
    name: "Egg whites",
    calories: 52,
    protein: 11,
    carbs: 0.7,
    fat: 0.2,
    note: "Pure protein with minimal calories and fat.",
    imageQuery: "egg whites bowl",
    image: "/nutrition/egg-whites.jpg",
  },
  {
    name: "Greek yogurt (non‑fat)",
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fat: 0.4,
    note: "Creamy, gut-friendly protein source.",
    imageQuery: "greek yogurt nonfat",
    image: "/nutrition/greek-yogurt-nonfat.jpg",
  },
  {
    name: "Paneer (low‑fat)",
    calories: 230,
    protein: 23,
    carbs: 4,
    fat: 13,
    note: "Indian staple with solid protein and reduced fat.",
    imageQuery: "low fat paneer",
    image: "/nutrition/paneer-low-fat.jpg",
  },
  {
    name: "Tofu (firm)",
    calories: 76,
    protein: 8,
    carbs: 1.9,
    fat: 4.8,
    note: "Plant protein that’s versatile and satiating.",
    imageQuery: "firm tofu cubes",
    image: "/nutrition/tofu-firm.jpg",
  },
  {
    name: "Fish (tilapia)",
    calories: 96,
    protein: 20,
    carbs: 0,
    fat: 1.7,
    note: "Very lean fish for high-protein meals.",
    imageQuery: "tilapia fillet",
    image: "/nutrition/tilapia-fillet.jpg",
  },
  {
    name: "Fish (salmon)",
    calories: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
    note: "Omega‑3 rich; supports heart and joint health.",
    imageQuery: "salmon fillet",
    image: "/nutrition/salmon-fillet.jpg",
  },
  {
    name: "Shrimp",
    calories: 99,
    protein: 24,
    carbs: 0.2,
    fat: 0.3,
    note: "Low-calorie protein that cooks fast.",
    imageQuery: "shrimp cooked",
    image: "/nutrition/shrimp-cooked.jpg",
  },
  {
    name: "Moong dal (sprouted)",
    calories: 30,
    protein: 3,
    carbs: 6,
    fat: 0.2,
    note: "Light, fiber-rich plant protein.",
    imageQuery: "sprouted moong dal",
    image: "/nutrition/sprouted-moong-dal.jpg",
  },
  {
    name: "Chickpeas (boiled)",
    calories: 164,
    protein: 9,
    carbs: 27,
    fat: 2.6,
    note: "Filling legumes with slow carbs and fiber.",
    imageQuery: "boiled chickpeas",
    image: "/nutrition/chickpeas-boiled.jpg",
  },
  {
    name: "Lentils (boiled)",
    calories: 116,
    protein: 9,
    carbs: 20,
    fat: 0.4,
    note: "Budget-friendly protein and micronutrients.",
    imageQuery: "boiled lentils",
    image: "/nutrition/lentils-boiled.jpg",
  },
  {
    name: "Rajma (kidney beans, boiled)",
    calories: 127,
    protein: 8.7,
    carbs: 22.8,
    fat: 0.5,
    note: "Hearty beans with iron and fiber.",
    imageQuery: "kidney beans cooked",
    image: "/nutrition/rajma-kidney-beans.jpg",
  },
  {
    name: "Quinoa (cooked)",
    calories: 120,
    protein: 4.4,
    carbs: 21.3,
    fat: 1.9,
    note: "Pseudo-grain with complete protein.",
    imageQuery: "cooked quinoa bowl",
    image: "/nutrition/quinoa-cooked.jpg",
  },
  {
    name: "Brown rice (cooked)",
    calories: 123,
    protein: 2.7,
    carbs: 25.6,
    fat: 1,
    note: "Wholesome carbs with more fiber than white rice.",
    imageQuery: "brown rice cooked",
    image: "/nutrition/brown-rice-cooked.jpg",
  },
  {
    name: "Oats (dry)",
    calories: 389,
    protein: 16.9,
    carbs: 66,
    fat: 6.9,
    note: "High-fiber breakfast staple; very filling.",
    imageQuery: "rolled oats bowl",
    image: "/nutrition/oats-dry.jpg",
  },
  {
    name: "Ragi (finger millet, cooked)",
    calories: 101,
    protein: 3.5,
    carbs: 21.6,
    fat: 0.7,
    note: "Calcium-rich traditional grain.",
    imageQuery: "ragi millet cooked",
    image: "/nutrition/ragi-cooked.jpg",
  },
  {
    name: "Sweet potato (boiled)",
    calories: 86,
    protein: 1.6,
    carbs: 20,
    fat: 0.1,
    note: "Slow-digesting carbs and beta-carotene.",
    imageQuery: "boiled sweet potato",
    image: "/nutrition/sweet-potato-boiled.jpg",
  },
  {
    name: "Broccoli",
    calories: 34,
    protein: 2.8,
    carbs: 6.6,
    fat: 0.4,
    note: "High fiber and micronutrients; very satiating.",
    imageQuery: "broccoli florets",
    image: "/nutrition/broccoli.jpg",
  },
  {
    name: "Spinach",
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    note: "Iron, folate, and low calories; great volume food.",
    imageQuery: "fresh spinach leaves",
    image: "/nutrition/spinach.jpg",
  },
  {
    name: "Cucumber",
    calories: 15,
    protein: 0.7,
    carbs: 3.6,
    fat: 0.1,
    note: "Hydrating and refreshing; add to salads.",
    imageQuery: "cucumber slices",
    image: "/nutrition/cucumber.jpg",
  },
  {
    name: "Tomato",
    calories: 18,
    protein: 0.9,
    carbs: 3.9,
    fat: 0.2,
    note: "Rich in lycopene and flavor for low calories.",
    imageQuery: "fresh tomatoes",
    image: "/nutrition/tomato.jpg",
  },
  {
    name: "Apple",
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fat: 0.2,
    note: "Portable smart snack; fiber supports fullness.",
    imageQuery: "red apple",
    image: "/nutrition/apple.jpg",
  },
]

const bulkFoods: Food[] = [
  {
    name: "Whole eggs",
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fat: 11,
    note: "Dense protein + fats for easy calories.",
    imageQuery: "whole eggs",
    image: "/nutrition/whole-eggs.jpg",
  },
  {
    name: "Paneer (regular)",
    calories: 296,
    protein: 18,
    carbs: 4,
    fat: 22,
    note: "Great for high-protein Indian meals.",
    imageQuery: "paneer cubes",
    image: "/nutrition/paneer-regular.jpg",
  },
  {
    name: "Peanut butter (natural)",
    calories: 588,
    protein: 25,
    carbs: 20,
    fat: 50,
    note: "Tasty calorie booster; pair with fruit.",
    imageQuery: "peanut butter jar",
    image: "/nutrition/peanut-butter.jpg",
  },
  {
    name: "Almonds",
    calories: 579,
    protein: 21,
    carbs: 22,
    fat: 50,
    note: "Healthy fats and vitamin E.",
    imageQuery: "almonds bowl",
    image: "/nutrition/almonds.jpg",
  },
  {
    name: "Cashews",
    calories: 553,
    protein: 18,
    carbs: 30,
    fat: 44,
    note: "Creamy nuts; add to stir-fries.",
    imageQuery: "cashews bowl",
    image: "/nutrition/cashews.jpg",
  },
  {
    name: "Walnuts",
    calories: 654,
    protein: 15,
    carbs: 14,
    fat: 65,
    note: "Omega‑3 ALA supports overall health.",
    imageQuery: "walnuts",
    image: "/nutrition/walnuts.jpg",
  },
  {
    name: "Olive oil",
    calories: 884,
    protein: 0,
    carbs: 0,
    fat: 100,
    note: "Easy drizzle to scale calories.",
    imageQuery: "olive oil bottle",
    image: "/nutrition/olive-oil.jpg",
  },
  {
    name: "Ghee",
    calories: 900,
    protein: 0,
    carbs: 0,
    fat: 100,
    note: "Traditional fat source for rich flavor.",
    imageQuery: "ghee spoon",
    image: "/nutrition/ghee.jpg",
  },
  {
    name: "Avocado",
    calories: 160,
    protein: 2,
    carbs: 9,
    fat: 15,
    note: "Creamy monounsaturated fats.",
    imageQuery: "avocado halves",
    image: "/nutrition/avocado.jpg",
  },
  {
    name: "Banana",
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    note: "Workout-friendly carbs and potassium.",
    imageQuery: "banana bunch",
    image: "/nutrition/banana.jpg",
  },
  {
    name: "Dates (dry)",
    calories: 282,
    protein: 2.5,
    carbs: 75,
    fat: 0.4,
    note: "Quick carbs; great pre/post workout.",
    imageQuery: "dry dates",
    image: "/nutrition/dates-dry.jpg",
  },
  {
    name: "Raisins",
    calories: 299,
    protein: 3.1,
    carbs: 79,
    fat: 0.5,
    note: "Compact carbs; easy to snack on.",
    imageQuery: "raisins",
    image: "/nutrition/raisins.jpg",
  },
  {
    name: "Whole wheat roti",
    calories: 110,
    protein: 3.6,
    carbs: 18.7,
    fat: 1.2,
    note: "Staple complex carbs for energy.",
    imageQuery: "whole wheat roti",
    image: "/nutrition/whole-wheat-roti.jpg",
  },
  {
    name: "Parboiled rice (cooked)",
    calories: 123,
    protein: 2.7,
    carbs: 26,
    fat: 0.4,
    note: "Fluffy carbs; easy to digest.",
    imageQuery: "cooked rice parboiled",
    image: "/nutrition/parboiled-rice-cooked.jpg",
  },
  {
    name: "Pasta (cooked)",
    calories: 131,
    protein: 5,
    carbs: 25,
    fat: 1.1,
    note: "Versatile carb base; add protein.",
    imageQuery: "cooked pasta bowl",
    image: "/nutrition/pasta-cooked.jpg",
  },
  {
    name: "Chicken thighs",
    calories: 209,
    protein: 17,
    carbs: 0,
    fat: 15,
    note: "Juicier than breast; higher calories.",
    imageQuery: "chicken thighs roasted",
    image: "/nutrition/chicken-thighs-roasted.jpg",
  },
  {
    name: "Mutton (lean)",
    calories: 250,
    protein: 25,
    carbs: 0,
    fat: 17,
    note: "Rich taste; add in moderation.",
    imageQuery: "lean mutton curry",
    image: "/nutrition/mutton-lean.jpg",
  },
  {
    name: "Salmon (fatty)",
    calories: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
    note: "Protein + omega‑3s for muscle + health.",
    imageQuery: "salmon fillet",
    image: "/nutrition/salmon-fillet.jpg",
  },
  {
    name: "Milk (full‑fat)",
    calories: 61,
    protein: 3.2,
    carbs: 5,
    fat: 3.3,
    note: "Convenient liquid calories.",
    imageQuery: "full fat milk glass",
    image: "/nutrition/milk-full-fat.jpg",
  },
  {
    name: "Curd (full‑fat)",
    calories: 98,
    protein: 3.5,
    carbs: 4.7,
    fat: 5.5,
    note: "Probiotics + extra calories.",
    imageQuery: "full fat curd",
    image: "/nutrition/curd-full-fat.jpg",
  },
  {
    name: "Cheddar cheese",
    calories: 403,
    protein: 25,
    carbs: 1.3,
    fat: 33,
    note: "Tasty topper to scale meals up.",
    imageQuery: "cheddar cheese block",
    image: "/nutrition/cheddar-cheese.jpg",
  },
  {
    name: "Soya chunks (dry)",
    calories: 345,
    protein: 52,
    carbs: 33,
    fat: 0.5,
    note: "Very high plant protein per gram.",
    imageQuery: "soya chunks dry",
    image: "/nutrition/soya-chunks-dry.jpg",
  },
]

function FoodCard({ item, className }: { item: Food; className?: string }) {
  const imgSrc = item.image || `/placeholder.svg?height=80&width=80&query=${encodeURIComponent(item.imageQuery || item.name)}`
  return (
    <div className={cn("rounded-lg border border-border bg-card p-4 text-sm flex gap-3 h-full", className)}>
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
        <Image src={imgSrc} alt={item.name} fill sizes="80px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <div className="font-medium text-pretty">{item.name}</div>
          <div className="rounded bg-primary/10 px-2 py-0.5 text-xs text-primary">{item.calories} kcal</div>
        </div>
        <dl className="mt-2 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <div>
            <dt className="font-medium text-foreground">Protein</dt>
            <dd>{item.protein} g</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Carbs</dt>
            <dd>{item.carbs} g</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Fat</dt>
            <dd>{item.fat} g</dd>
          </div>
        </dl>
        {item.note ? <p className="mt-2 text-xs text-muted-foreground">{item.note}</p> : null}
      </div>
    </div>
  )
}

function FoodCategorySection({
  title,
  items,
}: {
  title: string
  items: Food[]
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const shownItems = isExpanded ? items : items.slice(0, 4)

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <motion.div layout className="grid gap-3 sm:grid-cols-2">
        <AnimatePresence initial={false}>
          {shownItems.map((item) => (
            <motion.div
              key={item.name}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <FoodCard item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {items.length > 4 && (
        <div className="mt-6 flex justify-center">
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span>{isExpanded ? "Show Less" : "Load More"}</span>
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </motion.button>
        </div>
      )}
    </section>
  )
}

export default function NutritionPage() {
  return (
    <div className="min-h-dvh">
      {/* Hero with background image */}
      <section className="relative h-[91vh] md:h-[91vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?q=80&w=1920&auto=format&fit=crop"
          alt="Healthy nutrition"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        <motion.div
          className="relative z-10 h-full flex items-center px-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6">
              Eat Smart.<span className="text-brand-yellow">Train Better.</span>Feel Amazing.
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl">
              Practical lists for Cutting and Bulking with quick insights. Keep portions and goals in mind and enjoy the
              process.
            </p>
          </div>
        </motion.div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-10">
        {/* Info strip */}
        <section className="mb-8 rounded-xl border border-border bg-card p-6">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 text-primary" />
            <p className="text-pretty text-sm text-muted-foreground">
              Calorie and macro values are approximations per 100 g (unless noted) and can vary by brand and
              preparation. Use these lists to plan Cutting (fat‑loss) or Bulking (muscle‑gain) phases. Always account
              for your total daily energy needs and preferences.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link
              href="https://www.nin.res.in"
              className="inline-flex items-center gap-1 underline underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              <LinkIcon className="h-4 w-4" /> ICMR‑NIN (India)
            </Link>
            <Link
              href="https://fdc.nal.usda.gov"
              className="inline-flex items-center gap-1 underline underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              <LinkIcon className="h-4 w-4" /> USDA FoodData Central
            </Link>
            <Link
              href="https://www.who.int/health-topics/nutrition"
              className="inline-flex items-center gap-1 underline underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              <LinkIcon className="h-4 w-4" /> WHO Nutrition
            </Link>
            <Link
              href="https://examine.com/nutrition"
              className="inline-flex items-center gap-1 underline underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              <LinkIcon className="h-4 w-4" /> Examine – Nutrition
            </Link>
          </div>
        </section>

        <div className="grid gap-12 md:grid-cols-2 md:gap-8">
          <FoodCategorySection title="Cutting Foods" items={cutFoods} />
          <FoodCategorySection title="Bulking Foods" items={bulkFoods} />
        </div>

        <footer className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
          This page is educational and not a substitute for individualized medical or nutrition advice. Consult a
          qualified professional for health conditions or specialized goals.
        </footer>
      </div>
    </div>
  )
}
