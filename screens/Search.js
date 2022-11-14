import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  View,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { gql, useLazyQuery } from "@apollo/client";

const SEARCH_PHOTOS = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 1);
  color: black;
  width: ${(props) => props.width / 1.5}px;
  padding: 5px 10px;
  border-radius: 7px;
`;
const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 15px;
  color: white;
  font-weight: 600;
`;

export default function Search({ navigation }) {
  const numColumns = 2;
  const { width } = Dimensions.get("window");
  const { control, handleSubmit, getValues, setValue } = useForm();
  const [startQueryFn, { data, loading, called }] = useLazyQuery(SEARCH_PHOTOS);
  const onValid = () => {
    const { text } = getValues();
    startQueryFn({ variables: { keyword: text } });
    setValue("text", "");
  };
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Controller
          name="text"
          control={control}
          rules={{ required: true, minLength: 1, maxLength: 20 }}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Search photos"
              placeholderTextColor="rgba(0, 0, 0, 0.8)"
              autoCapitalize="none"
              returnKeyType="search"
              autoCorrect={false}
              width={width}
              onSubmitEditing={handleSubmit(onValid)}
            />
          )}
        ></Controller>
      ),
    });
  }, []);
  const renderItem = ({ item: photo }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("StackPhotos", {
          screen: "Photos",
          params: { photoId: photo.id },
        })
      }
    >
      <Image
        source={{ uri: photo.file }}
        style={{ width: width / numColumns, height: width / numColumns }}
      />
    </TouchableOpacity>
  );
  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchPhotos !== undefined ? (
          data?.searchPhotos?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              data={data?.searchPhotos}
              keyExtractor={(photo) => String(photo.id)}
              numColumns={numColumns}
              renderItem={renderItem}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
