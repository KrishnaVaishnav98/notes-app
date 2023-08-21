const express = require("express")
const { NotesModel } = require("../models/notesModel")
const { auth } = require("../middlewares/auth.middleware")

const notesRoutes = express.Router()

notesRoutes.post("/create", auth, async (req, res) => {
    try {
        const note = new NotesModel(req.body)
        await note.save()
        res.send({ "msg": "A new note has been added" })
    } catch (err) {
        res.send({ "error": err })
    }
})

notesRoutes.get("/", auth, async (req, res) => {
    try {
        const notes = await NotesModel.find({ userID: req.body.userID })
        res.send(notes)
    } catch (err) {
        res.send({ "error": err })
    }
})

notesRoutes.patch("/update/:noteID", auth, async (req, res) => {

    const { noteID } = req.params;
    const { userID } = req.body;
    const note = await NotesModel.findOne({ _id: noteID })

    try {
        if (userID !== note.userID) {
            res.send({ "msg": `You are not authorized` })
        } else {
            await NotesModel.findByIdAndUpdate({ _id: noteID }, req.body)
            res.send({ "msg": `Note with ID: ${noteID} has been updated` })
        }
    } catch (err) {
        res.send({ "error": err })
    }
})

notesRoutes.delete("/delete/:noteID", auth, async (req, res) => {
    const { noteID } = req.params;
    const { userID } = req.body;
    const note = await NotesModel.findOne({ _id: noteID })
    try {
        if (userID !== note.userID) {
            res.send({ "msg": `You are not authorized` })
        } else {
            await NotesModel.findByIdAndDelete({ _id: noteID })
            res.send({ "msg": `Note with ID: ${noteID} has been deleted` })
        }
    } catch (err) {
        res.send({ "error": err })
    }
})

module.exports = {
    notesRoutes
}