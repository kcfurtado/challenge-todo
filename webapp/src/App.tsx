import { useState } from 'react'
import './styles/global.css'
import MainLayout from './components/layout/MainLayout'
import CreateProjectModal from './components/ui/CreateProjectModal'
function App() {
  const [isCreateProjectModelOpen, setIsCreateProjectModelOpen] = useState(false)

  const toggleProjectModel = () => {
    setIsCreateProjectModelOpen(!isCreateProjectModelOpen)
  }
  return (
    <MainLayout>
      <div className="flex flex-row lg:px-52 overflow-hidden">

        <button type="button" className="px-8 py-3 font-semibold rounded-full dark:bg-gray-100 dark:text-gray-800" onClick={toggleProjectModel}>Create Project</button>


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
