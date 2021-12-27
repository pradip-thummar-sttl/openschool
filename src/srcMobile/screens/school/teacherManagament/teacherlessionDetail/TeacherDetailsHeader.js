import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView, Platform, BackHandler } from "react-native";
import STYLE from '../../../../../utils/Style';
import PAGESTYLE from '../Style';
import { opacity } from "../../../../../../utils/Constant";
import HeaderGallery from "./header/HeaderGallery";

const TeacherDetailsHeader = (props) => {
    const [isHide, action] = useState(true);
    useEffect(() => {
        if (Platform.OS==="android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }   
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
      }, [props.navigation]);

      const handleBackButtonClick=()=> {
        props.route.params.goBack()
        return true;
      }
    return (
        <View style={PAGESTYLE.mainPage}>
            <View style={{ width: isHide ? '100%' : '100%' }}>
                <HeaderGallery  navigateToBack={() => props.route.params.goBack()} onAlertPress={() => props.navigation.openDrawer()} />
                <ScrollView showsVerticalScrollIndicator={false} style={PAGESTYLE.teacherLessonGrid}>
                    <View style={PAGESTYLE.whiteBg, PAGESTYLE.mobileGalleryHolder}>
                        <Text style={PAGESTYLE.videoTitle}>Videos</Text>
                        <View style={PAGESTYLE.videoWrap}>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                    <TouchableOpacity>
                                        </TouchableOpacity>
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                    <TouchableOpacity>
                                        </TouchableOpacity>
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>TED-ED. Conserving the Amazo…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>Scratch Garden. Plants and Inse…</Text>
                            </View>
                            <View>
                                <View style={[PAGESTYLE.videoThumb, PAGESTYLE.rightSpaceNone]}>
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>Amazing Rainforest: Birds &amp; Inse…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>DreamWorksTV: 25 Facts about…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>Scratch Garden. Plants and Inse…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>Nat Geo Kids: What comes from…</Text>
                            </View>
                        </View>
                        <Text style={[PAGESTYLE.videoTitle, PAGESTYLE.spaceTop]}>Games &amp; Quizes</Text>
                        <View style={STYLE.hrCommon}></View>
                        <View style={PAGESTYLE.videoWrap}>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                    <TouchableOpacity activeOpacity={opacity}>
                                    </TouchableOpacity>
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                    {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.TedVideo} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} /> */}
                                    <TouchableOpacity
                                        activeOpacity={opacity}>
                                        {/* <Image style={PAGESTYLE.videoSelected} source={Images.TickSelected} /> */}
                                    </TouchableOpacity>
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                    {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.SearchGarden} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} /> */}
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                            <View>
                                <View style={[PAGESTYLE.videoThumb, PAGESTYLE.rightSpaceNone]}>
                                    {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.RainForest} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} /> */}
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                    {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.DreamWorks} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} /> */}
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                    {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.GardenNew} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} /> */}
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                            <View>
                                <View style={PAGESTYLE.videoThumb}>
                                    {/* <Image style={PAGESTYLE.videoThumbnail} source={Images.KidsNet} />
                                    <Image style={PAGESTYLE.videoPlay} source={Images.PlayTransperent} />
                                    <Image style={PAGESTYLE.videoSelected} source={Images.TickUnselected} /> */}
                                </View>
                                <Text style={PAGESTYLE.videoSubTitle}>BBC Bitesize. The Amazon Ra…</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>

    );
}
export default TeacherDetailsHeader;