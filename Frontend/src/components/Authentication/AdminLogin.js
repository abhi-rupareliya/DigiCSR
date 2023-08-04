import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
// import { allFieldsContext } from "../Dashboards/CompanyFeatures/EditProfile";
// import { allNgoFieldsContext } from "../Dashboards/NgoFeatures/EditNgoProfile";

function AdminLogin() {
  // const allfields = useContext(allFieldsContext);
  // const allNgofields = useContext(allNgoFieldsContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showSignupButton, setShowSignupButton] = useState(false);
  const [showOtpButton, setShowOtpButton] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSendOtp = async () => {
    setShowOtpInput(false);
    setOtp();
    setLoading(true);
    if (!email || email.trim() === "") {
      toast({
        title: "Please fill in all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Please enter a valid email",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    const data = { email: email };

    try {
      const response = await fetch("http://localhost:4000/admin/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "OTP Sent Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        setShowOtpInput(true);
        setShowOtpButton(false);
        setShowSignupButton(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        toast({
          title: "Error Occurred!",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to send OTP. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || email.trim() === "" || !otp) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await fetch("http://localhost:4000/admin/login/verify", {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        const { result } = data;
        localStorage.setItem("AdminAuthToken", result);
        setLoading(false);
        // if (allfields) {
        navigate("/Admin/home", { replace: true });
        // } else {
        //   toast({
        //     title: "Please Complete the whole profile first.",
        //     status: "warning",
        //     duration: 5000,
        //     isClosable: true,
        //     position: "bottom",
        //   });
        //   navigate("/Company/editprofile", { replace: true });
        // }
      } else {
        throw new Error("Failed to verify. Please try again later.");
      }
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return; // Prevent further execution
    }
  };

  return (
    <VStack spacing={"5px"}>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter Email (e.g., abc@abc.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      {showOtpButton && (
        <Button
          colorScheme="blue"
          w={"100%"}
          style={{ marginTop: 15 }}
          onClick={handleSendOtp}
          isLoading={loading}
        >
          Send Otp
        </Button>
      )}

      {showOtpInput && (
        <FormControl id="otp" isRequired>
          <FormLabel>Otp</FormLabel>
          <PinInput otp value={otp} onChange={handleOtpChange}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </FormControl>
      )}

      {showSignupButton && (
        <Button
          colorScheme="blue"
          w={"100%"}
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          isLoading={loading}
        >
          Login
        </Button>
      )}
      {showOtpInput && <Button onClick={handleSendOtp}>Send OTP Again</Button>}
    </VStack>
  );
}

export default AdminLogin;
