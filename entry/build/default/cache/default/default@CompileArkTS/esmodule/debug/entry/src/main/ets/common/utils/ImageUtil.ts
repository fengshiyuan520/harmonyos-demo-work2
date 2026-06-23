import type image from "@ohos:multimedia.image";
import media from "@ohos:multimedia.media";
import hilog from "@ohos:hilog";
const uiContext: UIContext | undefined = AppStorage.get('uiContext');
export class ImageUtil {
    // [Start GetThumbnailFromVideo]
    public static async getThumbnailFromVideo(src: string, timeUs: number) {
        let pixelMap: image.PixelMap | undefined = undefined;
        let queryOption = media.AVImageQueryOptions.AV_IMAGE_QUERY_NEXT_SYNC;
        let param: media.PixelMapParams = {
            width: 540,
            height: 304
        };
        try {
            let generator: media.AVImageGenerator = await media.createAVImageGenerator();
            let fileDescriptor = await uiContext?.getHostContext()?.resourceManager?.getRawFd(src);
            generator.fdSrc = fileDescriptor;
            pixelMap = await generator.fetchFrameByTime(timeUs, queryOption, param);
        }
        catch (exception) {
            hilog.error(0x0000, 'ImageUtil', `getThumbnailFromVideo failed, code is ${exception.code}, message is ${exception.message}`);
        }
        return pixelMap;
    }
}
