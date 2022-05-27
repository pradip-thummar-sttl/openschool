import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Var } from "../../../../utils/Constant";
import { BadgeIcon } from "../../../../utils/Model";
import PupiloverView from "./PupiloverView";
import PupilProfileView from "./PupilProfileView";
import PAGESTYLE from './Style';
import TPupilProfileAdd from "./TPupilProfileAdd";


const PupilManagement = (props) => {
    const [isOverViewSelected, setOverViewSelected] = useState(true);
    const [isDetailSelected, setDetailSelected] = useState(true);
    const [isNewPupilAdd, setNewPupilAdd] = useState(true);
    const [selectedPupil, setSelectedPupil] = useState({})

    const openNotification = () => {
        Var.isCalender = false
        BadgeIcon.isBadge = false
        props.navigation.openDrawer()
        // props.navigation.navigate('NotificationDrawer',{ onGoBack: () => {} })
    }


    return (
        <View style={PAGESTYLE.mainPage}>
            {isOverViewSelected ?
                <PupiloverView
                    navigation={props.navigation}
                    navigateToAddNewUser={() =>{setNewPupilAdd(true);setOverViewSelected(false); setDetailSelected(false)}}
                    onPupilClick={(item) => { setSelectedPupil(item); setOverViewSelected(false); setDetailSelected(true);setNewPupilAdd(false); }} tabs={props.tabs} />
                :
                isDetailSelected ?
                    <PupilProfileView
                        selectedPupil={selectedPupil}
                        navigateToBack={() => { setOverViewSelected(true); setDetailSelected(false);setNewPupilAdd(false); }}
                        navigations={props}
                        />
                    :
                    isNewPupilAdd?
                    <TPupilProfileAdd navigateToBack={() => {setOverViewSelected(true); setDetailSelected(false); setNewPupilAdd(false); }} openNotification={() => { openNotification() }}/>:
                    null
            }
        </View>
    );
}
export default PupilManagement;