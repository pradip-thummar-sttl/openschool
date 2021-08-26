import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import PAGESTYLE from './Style';
import Images from "../../../../utils/Images";
import NoLessonEvents from '../../../../svg/emptystate/NoLessonEventsToday'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NoLessonsHomework from "../../../../svg/emptystate/NoLessonHomework";
import NotSentGlobalMessages from "../../../../svg/emptystate/NotSentGlobalMessages";
import NoPupil from "../../../../svg/emptystate/NoPupil";
import NoLessonEventsToday from "../../../../svg/emptystate/NoLessonEventsToday";
import NoLessonEventYet from "../../../../svg/emptystate/NoLessonEventYet";
import NoTeacher from "../../../../svg/emptystate/NoTeacher";

const EmptyStatePlaceHohder = (props) => {
    console.log('props.image', props.title1);

    return (
        <View style={PAGESTYLE.managementBlankImgWrap}>
            {/* <Image style={PAGESTYLE.blankPageImage} source={props.image} /> */}
            {props.holderType == 1 ?
                <NoLessonsHomework style={PAGESTYLE.blankPageImage} height={hp(18)} width={hp(18)} />
                :
                props.holderType == 2 ?
                    <NotSentGlobalMessages style={PAGESTYLE.blankPageImage} height={hp(18)} width={hp(18)} />
                    :
                    props.holderType == 3 ?
                        <NoLessonEventYet style={PAGESTYLE.blankPageImage} height={hp(18)} width={hp(18)} />
                        :
                        props.holderType == 4 ?
                            <NoPupil style={PAGESTYLE.blankPageImage} height={hp(18)} width={hp(18)} />
                            :
                            props.holderType == 5 ?
                                <NoLessonEventsToday style={PAGESTYLE.blankPageImage} height={hp(20.55)} width={hp(20.55)} />
                                :
                                <NoTeacher style={PAGESTYLE.blankPageImage} height={hp(20.55)} width={hp(20.55)} />
            }
            {/* <NoLessonEvents style={PAGESTYLE.blankPageImage} height={hp(18)} width={hp(18)} /> */}
            <Text style={PAGESTYLE.blankManageTextBold}>{props.title1}</Text>
            <Text P style={PAGESTYLE.nodataContent}>{props.title2}</Text>
        </View>
    );
}
export default EmptyStatePlaceHohder;