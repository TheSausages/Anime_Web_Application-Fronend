interface MenuItemStruct {
    title: string
    url: string
    cName: string
    auth: string
}

//The title should be the key for the translation file
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