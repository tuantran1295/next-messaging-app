'use client'
import React, {useState, useEffect} from 'react';

function NotificationDropdown({}) {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleShowDropdown = () => {
        setShowDropdown((prevState) => {
            return !prevState;
        })
    }
    return (<>
        {/*Notifications*/}
        <button type="button" onClick={toggleShowDropdown} data-dropdown-toggle="notification-dropdown"
                className="p-2 mr-3 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
            <span className="sr-only">View notifications</span>
            {/*Bell icon */}
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                 viewBox="0 0 14 20">
                <path
                    d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z"/>
            </svg>
        </button>
        {/*Dropdown menu */}
        <div
            className={`${showDropdown ? '' : "hidden"} right-6 absolute top-9 overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700`}
            id="notification-dropdown">
            <div
                className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                Notifications
            </div>
            <div>
                <a href="#"
                   className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600">
                    <div className="flex-shrink-0">
                        <img className="w-11 h-11 rounded-full"
                             src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                             alt="Bonnie Green avatar"/>
                        <div
                            className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 dark:border-gray-700">
                            <svg className="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 18 18">
                                <path
                                    d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z"/>
                                <path
                                    d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="pl-3 w-full">
                        <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">New message
                            from <span className="font-semibold text-gray-900 dark:text-white">Bonnie Green</span>:
                            "Hey, what's up? All set for the presentation?"
                        </div>
                        <div className="text-xs font-medium text-primary-700 dark:text-primary-400">a few moments ago
                        </div>
                    </div>
                </a>
                <a href="#"
                   className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600">
                    <div className="flex-shrink-0">
                        <img className="w-11 h-11 rounded-full"
                             src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                             alt="Jese Leos avatar"/>
                        <div
                            className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white dark:border-gray-700">
                            <svg className="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 18">
                                <path
                                    d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="pl-3 w-full">
                        <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"><span
                            className="font-semibold text-gray-900 dark:text-white">Jese leos</span> and <span
                            className="font-medium text-gray-900 dark:text-white">5 others</span> started following you.
                        </div>
                        <div className="text-xs font-medium text-primary-700 dark:text-primary-400">10 minutes ago</div>
                    </div>
                </a>
                <a href="#"
                   className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600">
                    <div className="flex-shrink-0">
                        <img className="w-11 h-11 rounded-full"
                             src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
                             alt="Joseph McFall avatar"/>
                        <div
                            className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-red-600 rounded-full border border-white dark:border-gray-700">
                            <svg className="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 18">
                                <path
                                    d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="pl-3 w-full">
                        <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"><span
                            className="font-semibold text-gray-900 dark:text-white">Joseph Mcfall</span> and <span
                            className="font-medium text-gray-900 dark:text-white">141 others</span> love your story. See
                            it and view more stories.
                        </div>
                        <div className="text-xs font-medium text-primary-700 dark:text-primary-400">44 minutes ago</div>
                    </div>
                </a>
                <a href="#"
                   className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600">
                    <div className="flex-shrink-0">
                        <img className="w-11 h-11 rounded-full"
                             src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
                             alt="Roberta Casas image"/>
                        <div
                            className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-green-400 rounded-full border border-white dark:border-gray-700">
                            <svg className="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 18">
                                <path
                                    d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="pl-3 w-full">
                        <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"><span
                            className="font-semibold text-gray-900 dark:text-white">Leslie Livingston</span> mentioned
                            you in a comment: <span
                                className="font-medium text-primary-700 dark:text-primary-500">@bonnie.green</span> what
                            do you say?
                        </div>
                        <div className="text-xs font-medium text-primary-700 dark:text-primary-400">1 hour ago</div>
                    </div>
                </a>
                <a href="#" className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-600">
                    <div className="flex-shrink-0">
                        <img className="w-11 h-11 rounded-full"
                             src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/robert-brown.png"
                             alt="Robert image"/>
                        <div
                            className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-purple-500 rounded-full border border-white dark:border-gray-700">
                            <svg className="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 14">
                                <path
                                    d="M11 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm8.585 1.189a.994.994 0 0 0-.9-.138l-2.965.983a1 1 0 0 0-.685.949v8a1 1 0 0 0 .675.946l2.965 1.02a1.013 1.013 0 0 0 1.032-.242A1 1 0 0 0 20 12V2a1 1 0 0 0-.415-.811Z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="pl-3 w-full">
                        <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"><span
                            className="font-semibold text-gray-900 dark:text-white">Robert Brown</span> posted a new
                            video: Glassmorphism - learn how to implement the new design trend.
                        </div>
                        <div className="text-xs font-medium text-primary-700 dark:text-primary-400">3 hours ago</div>
                    </div>
                </a>
            </div>
            <a href="#"
               className="block py-2 text-base font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline">
                <div className="inline-flex items-center ">
                    <svg aria-hidden="true" className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                        <path fill-rule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clip-rule="evenodd"></path>
                    </svg>
                    View all
                </div>
            </a>
        </div>
    </>)
}

export default NotificationDropdown;