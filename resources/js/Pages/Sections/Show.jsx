import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'

export default function Show({ subSections }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    Sub Sections
                </h2>
            }
        >
            <Head title="Sub Sections" />

            <div className="py-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
                
                <div className="bg-white shadow-sm rounded-lg p-6">

                    {subSections.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Title
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {subSections.map(section => (
                                    <tr key={section.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {section.id}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {section.title}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500 text-center">
                            No sub sections found
                        </p>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    )
}
