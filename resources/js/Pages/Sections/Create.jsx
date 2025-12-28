import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ bookId }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        subsections: [{ title: '' }],
        book_id: bookId,
    });

    const addSubsection = () => {
        setData('subsections', [...data.subsections, { title: '' }]);
    };

    const removeSubsection = (index) => {
        const subs = [...data.subsections];
        subs.splice(index, 1);
        setData('subsections', subs);
    };

    const updateSubsection = (index, value) => {
        const subs = [...data.subsections];
        subs[index].title = value;
        setData('subsections', subs);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('sections.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold text-gray-800">Create Section</h2>}
        >
            <Head title="Create Section" />

            <div className="py-12 max-w-3xl mx-auto">
                <form onSubmit={submit} className="bg-white shadow rounded p-6 space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Section Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        />
                        {errors.title && <p className="text-red-600 mt-1">{errors.title}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Subsections</label>
                        {data.subsections.map((sub, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                                <input
                                    type="text"
                                    value={sub.title}
                                    onChange={(e) => updateSubsection(index, e.target.value)}
                                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                                    placeholder={`Subsection ${index + 1}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeSubsection(index)}
                                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    -
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addSubsection}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            + Add Subsection
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Create Section
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
