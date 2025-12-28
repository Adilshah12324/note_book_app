import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router, usePage } from '@inertiajs/react';

export default function Index({ book, bookId }) {
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Sections
                    </h2>
                    {user?.role == 1 && (
                    <button
                        onClick={() => router.visit(route('sections.create', bookId))}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Create Section
                    </button>
                    )}
                </div>
            }
        >
            <Head title="Sections" />

            <div className="py-10 max-w-7xl mx-auto">
                {book.length > 0 ? (
                    book.map(section => (
                        <div
                            key={section.id}
                            className="bg-white p-5 mb-4 rounded shadow"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">
                                    {section.title}
                                </h3>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => router.visit(route('sections.show', section.id ))}
                                        className="px-3 py-1 bg-blue-600 text-white rounded"
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={() => router.visit(route('sections.edit', section.id))}
                                        className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No sections found</p>
                )}
            </div>
        </AuthenticatedLayout>
    )
}
