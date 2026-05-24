import { PlatformDTO } from '@/modules/platform';

export const platforms: Omit<PlatformDTO, 'id'>[] = [
    // PC
    { name: 'PC', slug: 'pc', type: 'PC' },
    { name: 'Linux', slug: 'linux', type: 'PC' },
    { name: 'macOS', slug: 'macos', type: 'PC' },

    // PlayStation
    { name: 'PlayStation 1', slug: 'ps1', type: 'CONSOLE' },
    { name: 'PlayStation 2', slug: 'ps2', type: 'CONSOLE' },
    { name: 'PlayStation 3', slug: 'ps3', type: 'CONSOLE' },
    { name: 'PlayStation 4', slug: 'ps4', type: 'CONSOLE' },
    { name: 'PlayStation 5', slug: 'ps5', type: 'CONSOLE' },
    { name: 'PS Vita', slug: 'ps-vita', type: 'CONSOLE' },
    { name: 'PSP', slug: 'psp', type: 'CONSOLE' },

    // Xbox
    { name: 'Xbox', slug: 'xbox', type: 'CONSOLE' },
    { name: 'Xbox 360', slug: 'xbox-360', type: 'CONSOLE' },
    { name: 'Xbox One', slug: 'xbox-one', type: 'CONSOLE' },
    { name: 'Xbox Series S', slug: 'xbox-series-s', type: 'CONSOLE' },
    { name: 'Xbox Series X', slug: 'xbox-series-x', type: 'CONSOLE' },

    // Nintendo
    { name: 'NES', slug: 'nes', type: 'CONSOLE' },
    { name: 'SNES', slug: 'snes', type: 'CONSOLE' },
    { name: 'Nintendo 64', slug: 'nintendo-64', type: 'CONSOLE' },
    { name: 'Nintendo GameCube', slug: 'nintendo-gamecube', type: 'CONSOLE' },
    { name: 'Nintendo Wii', slug: 'nintendo-wii', type: 'CONSOLE' },
    { name: 'Nintendo Wii U', slug: 'nintendo-wii-u', type: 'CONSOLE' },
    { name: 'Nintendo Switch', slug: 'nintendo-switch', type: 'CONSOLE' },
    { name: 'Nintendo Switch 2', slug: 'nintendo-switch-2', type: 'CONSOLE' },
    { name: 'Game Boy', slug: 'game-boy', type: 'CONSOLE' },
    { name: 'Game Boy Advance', slug: 'game-boy-advance', type: 'CONSOLE' },
    { name: 'Nintendo DS', slug: 'nintendo-ds', type: 'CONSOLE' },
    { name: 'Nintendo 3DS', slug: 'nintendo-3ds', type: 'CONSOLE' },

    // Sega
    { name: 'Sega Genesis', slug: 'sega-genesis', type: 'CONSOLE' },
    { name: 'Sega Dreamcast', slug: 'sega-dreamcast', type: 'CONSOLE' },
    { name: 'Sega Saturn', slug: 'sega-saturn', type: 'CONSOLE' },

    // Mobile
    { name: 'Android', slug: 'android', type: 'MOBILE' },
    { name: 'iOS', slug: 'ios', type: 'MOBILE' },

    // Cloud / Other
    { name: 'Steam Deck', slug: 'steam-deck', type: 'CONSOLE' },
];
