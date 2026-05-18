if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface VideoList_Params {
    currentIndex?: number;
    sources?: VideoData[];
    onItemClick?: (index: number) => void;
    pixelMaps?: image.PixelMap | undefined[];
}
import type image from "@ohos:multimedia.image";
import { CommonConstants } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/common/constants/CommonConstants";
import type { VideoData } from '../model/VideoData';
import { ImageUtil } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/common/utils/ImageUtil";
import { VideoDataType } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/common/constants/CommonConstants";
export class VideoList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentIndex = new SynchedPropertySimpleTwoWayPU(params.currentIndex, this, "currentIndex");
        this.__sources = new SynchedPropertyObjectOneWayPU(params.sources, this, "sources");
        this.onItemClick = () => {
        };
        this.__pixelMaps = new ObservedPropertyObjectPU([], this, "pixelMaps");
        if (super["initAllowComponentFreeze"] && typeof super["initAllowComponentFreeze"] === "function") {
            super["initAllowComponentFreeze"](true);
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: VideoList_Params) {
        if (params.onItemClick !== undefined) {
            this.onItemClick = params.onItemClick;
        }
        if (params.pixelMaps !== undefined) {
            this.pixelMaps = params.pixelMaps;
        }
    }
    updateStateVars(params: VideoList_Params) {
        this.__sources.reset(params.sources);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__sources.purgeDependencyOnElmtId(rmElmtId);
        this.__pixelMaps.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentIndex.aboutToBeDeleted();
        this.__sources.aboutToBeDeleted();
        this.__pixelMaps.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentIndex: SynchedPropertySimpleTwoWayPU<number>; // The index of playing video
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private __sources: SynchedPropertySimpleOneWayPU<VideoData[]>;
    get sources() {
        return this.__sources.get();
    }
    set sources(newValue: VideoData[]) {
        this.__sources.set(newValue);
    }
    private onItemClick?: (index: number) => void;
    private __pixelMaps: ObservedPropertyObjectPU<image.PixelMap | undefined[]>;
    get pixelMaps() {
        return this.__pixelMaps.get();
    }
    set pixelMaps(newValue: image.PixelMap | undefined[]) {
        this.__pixelMaps.set(newValue);
    }
    async aboutToAppear(): Promise<void> {
        for (let index = 1; index < this.sources.length; index++) {
            let url: string = this.sources[index].videoSrc;
            let pixelMap = await ImageUtil.getThumbnailFromVideo(url, 500); // Get first frame image from each video
            this.pixelMaps[index] = pixelMap;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding({ left: { "id": 16777339, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }, right: { "id": 16777339, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" } });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777254, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Text.fontSize({ "id": 16777314, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Text.fontColor({ "id": 16777278, "type": 10001, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Text.alignSelf(ItemAlign.Start);
            Text.padding({ top: { "id": 16777337, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }, bottom: { "id": 16777337, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" } });
            Text.fontWeight(FontWeight.Bold);
            Text.opacity({ "id": 16777333, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: CommonConstants.LIST_SPACE });
            List.height(CommonConstants.HEIGHT_FULL_PERCENT);
            List.width(CommonConstants.WIDTH_FULL_PERCENT);
            List.listDirection(Axis.Vertical);
            List.margin({
                top: { "id": 16777336, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" },
                bottom: (AppStorage.get<number>('navBarHeight') || 0) + CommonConstants.SPACE_16
            });
            List.scrollBar(BarState.Off);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, true);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Flex.create({ direction: FlexDirection.Row });
                            Flex.height(80);
                            Flex.width(CommonConstants.WIDTH_FULL_PERCENT);
                            Flex.onClick(() => {
                                this.onItemClick?.(index);
                            });
                        }, Flex);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(this.pixelMaps[index] || { "id": 16777391, "type": 20000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                            Image.height({ "id": 16777321, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                            Image.width({ "id": 16777324, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                            Image.objectFit(ImageFit.Cover);
                            Image.borderRadius({ "id": 16777323, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.height({ "id": 16777321, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                            Column.margin({ left: 12 });
                            Column.alignItems(HorizontalAlign.Start);
                            Column.justifyContent(FlexAlign.SpaceBetween);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create();
                            Text.fontSize({ "id": 16777313, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                            Text.fontWeight(FontWeight.Medium);
                            Text.width(CommonConstants.WIDTH_FULL_PERCENT);
                            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                            Text.opacity({ "id": 16777333, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                            Text.fontColor(index === this.currentIndex ? { "id": 16777277, "type": 10001, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" } : { "id": 16777278, "type": 10001, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                        }, Text);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (index === this.currentIndex) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        SymbolSpan.create({ "id": 125833306, "type": 40000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                                        SymbolSpan.width({ "id": 16777349, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                                        SymbolSpan.height({ "id": 16777349, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                                    }, SymbolSpan);
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
                                });
                            } // Whether is the current playing video
                        }, If);
                        If.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Span.create((index + 1) + '.');
                        }, Span);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Span.create((item.type === VideoDataType.RAW_FILE ? { "id": 16777237, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" } : { "id": 16777241, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }));
                        }, Span);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Span.create(item.description);
                        }, Span);
                        Text.pop();
                        Column.pop();
                        Flex.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.sources, forEachItemGenFunction, (item: VideoData, index: number) => index + JSON.stringify(item), true, true);
        }, ForEach);
        ForEach.pop();
        List.pop();
        Scroll.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
