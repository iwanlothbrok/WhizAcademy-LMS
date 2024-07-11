import React from 'react'

export default function DetailsStudent() {
    return (
        <div className='w-screen p-4 flex justify-center items-center text-black'>
            <div >
                <div class="container mx-auto py-8">
                    <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                        <div class="col-span-4 sm:col-span-3">
                            <div class="bg-white shadow rounded-lg p-6">
                                <div class="flex flex-col items-center">
                                    <img src="https://randomuser.me/api/portraits/men/94.jpg" class="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0">

                                    </img>
                                    <h1 class="text-xl font-bold">John Doe</h1>
                                    <p class="text-gray-700">Software Developer</p>
                                    <div class="mt-6 flex flex-wrap gap-4 justify-center">
                                        <a href="#" class="bg-blue-500 hover:bg-blue-600 text-black py-2 px-4 rounded">Contact</a>
                                        <a href="#" class="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Resume</a>
                                    </div>
                                </div>
                                <hr class="my-6 border-t border-gray-300" />
                                <div class="flex flex-col">
                                    <span class="text-gray-700 uppercase font-bold tracking-wider mb-2">Skills</span>
                                    <ul>
                                        <li class="mb-2">JavaScript</li>
                                        <li class="mb-2">React</li>
                                        <li class="mb-2">Node.js</li>
                                        <li class="mb-2">HTML/CSS</li>
                                        <li class="mb-2">Tailwind Css</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-4 sm:col-span-9">
                            <div class="bg-white shadow rounded-lg p-6">
                                <h2 class="text-xl font-bold mb-4">About Me</h2>
                                <p class="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est
                                    vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
                                    suscipit. Nunc finibus vel ante id euismod. Vestibulum ante ipsum primis in faucibus orci luctus
                                    et ultrices posuere cubilia Curae; Aliquam erat volutpat. Nulla vulputate pharetra tellus, in
                                    luctus risus rhoncus id.
                                </p>



                                <h2 class="text-xl font-bold mt-6 mb-4">Experience</h2>
                                <div class="mb-6">
                                    <div class="flex justify-between flex-wrap gap-2 w-full">
                                        <span class="text-gray-700 font-bold">Web Developer</span>
                                        <p>
                                            <span class="text-gray-700 mr-2">at ABC Company</span>
                                            <span class="text-gray-700">2017 - 2019</span>
                                        </p>
                                    </div>
                                    <p class="mt-2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae
                                        tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
                                        suscipit.
                                    </p>
                                </div>
                                <div class="mb-6">
                                    <div class="flex justify-between flex-wrap gap-2 w-full">
                                        <span class="text-gray-700 font-bold">Web Developer</span>
                                        <p>
                                            <span class="text-gray-700 mr-2">at ABC Company</span>
                                            <span class="text-gray-700">2017 - 2019</span>
                                        </p>
                                    </div>
                                    <p class="mt-2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae
                                        tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
                                        suscipit.
                                    </p>
                                </div>
                                <div class="mb-6">
                                    <div class="flex justify-between flex-wrap gap-2 w-full">
                                        <span class="text-gray-700 font-bold">Web Developer</span>
                                        <p>
                                            <span class="text-gray-700 mr-2">at ABC Company</span>
                                            <span class="text-gray-700">2017 - 2019</span>
                                        </p>
                                    </div>
                                    <p class="mt-2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae
                                        tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
                                        suscipit.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
