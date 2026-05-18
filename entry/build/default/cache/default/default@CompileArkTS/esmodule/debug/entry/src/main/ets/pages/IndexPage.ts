if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface IndexPage_Params {
    pageInfo?: NavPathStack;
    isFullLandscapeScreen?: boolean;
    sources?: VideoData[];
    currentIndex?: number;
    isPageShow?: boolean;
    showPopup?: boolean;
    swiperController?: SwiperController;
    windowUtil?: WindowUtil;
}
import window from "@ohos:window";
import hilog from "@ohos:hilog";
import emitter from "@ohos:events.emitter";
import ConfigurationConstant from "@ohos:app.ability.ConfigurationConstant";
import { SOURCES } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/model/VideoSourceModel";
import type { VideoData } from '../model/VideoData';
import { WindowUtil } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/common/utils/WindowUtil";
import { CommonConstants } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/common/constants/CommonConstants";
import { VideoList } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/view/VideoList";
import { AVPlayer } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/view/AVPlayer";
const TAG = '[IndexPage]';
class IndexPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__pageInfo = new ObservedPropertyObjectPU(new NavPathStack(), this, "pageInfo");
        this.addProvidedVar("pageInfo", this.__pageInfo, false);
        this.__isFullLandscapeScreen = new ObservedPropertySimplePU(false, this, "isFullLandscapeScreen");
        this.__sources = new ObservedPropertyObjectPU(SOURCES, this, "sources");
        this.__currentIndex = new ObservedPropertySimplePU(0, this, "currentIndex");
        this.__isPageShow = new ObservedPropertySimplePU(false, this, "isPageShow");
        this.__showPopup = new ObservedPropertySimplePU(false, this, "showPopup");
        this.swiperController = new SwiperController();
        this.windowUtil = WindowUtil.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: IndexPage_Params) {
        if (params.pageInfo !== undefined) {
            this.pageInfo = params.pageInfo;
        }
        if (params.isFullLandscapeScreen !== undefined) {
            this.isFullLandscapeScreen = params.isFullLandscapeScreen;
        }
        if (params.sources !== undefined) {
            this.sources = params.sources;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.isPageShow !== undefined) {
            this.isPageShow = params.isPageShow;
        }
        if (params.showPopup !== undefined) {
            this.showPopup = params.showPopup;
        }
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
        if (params.windowUtil !== undefined) {
            this.windowUtil = params.windowUtil;
        }
    }
    updateStateVars(params: IndexPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__pageInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__isFullLandscapeScreen.purgeDependencyOnElmtId(rmElmtId);
        this.__sources.purgeDependencyOnElmtId(rmElmtId);
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__isPageShow.purgeDependencyOnElmtId(rmElmtId);
        this.__showPopup.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__pageInfo.aboutToBeDeleted();
        this.__isFullLandscapeScreen.aboutToBeDeleted();
        this.__sources.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
        this.__isPageShow.aboutToBeDeleted();
        this.__showPopup.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __pageInfo: ObservedPropertyObjectPU<NavPathStack>;
    get pageInfo() {
        return this.__pageInfo.get();
    }
    set pageInfo(newValue: NavPathStack) {
        this.__pageInfo.set(newValue);
    }
    private __isFullLandscapeScreen: ObservedPropertySimplePU<boolean>; // Whether the video is played in full screen
    get isFullLandscapeScreen() {
        return this.__isFullLandscapeScreen.get();
    }
    set isFullLandscapeScreen(newValue: boolean) {
        this.__isFullLandscapeScreen.set(newValue);
    }
    private __sources: ObservedPropertyObjectPU<VideoData[]>; // Local video sources
    get sources() {
        return this.__sources.get();
    }
    set sources(newValue: VideoData[]) {
        this.__sources.set(newValue);
    }
    private __currentIndex: ObservedPropertySimplePU<number>; // The index of playing video
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private __isPageShow: ObservedPropertySimplePU<boolean>; // Whether the app is on the front end or back end
    get isPageShow() {
        return this.__isPageShow.get();
    }
    set isPageShow(newValue: boolean) {
        this.__isPageShow.set(newValue);
    }
    private __showPopup: ObservedPropertySimplePU<boolean>; // Control pop-up display
    get showPopup() {
        return this.__showPopup.get();
    }
    set showPopup(newValue: boolean) {
        this.__showPopup.set(newValue);
    }
    private swiperController: SwiperController;
    private windowUtil: WindowUtil;
    async aboutToAppear(): Promise<void> {
        let context = this.getUIContext().getHostContext() as Context;
        try {
            // Set dark color mode
            context.getApplicationContext().setColorMode(ConfigurationConstant.ColorMode.COLOR_MODE_DARK);
            // Set screen stay on during video play
            let windowClass = await window.getLastWindow(context);
            await windowClass.setWindowKeepScreenOn(true);
        }
        catch (exception) {
            hilog.error(0x0000, TAG, `setWindowKeepScreenOn failed: code: ${exception.code}, message: ${exception.message}`);
        }
        this.windowUtil.registerOnWindowSizeChange((size) => {
            if (size.width > size.height) {
                this.isFullLandscapeScreen = true;
            }
            else {
                this.isFullLandscapeScreen = false;
            }
        });
        emitter.on(CommonConstants.PLAY_PREVIOUS_EVENT_ID, () => {
            this.playPrevious();
        });
        emitter.on(CommonConstants.PLAY_NEXT_EVENT_ID, () => {
            this.playNext();
        });
        AppStorage.setOrCreate('isPIPShow', false); // Whether to show picture in picture
    }
    aboutToDisappear(): void {
        this.windowUtil.registerOffWindowSizeChange();
        emitter.off(CommonConstants.PLAY_PREVIOUS_EVENT_ID);
        emitter.off(CommonConstants.PLAY_NEXT_EVENT_ID);
    }
    // [Start SwitchToBackEnd]
    onPageHide(): void {
        this.isPageShow = false;
    }
    // [End SwitchToBackEnd]
    // [Start SwitchToFront]
    onPageShow(): void {
        this.isPageShow = true;
    }
    // [End SwitchToFront]
    // Full screen mode back to normal mode
    private handleFullScreenExit() {
        if (this.isFullLandscapeScreen) {
            this.windowUtil.enableWindowSystemBar();
            this.windowUtil.setLandscapeMultiWindow(false);
            // [Start SetMainWindowPORTRAIT]
            this.windowUtil.setMainWindowOrientation(window.Orientation.USER_ROTATION_PORTRAIT);
            // [End SetMainWindowPORTRAIT]
        }
    }
    private animateFullscreen() {
        this.getUIContext().animateTo({
            duration: CommonConstants.ANIMATE_DURATION
        }, () => {
        });
    }
    // Background control set to play previous
    private playPrevious() {
        if (this.currentIndex > 0) {
            this.swiperController.changeIndex(--this.currentIndex, false);
        }
    }
    // Background control set to play next
    private playNext() {
        if (this.currentIndex < this.sources.length - 1) {
            this.swiperController.changeIndex(++this.currentIndex, false);
        }
    }
    // Define pop-up content
    popupContent(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Set picture in picture
            Row.create();
            // Set picture in picture
            Row.width('95%');
            // Set picture in picture
            Row.height({ "id": 16777355, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            // Set picture in picture
            Row.borderRadius({ "id": 16777349, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            // Set picture in picture
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777242, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Text.width(160);
            Text.fontSize({ "id": 16777347, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ left: { "id": 16777362, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" } });
            Text.fontColor({ "id": 16777278, "type": 10001, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({ type: ToggleType.Switch, isOn: AppStorage.get('isPIPShow') });
            Toggle.onChange((isOn: boolean) => {
                AppStorage.set('isPIPShow', isOn); // Update the status of the toggle
            });
            Toggle.height({ "id": 16777349, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Toggle.margin({ right: { "id": 16777362, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" } });
            Toggle.selectedColor({ "id": 16777277, "type": 10001, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
        }, Toggle);
        Toggle.pop();
        // Set picture in picture
        Row.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.pageInfo, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/IndexPage", isUserCreateStack: true });
            Navigation.mode(NavigationMode.Stack);
            Navigation.hideToolBar(true);
            Navigation.hideTitleBar(true);
            Navigation.hideBackButton(true);
            Navigation.width(CommonConstants.WIDTH_FULL_PERCENT);
            Navigation.height(CommonConstants.HEIGHT_FULL_PERCENT);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(CommonConstants.WIDTH_FULL_PERCENT);
            Column.height(CommonConstants.HEIGHT_FULL_PERCENT);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Swiper.create(this.swiperController);
            Swiper.width(CommonConstants.WIDTH_FULL_PERCENT);
            Swiper.height(this.isFullLandscapeScreen ? CommonConstants.HEIGHT_FULL_PERCENT :
                this.getUIContext().px2vp((AppStorage.get<number>('deviceWidth') || 0) / CommonConstants.ASPECT));
            Swiper.vertical(true);
            Swiper.loop(false);
            Swiper.indicator(false);
            Swiper.backgroundColor(Color.Black);
            Swiper.onAnimationStart((_index: number, targetIndex: number) => {
                this.currentIndex = targetIndex;
            });
            Swiper.onAnimationEnd(() => {
            });
        }, Swiper);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Stack.create();
                }, Stack);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new AVPlayer(this, {
                                isFullLandscapeScreen: this.isFullLandscapeScreen,
                                onFullScreenClick: (isLandscape?: boolean) => {
                                    if (isLandscape) {
                                        this.windowUtil.disableWindowSystemBar();
                                        this.windowUtil.setLandscapeMultiWindow(true);
                                        // [Start SetMainWindowLANDSCAPE]
                                        this.windowUtil.setMainWindowOrientation(window.Orientation.USER_ROTATION_LANDSCAPE);
                                        // [End SetMainWindowLANDSCAPE]
                                    }
                                    else {
                                        this.animateFullscreen();
                                    }
                                },
                                curSource: item,
                                curIndex: this.currentIndex,
                                index: index,
                                isPageShow: this.isPageShow,
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/IndexPage.ets", line: 154, col: 17 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    isFullLandscapeScreen: this.isFullLandscapeScreen,
                                    onFullScreenClick: (isLandscape?: boolean) => {
                                        if (isLandscape) {
                                            this.windowUtil.disableWindowSystemBar();
                                            this.windowUtil.setLandscapeMultiWindow(true);
                                            // [Start SetMainWindowLANDSCAPE]
                                            this.windowUtil.setMainWindowOrientation(window.Orientation.USER_ROTATION_LANDSCAPE);
                                            // [End SetMainWindowLANDSCAPE]
                                        }
                                        else {
                                            this.animateFullscreen();
                                        }
                                    },
                                    curSource: item,
                                    curIndex: this.currentIndex,
                                    index: index,
                                    isPageShow: this.isPageShow
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                isFullLandscapeScreen: this.isFullLandscapeScreen,
                                curSource: item,
                                curIndex: this.currentIndex,
                                index: index,
                                isPageShow: this.isPageShow
                            });
                        }
                    }, { name: "AVPlayer" });
                }
                Stack.pop();
            };
            this.forEachUpdateFunction(elmtId, this.sources, forEachItemGenFunction, (item: string, index: number) => JSON.stringify(item) + index, true, true);
        }, ForEach);
        ForEach.pop();
        Swiper.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Circle });
            Button.width({ "id": 16777301, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Button.height({ "id": 16777301, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Button.backgroundColor('rgba(255,255,255,0.1)');
            Button.position({
                x: '2%',
                y: { "id": 16777298, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }
            });
            Button.onClick(() => {
                this.handleFullScreenExit();
            });
            Button.visibility(this.isFullLandscapeScreen ? Visibility.Visible : Visibility.Hidden);
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125830087, "type": 20000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Image.fillColor(Color.White);
            Image.width({ "id": 16777350, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Image.height({ "id": 16777350, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
        }, Image);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.sources[this.currentIndex].name);
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Medium);
            Text.fontSize({ "id": 16777350, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Text.position({
                x: { "id": 16777361, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" },
                y: { "id": 16777353, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }
            });
            Text.visibility(this.isFullLandscapeScreen ? Visibility.Visible : Visibility.Hidden);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create();
            Text.position({ x: '96%', y: { "id": 16777352, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" } });
            Text.markAnchor({ x: '100%', y: 0 });
            Text.padding({ "id": 16777344, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Text.zIndex(1);
            Text.borderRadius({ "id": 16777351, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Text.backgroundColor('rgba(255,255,255,0.1)');
            Text.onClick(() => {
                this.showPopup = !this.showPopup; // Click the button to switch the pop-up status
            });
            Text.bindSheet(this.showPopup, { builder: () => {
                    this.popupContent.call(this);
                } }, {
                height: '170vp',
                title: { title: { "id": 16777239, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" } },
                onDisappear: () => {
                    this.showPopup = false;
                }
            });
            Text.visibility(this.isFullLandscapeScreen ? Visibility.Hidden : Visibility.Visible);
        }, Text);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            SymbolSpan.create({ "id": 125831714, "type": 40000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            SymbolSpan.fontSize({ "id": 16777351, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            SymbolSpan.fontColor([Color.White]);
        }, SymbolSpan);
        Text.pop();
        Stack.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new VideoList(this, {
                        currentIndex: this.__currentIndex,
                        sources: this.sources,
                        onItemClick: (index) => {
                            this.swiperController.changeIndex(index, false);
                            this.currentIndex = index;
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/IndexPage.ets", line: 240, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            currentIndex: this.currentIndex,
                            sources: this.sources,
                            onItemClick: (index) => {
                                this.swiperController.changeIndex(index, false);
                                this.currentIndex = index;
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        sources: this.sources
                    });
                }
            }, { name: "VideoList" });
        }
        Column.pop();
        Navigation.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "IndexPage";
    }
}
registerNamedRoute(() => new IndexPage(undefined, {}), "", { bundleName: "com.example.AVPlayerLongVideo", moduleName: "entry", pagePath: "pages/IndexPage", pageFullPath: "entry/src/main/ets/pages/IndexPage", integratedHsp: "false", moduleType: "followWithHap" });
