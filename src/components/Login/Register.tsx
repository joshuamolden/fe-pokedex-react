import { Flex, Stack, Heading, Box } from "@chakra-ui/layout";
import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_TRAINER_REGISTER_PATH } from "../../services/apiConstants";
import { ROUTING_LOGIN_PATH } from "../../services/routingConstants";

function Register(): React.ReactElement {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleShowClick = () => setShowPassword(!showPassword);
  const toast = useToast();
  const navigate = useNavigate();

  const register = useCallback(
    (name: string, email: string, password: string) => {
      axios
        .post(`${API_TRAINER_REGISTER_PATH}`, {
          name: name,
          email: email,
          password: password,
        })
        .then(function () {
          toast({
            title: "Success!",
            description: "You are registered!",
            status: "success",
          });
          navigate(`${ROUTING_LOGIN_PATH}`);
        })
        .catch(function (error) {
          toast({
            title: error.response.data.message,
            description: "Email already exists",
            status: "error",
          });
        });
    },
    [navigate, toast]
  );

  return (
    <Flex
      flexDir="column"
      bgColor="background.500"
      h="100vh"
      w="100wh"
      justify="center"
      align="center"
      p="20px"
    >
      <Stack flexDir="column" mb="2" justify="center" align="center">
        <Heading color="whiteAlpha.900">Enter Your Information Below</Heading>
        <Box>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              register(name, email, password);
            }}
          >
            <Stack
              spacing={4}
              p="1rem"
              bgColor="whiteAlpha.900"
              boxShadow="md"
              h="40vh"
              w="80vh"
              justify="center"
              borderRadius="10px"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FaUserAlt color="#cbd5e0" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <MdEmail color="#cbd5e0" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FaLock color="#cbd5e0" />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={3}
                type="submit"
                variant="solid"
                colorScheme="background"
                width="full"
              >
                Sign up
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
export default Register;
