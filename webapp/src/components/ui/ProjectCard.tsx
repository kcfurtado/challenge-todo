import React, { useState } from 'react';

import { IProject, ITask } from '../../lib/types';
import CreateTaskModal from './CreateTaskModal';
import TaskCard from './TaskCard';

// import { Container } from './styles';
interface IProps {
    project: IProject
    loadProjects: () => void
}

interface ITaskForm {
    isVisible: boolean
    task: ITask | null
}

const ProjectCard = ({ project, loadProjects }: IProps) => {
    const [taskForm, setTaskForm] = useState<ITaskForm>({ isVisible: false, task: null })

    function setTaskFormVisible(task: ITask | null) {
        setTaskForm({ isVisible: true, task })
    }

    return (
        <div className="rounded-md shadow-lg px-2 my-4 sm:w-96 dark:bg-gray-900 dark:text-gray-100">
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-2">
                    <div className="-space-y-1">
                        <h2 className="text-xl font-semibold leading-none">{project?.title}</h2>
                        <span className="inline-block text-xs leading-none dark:text-gray-400">{project?.description}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button type="button" className="flex items-center px-2 py-1 space-x-1 text-xs" onClick={() => setTaskFormVisible(null)}>
                        <svg xmlns="http://www.w3.org/2000setTaskFormVisible/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                            <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                        </svg>
                        <span>Edit</span>
                    </button>

                    <button type="button" className="flex items-center px-2 py-1 space-x-1 text-xs" onClick={() => setTaskFormVisible(null)}>
                        <svg xmlns="http://www.w3.org/2000setTaskFormVisible/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                            <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                        </svg>
                        <span>New Task</span>
                    </button>
                </div>
            </div>

            <div className="w-full h-80 overflow-y-auto">
                <ul className="flex flex-col divide-y divide-gray-700 px-2 ">
                    {
                        project?.tasks.map(task => <TaskCard
                            key={task.id}
                            task={task}
                            setTaskFormVisible={setTaskFormVisible}
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