import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { gql, useQuery } from "@apollo/client";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { PHOTO_FRAGMENT } from "../fragments";

const SEE_PHOTO = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
    }
  }
  ${PHOTO_FRAGMENT}
`;

export default function Photos({ route }) {
  const { data, loading, refetch } = useQuery(SEE_PHOTO, {
    variables: { id: route?.params?.params?.photoId },
  });
  const [refreshing, setRefreshing] = useState();
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Photo {...data?.seePhoto} />
      </ScrollView>
    </ScreenLayout>
  );
}
