import React, { useState } from 'react'
import { Center, FormControl, FormLabel, Box, Button, Text, Select } from '@chakra-ui/react'
import { styled } from 'styled-components'

let initialState = {
    email: "",
    pass: "",
}

export const Login = () => {
    const [formData, setFormData] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.email && formData.pass) {
            console.log(formData)
            fetch(`http://localhost:8080/users/login`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formData)
            }).then((res) => res.json())
                .then((res) => {
                    localStorage.setItem("token", res.token)
                    console.log(res)
                })
                .catch((err) => console.log(err))

        } else {
            alert("Please fill all details")
        }
        console.log("Form", formData)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }



    return (
        <Center>
            <DIV >
                <form required >
                    <Text color={"red.600"} fontWeight={"bold"}>LOG-IN HERE</Text>

                    <FormControl isRequired>
                        <FormLabel color={"blue.600"}>Email</FormLabel>
                        <input type="email" placeholder='email'
                            name="email" value={formData.email}
                            onChange={handleChange} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel color={"blue.600"}>Password</FormLabel>
                        <input type="password" placeholder='password' name="pass" value={formData.pass}
                            onChange={handleChange} />
                    </FormControl>


                    <Button mt={"10px"} variant={"outline"} colorScheme='green' onClick={handleSubmit}>Log In</Button>
                </form>
            </DIV>
        </Center >
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