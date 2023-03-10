import React from 'react';
import ComponentTeamPage from './team_page';

const ComponentTeam: React.FC = () => (
    <>
        <div className='componentBody'>
            <h2 className='text__center'> Our Team </h2>

            <p className='text__center'>
                We are honest and dedicated Full-Stack Developers who love to
                code and contribute to the World.
            </p>

            <h3 className='text__center'> Meet The Team </h3>

            <ComponentTeamPage />
        </div>
    </>
);

export default ComponentTeam;
