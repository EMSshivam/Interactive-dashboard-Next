// Status Colors
export const statusColors: Record<string, string> = {
  'New': '#A78BFA',          
  'In Progress': '#3B82F6',  
  'Completed': '#1b8f64',    
  'Blocked': '#ef4444',      
}
// Categories Colors
export const categoryColors: Record<string, string> = {
  'A': '#ec4899', 
  'B': '#f59e0b', 
  'C': '#06b6d4', 
  'D': '#8b5cf6', 
}

// Gradient used in bar charts
export const chartGradient = {
  from: '#A855F7', // purple-500
  to:   '#EC4899', // pink-500
}

// Gradients 
export const gradients = {
  blue: 'bg-gradient-to-b from-[#4FC3F7] to-[#1E3AFC]',
  orange: 'bg-gradient-to-b from-[#FF8A00] to-[#E13A9D]',
  purple: 'bg-gradient-to-b from-fuchsia-500 to-indigo-500', 
  pinkPurple: 'bg-gradient-to-b from-[#A855F7] to-[#EC4899]',
  creamBand: 'bg-gradient-to-r from-violet-50 via-rose-50 to-amber-50',
  accentBlue: 'bg-gradient-to-b from-sky-400 to-indigo-500',
  accentSunset: 'bg-gradient-to-b from-orange-400 to-pink-500',
  softCard: 'bg-gradient-to-r from-[#fff9fc] to-[#fce7f3]'
}

export const borders = {
  bandBottom: 'border-b border-b-violet-200/70',
}

export const shadows = {
  bandBottom: 'shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]',
  chip: 'shadow-sm',
  soft: 'shadow-md shadow-gray-200',
}

export const animations = {
  slideUpMount: 'transition-all duration-300 opacity-100 translate-y-0',
  slideUpHidden: 'transition-all duration-300 opacity-0 translate-y-2',
}