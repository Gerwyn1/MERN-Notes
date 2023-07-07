import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";
import { LoginCredentials } from "../network/notes_api";
import TextInputField from "./form/TextInputField";

import { UnauthorizedError } from "../errors/http_errors";
import styleUtils from "../styles/utils.module.css";

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  const onSubmit = async (credentials: LoginCredentials) => {
    try {
      const newUser = await NotesApi.login(credentials);
      onLoginSuccessful(newUser);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
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
        <Modal.Title>Login</Modal.Title>
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
            Log in
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
