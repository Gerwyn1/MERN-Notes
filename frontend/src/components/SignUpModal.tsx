import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";
import { SignUpCredentials } from "../network/notes_api";
import TextInputField from "./form/TextInputField";

import styleUtils from "../styles/utils.module.css";

import { ConflictError } from "../errors/http_errors";

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  const onSubmit = async (credentials: SignUpCredentials) => {
    try {
      const newUser = await NotesApi.signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      if (error instanceof ConflictError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  };

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            type="text"
            placeholder="Username"
            name="username"
            label="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />
          <TextInputField
            type="email"
            placeholder="Email"
            name="email"
            label="Email"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.email}
          />
          <TextInputField
            type="password"
            placeholder="Password"
            name="password"
            label="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={styleUtils.width100}
          >
            Sign up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
