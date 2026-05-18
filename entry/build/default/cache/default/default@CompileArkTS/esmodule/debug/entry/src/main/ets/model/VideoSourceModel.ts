import type { VideoData } from '../model/VideoData';
import { VideoDataType } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/common/constants/CommonConstants";
export const SOURCES: VideoData[] = [
    {
        type: VideoDataType.RAW_FILE,
        videoSrc: 'video_sample_product.mp4',
        name: 'rain',
        description: { "id": 16777258, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" },
        head: { "id": 16777391, "type": 20000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" },
        caption: 'captions.srt',
        index: 0
    },
    {
        type: VideoDataType.RAW_FILE,
        videoSrc: 'video_sample3.mp4',
        name: 'mountain',
        description: { "id": 16777255, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" },
        head: { "id": 16777393, "type": 20000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" },
        caption: 'captions.srt',
        index: 1
    },
    {
        type: VideoDataType.RAW_FILE,
        videoSrc: 'video_sample2.mp4',
        name: 'climber',
        description: { "id": 16777256, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" },
        head: { "id": 16777392, "type": 20000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" },
        caption: 'captions.srt',
        index: 2
    }
];
