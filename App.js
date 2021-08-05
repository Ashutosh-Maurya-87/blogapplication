
import './App.css';
import { useSelector } from "react-redux";
import Homepage from './component/Homepage';
import Navbar from './component/Navbar';
import Blogs from './component/Blogs';
import { selectSignedIn } from './UserSlice';



function App() {
  const isSignedIn = useSelector(selectSignedIn);
  return (
    <>
      <Navbar />
      <Homepage />
      {
        isSignedIn && <Blogs />
      }
    </>
  );
}

export default App;
