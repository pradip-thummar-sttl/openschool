import React, { useState, useEffect } from "react";
import { View } from "react-native";
import PupiloverView from "./PupiloverView";
import PupilProfileView from "./PupilProfileView";
import PAGESTYLE from './Style';


const PupilManagement = (props) => {
    const [isOverViewSelected, setOverViewSelected] = useState(true);
    const [isDetailSelected, setDetailSelected] = useState(true);
    const [selectedPupil, setSelectedPupil] = useState({})



    return (
        <View style={PAGESTYLE.mainPage}>
            {isOverViewSelected ?
                <PupiloverView
                    navigateToAddNewUser={() => props.navigation.replace('PupilRegister', { userType: "Pupil" })}
                    onPupilClick={(item) => { setSelectedPupil(item); setOverViewSelected(false); setDetailSelected(true) }} tabs={props.tabs} />
                :
                isDetailSelected ?
                    <PupilProfileView
                        selectedPupil={selectedPupil}
                        navigateToBack={() => { setOverViewSelected(true); setDetailSelected(false) }}
                        navigations={props} />
                    :
                    null
            }
        </View>
    );
}
export default PupilManagement;