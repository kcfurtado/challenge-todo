import React from 'react';
import { FiEdit, FiPlus, FiTrash, FiCheck } from 'react-icons/fi'
import { toast } from 'react-toastify';
import { fetchJson } from '../../lib/api';


import { ITask } from '../../lib/types';
import Badge from './Badge';

// import { Container } from './styles';
interface IProps {
    task: ITask
    setTaskFormVisible: (task: ITask | null) => void
    loadProjects: () => void
}
const TaskCard = ({ task, setTaskFormVisible, loadProjects }: IProps) => {

    async function handleMarkAsDone() {
        const response = await fetchJson({ url: `tasks/${task?.id}`, method: 'PUT', data: { status: 'DONE' } })

        if (response.status === 'SUCCESS') {
            toast.success('Task marked as done!', {
                position: toast.POSITION.TOP_CENTER
            });
            loadProjects()
        } else {
            toast.error('Error marking Task done!', {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    async function handleDeleteTask() {
        const response = await fetchJson({ url: `tasks/${task?.id}`, method: 'DELETE' })

        if (response.status === 'SUCCESS') {
            toast.success('Task deleted successfully!', {
                position: toast.POSITION.TOP_CENTER
            });
            loadProjects()
        } else {
            toast.error('Error deleting Task!', {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    return (
        <li className="flex flex-col py-2 sm:flex-row sm:justify-between">
            <div className="flex w-full space-x-2 sm:space-x-4">

                <div className="flex flex-col justify-between w-full pb-4">
                    <div className="flex justify-between w-full pb-2 space-x-2">
                        <div className="space-y-1">
                            <h3 className="text-sm font-semibold leading-snug sm:pr-8">{task?.title}</h3>
                            <p className="text-sm dark:text-gray-400">{task?.description}</p>
                        </div>
                        <div className="text-right">
                            <Badge status={task.status} />
                            <p className="text-sm line-through dark:text-gray-600">{task && task?.dateEnd?.toLocaleString()}</p>
                        </div>
                    </div>
                    {
                        task.status !== 'DONE' && (

                            <div className="flex justify-between text-sm ">
                                <button type="button" className="flex items-center px-2 py-1 space-x-1" onClick={handleMarkAsDone}>
                                    <FiCheck className="w-4 h-4" />
                                    <span>Done</span>
                                </button>
                                <button type="button" className="flex items-center px-2 py-1 space-x-1" onClick={() => setTaskFormVisible(task)}>
                                    <FiEdit className="w-4 h-4" />
                                    <span>Edit</span>
                                </button>

                                <button type="button" className="flex items-center px-2 py-1 pl-1 space-x-1" onClick={handleDeleteTask}>
                                    <FiTrash className="w-4 h-4" />
                                    <span>Delete</span>
                                </button>
                            </div>
                        )
                    }

                    {
                        task.status === 'DONE' && (

                            <div className="flex justify-end text-sm ">
                                <span className="text-sm font-semibold leading-snug sm:pr-2">Finished At: </span> <span className="text-sm">{new Date(task.updatedAt).toLocaleString()}</span>
                            </div>
                        )
                    }
                </div>
            </div>
        </li>
    );
}

export default TaskCard;