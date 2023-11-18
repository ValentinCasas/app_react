import { useAuth } from "../context/authContext"

function ProfilePage() {

    const { user } = useAuth();

    return (

        <div className="bg-white md:mx-auto rounded shadow-xl w-full  overflow-hidden">
            <div className="h-[140px] bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <div className="px-5 py-2 flex flex-col gap-3 pb-6">
                <div className="h-[90px] shadow-md w-[90px] rounded-full border-4 overflow-hidden -mt-14 border-white">
                    <img src={`/images/image_profile/${user.imageUrl}`} className="w-full h-full rounded-full object-center object-cover" />
                </div>
                <div >
                    <h3 className="text-xl text-slate-900 relative font-bold leading-6"> {user.username}</h3>
                    <p className="text-sm text-gray-600">@daddasoft</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                    <span className="rounded-sm bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">Developer</span>
                    <span className="rounded-sm bg-green-100 px-3 py-1 text-xs font-medium text-green-800">Design</span>
                    <span className="rounded-sm bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Managements</span>
                    <span className="rounded-sm bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800">Projects</span>
                </div>
                <div className="flex gap-2">
                    <button type="button" className="inline-flex w-auto cursor-pointer select-none
                                                 appearance-none items-center justify-center space-x-1
                                                 rounded border border-gray-200 bg-white px-3 py-2
                                                 text-sm font-medium text-gray-800 transition hover:border-gray-300
                                               active:bg-white hover:bg-gray-100 focus:border-gray-300
                                                 focus:outline-none focus:ring-2 focus:ring-gray-300">Send Message</button>

                    <button type="button" className="inline-flex w-auto cursor-pointer select-none appearance-none items-center
                                                 justify-center space-x-1 rounded border border-gray-200 bg-blue-700 px-3 
                                                 py-2 text-sm font-medium text-white transition hover:border-blue-300
                                               hover:bg-blue-600 active:bg-blue-700 focus:blue-gray-300 focus:outline-none
                                                 focus:ring-2 focus:ring-blue-300">Add to projects</button>
                </div>
                <h4 className="text-md font-medium leading-3">About</h4>

                <p className="text-sm text-stone-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Facere dolores aliquid sequi sunt iusto ipsum earum natus
                    omnis asperiores architecto praesentium dignissimos pariatur,
                    ipsa cum? Voluptate vero eius at voluptas?</p>

                <h4 className="text-md font-medium leading-3">Experiences</h4>
                <div className="flex flex-col gap-3">

                </div>
            </div>
        </div>


    )
}

export default ProfilePage;