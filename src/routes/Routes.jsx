import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../components/Dashboard';
import Add from './../pages/Add';
import Recorded from './../pages/Recorded';
import Edit from '../pages/Edit';
import Nothing from './../pages/Recorded';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
    const route = new createBrowserRouter([
        {
            path: '/',
            element: <Login/>
        }, {
            path: 'dashboard',
            element: <PrivateRoute><Dashboard /></PrivateRoute>,
            children: [
                {
                    path: 'add-task',
                    element: <PrivateRoute><Add/></PrivateRoute>
                },
                {
                    path: 'recorded-task',
                    element: <PrivateRoute><Recorded/></PrivateRoute>
                },
                {
                    path: 'recorded-task/:id',
                    element: <Edit />,
                    loader: ({params}) => fetch(`${import.meta.env.VITE_URL}/tasks/single/${params.id}`) 
                },
            ]
        }
    ])
    return (
        <RouterProvider router={route}/>
            
    );
};

export default Routes;