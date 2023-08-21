import React, { useEffect, useState } from 'react'
import { Center, FormControl, FormLabel, Box, Button, Text, Select, VStack } from '@chakra-ui/react'
import { styled } from 'styled-components'
import { useParams } from 'react-router-dom'

let initialState = {
    title: "",
    body: "",
}

export const DeleteNote = () => {

    const [myNote, setmyNote] = useState(initialState)
    const { id } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault();

        if (myNote.title && myNote.body) {
            fetch(`http://localhost:8080/notes/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },

            }).then((res) => res.json())
                .then((res) => {
                    console.log(res)
                    alert(res.msg)
                })
                .catch((err) => console.log(err))

        } else {
            alert("Please fill all details")
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setmyNote({ ...myNote, [name]: value })
    }

    useEffect(() => {
        fetch(`http://localhost:8080/notes/`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => res.json())
            .then((res) => {
                let myNote = res.filter((el) => el._id == id)
                initialState.title = myNote[0].title
                initialState.body = myNote[0].body
                setmyNote(myNote[0])
            })
            .catch((err) => console.log(err))
    }, [])


    return (
        <div>
            <Center>
                <DIV >
                    <form required >
                        <Text color={"red.600"} fontWeight={"bold"}>DELETE NOTE</Text>
                        <FormControl isRequired>
                            <FormLabel color={"blue.600"}>Title</FormLabel>
                            <Text border={"1px dashed gray"} p={"10px"} borderRadius={"10px"} >{myNote.title} </Text>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel color={"blue.600"}>Description</FormLabel>
                            <Text border={"1px dashed gray"} p={"10px"} borderRadius={"10px"}  >{myNote.body} </Text>
                        </FormControl>
                        <Button mt={"10px"} variant={"outline"} colorScheme='red' onClick={handleSubmit}>DELETE</Button>
                    </form>
                </DIV>
            </Center >
        </div>
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