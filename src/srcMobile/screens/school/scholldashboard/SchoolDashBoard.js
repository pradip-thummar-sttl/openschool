import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, FlatList } from 'react-native'
import MoreWhite from '../../../../svg/teacher/dashboard/MoreWhite';
import MyDay from '../../../../svg/teacher/dashboard/MyDay';
import Header from "../../../component/reusable/header/Header";
import PAGESTYLE from './Style';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EmptyStatePlaceHohder from '../../../component/reusable/placeholder/EmptyStatePlaceHohder';
import MESSAGE from '../../../../utils/Messages';
import COLORS from '../../../../utils/Colors';

const SchoolDashBoard = (props) => {
    return (
        <View >
            <Header onAlertPress={() => props.navigation.openDrawer()} />
            <ScrollView showsVerticalScrollIndicator={false} style={[PAGESTYLE.padLeftRight,{height:'85%'}]}>
                <View style={PAGESTYLE.viewRow}>
                    <View style={PAGESTYLE.iconView}>
                        <MyDay style={PAGESTYLE.dayIcon} height={hp(2.5)} width={hp(2.5)} />
                        <Text H3 style={PAGESTYLE.dayTitle}>Insights</Text>
                    </View>
                    <TouchableOpacity>
                        <MoreWhite style={PAGESTYLE.moreDashboard} height={hp(2.20)} width={hp(0.65)} />
                    </TouchableOpacity>
                </View>

                <View style={PAGESTYLE.whiteBoard}>
                    {/* <View>
                        <SafeAreaView style={PAGESTYLE.leftTabbing}>
                            <FlatList
                                style={PAGESTYLE.ScrollViewFlatlist}
                                data={[1,2,3,4,5,6]}
                                // renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                // extraData={selectedId}
                                showsVerticalScrollIndicator={false}
                                nestedScrollEnabled
                            />
                        </SafeAreaView>
                    </View> */}
                    <EmptyStatePlaceHohder holderType={5}  title1={MESSAGE.noLesson1} title2={MESSAGE.noLesson2} />
                </View>

                <View style={[PAGESTYLE.viewRow,{marginTop:hp(2), backgroundColor:COLORS.buttonGreen}]}>
                    <View style={PAGESTYLE.iconView}>
                        <MyDay style={PAGESTYLE.dayIcon} height={hp(2.5)} width={hp(2.5)} />
                        <Text H3 style={PAGESTYLE.dayTitle}>Insights</Text>
                    </View>
                    <TouchableOpacity>
                        <MoreWhite style={PAGESTYLE.moreDashboard} height={hp(2.20)} width={hp(0.65)} />
                    </TouchableOpacity>
                </View>

                <View style={PAGESTYLE.whiteBoard}>
                    {/* <View>
                        <SafeAreaView style={PAGESTYLE.leftTabbing}>
                            <FlatList
                                style={PAGESTYLE.ScrollViewFlatlist}
                                data={[1,2,3,4,5,6]}
                                // renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                // extraData={selectedId}
                                showsVerticalScrollIndicator={false}
                                nestedScrollEnabled
                            />
                        </SafeAreaView>
                    </View> */}
                    <EmptyStatePlaceHohder holderType={6}  title1={MESSAGE.noTeacher} title2={MESSAGE.noLessonHWPupil2} />
                </View>
            </ScrollView>

        </View>
    )
}
export default SchoolDashBoard
