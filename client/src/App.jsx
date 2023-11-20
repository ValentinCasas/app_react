import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from './pages/ProfilePage';
import CreateUser from './pages/CreateUser';
import CreateProduct from './pages/CreateProduct';

import ProtectedRoute from "./ProtectedRoute";
import { TaskProvider } from "./context/TasksContext";
import { ProductProvider } from './context/productContext';
import NavBar from "./components/NavBar";



function App() {



  return (
    <AuthProvider>
      <TaskProvider>
        <ProductProvider>
          <BrowserRouter>


            <main >
              <NavBar />


              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />

                <Route element={<ProtectedRoute />}>

                  <Route path='/create-user' element={<CreateUser />} />
                  <Route path='/create-product' element={<CreateProduct />} />

                  <Route path='/tasks' element={<TaskPage />} />
                  <Route path='/add-tasks' element={<TaskFormPage />} />
                  <Route path='/tasks/:id' element={<TaskFormPage />} />
                  <Route path='/profile' element={<ProfilePage />} />
                </Route>
              </Routes>

            </main>

          </BrowserRouter>
        </ProductProvider>
      </TaskProvider>
    </AuthProvider>)
}

export default App