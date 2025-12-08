---
title: "The macOS Escape Hatch"
description: "Breaking free from Apple's shackles while still enjoying the forbidden fruit of their ecosystem"
publishingDate: 2025-12-08
updateDate: 2025-12-08
published: true
---

Apple hardware is still unbeatable. You unbox it, and it works. The aluminium chassis feels sturdy, free from the creaky plastics and branding stickers you're used to from the competition.

macOS on the other hand is starting to look more like a tablet OS. Animations are prioritized over power-user utility. Properly sizing edge radii seems impossible. The simplicity and polish Apple was once known for is fading.

There are alternatives on the horizon, but as of now they can't compete. Framework laptops seem to have brittle build quality and a horrible display. The HP ZBook Ultra G1a looks promising, but 14" is too small for my workflow.

Yet the ecosystem remains a golden trap: Handoff, Messages, Photos - all of it works great.

# The best of both worlds?

I recently cleared out my YouTube playlists and rediscovered this gem where [@mitchellh](https://x.com/mitchellh) talks about his coding setup.

Modern hardware is powerful enough to run a linux VM on a macOS host productively.

> [Mitchell Hashimoto @mitchellh · Jan 4, 2021](https://x.com/mitchellh/status/1346136404682625024)
>
> I switched my primary dev environment to a graphical NixOS VM on a macOS host. It has been wonderful. I can keep the great GUI ecosystem of macOS, but all dev tools are in a full screen VM. One person said "it basically replaced your terminal app" which is exactly how it feels.

If this was already the case 4 years ago (and Mitchell built some serious stuff) this is even truer today.

So I set some time aside, installed VMware Fusion and set up Fedora 43. I wanted to run Hyprland, a dynamic Tiling Wayland compositor. Since I mostly use CLI tooling this seemed like a great fit.

Long story short: there are issues with Wayland and the current VMware (and Parallels) drivers.

After 20 minutes of dnf remove, something felt off. I could just clone my dotfiles repo and stow them into .config like I always do on macOS. Sure, I was "preparing" for the day when non-Apple hardware is good enough to jump ship entirely—but tinkering with your OS all day doesn't make money.

I didn't just want to be independent from macOS. I want reproducibility. One command to set up my entire dev environment on any machine I touch.

# NixOS

Since Mitchell mentions NixOS explicitly in the video, it was the logical next step.

The reason I tried Fedora first? Some serious PTSD from attempting to move all my dotfiles to nix-darwin a few years ago.

But the promise of the same environment on any machine I'd touch from now was way too good to ignore.

NixOS is a Linux distribution built around the Nix package manager. Everything is defined declaratively, promising reproducible and reliable systems.

Sounds great, right?

So I dove right into it. There was a good amount of fucking around and finding out. Remember the driver issues with Wayland I mentioned earlier? It was a huge help rolling back breaking changes.

Just reboot and go back to the previous version, fix what led to the issue and run nixos-rebuild. Not the usual fear of bricking your Linux install.

I didn't have half as bad an experience as I did with nix-darwin back in the day. I'm not sure if it was skill issues on my end, the nix-darwin package specifically, or improvements to the ecosystem since then.

All I can say is: it wasn't bad. Even fun at times.

# The Setup

My workflow is terminal-centric (Neovim btw...). My goal was a kiosk: a single maximized application in a distraction-free environment.

I achieved this using i3, retreating to X11 to work around the Wayland driver issues. When I boot NixOS, I'm automatically launched into a single-tile single-desktop view with Ghostty.

Since there are still issues with updating the VM window size, I created a shortcut that exits i3 and reruns the VMware user tools.

```nix
startup = [
  {
    command = "vmware-user-suid-wrapper";
    notification = false;
  }
  {
    command = "ghostty";
    notification = false;
  }
];

keybindings = lib.mkOptionDefault {
  "Mod1+Shift+e" = "exec i3-msg exit";
};
```

After resizing the window on macOS, I hit the keybind and the resolution fixes itself.

Here are the settings, if you want to follow along:

## VMware Fusion

### Keyboard & Mouse

This is important so keybinds work without issues.

### Processors & Memory

Set this depending on your workloads. Up to 4/5ths seems to work well.

### Display Setup

Configure as needed for your display.

### Additional Setup

Additionally I remove the Sound as well as Video drivers in the settings. For everything media, I use macOS.

## NixOS

Download the Graphical ISO Image for ARM and boot into it. If you want to mimic my setup, install it without any desktop environment.

If you want to try this setup or just poke around, here's the repo: https://github.com/caluckenbach/nixos-config

You'll find my full NixOS configuration including the i3 window manager setup, Ghostty terminal config to mimic macOS keybindings, and the VMware workarounds I mentioned.

Fork it. Make it yours.

# Workflow

My development work now lives inside of the VM. I access everything using the VM's IP.

Everything else runs on macOS. I can go from a fresh install to my complete dev environment in under 10 minutes.

# What's Next

I am happy with this setup. So happy that I will give nix-darwin another shot.

Before I do (keep in mind the focus is on reproducible dev environment), there are a lot of dotfiles left to migrate.

Eventually I want to refactor the codebase and add different hardware and home-manager modules, so I can use this exact setup outside VMware. For the day when someone finally builds a laptop worth leaving Apple for.

If you've followed along, you've broken free from Apple's shackles while still enjoying the forbidden fruit of their ecosystem.

Best of both worlds. You open your MacBook, hit a keybind, and use a reproducible dev environment. One that follows you to whatever hardware comes next.
