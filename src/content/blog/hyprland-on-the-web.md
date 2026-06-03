---
title: "Hyprland on the Web"
date: "2026-06-01"
tags: ["hyprland", "react", "ui"]
---

This portfolio is an experiment: **what if a window manager like Hyprland became a web interface?**

Using React 19, TypeScript and [Swapy](https://swapy.tahazsh.com) for dynamic tiling, I managed to recreate:

- Navigable workspaces with `Super + 1-6`
- Floating windows with a border glow on the active one
- A functional Waybar with workspace pills and clock
- Rofi-style search with `Ctrl + Space`
- 180ms animations with Hyprland easing

All documented in the design system file in the repo.
