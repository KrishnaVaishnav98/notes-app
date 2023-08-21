import React, { useEffect, useState } from 'react'
import { Center, FormControl, FormLabel, Box, Button, Text, Select, VStack } from '@chakra-ui/react'
import { styled } from 'styled-components'

let initialState = {
    title: "",
    body: "",
}

export const AddNote = () => {

    const [notes, setNotes] = useState(initialState)
    const [allNotes, setAllNotes] = useState([])

    useEffect(() => {
        getAllNotes()
    }, [])

    const getAllNotes = () => {
        fetch(`http://localhost:8080/notes/`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => res.json())
            .then((res) => {
                setAllNotes(res)
            })
            .catch((err) => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (notes.title && notes.body) {
            console.log(notes)
            fetch(`http://localhost:8080/notes/create`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(notes)
            }).then((res) => res.json())
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => console.log(err))

        } else {
            alert("Please fill all details")
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setNotes({ ...notes, [name]: value })
    }

    return (
        <VStack>
            <Center>
                <DIV >
                    <form required >
                        <Text color={"red.600"} fontWeight={"bold"}>ADD NOTE</Text>
                        <FormControl isRequired>
                            <FormLabel color={"blue.600"}>Title</FormLabel>
                            <input type="text" placeholder='Title'
                                name="title" value={notes.title}
                                onChange={handleChange} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel color={"blue.600"}>Description</FormLabel>
                            <input type="text" placeholder='Description' name="body" value={notes.body}
                                onChange={handleChange} />
                        </FormControl>
                        <Button mt={"10px"} variant={"outline"} colorScheme='green' onClick={handleSubmit}>ADD NOTE</Button>
                    </form>
                </DIV>
            </Center >

            <Box>
                <h1 style={{ color: "#B71C1C", fontWeight: "bold" }}>NOTES</h1>
                {
                    allNotes?.map((el, index) => (
                        <div key={index} style={{ border: "1px dashed gray", padding: "20px", margin: "10px", borderRadius: "10px" }}>
                            <h3>TITLE: {el.title}</h3>
                            <p>DESCRIPTION: {el.body}</p>
                        </div>
                    ))
                }
            </Box>
        </VStack >
    )
}

const DIV = styled.div`

  width: 550px;
  border-radius: 10px;
  padding: 40px;
  margin-top: 50px;
  background-color: rgb(255, 252, 252);

  DIV input{
      border: 1px solid gray;
      width: 350px;
      padding: 10px;
      border-radius: 10px;
  }
  DIV select{
      border: 1px solid gray;
      width: 350px;
      border-radius: 10px;
  }
 
`