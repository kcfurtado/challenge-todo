import React, { useEffect, useState } from 'react';
import { fetchJson } from '../../lib/api';
import { IProject } from '../../lib/types';
import ProjectCard from './ProjectCard';

interface IProps {
    projects: IProject[]
    loadProjects: () => void;
}

const ProjectContainer = ({ projects, loadProjects }: IProps) => {

    return (
        <div className="grid grid-cols-3 gap-4">
            {projects?.map(project => {
                return <ProjectCard
                    project={project}
                    loadProjects={loadProjects}
                />;
            })}
        </div>
    );
}

export default ProjectContainer;