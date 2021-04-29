import React, { useState } from "react";
import { Alert, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import WorkSpaceHeader from "../../../component/reusable/header/WorkSpaceHeader";
import PAGESTYLE from './Style';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import { Service } from "../../../service/Service";
import { EndPoints } from "../../../service/EndPoints";
import { User } from "../../../utils/Model";
import { getFileExtention } from "../../../utils/Download";
import { opacity, showMessage, showMessageWithCallBack } from "../../../utils/Constant";
import MESSAGE from "../../../utils/Messages";
import { ScrollView } from "react-native-gesture-handler";
const WorkSpace = (props) => {
    const workspaceList = props.route.params.item
    const [pathCount, setPathCount] = useState(0)
    const [workSpace, setWorkSpace] = useState([])
    const [workSpacePath, setWorkSpacePath] = useState("")
    const [selectedWorkSpace, setSelectedWorkSpace] = useState(props.route.params.tappedItem)

    console.log('====', workspaceList)

    const onSubmitWorkspace = () => {
        if (!workSpacePath) {
            showMessage(MESSAGE.saveWorkSpace)
            return
        } else if(pathCount == 0){
            showMessage(MESSAGE.blankWorkspace)
            return
        }

        const pathArr = workSpacePath.split('/')
        const ext = getFileExtention(workSpacePath)
        const data = new FormData()

        data.append('workspace', {
            uri: workSpacePath,
            name: pathArr[pathArr.length - 1],
            type: `image/${ext[0]}`
        })

        Service.postFormData(data, `${EndPoints.UploadWorkspace}/${props.route.params.id}/${User.user.UserDetialId}`, (res) => {
            console.log('response of upload workspace', res)
            if (res.flag) {
                showMessageWithCallBack(MESSAGE.workspaceAdded, () => {
                    props.route.params.onGoBack()
                    props.navigation.goBack()
                })
            } else {
                showMessage(res.message)
            }
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
            <SafeAreaView />
            <WorkSpaceHeader
                isWorkspace={props.route.params.isWorkspace}
                goBack={() => {
                    props.navigation.goBack()
                }}
                onAlertPress={() => props.navigation.openDrawer()}
                onSaveWorkSpacePress={() => { onSubmitWorkspace() }} />
            {
                props.route.params.isWorkspace ?
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
                                console.log('stroke data', data)
                            }}
                            undoComponent={<View style={PAGESTYLE.functionButton}><Text style={PAGESTYLE.functionText}>Undo</Text></View>}
                            clearComponent={<View style={PAGESTYLE.functionButton}><Text style={PAGESTYLE.functionText}>Clear</Text></View>}
                            eraseComponent={<View style={PAGESTYLE.functionButton}><Text style={PAGESTYLE.functionText}>Erase</Text></View>}
                            strokeComponent={color => (
                                <View style={[{ backgroundColor: color }, PAGESTYLE.strokeColorButton]} />
                            )}
                            strokeSelectedComponent={(color, index, changed) => {
                                return (
                                    <View style={[{ backgroundColor: color, borderWidth: 2 }, PAGESTYLE.strokeColorButton]} />
                                )
                            }}
                            strokeWidthComponent={(w) => {
                                return (<View style={PAGESTYLE.strokeWidthButton}>
                                    <View style={{
                                        backgroundColor: 'white', marginHorizontal: 2.5,
                                        width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                                    }} />
                                </View>
                                )
                            }}
                            defaultStrokeIndex={0}
                            defaultStrokeWidth={5}
                            saveComponent={<View style={PAGESTYLE.functionGreenButton}><Text style={PAGESTYLE.functionText}>{workSpacePath ? 'Saved!' : 'Save'}</Text></View>}
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
                    <View style={PAGESTYLE.workSpaceView}>
                        <View>
                            <Image
                                style={{ height: '100%', width: '100%' }}
                                source={{ uri: workspaceList[selectedWorkSpace].filename }} />
                            {/* .replace('14.143.90.233', '192.168.0.218') */}
                        </View>
                        <View style={PAGESTYLE.bottomView}>
                            <View style={PAGESTYLE.wsView}>
                                <ScrollView
                                    style={{ }}
                                    showsVerticalScrollIndicator={false}
                                    horizontal={true}>
                                    {
                                        workspaceList.map((item, index) => {
                                            return (
                                                <TouchableOpacity
                                                    activeOpacity={opacity}
                                                    onPress={() => setSelectedWorkSpace(index)}>
                                                    <View style={PAGESTYLE.fileGrp}>
                                                        <Text style={{ ...PAGESTYLE.fileName, fontWeight: selectedWorkSpace == index ? 'bold' : 'normal' }}>Workspace {index + 1}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </ScrollView>

                            </View>
                        </View>
                    </View>
            }

        </View>
    )
}
export default WorkSpace;