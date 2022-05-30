import { useEffect, useState } from 'react'
import './styles/global.css'
import { FaPlus } from "react-icons/fa"

import MainLayout from './components/layout/MainLayout'
import CreateProjectModal from './components/ui/CreateProjectModal'
import { fetchJson } from './lib/api'
import { IProject } from './lib/types'
import ProjectCard from './components/ui/ProjectCard'

interface IProjectForm {
  isVisible: boolean
  project: IProject | null
}


function App() {
  const [isCreateProjectModelOpen, setIsCreateProjectModelOpen] = useState(false)
  const [projects, setProducts] = useState<IProject[] | []>([])
  const [projectForm, setProjectForm] = useState<IProjectForm>({ isVisible: false, project: null })
  
  function setProjectFormVisible(project: IProject | null) {
    setProjectForm({ isVisible: true, project })
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

        <button type="button" className="flex flex-row rounded-full border- shadow items-center w-48 space-y-6 space-x-6 my-6 px-6 py-3 font-semibold dark:text-white dark:bg-violet-700 hover:bg-violet-700 hover:text-white" onClick={() => setProjectFormVisible(null)}> <FaPlus /> Create Project</button>

        <div className="w-full flex flex-row flex-wrap gap-4">
          {projects?.map(project => {
            return <ProjectCard
              key={project.id}
              setProjectFormVisible={setProjectFormVisible}
              project={project}
              loadProjects={getProjects}
            />;
          })}
        </div>
      </div>
      {
        projectForm.isVisible && (
          <CreateProjectModal 
            project={projectForm.project}
            onCloseTaskModel={() => setProjectForm({ isVisible: false, project: null })}
            loadProjects={getProjects}
          />
        )
      }
    </MainLayout>
  )
}

export default App 
