if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CaptionFontView_Params {
    captionFont?: CaptionFont;
    close?: (captionFont: CaptionFont | null) => void;
}
import type { CaptionFont } from '../model/CaptionFontModel';
import { CaptionFontConstants } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/common/constants/CommonConstants";
export class CaptionFontView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__captionFont = new SynchedPropertyObjectOneWayPU(params.captionFont, this, "captionFont");
        this.close = () => {
        };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CaptionFontView_Params) {
        if (params.close !== undefined) {
            this.close = params.close;
        }
    }
    updateStateVars(params: CaptionFontView_Params) {
        this.__captionFont.reset(params.captionFont);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__captionFont.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__captionFont.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __captionFont: SynchedPropertySimpleOneWayPU<CaptionFont>;
    get captionFont() {
        return this.__captionFont.get();
    }
    set captionFont(newValue: CaptionFont) {
        this.__captionFont.set(newValue);
    }
    private close: (captionFont: CaptionFont | null) => void;
    FontFamily(text: ResourceStr, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(text);
            Button.fontSize(16);
            Button.fontColor(this.captionFont.family === text ? Color.Black : Color.White);
            Button.backgroundColor(this.captionFont.family === text ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.1)');
            Button.onClick(() => {
                // Set fontFamily of caption
                this.captionFont.family = text;
            });
        }, Button);
        Button.pop();
    }
    FontSize(text: ResourceStr, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(text);
            Button.fontSize(16);
            Button.fontColor(this.captionFont.size === Number(text) ? Color.Black : Color.White);
            Button.backgroundColor(this.captionFont.size === Number(text) ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.1)');
            Button.onClick(() => {
                // Set fontSize of caption
                this.captionFont.size = Number(text);
            });
        }, Button);
        Button.pop();
    }
    FontColor(captionFontColor: ResourceColor, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(24);
            Column.height(24);
            Column.borderRadius('50%');
            Column.backgroundColor(captionFontColor);
            Column.justifyContent(FlexAlign.Center);
            Column.onClick(() => {
                // Set fontColor of caption
                this.captionFont.color = captionFontColor;
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.captionFont.color === captionFontColor) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(12);
                        Column.height(12);
                        Column.borderRadius('50%');
                        Column.border({ width: 1, color: Color.Gray });
                    }, Column);
                    Column.pop();
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.onClick(() => {
                this.close(null);
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('40%');
            Column.height('100%');
            Column.linearGradient({
                angle: 269.43,
                colors: [['rgba(0,0,0,0.6)', 0.0148], ['rgba(0,0,0,0)', 0.99597]]
            });
            Column.position({ right: 0 });
            Column.padding({ top: 40, left: 16, right: 16 });
            Column.onClick(() => {
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777226, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Text.fontSize(18);
            Text.fontWeight(700);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 32 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777399, "type": 20000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Image.width(20);
            Image.onClick(() => {
                this.close(null);
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777374, "type": 20000, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Image.width(20);
            Image.onClick(() => {
                this.close(ObservedObject.GetRawObject(this.captionFont));
            });
        }, Image);
        Row.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.color('rgba(255,255,255,0.2)');
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 20 });
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ top: 14, bottom: 14 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777224, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Text.fontColor(Color.White);
            Text.fontSize(16);
            Text.fontWeight(500);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const captionFontFamily = _item;
                this.FontFamily.bind(this)(captionFontFamily);
            };
            this.forEachUpdateFunction(elmtId, CaptionFontConstants.CAPTION_FONT_FAMILY, forEachItemGenFunction, (captionFontFamily: ResourceStr, index: number) => `${captionFontFamily}_${index}`, false, true);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.color('rgba(255,255,255,0.2)');
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ top: 14, bottom: 14 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777225, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Text.fontColor(Color.White);
            Text.fontSize(16);
            Text.fontWeight(500);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const captionFontSize = _item;
                this.FontSize.bind(this)(captionFontSize);
            };
            this.forEachUpdateFunction(elmtId, CaptionFontConstants.CAPTION_FONT_SIZE, forEachItemGenFunction, (captionFontSize: ResourceStr, index: number) => `${captionFontSize}_${index}`, false, true);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.color('rgba(255,255,255,0.2)');
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ top: 14, bottom: 14 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.AVPlayerLongVideo", "moduleName": "entry" });
            Text.fontColor(Color.White);
            Text.fontSize(16);
            Text.fontWeight(500);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 16 });
            Row.padding({
                left: 10,
                right: 10,
                top: 8,
                bottom: 8
            });
            Row.borderRadius(20);
            Row.backgroundColor('rgba(255,255,255,0.9)');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const captionFontColor = _item;
                this.FontColor.bind(this)(captionFontColor);
            };
            this.forEachUpdateFunction(elmtId, CaptionFontConstants.CAPTION_FONT_COLOR, forEachItemGenFunction, (captionFontColor: ResourceColor, index: number) => `${captionFontColor}_${index}`, false, true);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
