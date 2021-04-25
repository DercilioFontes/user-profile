import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
} from "@ionic/react";
import React, { useState } from "react";
import "./ExploreContainer.css";
import { BlockPicker } from "react-color";
import dayjs from "dayjs";

interface UserInfo {
  name?: string;
  birthDay?: string;
  colour?: string;
}

const savedUserInfo: UserInfo = {
  name: undefined,
  birthDay: undefined,
  colour: undefined,
};

const ExploreContainer: React.FC = () => {
  const [userName, setUserName] = useState<string | undefined>();
  const [userBirthday, setUserBirthday] = useState<string | undefined>();
  const [userColour, setUserColour] = useState<string | undefined>();
  const [disabled, setDisabled] = useState(true);
  const [showHappyBday, setShowHappyBday] = useState(false);

  const onEditCancelClick = () => {
    if (!disabled) {
      setUserName(savedUserInfo.name);
      setUserBirthday(savedUserInfo.birthDay);
      setUserColour(savedUserInfo.colour);
    }
    setDisabled(!disabled);
  };

  const onSaveClick = () => {
    savedUserInfo.name = userName;
    savedUserInfo.birthDay = userBirthday;
    savedUserInfo.colour = userColour;
    const today = dayjs();
    const isSameDay = today.isSame(userBirthday || "", "day");
    setShowHappyBday(isSameDay);
    setDisabled(true);
  };

  const onResetClick = () => {
    setUserName(undefined);
    setUserBirthday(undefined);
    setUserColour(undefined);
  };

  return (
    <div className="container">
      <IonList>
        <IonCard className={!showHappyBday ? "ion-hide" : ""}>
          <IonCardHeader>
            <IonCardTitle>
              {`🎉 Happy Birthday${userName ? ", " + userName : ""}!`}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent></IonCardContent>
        </IonCard>
        <IonItemDivider color="primary" class="ion-text-uppercase">
          User Infomation
        </IonItemDivider>
        <IonItem>
          <IonLabel position="stacked">User Name</IonLabel>
          <IonInput
            type="text"
            autocomplete="name"
            value={userName}
            placeholder="Enter Name"
            disabled={disabled}
            onIonChange={(e) => setUserName(e.detail.value || undefined)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">User Birthday</IonLabel>
          <IonInput
            type="date"
            autocomplete="bday"
            value={userBirthday}
            placeholder="Enter Birthday"
            disabled={disabled}
            onIonChange={(e) => setUserBirthday(e.detail.value || "")}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Favourite Colour</IonLabel>
          <div className="ion-margin-start">
            <IonInput value={userColour} disabled={disabled}></IonInput>
            {!disabled && (
              <BlockPicker
                triangle="hide"
                color={userColour}
                onChangeComplete={(e) => setUserColour(e.hex)}
              ></BlockPicker>
            )}
          </div>
        </IonItem>
        <IonButton
          type="button"
          color={!userColour ? "primary" : ""}
          onClick={onEditCancelClick}
          style={{ "--background": userColour }}
        >
          {disabled ? "Edit" : "Cancel"}
        </IonButton>
        <IonButton
          disabled={disabled}
          type="submit"
          color={!userColour ? "success" : ""}
          style={{ "--background": userColour }}
          onClick={onSaveClick}
        >
          Save
        </IonButton>
        <IonButton
          disabled={disabled}
          type="reset"
          color={!userColour ? "danger" : ""}
          style={{ "--background": userColour }}
          onClick={onResetClick}
        >
          Reset
        </IonButton>
      </IonList>
    </div>
  );
};

export default ExploreContainer;
