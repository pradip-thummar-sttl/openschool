import React, { useState, useEffect } from "react";
import { Image, Text, View,ActivityIndicator } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { EndPoints } from "../../../../service/EndPoints";
import { Service } from "../../../../service/Service";
import COLORS from "../../../../utils/Colors";
import { baseUrl, opacity, showMessage } from "../../../../utils/Constant";
import { User } from "../../../../utils/Model";
import PAGESTYLE from './Style';
import HeaderPMInner from './HeaderPMInner';
import moment from 'moment';
import Chat from "../../Chat/Chat";
import ActivityRings from "react-native-activity-rings";
import MESSAGE from "../../../../utils/Messages";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TopBackImg from "../../../../svg/teacher/pupilmanagement/TopBackImg";
import BronzeFill from "../../../../svg/teacher/pupilmanagement/StarBronze_Fill";
import Bronze from "../../../../svg/teacher/pupilmanagement/StarBronze";
import SilverFill from "../../../../svg/teacher/pupilmanagement/StartSilver_Fill";
import Silver from "../../../../svg/teacher/pupilmanagement/StartSilver";
import GoldFill from "../../../../svg/teacher/pupilmanagement/StarGold_Fill";
import Gold from "../../../../svg/teacher/pupilmanagement/StarGold";
import Ic_CheckWhite from "../../../../svg/pupil/parentzone/Ic_CheckWhite";

const PupilProfileView = (props) => {
    const [isHide, action] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [tabSelected, setTabSelected] = useState(0);

    const item = props.selectedPupil;
    const [chartData, setChartData] = useState([])

    const [isBronze, setBronze] = useState(false);
    const [isSilver, setSilver] = useState(false);
    const [isGold, setGold] = useState(false);
    const [feedBack, setFeedback] = useState('')
    const [isLoading, setLoading] = useState(false)

    const activityConfig = {
        width: 300,
        height: 300
    };

    useEffect(() => {
        getLessonData();
    }, [])

    const getLessonData = () => {
        Service.get(`${EndPoints.GetCountLession}/${item.PupilId}`, (res) => {
            if (res.flag) {
                let per = res.data.percentage
                let data = [{
                    value: per == null ? 0.0001 : per != 0 ? (per / 100) : 0.0001,       // To make value between 0 to 1
                    color: COLORS.purpleDark,
                    backgroundColor: COLORS.lightPurple
                }]
                getHomeworkData(data)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('Err of all pupil by teacher', err)
        })
    }

    const getHomeworkData = (lessonData) => {
        Service.get(`${EndPoints.GetCountHomework}/${item.PupilId}`, (res) => {
            if (res.flag) {
                let per = res.data.percentage
                let data = {
                    value: per == null ? 0.0001 : per != 0 ? (per / 100) : 0.0001,       // To make value between 0 to 1
                    color: COLORS.yellowDark,
                    backgroundColor: COLORS.lightYellow
                }
                lessonData.push(data)
                setChartData(lessonData)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('Err of all pupil by teacher', err)
        })
    }

    const setInstantRewards = () => {
        if (!isBronze && !isSilver && !isGold) {
            showMessage(MESSAGE.selectReward)
            return
        }

        let data = {
            TeacherID: User.user._id,
            PupilID: item.PupilId,
            Reward: isBronze ? '3' : isSilver ? '6' : '9',
            Feedback: feedBack,
            CreatedBy: User.user._id
        }
        setLoading(true)
        Service.post(data, `${EndPoints.AddInstantReward}`, (res) => {
            console.log('res of all pupil by teacher', res)
            if (res.flag) {
                setBronze(false)
                setSilver(false)
                setGold(false)
                setFeedback('')
                showMessage(MESSAGE.rewarded)
                setLoading(false)
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('Err of all pupil by teacher', err)
        })
    }

    const onStarSelection = (index) => {
        setBronze(false)
        setSilver(false)
        setGold(false)
        if (index == 3) {
            setBronze(true)
        } else if (index == 6) {
            setSilver(true)
        } else if (index == 9) {
            setGold(true)
        }
    }

    const onGoBack = () => {
        props.navigateToBack()
    }

    return (
        <View style={PAGESTYLE.mainPage1}>
            <HeaderPMInner
                onEditPress={() => props.navigations.navigation.navigate('PupilProfileEdit', { item: item, onGoBack: () => onGoBack() })}
                navigateToBack={() => props.navigateToBack()} tabIndex={(index) => { setTabSelected(index) }}
                pupilName={props.selectedPupil.FirstName + ' ' + props.selectedPupil.LastName} />

            <View style={{ flex: 1 }}>
                {
                    tabSelected === 0 ?
                        <View style={{ width: isHide ? '100%' : '100%', }}>
                            <View style={PAGESTYLE.whiteBg}>
                                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ height: '94%' }}>
                                    <View style={PAGESTYLE.managementDetail}>
                                        <View style={PAGESTYLE.managementBlockTop}>
                                            <TopBackImg style={PAGESTYLE.managementopImage} width={'100%'} />
                                            <View style={PAGESTYLE.thumbTopUser}>
                                                <Image style={{ height: '100%', width: '100%', borderRadius: 100, backgroundColor: COLORS.borderGrp }}
                                                    source={{ uri: baseUrl + props.selectedPupil.ProfilePicture }} />
                                            </View>
                                        </View>
                                        <View style={PAGESTYLE.managementNameSec}>
                                            <View style={PAGESTYLE.nameSmlBlock}>
                                                <Text style={PAGESTYLE.userLabel}>Pupil name</Text>
                                                <Text style={PAGESTYLE.userName}>{props.selectedPupil.FirstName} {props.selectedPupil.LastName}</Text>
                                            </View>
                                            <View style={PAGESTYLE.dateSmlBlock}>
                                                <Text style={PAGESTYLE.userLabel}>Date of Birth</Text>
                                                <Text style={PAGESTYLE.userName}>{moment(props.selectedPupil.Dob).format('DD/MM/yyyy')}</Text>
                                            </View>
                                            <View>
                                                <Text numberOfLines={1} style={[PAGESTYLE.userLabel, { width: wp(15) }]}>Unique I.D (auto-generated)</Text>
                                                <Text style={PAGESTYLE.userName}>{props.selectedPupil.UniqueNumber}</Text>
                                            </View>
                                        </View>
                                        <View style={PAGESTYLE.managementParaSec}>
                                            <Text style={PAGESTYLE.userLabel}>Notes</Text>
                                            <Text style={PAGESTYLE.paragraphText}>{props.selectedPupil.Note ? props.selectedPupil.Note : '-'}</Text>
                                        </View>
                                    </View>
                                    <View style={PAGESTYLE.rateAnnotationBlock}>
                                        <View style={PAGESTYLE.ratingBlock}>
                                            <Text style={PAGESTYLE.ratingTitle}>Instant rewards for homework</Text>
                                            <View style={PAGESTYLE.achivementBox}>
                                                <View style={PAGESTYLE.rewardStarMark}>
                                                    <TouchableOpacity onPress={() => onStarSelection(3)} activeOpacity={opacity}>
                                                        <View style={PAGESTYLE.centerText}>
                                                            {
                                                                isBronze ?
                                                                    <BronzeFill style={[PAGESTYLE.starSelected]} width={hp(4.94)} height={hp(4.68)} />
                                                                    : <Bronze style={[PAGESTYLE.starSelected]} width={hp(4.94)} height={hp(4.68)} />
                                                            }
                                                            {/* <Image source={isBronze ? Images.BronzeStarFill : Images.BronzeStar} style={[PAGESTYLE.starSelected]} /> */}
                                                            <Text style={PAGESTYLE.starText}>Bronze star</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => onStarSelection(6)} activeOpacity={opacity}>
                                                        <View style={[PAGESTYLE.centerStar, PAGESTYLE.separater]}>
                                                            {
                                                                isSilver ?
                                                                    <SilverFill style={[PAGESTYLE.starSelected]} width={hp(4.94)} height={hp(4.68)} />
                                                                    : <Silver style={[PAGESTYLE.starSelected]} width={hp(4.94)} height={hp(4.68)} />
                                                            }
                                                            {/* <Image source={isSilver ? Images.SilverStarFill : Images.SilverStar} style={[PAGESTYLE.starSelected]} /> */}
                                                            <Text style={PAGESTYLE.starText}>Silver star</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => onStarSelection(9)} activeOpacity={opacity}>
                                                        <View style={PAGESTYLE.centerText}>
                                                            {
                                                                isGold ?
                                                                    <GoldFill style={[PAGESTYLE.starSelected]} width={hp(4.94)} height={hp(4.68)} />
                                                                    : <Gold style={[PAGESTYLE.starSelected]} width={hp(4.94)} height={hp(4.68)} />
                                                            }
                                                            {/* <Image source={isGold ? Images.GoldStarFill : Images.GoldStar} style={[PAGESTYLE.starSelected]} /> */}
                                                            <Text style={PAGESTYLE.starText}>Gold star</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={PAGESTYLE.annotationText}>
                                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Text style={[PAGESTYLE.userLabel, PAGESTYLE.anoteTitle]}>What is the reward for?</Text>
                                                <View style={PAGESTYLE.tickLayoutPArent}>
                                                    <TouchableOpacity
                                                        activeOpacity={opacity}
                                                        onPress={() => setInstantRewards()}>
                                                        {isLoading ?
                                                            <ActivityIndicator
                                                                size={Platform.OS == 'ios' ? 'large' : 'small'}
                                                                color={COLORS.white} />
                                                            :
                                                            <View>
                                                                <Ic_CheckWhite style={PAGESTYLE.tickLayout} height={15} width={15} />
                                                            </View>
                                                        }   
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <TextInput
                                                returnKeyType={"next"}
                                                multiline={true}
                                                autoCapitalize={'sentences'}
                                                numberOfLines={4}
                                                placeholder='Leave feedback here'
                                                style={[PAGESTYLE.paragraphText1, PAGESTYLE.annotationBox]}
                                                value={feedBack}
                                                onChangeText={feedback => setFeedback(feedback)} />
                                        </View>
                                    </View>
                                    <View style={PAGESTYLE.generalRow}>
                                        <Text style={PAGESTYLE.graphTitle}>Pupil’s performance</Text>
                                    </View>
                                    <View style={PAGESTYLE.graphBlock}>

                                        <View style={[PAGESTYLE.graphBox, { bottom: 5 }]}>
                                            <View style={PAGESTYLE.generalRow}>
                                                <View style={PAGESTYLE.chartBlock}>
                                                    <ActivityRings
                                                        data={chartData}
                                                        config={activityConfig} />
                                                </View>
                                                <View>
                                                    <Text style={PAGESTYLE.graphChartText}>Pupils are engaged and using the app and submitting home work on time. </Text>
                                                    <View style={[PAGESTYLE.generalRow, PAGESTYLE.listBottomSpace]}>
                                                        <Image style={PAGESTYLE.purpleMark} />
                                                        <Text style={PAGESTYLE.labelMark}>Pupil engagement over last month</Text>
                                                    </View>
                                                    <View style={PAGESTYLE.generalRow}>
                                                        <Image style={PAGESTYLE.orangeMark} />
                                                        <Text style={PAGESTYLE.labelMark}>Pupil effort over last month</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View>

                                        </View>
                                    </View>
                                </KeyboardAwareScrollView>
                            </View>
                        </View>
                        :
                        <Chat tabs={tabSelected} data={props.selectedPupil} />
                }
            </View>
        </View>
    );
}
export default PupilProfileView;