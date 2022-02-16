import React, { useState, useEffect } from "react";
import { Alert, Image, SafeAreaView, Text, TouchableOpacity, View, Platform, BackHandler,ScrollView } from "react-native";
import WorkSpaceHeader from "../../../component/reusable/header/WorkSpaceHeader";
import PAGESTYLE from './Style';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import { Service } from "../../../../service/Service";
import { EndPoints } from "../../../../service/EndPoints";
import { User } from "../../../../utils/Model";
import { getFileExtention } from "../../../../utils/Download";
import { baseUrl, opacity, showMessage, showMessageWithCallBack } from "../../../../utils/Constant";
import MESSAGE from "../../../../utils/Messages";
// import { ScrollView } from "react-native-gesture-handler";
// import Images from "../../../../utils/Images";
import EraseIcon from "../../../../svg/pupil/workspace/EraseIcon";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ClearIcon from "../../../../svg/pupil/workspace/ClearIcon";
import SavedIcon from "../../../../svg/pupil/workspace/SavedIcon";
import SaveIcon from "../../../../svg/pupil/workspace/SaveIcon";
import UndoIcon from "../../../../svg/pupil/workspace/UndoIcon";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
const WorkSpace = (props) => {
    const [pathCount, setPathCount] = useState(-1)
    const [workSpace, setWorkSpace] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [workSpacePath, setWorkSpacePath] = useState("")
    console.log('props of workspace', props)

    // const workspaceList = props.item
    // const workspaceList = props.route.params.item
    const workspaceList = props.item
    const [example, setExample] = useState(0)
    const [selectedWorkSpace, setSelectedWorkSpace] = useState(props.tappedItem)

    console.log('====', workspaceList)

    useEffect(() => {
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [props.navigation]);

    const handleBackButtonClick = () => {
        props.goBack()
        return true;
    }

    const onSubmitWorkspace = () => {
        console.log(pathCount);
        if (!workSpacePath) {
            showMessage(MESSAGE.saveWorkSpace)
            return
        } else if (pathCount == 0) {
            showMessage(MESSAGE.blankWorkspace)
            return
        }

        setLoading(true)
        const pathArr = workSpacePath.split('/')
        const ext = getFileExtention(workSpacePath)
        const data = new FormData()

        data.append('workspace', {
            uri: Platform.OS == 'android' ?
                workSpacePath.includes('file://') ?
                    workSpacePath :
                    'file://' + workSpacePath
                :
                workSpacePath,
            name: pathArr[pathArr.length - 1],
            type: `image/${ext[0]}`
        })

        Service.postFormData(data, `${EndPoints.UploadWorkspace}/${props.id}/${User.user.UserDetialId}`, (res) => {
            console.log('response of upload workspace', res)
            if (res.flag) {
                showMessageWithCallBack(MESSAGE.workspaceAdded, () => {
                    props.onGoBack()
                    props.goBack()
                })
            } else {
                showMessage(res.message)
            }
            setLoading(false)
        }, (err) => {
            console.log('Error of upload workspace', err)
        })
    }

    const addWorkspace = () => {
        var ws = [...workSpace]
        ws.push('Workspace')
        setWorkSpace(ws)
    }

    return (
        <View style={{ flex: 1 }}>
            {/* <SafeAreaView /> */}
            <WorkSpaceHeader
                isLoading={isLoading}
                isWorkspace={props.isWorkspace}
                goBack={() => props.goBack()}
                onAlertPress={() => props.onAlertPress()}
                onSaveWorkSpacePress={() => { onSubmitWorkspace() }} />
            {
                props.isWorkspace ?
                    <View style={PAGESTYLE.workSpaceView}>
                        {/* <Image style={PAGESTYLE.smallVideoImg} source={require('../../../assets/images/videoSmall.png')} />
                        <SketchCanvas
                            style={{ height: '60%', backgroundColor: 'gray' }}
                            strokeColor={'red'}
                            strokeWidth={7}
                        /> */}

                        <RNSketchCanvas
                            // text={[
                            //     { text: 'Welcome to my GitHub', font: 'fonts/IndieFlower.ttf', fontSize: 30, position: { x: 0, y: 0 }, anchor: { x: 0, y: 0 }, coordinate: 'Absolute', fontColor: 'red', lineHeightMultiple: 1  },
                            // ]}
                            containerStyle={{ height: '100%' }}
                            canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
                            onStrokeEnd={data => {
                                setPathCount(1)
                                console.log('stroke data', data)
                            }}
                            undoComponent={<View style={PAGESTYLE.functionButton}><UndoIcon style={PAGESTYLE.commonWidthIcon} width={hp(2.75)} height={hp(2.57)} /></View>}
                            clearComponent={<View style={PAGESTYLE.functionButton}><ClearIcon style={PAGESTYLE.commonWidthIcon} width={hp(2.75)} height={hp(2.57)} /></View>}
                            eraseComponent={<View style={{...PAGESTYLE.functionButton, marginLeft: 0,}}><EraseIcon style={PAGESTYLE.erase} width={hp(2.75)} height={hp(2.57)} /></View>}
                            strokeComponent={color => (
                                <View style={[{ backgroundColor: color }, PAGESTYLE.strokeColorButton]} />
                            )}
                            strokeSelectedComponent={(color, index, changed) => {
                                return (
                                    <View style={[{ backgroundColor: color, borderWidth: 2 }, PAGESTYLE.strokeColorButton]} />
                                )
                            }}
                            strokeWidthComponent={(w) => {
                                return (<View style={{ ...PAGESTYLE.strokeWidthButton }}>
                                    <View style={{
                                        backgroundColor: 'black',
                                        width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                                    }} />
                                </View>
                                )
                            }}
                            defaultStrokeIndex={0}
                            defaultStrokeWidth={5}
                            // <Text style={PAGESTYLE.functionText}></Text></Text>
                            saveComponent={<View style={PAGESTYLE.functionGreenButton}>{workSpacePath ? <SavedIcon style={PAGESTYLE.commonWidthIcon} width={hp(2.75)} height={hp(2.57)} /> : <SaveIcon style={PAGESTYLE.commonWidthIcon} width={hp(2.75)} height={hp(2.57)} />}</View>}
                            savePreference={() => {
                                return {
                                    folder: "RNSketchCanvas",
                                    filename: String(Math.ceil(Math.random() * 100000000)),
                                    transparent: false,
                                    imageType: "png"
                                }
                            }}
                            onSketchSaved={(success, path) => {
                                // Alert.alert(success ? 'Image saved!' : 'Failed to save image!', path)
                                console.log('paths', path)
                                setWorkSpacePath(path)

                            }}
                            onPathsChange={(pathsCount) => {
                                console.log('ioioio', pathsCount);
                                setPathCount(pathsCount)
                            }}
                        />

                        {/* <View style={PAGESTYLE.bottomView}>
                            <View style={PAGESTYLE.wsView}>
                                {
                                    workSpace.map((item, index) => {
                                        return (
                                            <View style={PAGESTYLE.fileGrp}>
                                                <Text style={PAGESTYLE.fileName}>{item} {index + 1}</Text>
                                                <Image source={require('../../../assets/images/cancel.png')} style={PAGESTYLE.moreIcon} />
                                            </View>
                                        )
                                    })
                                }

                            </View>
                            <View style={PAGESTYLE.editorView}>

                                <TouchableOpacity onPress={() => addWorkspace()} style={PAGESTYLE.workspacebtn} >
                                    <Text style={{ fontSize: 25, color: 'rgba(48,156,233,1)', fontWeight: 'bold', alignSelf: 'center' }}>+
                                    <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold' }}>   NEW WORKSPACE</Text></Text>
                                </TouchableOpacity>
                            </View>
                        </View> */}
                    </View>
                    :
                    <View style={[PAGESTYLE.workSpaceViewSaved,{height : '100%'}]}>
                        <View style={{height :'83%'}}>
                            <Image
                                style={{ height: '100%', width: '100%', resizeMode: 'contain', }}
                                source={{ uri: baseUrl + workspaceList[selectedWorkSpace].filename }} />
                        </View>
                        {/* <View style={PAGESTYLE.bottomView}>
                            <View style={[PAGESTYLE.wsView,{bottom :10,paddingBottom : 10,}]}> */}
                                <ScrollView
                                    style={{flex :1 , width: '100%'}}
                                    showsVerticalScrollIndicator={false}
                                    horizontal={true}>
                                    {
                                        workspaceList.map((item, index) => {
                                            return (
                                                <TouchableOpacity
                                                    activeOpacity={opacity}
                                                    onPress={() => setSelectedWorkSpace(index)}>
                                                    <View style={[PAGESTYLE.fileGrpWorkspacee, { height: 50, width: 150,marginHorizontal : 3}]}>
                                                        <Text style={{ ...PAGESTYLE.fileName, fontWeight: selectedWorkSpace == index ? 'bold' : 'normal' }}>workSpace {index + 1}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </ScrollView>

                            {/* </View>
                        </View> */}
                    </View>
            }

        </View>
    )
}
export default WorkSpace;