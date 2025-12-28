import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { router, usePage } from '@inertiajs/react';

export default function Dashboard({ books }) {
    const { auth } = usePage().props;
    const user = auth.user;
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Books
                    </h2>
                    {user?.role == 1 && (
                        <button
                            onClick={() => router.visit(route('books.create'))}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Create Book
                        </button>
                    )}
                </div>
            }
        >
            <Head title="Books" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">

                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Release Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {books && books.length > 0 ? (
                                    books.map((book) => (
                                        <tr key={book.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {book.title}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {book.release_date ?? '—'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => router.visit(route('books.show', book.id))}
                                                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                                            No books found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
