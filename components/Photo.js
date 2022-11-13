import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import PropTypes from "prop-types";

const Container = styled.View``;
const Header = styled.TouchableOpacity``;
const UserAvatar = styled.Image``;
const Username = styled.Text`
  color: white;
  font-weight: 600;
`;
const File = styled.Image``;
const Actions = styled.View``;
const Action = styled.TouchableOpacity``;
const Caption = styled.View``;
const CaptionText = styled.Text`
  color: white;
`;
const Likes = styled.Text`
  color: white;
`;
function Photo({ id, user, caption, file, isLiked, likes }) {
  const { height, width } = Dimensions.get("window");
  return (
    <Container>
      <Header>
        <UserAvatar />
        <Username>{user.username}</Username>
      </Header>
      <File
        resizeMode="cover"
        style={{ width, height: width }}
        source={{ uri: file }}
      />
      <Actions>
        <Action />
        <Action />
      </Actions>
      <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
      <Caption>
        <Username>{user.username}</Username>
        <CaptionText>{caption}</CaptionText>
      </Caption>
    </Container>
  );
}
Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  caption: PropTypes.string,
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  commentNumber: PropTypes.number,
};
export default Photo;
