/**
 * What should each item in {@link MenuItems} contain.
 */
export interface MenuItemStruct {
    /** The text of the button. Should containg a translation key. */
    title: string

    /** The url to which the button should link. */
    url: string

    /** Name of the class of the button */
    cName: string

    /** 
     * In which authentication state should the button be shown.
     * Can have 2 values: loggedIn or anonymous.
     */
    auth: string
}

//The title should be the key for the translation file
/**
 * Items that should be shown in the navigational bar.
 * Important! The title should containg a translation key.
 */
export const MenuItems: MenuItemStruct[] = [
    {
        title: 'navbar.search',
        url: '/search',
        cName: 'nav-links',
        auth: 'loggedIn anonymous'
    },
    {
        title: 'navbar.rankings',
        url: '/rankings',
        cName: 'nav-links',
        auth: 'loggedIn anonymous'
    },
    {
        title: 'navbar.forum',
        url: '/forum/newest',
        cName: 'nav-links',
        auth: 'loggedIn anonymous'
    },
    {
        title: 'navbar.profile',
        url: '/user/current',
        cName: 'nav-links',
        auth: 'loggedIn anonymous'
    },
    {
        title: 'navbar.signin',
        url: '/login',
        cName: 'nav-links-mobile',
        auth: 'anonymous'
    },
    {
        title: 'navbar.signout',
        url: '/logout',
        cName: 'nav-links-mobile',
        auth: 'loggedIn'
    }
]