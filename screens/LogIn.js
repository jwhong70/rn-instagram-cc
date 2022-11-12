import React, { useRef } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { TextInput } from "../components/auth/AuthShared";
import { useForm, Controller } from "react-hook-form";

export default function LogIn() {
  const { control, handleSubmit } = useForm();
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
        name="username"
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            autoFocus
            autoCapitalize="none"
            returnKeyType="next"
            placeholder="Username"
            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
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
      <AuthButton text="Log In" onPress={handleSubmit(onValid)} />
    </AuthLayout>
  );
}
