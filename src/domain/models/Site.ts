// src/domain/models/Site.ts

export interface NavLink {
  name: string;
  path: string;
}

/** Copy and links for the parts every page shares: the header and mobile menu. */
export interface SiteData {
  nav: {
    /** Either side of the wordmark on desktop. */
    side: NavLink[];
    /** The mobile menu's list. */
    menu: NavLink[];
  };
  menu: {
    elsewhere: string;
    resumePdf: string;
    screenMode: string;
  };
}
