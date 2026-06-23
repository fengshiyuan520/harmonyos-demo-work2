import hilog from "@ohos:hilog";
export interface CaptionFont {
    family: ResourceStr;
    size: number;
    color: ResourceColor;
}
export function registerMyFont(uiContext: UIContext) {
    try {
        uiContext.getFont().registerFont({
            familyName: { "id": 16777222, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" },
            familySrc: { "id": 0, "type": 30000, params: ['HarmonyOS_Condensed.ttf'], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }
        });
    }
    catch (exception) {
        hilog.error(0x0000, 'registerMyFont', `registerFont failed, code: ${exception.code}, message:${exception.message}`);
    }
}
