const express = require("express")
const { NotesModel } = require("../models/notesModel")
const { auth } = require("../middlewares/auth.middleware")

const notesRoutes = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      Note: 
 *          type: object
 *          properties: 
 *              id:
 *                  type: string
 *                  description: It will have the auto generated ID.
 *              title:
 *                  type: string
 *                  description: The title of note.
 *              body :
 *                  type: string
 *                  description: The desription of note.
 *              userID :
 *                  type: string
 *                  description: The userID of user.  
 *              user :
 *                  type: string
 *                  description: The name of user. 
 */

/**
 * @swagger
 * tags:
 *  name: Notes
 *  descripation: All the API related to notes
 */


/**
* @swagger
* /notes/create :
*  post :
*       summary: To post the details of a new note
*       tags: [Note]
*       requestBody:
*           required: true
*           content:
*              application/json:
*                  schema:
*                      $ref: '#/components/schemas/Note'
*       responses:
*           200:
*               description: New note added successfully 
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Note'
*           500:
*               description: Some server error
*/


notesRoutes.post("/create", auth, async (req, res) => {
    try {
        const note = new NotesModel(req.body)
        await note.save()
        res.send({ "msg": "A new note has been added" })
    } catch (err) {
        res.send({ "error": err })
    }
})

/**
* @swagger
* /notes/ :
*  get :
*       summary: To get all notes created by a user
*       tags: [Note]
*       responses:
*           200:
*               description: All notes received successfully
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/User'
*           500:
*               description: Some server error
*/


notesRoutes.get("/", auth, async (req, res) => {
    try {
        const notes = await NotesModel.find({ userID: req.body.userID })
        res.send(notes)
    } catch (err) {
        res.send({ "error": err })
    }
})

/**
* @swagger
* /users/register/:id :
*  patch :
*       summary: To update the details of a note
*       tags: [Note]
*       requestBody:
*           required: true
*           content:
*              application/json:
*                  schema:
*                      $ref: '#/components/schemas/Note'
*       responses:
*           200:
*               description: The note was updated successfully
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/User'
*           500:
*               description: Some server error
*/


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

/**
* @swagger
* /users/register/:id :
*  delete :
*       summary: To delete a note with given id
*       tags: [Note]
*       responses:
*           200:
*               description: The note was successfully deleted
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Note'
*           500:
*               description: Some server error
*/



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