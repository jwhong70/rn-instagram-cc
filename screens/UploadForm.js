import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, ActivityIndicator, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
import { FEED_PHOTO } from "../fragments";

const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      ...FeedPhoto
    }
  }
  ${FEED_PHOTO}
`;

const Container = styled.View`
  flex: 1;
  background-color: black;
`;
const Photo = styled.Image``;
const CaptionContainer = styled.View`
  margin-top: 30px;
`;
const Caption = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
`;
const HeaderRightText = styled.Text`
  color: ${(props) => props.theme.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

export default function UploadForm({ route, navigation }) {
  const { width } = Dimensions.get("window");
  const { control, handleSubmit } = useForm();
  const updateUploadPhoto = (cache, result) => {
    const {
      data: { uploadPhoto },
    } = result;
    if (uploadPhoto.id) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeFeed(prev) {
            return [uploadPhoto, ...prev];
          },
        },
      });
      navigation.navigate("Tabs");
    }
  };
  const [uploadPhotoMutation, { loading }] = useMutation(
    UPLOAD_PHOTO_MUTATION,
    { update: updateUploadPhoto }
  );
  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
    });
  }, [loading]);
  const onValid = ({ caption }) => {
    const file = new ReactNativeFile({
      uri: route.params.params.file,
      name: `1.jpg`,
      type: "image/jpeg",
    });
    uploadPhotoMutation({ variables: { caption, file } });
  };
  return (
    <DismissKeyboard>
      <Container>
        <Photo
          source={{ uri: route.params.params.file }}
          style={{ width: width, height: 350 }}
        />
        <CaptionContainer>
          <Controller
            name="caption"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Caption
                value={value}
                onChangeText={onChange}
                placeholder="Write a caption..."
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onValid)}
              />
            )}
          ></Controller>
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
}
