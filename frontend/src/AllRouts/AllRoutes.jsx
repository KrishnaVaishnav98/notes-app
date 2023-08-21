import React from 'react'
import { Route, Routes, } from 'react-router-dom'
import { Login } from '../Components/Login'
import { Signup } from '../Components/Signup'
import { AddNote } from '../Components/AddNote'
import { UpdateNote } from '../Components/UpdateNote'
import { DeleteNote } from '../Components/DeleteNote'
import { Home } from '../Components/Home'

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notes" element={<AddNote />} />
            <Route path="/update/:id" element={<UpdateNote />} />
            <Route path="/delete/:id" element={<DeleteNote />} />
        </Routes>
    )
}
