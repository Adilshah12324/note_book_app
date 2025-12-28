import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        release_date: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('books.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold text-gray-800">Create Book</h2>}
        >
            <Head title="Create Book" />

            <div className="py-12 max-w-3xl mx-auto">
                <form onSubmit={submit} className="bg-white shadow rounded p-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        />
                        {errors.title && <p className="text-red-600 mt-1">{errors.title}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="release_date">
                            Release Date
                        </label>
                        <input
                            type="date"
                            id="release_date"
                            value={data.release_date}
                            onChange={(e) => setData('release_date', e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.release_date && (
                            <p className="text-red-600 mt-1">{errors.release_date}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        disabled={processing}
                    >
                        Create
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
