import React, { useState } from 'react';

// import { Container } from './styles';
interface IProps {
    onCloseModel: () => void
}

const CreateProjectModal = ({ onCloseModel }: IProps) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    async function handleSaveProject (){
        const response = await jsonFetch({url: 'projects', data:{ title, description}, method:'POST'})
        if (response.status === 'SUCCESS') {
            onCloseModel()
        }
    }

    return (
        <div className="flex flex-col absolute justify-center items-center top-0 left-0  w-full h-full bg-black/40 ">
            <div className="flex flex-col absolute justify-center items-center max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 dark:bg-gray-900 dark:text-gray-100">
                <button className="absolute top-2 right-2" onClick={onCloseModel}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                        <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
                    </svg>
                </button>

                <form className="container w-80 h-auto flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
                    <fieldset className="grid grid-cols-4 rounded-md shadow-sm dark:bg-gray-900">

                        <div className="col-span-full">
                            <label for="username" className="text-sm">Title</label>
                            <input id="username" type="text" placeholder="Username" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" value={title} onClick={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="col-span-full">
                            <label for="bio" className="text-sm">Description</label>
                            <textarea id="bio" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" value={description} onClick={(e) =>  setDescription(e.target.value)} ></textarea>
                        </div>

                    </fieldset>
                </form>

                <button type="button" className="px-8 py-3 font-semibold rounded-full dark:bg-violet-400 dark:text-gray-900" onClick={handleSaveProject} >Save</button>
            </div>
        </div>
    );
}

export default CreateProjectModal;

function jsonFetch(arg0: { url: string; data: { title: string; description: string; }; method: string; }) {
    throw new Error('Function not implemented.');
}
