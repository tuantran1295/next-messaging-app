import PropTypes from "prop-types";
import styles from "@/styles/Home.module.css";
import React, {useEffect, useState} from "react";
import {MoonIcon, SunIcon} from "@/components/index";
import logout from "@/firebase/auth/signout";
import {useTheme} from "next-themes";
import NotificationDropdown from "@/components/Notification/NotificationDropdown";

function NavBar({user = null}) {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);
    const [showProfileMenu, setShowMenu] = useState(false);

    // When mounted on client, now we can show the UI
    useEffect(() => setMounted(true), []);

    const switchTheme = () => {
        if (mounted) {
            setTheme(theme === 'light' ? 'dark' : 'light');
        }
    };

    const toggleShowUserMenu = () => {
        setShowMenu((prevState) => {
            return !prevState;
        })
    }

    const brandLogo =
        mounted && theme === 'dark'
            ? '/assets/logo-dark.png'
            : '/assets/logo-bright.png';

    const ThemeIcon = mounted && theme === 'dark' ? SunIcon : MoonIcon;

    const signOut = async () => {
        const {error} = logout();
        if (error) {
            console.error(error);
        }
    };

    return (
        <header
            className={`flex-shrink-0 flex items-center justify-between px-4 sm:px-8 shadow-md ${styles.header_space}`}
        >
            <a href=''>
                <img src={brandLogo} alt='Dreamer_logo' width={150}/>
            </a>

            <div className='flex items-center'>
                {user ? (
                    <>
                        <NotificationDropdown/>
                        <div className="flex items-center">
                            <button type="button"
                                    className="flex mr-3 text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                    id="user-menu-button"
                                    onClick={toggleShowUserMenu}
                            >
                                <span className="sr-only">Open user menu</span>
                                <img className="w-8 h-8 rounded-full"
                                     src={`${user.photoURL ? user.photoURL : "/assets/avatar-placeholder.jpg"}`}
                                     alt="user photo"/>
                            </button>
                            {/* Dropdown menu */}
                            <div
                                className={`${showProfileMenu ? '' : "hidden"} right-6 absolute top-9 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                                id="user-dropdown">
                                <div className="px-4 py-3">
                                    <span
                                        className="block text-sm text-gray-900 dark:text-white">{user.displayName}</span>
                                    <span
                                        className="block text-sm  text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                                </div>
                                <ul className="py-2" aria-labelledby="user-menu-button">
                                    <li onClick={signOut}>
                                        <div
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign
                                            out
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </>) : null}
                <ThemeIcon className='h-8 w-8 cursor-pointer' onClick={switchTheme}/>
                {/*{user ? (*/}
                {/*    <button*/}
                {/*        onClick={signOut}*/}
                {/*        className='uppercase text-sm font-medium text-KaiBrand-500 hover:text-white tracking-wide hover:bg-KaiBrand-500 bg-transparent rounded py-2 px-4 mr-4 focus:outline-none focus:ring focus:ring-KaiBrand-500 focus:ring-opacity-75 transition-all'*/}
                {/*    >*/}
                {/*        Sign out*/}
                {/*    </button>*/}
                {/*) : null}*/}
            </div>
        </header>
    )
}

NavBar.propTypes = {
    user: PropTypes.shape({
        uid: PropTypes.string,
        displayName: PropTypes.string,
        photoURL: PropTypes.string,
    }),
};

export default NavBar;