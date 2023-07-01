import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #ffffff;
`;

export const Card = styled.Pressable`
  width: 100%;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: 2px;
  border-width: 1px;
  border-bottom-color: #1b9b9b;
  border-radius: 10px;
  align-items: center;
`;

export const UserImgWrapper = styled.Pressable`
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
`;

export const UserImg = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 25px;
`;

export const TextSection = styled.View`
  flex-direction: column;
  justify-content: center;
  padding-left: 0;
  margin-left: 15px;
  padding-right: 15px;
  margin-bottom: 2px;
  width: 300px;
`;

export const InvitationSection = styled.View`
  flex-direction: column;
  justify-content: center;
  padding-left: 0;
  margin-left: 15px;
  margin-bottom: 2px;
  width: 220px;
`;

export const UserInfoText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2px;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-right: 20px;
  padding-left: 20px;
`;

export const ControlContainer = styled.View`
  height: 40px;
  flex-direction: row;
  justify-content: space-between;
  border: 1px;
  border-color: #1b9b9b;
  border-radius: 5px;
  align-items: center;
  width: 80px;
  margin-right: 5px;
`;

export const InvitationContainer = styled.View`
  height: 40px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  margin-right: 5px;
`;

export const Header = styled.View`
  width: 100%;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`

export const FilterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`

export const InfoText = styled.View`
  flex-direction: row;
  margin-bottom: 2px;
`;

export const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  font-family: 'Lato-Regular';
`;

export const PostTime = styled.Text`
  font-size: 12px;
  color: #666;
  font-family: 'Lato-Regular';
`;

export const MessageText = styled.Text`
  font-size: 12px;
  color: #333333;
`;

export const Location = styled.Text`
  font-size: 12px;
  color: #333333;
  font-weight: bold;
`;

export const Time = styled.Text`
  font-size: 12px;
  color: #333333;
  margin-left: 5px;
`;