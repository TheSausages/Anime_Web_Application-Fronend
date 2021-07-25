interface MenuItemStruct {
    title: string
    url: string
    cName: string
    auth: string
}

export const MenuItems: MenuItemStruct[] = [
    {
        title: 'Search',
        url: '/search',
        cName: 'nav-links',
        auth: 'loggedIn anonymous'
    },
    {
        title: 'Rankings',
        url: '/rankings',
        cName: 'nav-links',
        auth: 'loggedIn anonymous'
    },
    {
        title: 'Forum',
        url: '/forum',
        cName: 'nav-links',
        auth: 'loggedIn anonymous'
    },
    {
        title: 'Industry',
        url: '#',
        cName: 'nav-links',
        auth: 'loggedIn anonymous'
    },
    {
        title: 'Sign in',
        url: '/login',
        cName: 'nav-links-mobile',
        auth: 'anonymous'
    },
    {
        title: 'Sign out',
        url: '/logout',
        cName: 'nav-links-mobile',
        auth: 'loggedIn'
    }
]