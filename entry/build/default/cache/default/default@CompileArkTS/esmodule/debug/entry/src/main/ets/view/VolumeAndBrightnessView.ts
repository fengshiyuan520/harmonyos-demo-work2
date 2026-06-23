if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface VolumeAndBrightnessView_Params {
    visible?: boolean;
    volume?: number;
    screenBrightness?: number;
}
import { AVVolumePanel } from "@ohos:multimedia.avVolumePanel";
export class VolumeAndBrightnessView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__visible = new SynchedPropertySimpleOneWayPU(params.visible, this, "visible");
        this.__volume = new SynchedPropertySimpleOneWayPU(params.volume, this, "volume");
        this.__screenBrightness = new SynchedPropertySimpleOneWayPU(params.screenBrightness, this, "screenBrightness");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: VolumeAndBrightnessView_Params) {
    }
    updateStateVars(params: VolumeAndBrightnessView_Params) {
        this.__visible.reset(params.visible);
        this.__volume.reset(params.volume);
        this.__screenBrightness.reset(params.screenBrightness);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__visible.purgeDependencyOnElmtId(rmElmtId);
        this.__volume.purgeDependencyOnElmtId(rmElmtId);
        this.__screenBrightness.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__visible.aboutToBeDeleted();
        this.__volume.aboutToBeDeleted();
        this.__screenBrightness.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __visible: SynchedPropertySimpleOneWayPU<boolean>; // Whether to show slider/image
    get visible() {
        return this.__visible.get();
    }
    set visible(newValue: boolean) {
        this.__visible.set(newValue);
    }
    private __volume: SynchedPropertySimpleOneWayPU<number>; // Set original video volume number
    get volume() {
        return this.__volume.get();
    }
    set volume(newValue: number) {
        this.__volume.set(newValue);
    }
    private __screenBrightness: SynchedPropertySimpleOneWayPU<number>; // Screen luminance
    get screenBrightness() {
        return this.__screenBrightness.get();
    }
    set screenBrightness(newValue: number) {
        this.__screenBrightness.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height('100%');
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('50%');
            Column.alignItems(HorizontalAlign.Start);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new AVVolumePanel(this, {
                        volumeLevel: this.volume,
                        volumeParameter: {
                            position: {
                                x: 150,
                                y: 300
                            }
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/VolumeAndBrightnessView.ets", line: 12, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            volumeLevel: this.volume,
                            volumeParameter: {
                                position: {
                                    x: 150,
                                    y: 300
                                }
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        volumeLevel: this.volume,
                        volumeParameter: {
                            position: {
                                x: 150,
                                y: 300
                            }
                        }
                    });
                }
            }, { name: "AVVolumePanel" });
        }
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start SetScreenBrightnessSlider]
            Column.create();
            // [Start SetScreenBrightnessSlider]
            Column.width('50%');
            // [Start SetScreenBrightnessSlider]
            Column.alignItems(HorizontalAlign.End);
            // [Start SetScreenBrightnessSlider]
            Column.justifyContent(FlexAlign.Center);
            // [Start SetScreenBrightnessSlider]
            Column.padding({
                right: 30,
                bottom: 20
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.margin({
                top: 0,
                right: 0
            });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Slider.create({
                value: this.screenBrightness,
                min: 0,
                max: 1,
                step: 0.05,
                style: SliderStyle.NONE,
                direction: Axis.Vertical,
                reverse: true
            });
            Slider.visibility(this.visible ? Visibility.Visible : Visibility.Hidden);
            Slider.height(160);
            Slider.selectedColor(Color.White);
            Slider.trackColor(Color.Black);
            Slider.trackThickness(40);
        }, Slider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777398, "type": 20000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Image.visibility(this.visible ? Visibility.Visible : Visibility.Hidden);
            Image.margin({ top: 120 });
            Image.width(20);
            Image.height(20);
        }, Image);
        Stack.pop();
        // [Start SetScreenBrightnessSlider]
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
