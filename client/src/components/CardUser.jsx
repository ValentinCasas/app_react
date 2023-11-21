
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'



export default function CardUser({ user }) {
    return (

        <li key={user.email} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                        <h3 className="truncate text-sm font-medium text-gray-900">{user.username}</h3>
                        <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                            {user.rol === 1 ? "Administrador" : user.rol === 2 ? "Empleado" : "Cliente"}

                        </span>
                    </div>
                    <p className="mt-1 truncate text-sm text-gray-500">{user.username}</p>
                </div>
                <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                    src={
                        user.imageUrl === "avatar_profile_default.png"
                            ? `/images/image_defect/avatar_profile_default.png`
                            : `/images/image_profile/${user.imageUrl}`
                    }
                    alt="" />
            </div>
            <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="flex w-0 flex-1">
                        <a
                            href={`mailto:${user.email}`}
                            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                        >
                            <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span className="ml-3">Email</span>
                        </a>
                    </div>
                    <div className="-ml-px flex w-0 flex-1">
                        <a
                            href={`tel:${user.email}`}
                            className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                        >
                            <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span className="ml-3">Call</span>
                        </a>
                    </div>
                </div>
            </div>
        </li>

    )
}
