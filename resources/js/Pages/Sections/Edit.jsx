import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'

export default function Edit({ section, subSections }) {
    const { data, setData, put, processing, errors } = useForm({
        title: section.title,
        subsections: subSections.map(s => ({ id: s.id, title: s.title })),
    });

    const updateSubsection = (index, value) => {
        const updated = [...data.subsections];
        updated[index].title = value;
        setData('subsections', updated);
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('sections.update', section.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold text-gray-800">Edit Section</h2>}
        >
            <Head title="Edit Section" />

            <form onSubmit={submit} className="max-w-3xl mx-auto py-10 space-y-4 bg-white shadow rounded p-6">
                <div>
                    <label className="block font-medium text-gray-700">Section Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={e => setData('title', e.target.value)}
                        className="mt-1 block w-full border rounded p-2"
                    />
                    {errors.title && <p className="text-red-600">{errors.title}</p>}
                </div>
                <div>
                    <label className="block font-medium text-gray-700 mb-2">Subsections</label>
                    {data.subsections.map((sub, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                            <input
                                type="text"
                                value={sub.title}
                                onChange={e => updateSubsection(index, e.target.value)}
                                className="border rounded p-2 flex-1"
                                placeholder={`Subsection ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Update Section
                </button>
            </form>
        </AuthenticatedLayout>
    )
}
