'use client'

import { useForm } from "react-hook-form";

const helpInputs = [
    {
        title: 'Email',
        name: 'email',
        type: 'text',
        options: null,
    },
    {
        title: 'Subject',
        name: 'subject',
        type: 'text',
        options: null,
    },
    {
        title: 'Category',
        name: 'category',
        type: 'select',
        options: [
            {
                title:'Health',
                value: 'health',
            },
            {
                title:'Food',
                value: 'food',
            },
            {
                title:'Education',
                value: 'education',
            },
            {
                title:'Clothing',
                value: 'clothing',
            },
        ]
    },
    // {
    //     title: 'Image',
    //     name: 'image',
    //     type: 'file',
    //     options: null,
    // },
    {
        title: 'Description',
        name: 'description',
        type: 'textarea',
        options: null,
    },
]

const HelpForm = () => {
    const {
        register,
        handleSubmit,
        getValues,
    } = useForm();

    const handleSubmitForm = (payload) => {
        console.log(payload);
    }
    return (
        <>
            <div className="flex flex-col gap-5 w-full max-w-[600px] p-5 md:p-12 rounded-xl md:rounded-5xl bg-white shadow-xl">
                <h4 className="text-3xl font-bold text-center mb-5">Help Form</h4>
                {helpInputs.map(item => {
                return(
                    <div key={item.name} className="">
                        <h4 className="mb-2">{item.title}</h4>
                        {item.type === "text" && <input {...register(item.name, {required: `${item.title} is required.`})} type={item.type} placeholder={item.title} className="input input-bordered w-full rounded-xl" />}
                        {item.type === "select" && <select {...register(item.name, {required: `${item.title} is required.`})} className="select select-bordered w-full rounded-xl">
                            {item.options !== null && item.options.map(category => <option key={category.value} value={category.value} className="py-3 h-11">{category.title}</option>)}
                        </select>}
                        {item.type === "textarea" && <textarea  {...register(item.name, {required: `${item.title} is required.`})} className="textarea textarea-bordered w-full rounded-xl min-h-32 resize-y" placeholder={item.title} />}
                    </div>
                )})}
                <button onClick={handleSubmit(handleSubmitForm)} className="btn bg-pink-400 text-white hover:bg-green-400 rounded-xl">Submit</button>
            </div>
        </>
    );
};

export default HelpForm;