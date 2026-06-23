if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LanguageDialog_Params {
    languageList?: Resource[];
    languageSelect?: number;
    currentLanguageType?: number;
    avPlayerController?: AvPlayerController;
    controller?: CustomDialogController;
}
import type { AvPlayerController } from '../controller/AvPlayerController';
// Index of the playback rate list.
const ONE = 1;
export class LanguageDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__languageList = new ObservedPropertyObjectPU([{ "id": 16777218, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }, { "id": 16777219, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }], this, "languageList");
        this.__languageSelect = new SynchedPropertySimpleTwoWayPU(params.languageSelect, this, "languageSelect");
        this.__currentLanguageType = new SynchedPropertySimpleTwoWayPU(params.currentLanguageType, this, "currentLanguageType");
        this.__avPlayerController = new SynchedPropertyObjectTwoWayPU(params.avPlayerController, this, "avPlayerController");
        this.controller = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LanguageDialog_Params) {
        if (params.languageList !== undefined) {
            this.languageList = params.languageList;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: LanguageDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__languageList.purgeDependencyOnElmtId(rmElmtId);
        this.__languageSelect.purgeDependencyOnElmtId(rmElmtId);
        this.__currentLanguageType.purgeDependencyOnElmtId(rmElmtId);
        this.__avPlayerController.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__languageList.aboutToBeDeleted();
        this.__languageSelect.aboutToBeDeleted();
        this.__currentLanguageType.aboutToBeDeleted();
        this.__avPlayerController.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __languageList: ObservedPropertyObjectPU<Resource[]>;
    get languageList() {
        return this.__languageList.get();
    }
    set languageList(newValue: Resource[]) {
        this.__languageList.set(newValue);
    }
    private __languageSelect: SynchedPropertySimpleTwoWayPU<number>; // Index of the current selection
    get languageSelect() {
        return this.__languageSelect.get();
    }
    set languageSelect(newValue: number) {
        this.__languageSelect.set(newValue);
    }
    private __currentLanguageType: SynchedPropertySimpleTwoWayPU<number>; // Current language type
    get currentLanguageType() {
        return this.__currentLanguageType.get();
    }
    set currentLanguageType(newValue: number) {
        this.__currentLanguageType.set(newValue);
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
            Text.create({ "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
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
            List.margin({
                top: { "id": 16777345, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" },
                bottom: { "id": 16777347, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" }
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
                            this.languageSelect = index;
                            this.currentLanguageType = this.languageSelect;
                            this.avPlayerController.languageChange(this.languageSelect);
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
                            Image.create(this.languageSelect === index ? { "id": 16777380, "type": 20000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" } : { "id": 16777379, "type": 20000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                            Image.width({ "id": 16777350, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                            Image.height({ "id": 16777350, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
                            Image.objectFit(ImageFit.Contain);
                        }, Image);
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (index != this.languageList.length - ONE) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Divider.create();
                                        Divider.vertical(false);
                                        Divider.strokeWidth(1);
                                        Divider.margin({ top: { "id": 16777348, "type": 10002, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" } });
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
            this.forEachUpdateFunction(elmtId, this.languageList, forEachItemGenFunction, (item: Resource, index) => index + '_' + JSON.stringify(item), true, true);
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
