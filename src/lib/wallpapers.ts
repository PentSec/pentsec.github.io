import neopunk from "@/assets/wallpapers/neopunk.webp"
import catppuccinMocha from "@/assets/wallpapers/catppuccin-mocha.webp"
import catppuccinLatte from "@/assets/wallpapers/catppuccin-latte.webp"
import tokyoNight from "@/assets/wallpapers/tokyo-night.webp"
import rosePine from "@/assets/wallpapers/rose-pine.webp"
import gruvboxRetro from "@/assets/wallpapers/gruvbox-retro.webp"
import nordicBlue from "@/assets/wallpapers/nordic-blue.webp"
import synthWave from "@/assets/wallpapers/synth-wave.webp"
import decayGreen from "@/assets/wallpapers/decay-green.webp"
import edgeRunner from "@/assets/wallpapers/edge-runner.webp"
import frostedGlass from "@/assets/wallpapers/frosted-glass.webp"
import graphiteMono from "@/assets/wallpapers/graphite-mono.webp"
import materialSakura from "@/assets/wallpapers/material-sakura.webp"

export const WALLPAPER_MAP: Record<string, string> = {
  neopunk,
  "catppuccin-mocha": catppuccinMocha,
  "catppuccin-latte": catppuccinLatte,
  "tokyo-night": tokyoNight,
  "rose-pine": rosePine,
  "gruvbox-retro": gruvboxRetro,
  "nordic-blue": nordicBlue,
  "synth-wave": synthWave,
  "decay-green": decayGreen,
  "edge-runner": edgeRunner,
  "frosted-glass": frostedGlass,
  "graphite-mono": graphiteMono,
  "material-sakura": materialSakura,
}

export function getWallpaper(themeId: string): string {
  return WALLPAPER_MAP[themeId] ?? WALLPAPER_MAP.neopunk
}
