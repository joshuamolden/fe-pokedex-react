import { Box, Flex, Stack } from "@chakra-ui/layout";
import {
  FormControl,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PokemonLogo from "./pokemon.png";

function Login(): React.ReactElement {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const toast = useToast();
  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showPassword);

  const apiCall = useCallback(
    (email: string, password: string) => {
      axios
        .post(`http://localhost:8080/api/v1/trainer/login`, {
          email: email,
          password: password,
        })
        .then((response) => {
          window.localStorage.setItem("jwt", response.data.jwt);
          toast({
            title: `Welcom ${response.data.name}`,
            status: "success",
            isClosable: true,
            duration: 5000,
          });
          navigate("/pokedex/trainer?name=&page=0");
        })
        .catch((error) => {
          toast({
            title: error.response.data.message,
            status: "error",
            isClosable: true,
            duration: 5000,
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
      justify="flex-start"
      align="center"
      p="20px"
    >
      <Stack flexDir="column" mb="2" justify="center" align="center">
        <Image src={PokemonLogo} alt="Pokemon Logo" h="200px" />
        <Box style={{ marginTop: "50px" }}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              apiCall(email, password);
            }}
          >
            <Stack
              spacing={4}
              p="1rem"
              bgColor="whiteAlpha.900"
              boxShadow="md"
              h="32vh"
              w="60vh"
              justify="center"
              borderRadius="10px"
            >
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
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link
          to={`/pokedex/register`}
          style={{ color: "#2c508d", textDecoration: "underline" }}
        >
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
}
export default Login;
