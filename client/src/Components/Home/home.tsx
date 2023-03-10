import MovieSearchForm from '../Form/MovieSearchForm';

const ComponentHome: React.FC = () => {
    return (
        <div className='home'>
            <div className='home__bg'></div>
            <MovieSearchForm />
            <div className='home__box'>
                <h3 className='home__heading3'>
                    Welcome to <b>PNGC_IMDB.com</b>
                </h3>
                <p className='home__content'>
                    The Best IMDB Search Site ! Here you can browse a list of
                    IDMB movies, get their details , download their posters and
                    more ! Now start your search !
                </p>
            </div>
        </div>
    );
};

export default ComponentHome;
