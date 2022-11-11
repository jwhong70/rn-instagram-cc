import React, { useRef } from "react";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import { useForm, Controller } from "react-hook-form";

export default function CreateAccount() {
  const { control, handleSubmit } = useForm();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onValid = (data) => {
    console.log(data);
  };
  return (
    <AuthLayout>
      <Controller
        name="firstName"
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            autoFocus
            returnKeyType="next"
            placeholder="First Name"
            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
            onSubmitEditing={() => onNext(lastNameRef)}
          />
        )}
      ></Controller>
      <Controller
        name="lastName"
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            returnKeyType="next"
            placeholder="Last Name"
            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
            ref={lastNameRef}
            onSubmitEditing={() => onNext(usernameRef)}
          />
        )}
      ></Controller>
      <Controller
        name="username"
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
            returnKeyType="next"
            placeholder="Username"
            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
            ref={usernameRef}
            onSubmitEditing={() => onNext(emailRef)}
          />
        )}
      ></Controller>
      <Controller
        name="email"
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            placeholder="Email"
            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
            ref={emailRef}
            onSubmitEditing={() => onNext(passwordRef)}
          />
        )}
      ></Controller>
      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            secureTextEntry
            returnKeyType="done"
            lastOne={true}
            placeholder="Password"
            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
            ref={passwordRef}
            onSubmitEditing={handleSubmit(onValid)}
          />
        )}
      ></Controller>
      <AuthButton
        text="Create Account"
        disabled={true}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
