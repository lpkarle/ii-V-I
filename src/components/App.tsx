import Navigation from './Layout/Navigation';
import Footer from './Layout/Footer';
import FretboardPractice from './Pages/FretboardPractice';
import { useRouting } from '../hooks/useRouting';
import Error from './Pages/Error';
import Fretboard from './Pages/Fretboard';

function App() {
  const { page } = useRouting();

  const currentPage = () => {
    switch (page) {
      case 'ii-V-I/fretboard':
        return <Fretboard />;
      case 'ii-V-I/fretboard-practice':
        return <FretboardPractice />;
      default:
        return <Error />;
    }
  };

  return (
    <>
      <Navigation />
      {currentPage()}
      <Footer />
    </>
  );
}

export default App;
