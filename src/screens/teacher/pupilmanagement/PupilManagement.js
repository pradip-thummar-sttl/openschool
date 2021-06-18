import React, { useState } from "react";
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
                    onPupilClick={(item) => { setSelectedPupil(item); setOverViewSelected(false); setDetailSelected(true) }} />
                :
                isDetailSelected ?
                    <PupilProfileView
                        selectedPupil={selectedPupil}
                        navigateToBack={() => { setOverViewSelected(true); setDetailSelected(false) }} />
                    :
                    null
            }
        </View>
    );
}
export default PupilManagement;