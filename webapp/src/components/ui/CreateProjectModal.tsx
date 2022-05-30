import { useEffect, useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { toast } from 'react-toastify';

// import { Container } from './styles';
import { fetchJson } from '../../lib/api';
import { IProject } from '../../lib/types';
interface IProps {
    onCloseTaskModel: () => void
    loadProjects:() => void
    project: IProject|null;
}

const CreateProjectModal = ({ onCloseTaskModel, loadProjects , project }: IProps) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
     
    async function handleSaveProject (){
        let response;

        if (description === '' || title === '') {
            toast.warning('Please, fill all fields correctly!', {
                position: toast.POSITION.TOP_CENTER
            });
            return
        }

        console.log('project|||', project)
        if (project) {
            response = await fetchJson({ url: `projects/${project.id}`, data: { title, description }, method: 'PUT' })
        } else {
            response = await fetchJson({ url: `projects`, data: { title, description }, method: 'POST' })
        }

    
        if (response.status === 'SUCCESS') {
            toast.success(`Project ${ project ? 'updated': 'created'} successfully!`, {
                position: toast.POSITION.TOP_CENTER
            });
            loadProjects()
            onCloseTaskModel()
        } else {
            toast.error(`Error ${ project ? 'updating': 'creating'}  Project. Try again later!`, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    useEffect(() => {
        if (project) {
            setTitle(project.title)
            setDescription(project.description)
        } else {
            setTitle('')
            setDescription('')
        }
    }, [project])

    return (
        <div className="flex flex-col absolute justify-center items-center top-0 left-0  w-full h-full bg-black/40 ">
            
            <div className="flex flex-col absolute justify-center items-center max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 dark:bg-gray-900 bg-white dark:text-gray-100">
            
                <button className="absolute top-2 right-2" onClick={onCloseTaskModel}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                        <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
                    </svg>
                </button>
                <h2 className='text-violet-700 dark:text-white my-3 text-lg'>{project ? 'Update Project' : 'New Project'}</h2>
                <form className="container w-80 flex flex-col mx-auto space-y-3 ng-untouched ng-pristine ng-valid">
                    <fieldset className="grid grid-cols-2 rounded-md shadow-sm dark:bg-gray-900">

                        <div className="col-span-full">
                            <label htmlFor="title" className="text-sm">Title</label>
                            <input id="title" type="text" placeholder="Title 1" className="w-full h-10 p-4 border-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="col-span-full my-4">
                            <label htmlFor="description" className="text-sm">Description</label>
                            <textarea id="description" placeholder="Write description ..." className="w-full h-28 p-4 border-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                        </div>

                    </fieldset>
                </form>

                <button type="button" className="flex flex-row shadow items-center space-x-2 px-8 py-3 font-semibold rounded-full hover:bg-violet-700 hover:text-gray-300 dark:bg-violet-700  transition ease-linear" onClick={handleSaveProject} ><FiSave /> Save</button>
            </div>
        </div>
    );
}

export default CreateProjectModal;
