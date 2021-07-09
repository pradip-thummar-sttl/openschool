import React, { useState, useEffect, useRef } from "react";
import { NativeModules, View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, ActivityIndicator, BackHandler, Platform, } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../utils/Colors";
import STYLE from '../../../utils/Style';
import Images from '../../../utils/Images';
import PAGESTYLE from './Style';
import FONTS from '../../../utils/Fonts';
import HeaderPMInner from "./HeaderPMInner";
import { PanGestureHandler, TextInput } from "react-native-gesture-handler";
import moment from 'moment';
import { baseUrl } from "../../../utils/Constant";
import Chat from "../../Chat/Chat";
import { Service } from "../../../service/Service";
import { EndPoints } from "../../../service/EndPoints";
import { User } from "../../../utils/Model";
import ActivityRings from "react-native-activity-rings";

const { CallModule } = NativeModules;

const PupilProfileView = (props) => {
    const item = props.route.params.item;
    const [isHide, action] = useState(true);
    const [tabSelected, setTabSelected] = useState(0);

    const [bronze, setBronze] = useState(0)
    const [silver, setSilver] = useState(0)
    const [gold, setGold] = useState(0)

    console.log('item', item);
    // const handleOnClick = (index) => {
    //     setTabSelected(index)
    // }
    useEffect(() => {
        if (Platform.OS==="android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }   
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
      }, [props.navigation]);

      const handleBackButtonClick=()=> {
        props.navigation.goBack() 
        return true;
      }
    
    const [chartData, setChartData] = useState([])

    const myref = useRef(null);

    const activityConfig = {
        width: 200,
        height: 200
    };

    const handleOnClick = (index) => {
        setTabSelected(index)
        console.log('reference', myref);
        if (myref.current) {
            myref.current.refresh();
        }
    }

    useEffect(() => {

        item.RewardsList.forEach(element => {
            switch (element._id) {
                case '3':
                    setBronze(element.count)
                    break;
                case '6':
                    setSilver(element.count)
                    break;
                case '9':
                    setGold(element.count)
                    break;
                default:
                    break;
            }
        });

        getLessonData()
    }, [])

    useEffect(() => {
        console.log('chartData', chartData);
    }, [chartData])

    const getLessonData = () => {
        Service.get(`${EndPoints.GetCountLession}/${item.PupilId}`, (res) => {
            console.log('res of all pupil by teacher', res)
            if (res.flag) {
                let per = res.data.percentage
                let data = [{
                    value: per != 'null' ? per == 0 ? 0.0001 : (per / 100) : 0,       // To make value between 0 to 1
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
            console.log('res of all pupil by teacher', res)
            if (res.flag) {
                let per = res.data.percentage
                let data = {
                    value: per != 'null' ? per == 0 ? 0.0001 : (per / 100) : 0,       // To make value between 0 to 1
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

    return (
        <View>
            <HeaderPMInner
                name={item.FirstName + ' ' + item.LastName}
                navigateToBack={() => props.navigation.goBack()}
                navigateToPupilProfileEdit={() => props.navigation.replace('PupilProfileEdit', { item: item })}
                onAlertPress={() => props.navigation.openDrawer()}
                tabIndex={(index) => { handleOnClick(index) }}
            />
            {
                tabSelected === 0 ?
                    <View style={PAGESTYLE.MainProfile}>
                        <ScrollView style={PAGESTYLE.scrollViewCommon} showsVerticalScrollIndicator={false}>
                            <View style={PAGESTYLE.mainContainerProfile}>
                                <View style={PAGESTYLE.profileImageArea}>
                                    <Image style={PAGESTYLE.coverImage} source={Images.Coverback}></Image>
                                    <View style={PAGESTYLE.profileOuter}>
                                        <Image style={PAGESTYLE.profileImage} source={{ uri: baseUrl + item.ProfilePicture }} />
                                    </View>
                                </View>
                            </View>
                            <View style={PAGESTYLE.mainDetails}>
                                <View style={PAGESTYLE.fieldDetails}>
                                    <Text LABLE style={PAGESTYLE.label}>Pupil name</Text>
                                    <Text P style={PAGESTYLE.data}>{item.FirstName} {item.LastName}</Text>
                                </View>
                                <View style={PAGESTYLE.fieldDetails}>
                                    <Text LABLE style={PAGESTYLE.label}>Date of birth</Text>
                                    <Text P style={PAGESTYLE.data}>{moment(item.Dob).format('DD/MM/yyyy')}</Text>
                                </View>
                                <View style={PAGESTYLE.fieldDetails}>
                                    <Text LABLE style={PAGESTYLE.label}>Unique I.D (auto-generated)</Text>
                                    <Text P style={PAGESTYLE.data}>{item.FirstName}</Text>
                                </View>
                                <View style={PAGESTYLE.fieldDetails}>
                                    <Text LABLE style={PAGESTYLE.label}>Notes</Text>
                                    <Text P style={PAGESTYLE.data}>{item.FirstName}</Text>
                                </View>
                            </View>
                            <View HR style={STYLE.hrCommon}></View>
                            <View style={PAGESTYLE.rewardSection}>
                                <View style={PAGESTYLE.fieldDetails}>
                                    <Text LABLE style={PAGESTYLE.label}>Instant rewards for homework</Text>
                                    <View style={PAGESTYLE.rewardStarMark}>
                                        <View style={PAGESTYLE.centerText}>
                                            <ImageBackground source={Images.BronzeStarFill} style={[PAGESTYLE.starSelected]}>
                                                <Text style={PAGESTYLE.starSelectedText}>{bronze}</Text>
                                            </ImageBackground>
                                            <Text style={PAGESTYLE.starText}>Bronze stars</Text>
                                        </View>
                                        <View style={PAGESTYLE.centerStar}>
                                            <ImageBackground source={Images.SilverStarFill} style={[PAGESTYLE.starSelected]}>
                                                <Text style={PAGESTYLE.starSelectedText}>{silver}</Text>
                                            </ImageBackground>
                                            <Text style={PAGESTYLE.starText}>Silver stars</Text>
                                        </View>
                                        <View style={PAGESTYLE.centerText}>
                                            <ImageBackground source={Images.GoldStarFill} style={[PAGESTYLE.starSelected]}>
                                                <Text style={PAGESTYLE.starSelectedText}>{gold}</Text>
                                            </ImageBackground>
                                            <Text style={PAGESTYLE.starText}>Gold stars</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={PAGESTYLE.fieldDetails}>
                                    <Text LABLE style={PAGESTYLE.label}>What is the reward for?</Text>
                                    <TextInput
                                        returnKeyType={"next"}
                                        multiline={true}
                                        autoCapitalize={'sentences'}
                                        numberOfLines={4}
                                        placeholder='Leave feedback here'
                                        style={PAGESTYLE.commonInputTextareaBoldGrey} />
                                </View>
                            </View>
                            <View HR style={STYLE.hrCommon}></View>
                            <View style={PAGESTYLE.pupilPerfomance}>
                                <Text H2 style={PAGESTYLE.titlePerfomance}>Pupil’s performance</Text>
                                {/* <Image style={PAGESTYLE.graph} source={Images.graphImagePupilPerfomance}></Image> */}

                                <View style={PAGESTYLE.performancePArent}>
                                    <ActivityRings
                                        data={chartData}
                                        config={activityConfig} />

                                    <View style={{ flexDirection: 'row', height: 50 }}>
                                        <View style={PAGESTYLE.colorLeftParent}>
                                            <View style={PAGESTYLE.colorSquare} />
                                            <Text style={PAGESTYLE.introText}>{`Engagement over${'\n'}last month`}</Text>
                                        </View>
                                        <View style={PAGESTYLE.colorRightParent}>
                                            <View style={PAGESTYLE.colorSquareRight} />
                                            <Text style={PAGESTYLE.introText}>{`Effort over last${'\n'}month`}</Text>
                                        </View>
                                    </View>
                                    <View HR style={STYLE.hrCommon}></View>
                                    <Text style={PAGESTYLE.bottomText}>Based on {item.FirstName + ' ' + item.LastName}'s engagement and effort, he is doing well and is excelling. He is also very eager to learn and perticularly interested in Mathematics and Science subjects.</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    :
                    <View style={PAGESTYLE.MainProfile}>
                        <Chat tabs={tabSelected} data={item} />
                    </View>
            }

        </View>
    );
}

export default PupilProfileView;