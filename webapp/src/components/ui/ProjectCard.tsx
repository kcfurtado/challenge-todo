import { useState } from 'react';
import { FiEdit, FiPlus, FiTrash } from 'react-icons/fi'
import { toast } from 'react-toastify';
import { fetchJson } from '../../lib/api';

import { IProject, ITask } from '../../lib/types';
import CreateTaskModal from './CreateTaskModal';
import TaskCard from './TaskCard';

// import { Container } from './styles';
interface IProps {
    project: IProject
    loadProjects: () => void
    setProjectFormVisible: (project: IProject | null) => void
}

interface ITaskForm {
    isVisible: boolean
    task: ITask | null
}

const ProjectCard = ({ project, loadProjects, setProjectFormVisible }: IProps) => {
    const [taskForm, setTaskForm] = useState<ITaskForm>({ isVisible: false, task: null })

    function setTaskFormVisible(task: ITask | null) {
        setTaskForm({ isVisible: true, task })
    }

    async function handleDeleteProject() {
        const response = await fetchJson({ url: `projects/${project?.id}`, method: 'DELETE' })

        if (response.status === 'SUCCESS') {
            toast.success('Project deleted successfully!', {
                position: toast.POSITION.TOP_CENTER
            });
            loadProjects()
        } else {
            toast.error('Error deleting Project!', {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    return (
        <div className="w-full border-2 dark:border-0 ms:w-1/4 md:w-96 lg:w-96 rounded-md shadow-lg px-2 my-2 dark:bg-gray-900 dark:text-gray-100">
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-2">
                    <div className="-space-y-1">
                        <h2 className="text-lg font-semibold leading-none">{project?.title}</h2>
                    </div>
                </div>
                <div className="flex items-center space-x-1">
                    <button type="button" className="flex items-center px-2 py-1 space-x-1 text-xs" onClick={() => setProjectFormVisible(project)}>
                        <FiEdit className="w-4 h-4" />
                    </button>

                    <button type="button" className="flex rounded-sm  items-center px-1 py-1 space-x-1 text-xs" onClick={handleDeleteProject}>
                        <FiTrash className="w-4 h-4" />
                    </button>

                    <button type="button" className="flex items-center px-2 py-1 space-x-1 text-xs" onClick={() => setTaskFormVisible(null)}>
                        <FiPlus className="w-4 h-4" />
                        <span>New Task</span>
                    </button>
                </div>
            </div>
            <div className="flex items-center justify-between px-3 pb-7">
                <span className="w-full break-words inline-block text-xs leading-none dark:text-gray-400">{project?.description}</span>
            </div>

            <div className="w-full h-96 overflow-y-auto">
                <ul className="flex flex-col divide-y divide-gray-700 px-2 py-4">
                    {
                        project?.tasks.map(task => <TaskCard
                            key={task.id}
                            task={task}
                            setTaskFormVisible={setTaskFormVisible}
                            loadProjects={loadProjects}
                        />)
                    }
                </ul>
            </div>
            {
                taskForm.isVisible && (
                    <CreateTaskModal
                        projectId={project?.id}
                        task={taskForm.task}
                        onCloseTaskModel={() => setTaskForm({ isVisible: false, task: null })}
                        loadProjects={loadProjects}
                    />
                )
            }
        </div>
    );
}

export default ProjectCard;