if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface VideoSnapshotView_Params {
    imgWidth?: number;
    imgHeight?: number;
    pixmap?: image.PixelMap;
    showImg?: boolean;
    onPreviousClick?: () => void;
    onNextClick?: () => void;
}
import type image from "@ohos:multimedia.image";
import { CommonConstants } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/common/constants/CommonConstants";
export class VideoSnapshotView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__imgWidth = new SynchedPropertySimpleTwoWayPU(params.imgWidth, this, "imgWidth");
        this.__imgHeight = new SynchedPropertySimpleTwoWayPU(params.imgHeight, this, "imgHeight");
        this.__pixmap = new SynchedPropertyObjectTwoWayPU(params.pixmap, this, "pixmap");
        this.__showImg = new SynchedPropertySimpleTwoWayPU(params.showImg, this, "showImg");
        this.onPreviousClick = () => {
        };
        this.onNextClick = () => {
        };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: VideoSnapshotView_Params) {
        if (params.onPreviousClick !== undefined) {
            this.onPreviousClick = params.onPreviousClick;
        }
        if (params.onNextClick !== undefined) {
            this.onNextClick = params.onNextClick;
        }
    }
    updateStateVars(params: VideoSnapshotView_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__imgWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__imgHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__pixmap.purgeDependencyOnElmtId(rmElmtId);
        this.__showImg.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__imgWidth.aboutToBeDeleted();
        this.__imgHeight.aboutToBeDeleted();
        this.__pixmap.aboutToBeDeleted();
        this.__showImg.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __imgWidth: SynchedPropertySimpleTwoWayPU<number>;
    get imgWidth() {
        return this.__imgWidth.get();
    }
    set imgWidth(newValue: number) {
        this.__imgWidth.set(newValue);
    }
    private __imgHeight: SynchedPropertySimpleTwoWayPU<number>;
    get imgHeight() {
        return this.__imgHeight.get();
    }
    set imgHeight(newValue: number) {
        this.__imgHeight.set(newValue);
    }
    private __pixmap: SynchedPropertySimpleOneWayPU<image.PixelMap>;
    get pixmap() {
        return this.__pixmap.get();
    }
    set pixmap(newValue: image.PixelMap) {
        this.__pixmap.set(newValue);
    }
    private __showImg: SynchedPropertySimpleTwoWayPU<boolean>;
    get showImg() {
        return this.__showImg.get();
    }
    set showImg(newValue: boolean) {
        this.__showImg.set(newValue);
    }
    private onPreviousClick: () => void;
    private onNextClick: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height(CommonConstants.HEIGHT_FULL_PERCENT);
            Row.width(CommonConstants.WIDTH_FULL_PERCENT);
            Row.justifyContent(FlexAlign.Center);
            Row.zIndex(999);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.onClick(() => {
                this.onPreviousClick();
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777394, "type": 20000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Image.width(45);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777245, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Text.fontSize(14);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.pixmap);
            Image.width(this.imgWidth);
            Image.height(this.imgHeight);
            Image.visibility(this.showImg ? Visibility.Visible : Visibility.None);
            Image.onClick(() => {
                this.showImg = false;
                this.imgWidth = 0;
                this.imgHeight = 0;
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.onClick(() => {
                this.onNextClick();
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777388, "type": 20000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Image.width(45);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777240, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Text.fontSize(14);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
