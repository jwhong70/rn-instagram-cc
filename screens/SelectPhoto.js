import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import {
  StatusBar,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;
const Top = styled.View`
  flex: 1;
  background-color: black;
`;
const Bottom = styled.View`
  flex: 1;
  background-color: black;
`;
const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;
const HeaderRightText = styled.Text`
  color: ${(props) => props.theme.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;
export default function SelectPhoto({ navigation }) {
  const [photos, setPhotos] = useState([]);
  const [chosenPhoto, setChosenPhoto] = useState("");
  const [photoLocal, setPhotoLocal] = useState("");
  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync();
    setPhotos(photos);
    setChosenPhoto(photos[0]?.uri);
  };
  const getPermissions = async () => {
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync();
    if (accessPrivileges === "none" && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        getPhotos();
      }
    } else if (accessPrivileges !== "none") {
      getPhotos();
    }
  };
  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("UploadForm", {
          screen: "UploadForm",
          params: { file: photoLocal },
        })
      }
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  useEffect(() => {
    getPermissions();
  }, []);
  useEffect(() => {
    navigation.setOptions({ headerRight: HeaderRight });
  }, [chosenPhoto, photoLocal]);
  const numColumns = 4;
  const { width } = Dimensions.get("window");
  const choosePhoto = async (id) => {
    const assetInfo = await MediaLibrary.getAssetInfoAsync(id);
    setPhotoLocal(assetInfo.localUri);
    setChosenPhoto(assetInfo.uri);
  };
  const renderItem = ({ item: photo }) => (
    <ImageContainer onPress={() => choosePhoto(photo.id)}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / numColumns, height: 100 }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={18}
          color={photo.uri === chosenPhoto ? "#0095F6" : "white"}
        />
      </IconContainer>
    </ImageContainer>
  );
  return (
    <Container>
      <StatusBar hidden={false} />
      <Top>
        {chosenPhoto !== "" ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width, height: "100%" }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
          numColumns={numColumns}
        />
      </Bottom>
    </Container>
  );
}
