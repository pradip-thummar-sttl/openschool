import { Alert, PermissionsAndroid, Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import { baseUrl, showMessage } from './Constant';
export const Download = (item, result) => {
    console.log('downolad item', item)
    if (Platform.OS === 'ios') {
        downloadFile(item, (res) => {
            result(res)
        });
    } else {
        try {
            if (PermissionsAndroid.RESULTS.GRANTED === "granted") {
                downloadFile(item);
            } else {
                PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message:
                            'Application needs access to your storage to download File',
                    }
                ).then((granted) => {
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        // Start downloading
                        downloadFile(item, (res) => {
                            result(res)
                        });
                        console.log('Storage Permission Granted.');
                    } else {
                        // If permission denied then show alert
                        Alert.alert('Error', 'Storage Permission Not Granted');
                    }
                });

            }

        } catch (error) {
            // To handle permission related exception
            console.log("++++", error);
        }
    }
}

export const downloadFile = (item, result) => {
    // // Get today's date to add the time suffix in filename
    // let date = new Date();
    // // File URL which we want to download
    // let FILE_URL = item.filename;
    // // Function to get extention of the file url
    // let file_ext = getFileExtention(FILE_URL);

    // file_ext = '.' + file_ext[0];

    // // config: To get response by passing the downloading related options
    // // fs: Root directory path to download
    // const { config, fs } = RNFetchBlob;
    // let RootDir = fs.dirs.PictureDir;
    // let options = {
    //     fileCache: true,
    //     addAndroidDownloads: {
    //         path:
    //             RootDir +
    //             '/file_' +
    //             Math.floor(date.getTime() + date.getSeconds() / 2) +
    //             file_ext,
    //         description: 'downloading file...',
    //         notification: true,
    //         // useDownloadManager works with Android only
    //         useDownloadManager: true,
    //     },
    // };
    // config(options)
    //     .fetch('GET', FILE_URL)
    //     .then(res => {
    //         // Alert after successful downloading
    //         console.log('res -> ', JSON.stringify(res));
    //         FileViewer.open(res.data)
    //         Alert.alert('File Downloaded Successfully.');
    //     }).catch((err) => {
    //         console.log("++++" + err);
    //         Alert.alert(err.toString());
    //     });
    // const { config, fs } = RNFetchBlob
    if (item.uri) {
        console.log('hello uri', item.uri)

        FileViewer.open(item.uri)
        result()
    } else {
        const fileName = item.filename.split('/')
        const localFile = `${RNFS.DocumentDirectoryPath}/${fileName[fileName.length - 1]}`;

        const options = {
            fromUrl: baseUrl + item.filename,
            toFile: localFile
        };
        console.log('options', options);
        RNFS.downloadFile(options).promise
            .then((res) => {
                console.log('hello res', res)
                FileViewer.open(localFile)
                result()
            })
            .then(() => {
                // success
                console.log('hello avy')
                result()
            })
            .catch(error => {
                showMessage('Sorry, unable to find compatible App on your device to view this content')
                result()
            }).catch(error => {
                console.log('hello error')
                result()

            });
    }

};

export const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
        /[^.]+$/.exec(fileUrl) : undefined;
};

