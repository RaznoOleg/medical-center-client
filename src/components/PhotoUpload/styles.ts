import styled from 'styled-components';

export const PhotoContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
`;

export const UserPhoto = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid #ccc;
`;

export const ChangePhotoButton = styled.label`
  position: absolute;
  bottom: -10px;
  cursor: pointer;
  padding: 5px;
  width: 23px;
  height: 23px;
  color: white;
  border-radius: 50%;
  background-color: gray;

  &:hover {
    background-color: #777;
  }
`;

export const PhotoInput = styled.input`
  display: none;
`;

export const CropperContainer = styled.div`
  .cropper-view-box {
    box-shadow: 0 0 0 1px #39f;
    border-radius: 50%;
    outline: 0;
  }
  .cropper-face {
    background-color: inherit !important;
  }
  .cropper-view-box {
    outline: inherit !important;
  }
`;

export const LoaderContainer = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
