import { useEffect, useState } from 'react'
import './styles/global.css'
import { FaPlus } from "react-icons/fa"

import MainLayout from './components/layout/MainLayout'
import CreateProjectModal from './components/ui/CreateProjectModal'
import { fetchJson } from './lib/api'
import { IProject } from './lib/types'
import ProjectCard from './components/ui/ProjectCard'

function App() {
  const [isCreateProjectModelOpen, setIsCreateProjectModelOpen] = useState(false)
  const [projects, setProducts] = useState<IProject[] | []>([])
  const toggleProjectModel = () => {
    setIsCreateProjectModelOpen(!isCreateProjectModelOpen)
  }

  async function getProjects() {
    const response = await fetchJson({ url: 'projects', method: 'GET' })
    setProducts(response.data as IProject[])
  }

  useEffect(() => {
    getProjects()
  }, [])


  return (
    <MainLayout>
      <div className="flex flex-col overflow-hidden">

        <button type="button" className="flex flex-row shadow items-center w-48 space-y-6 my-6 px-6 py-3 font-semibold rounded dark:text-white dark:bg-violet-700 dark:text-gray-800" onClick={toggleProjectModel}> <FaPlus /> Create Project</button>

        <div className="w-full flex flex-row flex-wrap gap-4">
          {projects?.map(project => {
            return <ProjectCard
              project={project}
              loadProjects={getProjects}
            />;
          })}
        </div>
      </div>
      {
        isCreateProjectModelOpen && (
          <CreateProjectModal onCloseModel={toggleProjectModel} />
        )
      }
    </MainLayout>
  )
}

export default App 
