import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { USER_FRAGMENT } from "../fragments";
import ScreenLayout from "../components/ScreenLayout";
import UserRow from "../components/UserRow";

const LIKES_QUERY = gql`
  query seePhotoLikes($id: Int!) {
    seePhotoLikes(id: $id) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export default function Likes({ route }) {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(LIKES_QUERY, {
    variables: { id: route?.params?.params?.photoId },
    skip: !route?.params?.params?.photoId,
  });
  const renderUser = ({ item: user }) => <UserRow {...user} />;
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        data={data?.seePhotoLikes}
        keyExtractor={(item) => String(item.id)}
        style={{ width: "100%" }}
        renderItem={renderUser}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          ></View>
        )}
      />
    </ScreenLayout>
  );
}
