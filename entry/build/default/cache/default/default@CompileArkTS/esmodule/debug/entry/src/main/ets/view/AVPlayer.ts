if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AVPlayer_Params {
    isFullLandscapeScreen?: boolean;
    isPageShow?: boolean;
    index?: number;
    curSource?: VideoData;
    curIndex?: number;
    isPIPShow?: boolean;
    showPopup?: boolean;
    avPlayerController?: AvPlayerController;
    isSliderDragging?: boolean;
    visible?: boolean;
    volume?: number;
    screenBrightness?: number;
    showBulletComment?: boolean;
    bulletComments?: BulletComment[];
    bulletCommentInput?: string;
    captionFont?: CaptionFont;
    isShowCaptionConfig?: boolean;
    imgWidth?: number;
    imgHeight?: number;
    screenshotTime?: number;
    showImg?: boolean;
    pixmap?: image.PixelMap | undefined;
    speedSelect?: number;
    speedIndex?: number;
    speedName?: Resource;
    isMuted?: boolean;
    languageSelect?: number;
    currentLanguageType?: number;
    presetBulletCommentsTimerId?: number;
    presetBulletComments?;
    xComponentController?;
    onFullScreenClick?: (isLandscape?: boolean) => void;
    screenWidth?: number;
    screenHeight?: number;
    orgScreenBrightness?: number;
    isInputtingBulletComment?: boolean;
    pipWindowController?: PiPWindowController;
    speedDialogController?: CustomDialogController;
    languageDialogController?: CustomDialogController;
}
import window from "@ohos:window";
import type image from "@ohos:multimedia.image";
import media from "@ohos:multimedia.media";
import inputMethod from "@ohos:inputMethod";
import type { BusinessError } from "@ohos:base";
import settings from "@ohos:settings";
import hilog from "@ohos:hilog";
import { BulletCommentView } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/view/BulletCommentView";
import { BulletComment } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/model/BulletCommentModel";
import { CaptionFontView } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/view/CaptionFontView";
import { registerMyFont } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/model/CaptionFontModel";
import type { CaptionFont } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/model/CaptionFontModel";
import { VolumeAndBrightnessView } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/view/VolumeAndBrightnessView";
import { VideoSnapshotView } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/view/VideoSnapshotView";
import { TimeUtil } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/common/utils/TimeUtils";
import { CommonConstants, ScreenShotConstants } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/common/constants/CommonConstants";
import type { VideoData } from '../model/VideoData';
import { AvPlayerController } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/controller/AvPlayerController";
import { PiPWindowController } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/controller/PipWindowController";
import { SpeedDialog } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/view/SpeedDialog";
import { LanguageDialog } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/view/LanguageDialog";
const TAG = '[AVPlayer]';
export class AVPlayer extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__isFullLandscapeScreen = new SynchedPropertySimpleOneWayPU(params.isFullLandscapeScreen, this, "isFullLandscapeScreen");
        this.__isPageShow = new SynchedPropertySimpleOneWayPU(params.isPageShow, this, "isPageShow");
        this.__index = new SynchedPropertySimpleOneWayPU(params.index, this, "index");
        this.__curSource = new SynchedPropertyObjectOneWayPU(params.curSource, this, "curSource");
        this.__curIndex = new SynchedPropertySimpleOneWayPU(params.curIndex, this, "curIndex");
        this.__isPIPShow = this.createStorageLink('isPIPShow', false, "isPIPShow");
        this.__showPopup = new ObservedPropertySimplePU(false, this, "showPopup");
        this.__avPlayerController = new ObservedPropertyObjectPU(new AvPlayerController(), this, "avPlayerController");
        this.__isSliderDragging = new ObservedPropertySimplePU(false, this, "isSliderDragging");
        this.__visible = new ObservedPropertySimplePU(false, this, "visible");
        this.__volume = new ObservedPropertySimplePU(5, this, "volume");
        this.__screenBrightness = new ObservedPropertySimplePU(0, this, "screenBrightness");
        this.__showBulletComment = new ObservedPropertySimplePU(true, this, "showBulletComment");
        this.__bulletComments = new ObservedPropertyObjectPU([], this, "bulletComments");
        this.__bulletCommentInput = new ObservedPropertySimplePU('', this, "bulletCommentInput");
        this.__captionFont = new ObservedPropertyObjectPU({
            family: 'Sans',
            size: 14,
            color: Color.White
        }, this, "captionFont");
        this.__isShowCaptionConfig = new ObservedPropertySimplePU(false, this, "isShowCaptionConfig");
        this.__imgWidth = new ObservedPropertySimplePU(0, this, "imgWidth");
        this.__imgHeight = new ObservedPropertySimplePU(0, this, "imgHeight");
        this.__screenshotTime = new ObservedPropertySimplePU(0, this, "screenshotTime");
        this.__showImg = new ObservedPropertySimplePU(false, this, "showImg");
        this.__pixmap = new ObservedPropertyObjectPU(undefined, this, "pixmap");
        this.__speedSelect = new ObservedPropertySimplePU(0, this, "speedSelect");
        this.__speedIndex = new ObservedPropertySimplePU(0, this, "speedIndex");
        this.__speedName = new ObservedPropertyObjectPU({ "id": 16777267, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }, this, "speedName");
        this.__isMuted = new ObservedPropertySimplePU(false, this, "isMuted");
        this.__languageSelect = new ObservedPropertySimplePU(0, this, "languageSelect");
        this.__currentLanguageType = new ObservedPropertySimplePU(0, this, "currentLanguageType");
        this.presetBulletCommentsTimerId = -1;
        this.presetBulletComments = [{ "id": 16777228, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }, { "id": 16777229, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }, { "id": 16777230, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }];
        this.xComponentController = new XComponentController();
        this.onFullScreenClick = () => {
        };
        this.screenWidth = 0;
        this.screenHeight = 0;
        this.orgScreenBrightness = 0;
        this.isInputtingBulletComment = false;
        this.pipWindowController = new PiPWindowController(this.avPlayerController, this.xComponentController);
        this.speedDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new SpeedDialog(this, {
                    speedSelect: this.__speedSelect,
                    speedIndex: this.__speedIndex,
                    speedName: this.__speedName,
                    avPlayerController: this.__avPlayerController
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/view/AVPlayer.ets", line: 88, col: 14 });
                jsDialog.setController(this.speedDialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        speedSelect: this.__speedSelect,
                        speedIndex: this.__speedIndex,
                        speedName: this.__speedName,
                        avPlayerController: this.__avPlayerController
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            alignment: DialogAlignment.Center,
            offset: { dx: { "id": 16777365, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }, dy: { "id": 16777364, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" } }
        }, this);
        this.languageDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new LanguageDialog(this, {
                    languageSelect: this.__languageSelect,
                    currentLanguageType: this.__currentLanguageType,
                    avPlayerController: this.__avPlayerController
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/view/AVPlayer.ets", line: 98, col: 14 });
                jsDialog.setController(this.languageDialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        languageSelect: this.__languageSelect,
                        currentLanguageType: this.__currentLanguageType,
                        avPlayerController: this.__avPlayerController
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            alignment: DialogAlignment.Center,
            offset: { dx: { "id": 16777365, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }, dy: { "id": 16777364, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" } }
        }, this);
        this.setInitiallyProvidedValue(params);
        this.declareWatch("isFullLandscapeScreen", this.onFullScreenChange);
        this.declareWatch("isPageShow", this.onPageShowChange);
        this.declareWatch("curIndex", this.onIndexChange);
        this.declareWatch("isPIPShow", this.onPIPShowChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AVPlayer_Params) {
        if (params.isFullLandscapeScreen === undefined) {
            this.__isFullLandscapeScreen.set(false);
        }
        if (params.isPageShow === undefined) {
            this.__isPageShow.set(false);
        }
        if (params.index === undefined) {
            this.__index.set(0);
        }
        if (params.curIndex === undefined) {
            this.__curIndex.set(CommonConstants.CURINDEX_DEFAULT_NUM);
        }
        if (params.showPopup !== undefined) {
            this.showPopup = params.showPopup;
        }
        if (params.avPlayerController !== undefined) {
            this.avPlayerController = params.avPlayerController;
        }
        if (params.isSliderDragging !== undefined) {
            this.isSliderDragging = params.isSliderDragging;
        }
        if (params.visible !== undefined) {
            this.visible = params.visible;
        }
        if (params.volume !== undefined) {
            this.volume = params.volume;
        }
        if (params.screenBrightness !== undefined) {
            this.screenBrightness = params.screenBrightness;
        }
        if (params.showBulletComment !== undefined) {
            this.showBulletComment = params.showBulletComment;
        }
        if (params.bulletComments !== undefined) {
            this.bulletComments = params.bulletComments;
        }
        if (params.bulletCommentInput !== undefined) {
            this.bulletCommentInput = params.bulletCommentInput;
        }
        if (params.captionFont !== undefined) {
            this.captionFont = params.captionFont;
        }
        if (params.isShowCaptionConfig !== undefined) {
            this.isShowCaptionConfig = params.isShowCaptionConfig;
        }
        if (params.imgWidth !== undefined) {
            this.imgWidth = params.imgWidth;
        }
        if (params.imgHeight !== undefined) {
            this.imgHeight = params.imgHeight;
        }
        if (params.screenshotTime !== undefined) {
            this.screenshotTime = params.screenshotTime;
        }
        if (params.showImg !== undefined) {
            this.showImg = params.showImg;
        }
        if (params.pixmap !== undefined) {
            this.pixmap = params.pixmap;
        }
        if (params.speedSelect !== undefined) {
            this.speedSelect = params.speedSelect;
        }
        if (params.speedIndex !== undefined) {
            this.speedIndex = params.speedIndex;
        }
        if (params.speedName !== undefined) {
            this.speedName = params.speedName;
        }
        if (params.isMuted !== undefined) {
            this.isMuted = params.isMuted;
        }
        if (params.languageSelect !== undefined) {
            this.languageSelect = params.languageSelect;
        }
        if (params.currentLanguageType !== undefined) {
            this.currentLanguageType = params.currentLanguageType;
        }
        if (params.presetBulletCommentsTimerId !== undefined) {
            this.presetBulletCommentsTimerId = params.presetBulletCommentsTimerId;
        }
        if (params.presetBulletComments !== undefined) {
            this.presetBulletComments = params.presetBulletComments;
        }
        if (params.xComponentController !== undefined) {
            this.xComponentController = params.xComponentController;
        }
        if (params.onFullScreenClick !== undefined) {
            this.onFullScreenClick = params.onFullScreenClick;
        }
        if (params.screenWidth !== undefined) {
            this.screenWidth = params.screenWidth;
        }
        if (params.screenHeight !== undefined) {
            this.screenHeight = params.screenHeight;
        }
        if (params.orgScreenBrightness !== undefined) {
            this.orgScreenBrightness = params.orgScreenBrightness;
        }
        if (params.isInputtingBulletComment !== undefined) {
            this.isInputtingBulletComment = params.isInputtingBulletComment;
        }
        if (params.pipWindowController !== undefined) {
            this.pipWindowController = params.pipWindowController;
        }
        if (params.speedDialogController !== undefined) {
            this.speedDialogController = params.speedDialogController;
        }
        if (params.languageDialogController !== undefined) {
            this.languageDialogController = params.languageDialogController;
        }
    }
    updateStateVars(params: AVPlayer_Params) {
        this.__isFullLandscapeScreen.reset(params.isFullLandscapeScreen);
        this.__isPageShow.reset(params.isPageShow);
        this.__index.reset(params.index);
        this.__curSource.reset(params.curSource);
        this.__curIndex.reset(params.curIndex);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isFullLandscapeScreen.purgeDependencyOnElmtId(rmElmtId);
        this.__isPageShow.purgeDependencyOnElmtId(rmElmtId);
        this.__index.purgeDependencyOnElmtId(rmElmtId);
        this.__curSource.purgeDependencyOnElmtId(rmElmtId);
        this.__curIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__isPIPShow.purgeDependencyOnElmtId(rmElmtId);
        this.__showPopup.purgeDependencyOnElmtId(rmElmtId);
        this.__avPlayerController.purgeDependencyOnElmtId(rmElmtId);
        this.__isSliderDragging.purgeDependencyOnElmtId(rmElmtId);
        this.__visible.purgeDependencyOnElmtId(rmElmtId);
        this.__volume.purgeDependencyOnElmtId(rmElmtId);
        this.__screenBrightness.purgeDependencyOnElmtId(rmElmtId);
        this.__showBulletComment.purgeDependencyOnElmtId(rmElmtId);
        this.__bulletComments.purgeDependencyOnElmtId(rmElmtId);
        this.__bulletCommentInput.purgeDependencyOnElmtId(rmElmtId);
        this.__captionFont.purgeDependencyOnElmtId(rmElmtId);
        this.__isShowCaptionConfig.purgeDependencyOnElmtId(rmElmtId);
        this.__imgWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__imgHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__screenshotTime.purgeDependencyOnElmtId(rmElmtId);
        this.__showImg.purgeDependencyOnElmtId(rmElmtId);
        this.__pixmap.purgeDependencyOnElmtId(rmElmtId);
        this.__speedSelect.purgeDependencyOnElmtId(rmElmtId);
        this.__speedIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__speedName.purgeDependencyOnElmtId(rmElmtId);
        this.__isMuted.purgeDependencyOnElmtId(rmElmtId);
        this.__languageSelect.purgeDependencyOnElmtId(rmElmtId);
        this.__currentLanguageType.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isFullLandscapeScreen.aboutToBeDeleted();
        this.__isPageShow.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__curSource.aboutToBeDeleted();
        this.__curIndex.aboutToBeDeleted();
        this.__isPIPShow.aboutToBeDeleted();
        this.__showPopup.aboutToBeDeleted();
        this.__avPlayerController.aboutToBeDeleted();
        this.__isSliderDragging.aboutToBeDeleted();
        this.__visible.aboutToBeDeleted();
        this.__volume.aboutToBeDeleted();
        this.__screenBrightness.aboutToBeDeleted();
        this.__showBulletComment.aboutToBeDeleted();
        this.__bulletComments.aboutToBeDeleted();
        this.__bulletCommentInput.aboutToBeDeleted();
        this.__captionFont.aboutToBeDeleted();
        this.__isShowCaptionConfig.aboutToBeDeleted();
        this.__imgWidth.aboutToBeDeleted();
        this.__imgHeight.aboutToBeDeleted();
        this.__screenshotTime.aboutToBeDeleted();
        this.__showImg.aboutToBeDeleted();
        this.__pixmap.aboutToBeDeleted();
        this.__speedSelect.aboutToBeDeleted();
        this.__speedIndex.aboutToBeDeleted();
        this.__speedName.aboutToBeDeleted();
        this.__isMuted.aboutToBeDeleted();
        this.__languageSelect.aboutToBeDeleted();
        this.__currentLanguageType.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __isFullLandscapeScreen: SynchedPropertySimpleOneWayPU<boolean>; // Whether the video is played in full screen
    get isFullLandscapeScreen() {
        return this.__isFullLandscapeScreen.get();
    }
    set isFullLandscapeScreen(newValue: boolean) {
        this.__isFullLandscapeScreen.set(newValue);
    }
    // [Start CreatePageShowChangeEvent]
    private __isPageShow: SynchedPropertySimpleOneWayPU<boolean>; // Whether the app is on the front end or back end
    get isPageShow() {
        return this.__isPageShow.get();
    }
    set isPageShow(newValue: boolean) {
        this.__isPageShow.set(newValue);
    }
    // [End CreatePageShowChangeEvent]
    private __index: SynchedPropertySimpleOneWayPU<number>; // The index of each video
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __curSource: SynchedPropertySimpleOneWayPU<VideoData>; // Current video
    get curSource() {
        return this.__curSource.get();
    }
    set curSource(newValue: VideoData) {
        this.__curSource.set(newValue);
    }
    private __curIndex: SynchedPropertySimpleOneWayPU<number>; // The index of playing video
    get curIndex() {
        return this.__curIndex.get();
    }
    set curIndex(newValue: number) {
        this.__curIndex.set(newValue);
    }
    private __isPIPShow: ObservedPropertyAbstractPU<boolean>; // Whether to show picture in picture
    get isPIPShow() {
        return this.__isPIPShow.get();
    }
    set isPIPShow(newValue: boolean) {
        this.__isPIPShow.set(newValue);
    }
    private __showPopup: ObservedPropertySimplePU<boolean>; // Control pop-up display
    get showPopup() {
        return this.__showPopup.get();
    }
    set showPopup(newValue: boolean) {
        this.__showPopup.set(newValue);
    }
    private __avPlayerController: ObservedPropertyObjectPU<AvPlayerController>; // The instance of AvPlayer
    get avPlayerController() {
        return this.__avPlayerController.get();
    }
    set avPlayerController(newValue: AvPlayerController) {
        this.__avPlayerController.set(newValue);
    }
    private __isSliderDragging: ObservedPropertySimplePU<boolean>; // Whether in the slider dragging state
    get isSliderDragging() {
        return this.__isSliderDragging.get();
    }
    set isSliderDragging(newValue: boolean) {
        this.__isSliderDragging.set(newValue);
    }
    private __visible: ObservedPropertySimplePU<boolean>; // Whether to show slider/image
    get visible() {
        return this.__visible.get();
    }
    set visible(newValue: boolean) {
        this.__visible.set(newValue);
    }
    private __volume: ObservedPropertySimplePU<number>; // Set original video volume number
    get volume() {
        return this.__volume.get();
    }
    set volume(newValue: number) {
        this.__volume.set(newValue);
    }
    private __screenBrightness: ObservedPropertySimplePU<number>; // Screen luminance
    get screenBrightness() {
        return this.__screenBrightness.get();
    }
    set screenBrightness(newValue: number) {
        this.__screenBrightness.set(newValue);
    }
    private __showBulletComment: ObservedPropertySimplePU<boolean>; // Whether to show bullet comments
    get showBulletComment() {
        return this.__showBulletComment.get();
    }
    set showBulletComment(newValue: boolean) {
        this.__showBulletComment.set(newValue);
    }
    private __bulletComments: ObservedPropertyObjectPU<BulletComment[]>; // Bullet comments storage array
    get bulletComments() {
        return this.__bulletComments.get();
    }
    set bulletComments(newValue: BulletComment[]) {
        this.__bulletComments.set(newValue);
    }
    private __bulletCommentInput: ObservedPropertySimplePU<string>; // User input bullet comment
    get bulletCommentInput() {
        return this.__bulletCommentInput.get();
    }
    set bulletCommentInput(newValue: string) {
        this.__bulletCommentInput.set(newValue);
    }
    private __captionFont: ObservedPropertyObjectPU<CaptionFont>; // Default font style
    get captionFont() {
        return this.__captionFont.get();
    }
    set captionFont(newValue: CaptionFont) {
        this.__captionFont.set(newValue);
    }
    private __isShowCaptionConfig: ObservedPropertySimplePU<boolean>; // Whether to show CaptionFontComponent
    get isShowCaptionConfig() {
        return this.__isShowCaptionConfig.get();
    }
    set isShowCaptionConfig(newValue: boolean) {
        this.__isShowCaptionConfig.set(newValue);
    }
    private __imgWidth: ObservedPropertySimplePU<number>; // The width of video snapshot image
    get imgWidth() {
        return this.__imgWidth.get();
    }
    set imgWidth(newValue: number) {
        this.__imgWidth.set(newValue);
    }
    private __imgHeight: ObservedPropertySimplePU<number>; // The height of video snapshot image
    get imgHeight() {
        return this.__imgHeight.get();
    }
    set imgHeight(newValue: number) {
        this.__imgHeight.set(newValue);
    }
    private __screenshotTime: ObservedPropertySimplePU<number>; // Video snapshot time
    get screenshotTime() {
        return this.__screenshotTime.get();
    }
    set screenshotTime(newValue: number) {
        this.__screenshotTime.set(newValue);
    }
    private __showImg: ObservedPropertySimplePU<boolean>; // Whether to show video snapshot image
    get showImg() {
        return this.__showImg.get();
    }
    set showImg(newValue: boolean) {
        this.__showImg.set(newValue);
    }
    private __pixmap: ObservedPropertyObjectPU<image.PixelMap | undefined>; // Video snapshot image
    get pixmap() {
        return this.__pixmap.get();
    }
    set pixmap(newValue: image.PixelMap | undefined) {
        this.__pixmap.set(newValue);
    }
    private __speedSelect: ObservedPropertySimplePU<number>; // Speed Magnification Selection
    get speedSelect() {
        return this.__speedSelect.get();
    }
    set speedSelect(newValue: number) {
        this.__speedSelect.set(newValue);
    }
    private __speedIndex: ObservedPropertySimplePU<number>; // Index of the playback rate list.
    get speedIndex() {
        return this.__speedIndex.get();
    }
    set speedIndex(newValue: number) {
        this.__speedIndex.set(newValue);
    }
    private __speedName: ObservedPropertyObjectPU<Resource>;
    get speedName() {
        return this.__speedName.get();
    }
    set speedName(newValue: Resource) {
        this.__speedName.set(newValue);
    }
    private __isMuted: ObservedPropertySimplePU<boolean>; // Whether is sound off
    get isMuted() {
        return this.__isMuted.get();
    }
    set isMuted(newValue: boolean) {
        this.__isMuted.set(newValue);
    }
    private __languageSelect: ObservedPropertySimplePU<number>; // Index of the current selection
    get languageSelect() {
        return this.__languageSelect.get();
    }
    set languageSelect(newValue: number) {
        this.__languageSelect.set(newValue);
    }
    private __currentLanguageType: ObservedPropertySimplePU<number>; // Current language type
    get currentLanguageType() {
        return this.__currentLanguageType.get();
    }
    set currentLanguageType(newValue: number) {
        this.__currentLanguageType.set(newValue);
    }
    private presetBulletCommentsTimerId: number; // The timer of preset bullet comments
    private presetBulletComments; // Preset bullet comments
    private xComponentController; // The instance of XComponent
    private onFullScreenClick: (isLandscape?: boolean) => void;
    private screenWidth: number; //Screen width
    private screenHeight: number; // Screen height
    private orgScreenBrightness: number; //The original screen brightness
    private isInputtingBulletComment: boolean; // Whether is inputting bullet comment
    private pipWindowController: PiPWindowController; // The instance of picture in picture
    private speedDialogController: CustomDialogController;
    private languageDialogController: CustomDialogController;
    aboutToAppear(): void {
        let windowClass: window.Window | undefined = undefined;
        const context = this.getUIContext().getHostContext();
        registerMyFont(this.getUIContext());
        settings.getValue(context, settings.display.SCREEN_BRIGHTNESS_STATUS, settings.domainName.DEVICE_SHARED)
            .then((value) => {
            this.screenBrightness = Number(value) / 255;
            this.orgScreenBrightness = Number(value) / 255;
        });
        try {
            window.getLastWindow(this.getUIContext().getHostContext(), (err: BusinessError, data: window.Window) => {
                if (err.code) {
                    hilog.error(0x0000, TAG, `Failed to obtain the top window. Cause code: ${err.code}, message: ${err.message}`);
                }
                windowClass = data;
                this.screenWidth = windowClass.getWindowProperties().windowRect.width;
                this.screenHeight = windowClass.getWindowProperties().windowRect.height;
            });
        }
        catch (exception) {
            hilog.error(0x0000, TAG, `Failed to obtain the top window. Cause code: ${exception.code}, message: ${exception.message}`);
        }
    }
    aboutToDisappear(): void {
        this.avPlayerController.videoRelease();
        if (this.presetBulletCommentsTimerId > 0) {
            clearInterval(this.presetBulletCommentsTimerId);
        }
    }
    onFullScreenChange() {
        if (this.isFullLandscapeScreen && this.index === this.curIndex) {
            // Enter full screen mode, start to show preset bullet comment
            this.generatePresetBulletComments();
        }
        else if (!this.isFullLandscapeScreen && this.index === this.curIndex) {
            //exist full screen mode, set screen brightness back to original number
            this.setScreenBrightness(this.orgScreenBrightness);
            // Exist full screen mode, set CaptionFontView invisible
            this.isShowCaptionConfig = false;
            // Exist full screen mode, set videoSnapshotView invisible
            this.showImg = false;
            this.imgWidth = 0;
            this.imgHeight = 0;
            // Exist full screen mode, clear timer
            if (this.presetBulletCommentsTimerId > 0) {
                clearInterval(this.presetBulletCommentsTimerId);
            }
        }
    }
    // [Start OnPageShowChange]
    onPageShowChange() {
        if (!this.isPIPShow && this.curIndex === this.index) {
            this.isPageShow ? this.resumePlayback() : this.pausePlay();
        }
    }
    // [End OnPageShowChange]
    // Click videoList, switch video to play
    onIndexChange() {
        if (this.curIndex !== this.index) {
            this.avPlayerController.videoPause();
            this.pipWindowController.destroyPipController();
        }
        else {
            if (this.avPlayerController.isReady === true) {
                this.avPlayerController.videoPlay();
                this.onPIPShowChange();
            }
            else {
                let intervalFlag = setInterval(() => {
                    if (this.curIndex !== this.index) {
                        clearInterval(intervalFlag);
                    }
                    if (this.avPlayerController.isReady === true && this.isPageShow) {
                        this.avPlayerController.videoPlay();
                        clearInterval(intervalFlag);
                    }
                }, 100);
            }
        }
    }
    onPIPShowChange() {
        if (this.isPIPShow && this.curIndex === this.index) {
            this.pipWindowController.createPipController();
        }
        else {
            this.pipWindowController.destroyPipController();
        }
    }
    // Normal mode: playControl
    playControl(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.margin({
                bottom: this.isFullLandscapeScreen ? (AppStorage.get<number>('navBarHeight') || 0) : { "id": 16777327, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.isFullLandscapeScreen) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create({ space: 5 });
                        Row.padding({ left: 8, right: 8 });
                        Row.width(CommonConstants.WIDTH_FULL_PERCENT);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(TimeUtil.millisecondsToTime(this.avPlayerController.currentTime));
                        Text.fontSize({ "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                        Text.fontColor(Color.White);
                        Text.opacity({ "id": 16777333, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Slider.create({
                            value: this.avPlayerController.currentTime,
                            min: CommonConstants.SLIDER_MIN,
                            max: this.avPlayerController.durationTime,
                            step: CommonConstants.SLIDER_STEP,
                            direction: Axis.Horizontal,
                            style: SliderStyle.OutSet
                        });
                        Slider.height({ "id": 16777350, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                        Slider.trackColor({ "id": 16777292, "type": 10001, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                        Slider.showSteps(false);
                        Slider.blockSize({ width: 16, height: 16 });
                        Slider.blockColor(Color.White);
                        Slider.layoutWeight(1);
                        Slider.trackThickness(6);
                        Slider.trackBorderRadius(CommonConstants.TRACK_BORDER_RADIUS);
                        Slider.selectedBorderRadius(CommonConstants.TRACK_BORDER_RADIUS);
                        Slider.zIndex(CommonConstants.SLIDER_INDEX);
                        Slider.onChange((value: number, mode: SliderChangeMode) => {
                            this.sliderOnchange(value, mode);
                        });
                    }, Slider);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(TimeUtil.millisecondsToTime(this.avPlayerController.durationTime));
                        Text.fontColor(Color.White);
                        Text.fontSize(12);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777381, "type": 20000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                        Image.fillColor({ "id": 125831026, "type": 10001, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                        Image.width({ "id": 16777350, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                        Image.height({ "id": 16777350, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                        Image.onClick(() => {
                            this.onFullScreenClick?.(true);
                        });
                    }, Image);
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    private sliderOnchange(seconds: number, mode: SliderChangeMode) {
        switch (mode) {
            case SliderChangeMode.Begin:
                break;
            case SliderChangeMode.Click:
                break;
            case SliderChangeMode.Moving:
                this.isSliderDragging = true;
                break;
            case SliderChangeMode.End:
                this.avPlayerController.videoSeek(seconds);
                this.isSliderDragging = false;
                break;
            default:
                break;
        }
    }
    async iconOnclick() {
        if (this.avPlayerController.isPlaying) {
            this.avPlayerController.videoPause();
            let context = this.getUIContext().getHostContext() as Context;
            try {
                let windowClass = await window.getLastWindow(context);
                await windowClass.setWindowKeepScreenOn(false);
            }
            catch (exception) {
                hilog.error(0x0000, TAG, `setWindowKeepScreenOn failed: code: ${exception.code}, message: ${exception.message}`);
            }
        }
        else {
            if (this.avPlayerController.isReady === true) {
                this.avPlayerController.videoPlay();
            }
            let context = this.getUIContext().getHostContext() as Context;
            try {
                let windowClass = await window.getLastWindow(context);
                await windowClass.setWindowKeepScreenOn(true);
            }
            catch (exception) {
                hilog.error(0x0000, TAG, `setWindowKeepScreenOn failed: code: ${exception.code}, message: ${exception.message}`);
            }
        }
    }
    // Full screen mode: playControl and other control button
    fullLandscapeScreenControl(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height('40%');
            Column.width('100%');
            Column.position({ y: '77%' });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // First row: caption
            Row.create();
            // First row: caption
            Row.height(10);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.avPlayerController.currentCaption || '');
            Text.fontColor(this.captionFont.color);
            Text.fontSize(this.captionFont.size);
            Text.fontFamily(this.captionFont.family);
        }, Text);
        Text.pop();
        // First row: caption
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Second row: progress
            Row.create({ space: 3 });
            // Second row: progress
            Row.padding({ left: 8, right: 8 });
            // Second row: progress
            Row.width(CommonConstants.WIDTH_FULL_PERCENT);
            // Second row: progress
            Row.backgroundColor({ "id": 16777284, "type": 10001, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(TimeUtil.millisecondsToTime(this.avPlayerController.currentTime));
            Text.fontSize({ "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Text.fontColor(Color.White);
            Text.opacity({ "id": 16777333, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Slider.create({
                value: this.avPlayerController.currentTime,
                min: CommonConstants.SLIDER_MIN,
                max: this.avPlayerController.durationTime,
                step: CommonConstants.SLIDER_STEP,
                direction: Axis.Horizontal,
                style: SliderStyle.OutSet
            });
            Slider.height({ "id": 16777350, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Slider.trackColor({ "id": 16777292, "type": 10001, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Slider.showSteps(false);
            Slider.blockSize({ width: 16, height: 16 });
            Slider.blockColor(Color.White);
            Slider.layoutWeight(1);
            Slider.trackThickness(6);
            Slider.trackBorderRadius(CommonConstants.TRACK_BORDER_RADIUS);
            Slider.selectedBorderRadius(CommonConstants.TRACK_BORDER_RADIUS);
            Slider.zIndex(CommonConstants.SLIDER_INDEX);
            Slider.onChange((value: number, mode: SliderChangeMode) => {
                this.sliderOnchange(value, mode);
            });
        }, Slider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(TimeUtil.millisecondsToTime(this.avPlayerController.durationTime));
            Text.fontSize({ "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Text.fontColor(Color.White);
            Text.opacity({ "id": 16777333, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.speedName, { type: ButtonType.Normal });
            Button.border({ width: { "id": 16777343, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }, color: Color.White });
            Button.width({ "id": 16777359, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Button.height({ "id": 16777351, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Button.fontSize({ "id": 16777346, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Button.borderRadius({ "id": 16777349, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Button.fontColor(Color.White);
            Button.backgroundColor('rgba(0, 0, 0, 0)');
            Button.opacity({ "id": 16777343, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Button.padding({ left: { "id": 16777357, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }, right: { "id": 16777357, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" } });
            Button.margin({ left: { "id": 16777357, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" } });
            Button.id('Speed');
            Button.onClick(() => {
                if (!this.isInputtingBulletComment) {
                    this.speedSelect = this.speedIndex;
                    this.speedDialogController.open();
                }
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.type(ButtonType.Normal);
            Button.width({ "id": 16777353, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Button.height({ "id": 16777353, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Button.borderRadius({ "id": 16777349, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Button.backgroundColor('rgba(0, 0, 0, 0)');
            Button.fontColor(Color.White);
            Button.onClick(() => {
                if (!this.isInputtingBulletComment) {
                    this.isMuted = !this.isMuted;
                    this.avPlayerController.videoMuted(this.isMuted);
                }
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.isMuted ? { "id": 16777384, "type": 20000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" } : { "id": 16777383, "type": 20000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Image.width({ "id": 16777351, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Image.height({ "id": 16777351, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
        }, Image);
        Button.pop();
        // Second row: progress
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Third row: button
            Row.create({ space: 7 });
            // Third row: button
            Row.height('20%');
            // Third row: button
            Row.margin({ top: 5 });
            // Third row: button
            Row.padding({ left: 8, right: 15 });
            // Third row: button
            Row.width(CommonConstants.WIDTH_FULL_PERCENT);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Switch caption language
            Button.createWithChild();
            // Switch caption language
            Button.onClick(() => {
                if (!this.isInputtingBulletComment) {
                    this.languageSelect = this.currentLanguageType;
                    this.languageDialogController.open();
                }
            });
            // Switch caption language
            Button.backgroundColor(Color.Transparent);
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777385, "type": 20000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Image.width({ "id": 16777351, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Image.height({ "id": 16777351, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
        }, Image);
        // Switch caption language
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Set caption fontStyle
            Button.createWithChild();
            // Set caption fontStyle
            Button.onClick(() => {
                if (!this.isInputtingBulletComment) {
                    this.pausePlay();
                    this.isShowCaptionConfig = true;
                }
            });
            // Set caption fontStyle
            Button.backgroundColor(Color.Transparent);
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777373, "type": 20000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
        }, Image);
        // Set caption fontStyle
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Video snapshot
            Button.createWithChild();
            // Video snapshot
            Button.onClick(() => {
                if (!this.isInputtingBulletComment) {
                    this.pausePlay();
                    this.screenshotTime = this.avPlayerController.currentTime;
                    this.screenshot();
                    this.showImg = true;
                    this.getUIContext().animateTo({
                        duration: 500,
                        iterations: 1,
                        playMode: PlayMode.Normal,
                    }, () => {
                        this.imgWidth = 375;
                        this.imgHeight = 166;
                    });
                }
            });
            // Video snapshot
            Button.backgroundColor(Color.Transparent);
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777395, "type": 20000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Image.width('24vp');
            Image.height('24vp');
        }, Image);
        // Video snapshot
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.bulletCommentInput, placeholder: { "id": 16777243, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" } });
            TextInput.backgroundColor('rgba(255,255,255,0.4)');
            TextInput.placeholderColor('rgba(255,255,255,0.7)');
            TextInput.placeholderFont({ size: 14 });
            TextInput.padding({ top: 0, bottom: 0 });
            TextInput.fontColor(Color.White);
            TextInput.onFocus(() => {
                this.pausePlay();
                this.isInputtingBulletComment = true;
            });
            TextInput.onBlur(() => {
                this.resumePlayback();
                this.isInputtingBulletComment = false;
            });
            TextInput.height(30);
            TextInput.layoutWeight(1);
            TextInput.onChange((value: string) => {
                this.bulletCommentInput = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.padding({ left: 2 });
            Button.onClick(() => {
                try {
                    inputMethod.getController().stopInputSession().catch((err: BusinessError) => {
                        hilog.error(0x0000, TAG, `stopInputSession failed. Code:${err.code}, message:${err.message}`);
                    });
                }
                catch (exception) {
                    hilog.error(0x0000, TAG, `getController failed: code: ${exception.code}, message: ${exception.message}`);
                }
                this.sendBulletComment();
            });
            Button.backgroundColor(Color.Transparent);
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777396, "type": 20000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
        }, Image);
        Button.pop();
        // Third row: button
        Row.pop();
        Column.pop();
    }
    // [Start PausePlay]
    private pausePlay() {
        if (this.avPlayerController.isPlaying) {
            this.avPlayerController.videoPause();
        }
    }
    // [End PausePlay]
    // [Start Playback]
    private resumePlayback() {
        if (!this.avPlayerController.isPlaying) {
            this.avPlayerController.videoPlay();
        }
    }
    // [End Playback]
    // [Start SendBulletComment]
    private sendBulletComment() {
        if (this.bulletCommentInput.trim()) {
            this.bulletComments = [...this.bulletComments, new BulletComment(this.bulletCommentInput, true)];
            this.bulletCommentInput = '';
            if (this.bulletComments.length > 50) {
                this.bulletComments = this.bulletComments.slice(1);
            }
        }
        this.resumePlayback(); // Resume video playback after sending
    }
    // [End SendBulletComment]
    private generatePresetBulletComments() {
        if (this.presetBulletCommentsTimerId > 0) {
            clearInterval(this.presetBulletCommentsTimerId);
        }
        this.presetBulletCommentsTimerId = setInterval(() => {
            let randomIndex = Math.floor(Math.random() * 3);
            this.bulletComments = [...this.bulletComments, new BulletComment(this.presetBulletComments[randomIndex])];
        }, 2000);
    }
    private closeCaptionSetting(captionFont: CaptionFont | null) {
        this.isShowCaptionConfig = false;
        if (captionFont) {
            this.captionFont = captionFont;
        }
        this.resumePlayback();
    }
    // [Start VideoSnapshot]
    private async screenshot() {
        try {
            this.pixmap = await this.getUIContext().getComponentSnapshot().get(`videoXComponent_${this.curSource.index}`);
        }
        catch (exception) {
            hilog.error(0x0000, TAG, `screenshot failed: code: ${exception.code}, message: ${exception.message}`);
        }
    }
    // [End VideoSnapshot]
    // [Start GetLastFrame]
    private async clickPreviousFrame() {
        this.avPlayerController?.videoSeek(this.screenshotTime - 1000 / ScreenShotConstants.FRAME_RATE);
        this.pausePlay();
        setTimeout(() => {
            this.screenshot();
        }, 500);
        this.screenshotTime -= 1000 / ScreenShotConstants.FRAME_RATE;
    }
    // [End GetLastFrame]
    // [Start GetNextFrame]
    private async clickNextFrame() {
        this.avPlayerController?.videoSeek(this.screenshotTime + 1000 / ScreenShotConstants.FRAME_RATE);
        this.pausePlay();
        setTimeout(() => {
            this.screenshot();
        }, 500);
        this.screenshotTime += 1000 / ScreenShotConstants.FRAME_RATE;
    }
    // [End GetNextFrame]
    private setScreenBrightness(brightness: number) {
        let windowStage: window.WindowStage = AppStorage.get('windowStage') as window.WindowStage;
        try {
            let mainWin: window.Window = windowStage.getMainWindowSync();
            mainWin.setWindowBrightness(brightness, (err: BusinessError) => {
                if (err.code) {
                    hilog.error(0x0000, TAG, `Failed to set the brightness. code is ${err.code}, message is ${err.message}`);
                    return;
                }
            });
        }
        catch (exception) {
            hilog.error(0x0000, TAG, `getMainWindowSync failed: code: ${exception.code}, message: ${exception.message}`);
        }
    }
    private getValidValue(inputValue: number, minValue: number, maxValue: number): number {
        inputValue = inputValue >= maxValue ? maxValue : inputValue;
        inputValue = inputValue <= minValue ? minValue : inputValue;
        return inputValue;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.BottomEnd });
            Stack.width(CommonConstants.WIDTH_FULL_PERCENT);
            Stack.height(CommonConstants.HEIGHT_FULL_PERCENT);
            Stack.backgroundColor(Color.Black);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Center });
            Stack.width(CommonConstants.WIDTH_FULL_PERCENT);
            Stack.height(CommonConstants.HEIGHT_FULL_PERCENT);
            Stack.onClick(() => {
                this.iconOnclick();
            });
            Gesture.create(GesturePriority.Low);
            // Sliding in the vertical direction
            PanGesture.create({ direction: PanDirection.Vertical });
            // Sliding in the vertical direction
            PanGesture.onActionStart(() => {
            });
            // Sliding in the vertical direction
            PanGesture.onActionUpdate((event: GestureEvent) => {
                // The area on the right side of the screen
                if (event.fingerList[0].globalX > (this.screenWidth / 2)) {
                    if (this.isInputtingBulletComment) {
                        return; // When inputting bullet comment, disable screen brightness change
                    }
                    this.visible = true;
                    let curBrightness = this.screenBrightness -
                        this.getUIContext().vp2px(event.offsetY) / this.getUIContext().vp2px(this.screenHeight);
                    curBrightness = this.getValidValue(curBrightness, 0.0, 1.0);
                    this.screenBrightness = curBrightness;
                    this.setScreenBrightness(this.screenBrightness);
                }
                else {
                    this.visible = false;
                    let curVolume = this.volume - this.getUIContext().vp2px(event.offsetY) / this.screenHeight;
                    curVolume = this.getValidValue(curVolume, 0.0, 15.0);
                    this.volume = curVolume;
                }
            });
            // Sliding in the vertical direction
            PanGesture.onActionEnd(() => {
                setTimeout(() => {
                    this.visible = false;
                }, 3000);
            });
            // Sliding in the vertical direction
            PanGesture.pop();
            Gesture.pop();
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.avPlayerController.isPlaying) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width(CommonConstants.WIDTH_FULL_PERCENT);
                        Row.justifyContent(this.isFullLandscapeScreen ? FlexAlign.SpaceEvenly : FlexAlign.SpaceAround);
                        Row.zIndex(CommonConstants.Z_INDEX_VIDEO_PLAY);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // Video pause image
                        Image.create({ "id": 16777382, "type": 20000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                        // Video pause image
                        Image.width(this.isFullLandscapeScreen ? { "id": 16777316, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" } : { "id": 16777354, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                        // Video pause image
                        Image.aspectRatio(1);
                    }, Image);
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.justifyContent(FlexAlign.Center);
            Column.width(CommonConstants.WIDTH_FULL_PERCENT);
            Column.height(CommonConstants.HEIGHT_FULL_PERCENT);
            Column.zIndex(CommonConstants.Z_INDEX_BASE);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            XComponent.create({
                type: XComponentType.SURFACE,
                controller: this.xComponentController
            }, "com.example.AVPlayerLongVideo/entry");
            XComponent.id(`videoXComponent_${this.curSource.index}`);
            XComponent.onLoad(async () => {
                this.xComponentController.setXComponentSurfaceRect({
                    surfaceWidth: CommonConstants.SURFACE_WIDTH, surfaceHeight: CommonConstants.SURFACE_HEIGHT
                });
                try {
                    const avPlayer = await media.createAVPlayer();
                    this.avPlayerController.initAVPlayer(avPlayer, ObservedObject.GetRawObject(this.curSource), this.xComponentController.getXComponentSurfaceId());
                }
                catch (exception) {
                    hilog.error(0x0000, TAG, `createAVPlayer failed: code: ${exception.code}, message: ${exception.message}`);
                }
            });
            XComponent.aspectRatio(CommonConstants.ASPECT);
        }, XComponent);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isFullLandscapeScreen) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.width('100%');
                        __Common__.height(200);
                        __Common__.position({ x: '0%', y: '5%' });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new BulletCommentView(this, {
                                    bulletComments: this.__bulletComments,
                                    showBulletComment: this.__showBulletComment
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/AVPlayer.ets", line: 632, col: 15 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        bulletComments: this.bulletComments,
                                        showBulletComment: this.showBulletComment
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "BulletCommentView" });
                    }
                    __Common__.pop();
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new VolumeAndBrightnessView(this, {
                                    visible: this.visible,
                                    volume: this.volume,
                                    screenBrightness: this.screenBrightness
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/AVPlayer.ets", line: 640, col: 15 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        visible: this.visible,
                                        volume: this.volume,
                                        screenBrightness: this.screenBrightness
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    visible: this.visible,
                                    volume: this.volume,
                                    screenBrightness: this.screenBrightness
                                });
                            }
                        }, { name: "VolumeAndBrightnessView" });
                    }
                    this.fullLandscapeScreenControl.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
        Column.pop();
        Stack.pop();
        // [End SetScreenBrightnessPanGesture]
        this.playControl.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isShowCaptionConfig) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new CaptionFontView(this, {
                                    captionFont: this.captionFont,
                                    close: (captionFont: CaptionFont | null) => {
                                        this.closeCaptionSetting(captionFont);
                                    }
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/AVPlayer.ets", line: 696, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        captionFont: this.captionFont,
                                        close: (captionFont: CaptionFont | null) => {
                                            this.closeCaptionSetting(captionFont);
                                        }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    captionFont: this.captionFont
                                });
                            }
                        }, { name: "CaptionFontView" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showImg) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new VideoSnapshotView(this, {
                                    imgWidth: this.__imgWidth,
                                    imgHeight: this.__imgHeight,
                                    pixmap: this.__pixmap,
                                    showImg: this.__showImg,
                                    onPreviousClick: () => {
                                        this.clickPreviousFrame();
                                    },
                                    onNextClick: () => {
                                        this.clickNextFrame();
                                    }
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/AVPlayer.ets", line: 705, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        imgWidth: this.imgWidth,
                                        imgHeight: this.imgHeight,
                                        pixmap: this.pixmap,
                                        showImg: this.showImg,
                                        onPreviousClick: () => {
                                            this.clickPreviousFrame();
                                        },
                                        onNextClick: () => {
                                            this.clickNextFrame();
                                        }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "VideoSnapshotView" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
