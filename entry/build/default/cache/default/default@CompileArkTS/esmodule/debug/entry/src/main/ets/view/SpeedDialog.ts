if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SpeedDialog_Params {
    speedList?: Resource[];
    speedSelect?: number;
    speedIndex?: number;
    speedName?: Resource;
    avPlayerController?: AvPlayerController;
    controller?: CustomDialogController;
}
import type { AvPlayerController } from '../controller/AvPlayerController';
// Index of the playback rate list.
const ZERO = 0;
const ONE = 1;
const TWO = 2;
const THREE = 3;
export class SpeedDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__speedList = new ObservedPropertyObjectPU([{ "id": 16777267, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }, { "id": 16777268, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }, { "id": 16777269, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }, { "id": 16777270, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }], this, "speedList");
        this.__speedSelect = new SynchedPropertySimpleTwoWayPU(params.speedSelect, this, "speedSelect");
        this.__speedIndex = new SynchedPropertySimpleTwoWayPU(params.speedIndex, this, "speedIndex");
        this.__speedName = new SynchedPropertyObjectTwoWayPU(params.speedName, this, "speedName");
        this.__avPlayerController = new SynchedPropertyObjectTwoWayPU(params.avPlayerController, this, "avPlayerController");
        this.controller = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SpeedDialog_Params) {
        if (params.speedList !== undefined) {
            this.speedList = params.speedList;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: SpeedDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__speedList.purgeDependencyOnElmtId(rmElmtId);
        this.__speedSelect.purgeDependencyOnElmtId(rmElmtId);
        this.__speedIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__speedName.purgeDependencyOnElmtId(rmElmtId);
        this.__avPlayerController.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__speedList.aboutToBeDeleted();
        this.__speedSelect.aboutToBeDeleted();
        this.__speedIndex.aboutToBeDeleted();
        this.__speedName.aboutToBeDeleted();
        this.__avPlayerController.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __speedList: ObservedPropertyObjectPU<Resource[]>;
    get speedList() {
        return this.__speedList.get();
    }
    set speedList(newValue: Resource[]) {
        this.__speedList.set(newValue);
    }
    private __speedSelect: SynchedPropertySimpleTwoWayPU<number>; // Index of the current selection
    get speedSelect() {
        return this.__speedSelect.get();
    }
    set speedSelect(newValue: number) {
        this.__speedSelect.set(newValue);
    }
    private __speedIndex: SynchedPropertySimpleTwoWayPU<number>; // Index of the playback rate list.
    get speedIndex() {
        return this.__speedIndex.get();
    }
    set speedIndex(newValue: number) {
        this.__speedIndex.set(newValue);
    }
    private __speedName: SynchedPropertySimpleOneWayPU<Resource>;
    get speedName() {
        return this.__speedName.get();
    }
    set speedName(newValue: Resource) {
        this.__speedName.set(newValue);
    }
    private __avPlayerController: SynchedPropertySimpleOneWayPU<AvPlayerController>;
    get avPlayerController() {
        return this.__avPlayerController.get();
    }
    set avPlayerController(newValue: AvPlayerController) {
        this.__avPlayerController.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
            Column.width('100%');
            Column.margin({ left: { "id": 16777348, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }, right: { "id": 16777348, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" } });
            Column.borderRadius({ "id": 16777350, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Column.backgroundColor({ "id": 16777276, "type": 10001, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777233, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Text.fontSize({ "id": 16777349, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.width('90%');
            Text.fontColor({ "id": 16777279, "type": 10001, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Text.textAlign(TextAlign.Center);
            Text.margin({ top: { "id": 16777349, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }, bottom: { "id": 16777345, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.width('100%');
            List.height('192vp');
            List.margin({
                top: { "id": 16777345, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }
            });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index) => {
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
                        ListItem.width('100%');
                        ListItem.height({ "id": 16777356, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                        ListItem.onClick(() => {
                            this.speedSelect = index;
                            this.speedIndex = this.speedSelect;
                            this.speedName = this.speedList[this.speedSelect];
                            switch (this.speedSelect) {
                                case ZERO:
                                    this.avPlayerController.videoSpeedOne();
                                    break;
                                case ONE:
                                    this.avPlayerController.videoSpeedOnePointTwentyFive();
                                    break;
                                case TWO:
                                    this.avPlayerController.videoSpeedOnePointSeventyFive();
                                    break;
                                case THREE:
                                    this.avPlayerController.videoSpeedTwo();
                                    break;
                                default:
                                    break;
                            }
                            this.controller.close();
                        });
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.width('90%');
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item);
                            Text.fontSize({ "id": 16777348, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                            Text.fontColor({ "id": 16777278, "type": 10001, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                            Text.fontWeight(FontWeight.Medium);
                            Text.textAlign(TextAlign.Center);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Blank.create();
                        }, Blank);
                        Blank.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(this.speedSelect == index ? { "id": 16777380, "type": 20000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" } : { "id": 16777379, "type": 20000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                            Image.width({ "id": 16777350, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                            Image.height({ "id": 16777350, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                            Image.objectFit(ImageFit.Contain);
                        }, Image);
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (index != this.speedList.length - ONE) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Divider.create();
                                        Divider.vertical(false);
                                        Divider.strokeWidth(1);
                                        Divider.margin({ top: { "id": 16777344, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" } });
                                        Divider.color({ "id": 16777286, "type": 10001, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                                        Divider.width('100%');
                                    }, Divider);
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
                                });
                            }
                        }, If);
                        If.pop();
                        Column.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.speedList, forEachItemGenFunction, (item: Resource, index) => index + '_' + JSON.stringify(item), true, true);
        }, ForEach);
        ForEach.pop();
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.alignItems(VerticalAlign.Center);
            Row.height({ "id": 16777358, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Row.padding({ bottom: { "id": 16777357, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" } });
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777231, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Text.fontSize({ "id": 16777348, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Text.fontColor({ "id": 16777277, "type": 10001, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
            Text.onClick(() => {
                this.controller.close();
            });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
