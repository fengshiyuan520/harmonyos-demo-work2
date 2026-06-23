if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface BulletCommentView_Params {
    forceUpdate?: boolean;
    bulletComments?: BulletComment[];
    showBulletComment?: boolean;
    timerId?: number;
}
import type { BulletComment } from '../model/BulletCommentModel';
export class BulletCommentView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__forceUpdate = new ObservedPropertySimplePU(false, this, "forceUpdate");
        this.__bulletComments = new SynchedPropertyObjectTwoWayPU(params.bulletComments, this, "bulletComments");
        this.__showBulletComment = new SynchedPropertySimpleTwoWayPU(params.showBulletComment, this, "showBulletComment");
        this.timerId = -1;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: BulletCommentView_Params) {
        if (params.forceUpdate !== undefined) {
            this.forceUpdate = params.forceUpdate;
        }
        if (params.timerId !== undefined) {
            this.timerId = params.timerId;
        }
    }
    updateStateVars(params: BulletCommentView_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__forceUpdate.purgeDependencyOnElmtId(rmElmtId);
        this.__bulletComments.purgeDependencyOnElmtId(rmElmtId);
        this.__showBulletComment.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__forceUpdate.aboutToBeDeleted();
        this.__bulletComments.aboutToBeDeleted();
        this.__showBulletComment.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __forceUpdate: ObservedPropertySimplePU<boolean>;
    get forceUpdate() {
        return this.__forceUpdate.get();
    }
    set forceUpdate(newValue: boolean) {
        this.__forceUpdate.set(newValue);
    }
    private __bulletComments: SynchedPropertySimpleOneWayPU<BulletComment[]>;
    get bulletComments() {
        return this.__bulletComments.get();
    }
    set bulletComments(newValue: BulletComment[]) {
        this.__bulletComments.set(newValue);
    }
    private __showBulletComment: SynchedPropertySimpleTwoWayPU<boolean>;
    get showBulletComment() {
        return this.__showBulletComment.get();
    }
    set showBulletComment(newValue: boolean) {
        this.__showBulletComment.set(newValue);
    }
    private timerId: number;
    aboutToAppear(): void {
        this.startAnimation();
    }
    aboutToDisappear(): void {
        if (this.timerId > 0) {
            clearInterval(this.timerId);
        }
    }
    // [Start StartBulletCommentAnimation]
    // Start bullet comment animation
    private startAnimation() {
        if (this.timerId > 0) {
            clearInterval(this.timerId);
        }
        // Refresh the postion of bullet comments by timer
        this.timerId = setInterval(() => {
            let needUpdate = false;
            this.bulletComments.forEach(item => {
                const positionX = item.translateX - item.speed;
                if (positionX !== item.translateX) {
                    item.translateX = positionX; // Set new X position of bullet comment
                    needUpdate = true;
                }
            });
            const beforeLength = this.bulletComments.length;
            this.bulletComments =
                this.bulletComments.filter(item => item.translateX > -20); // Remove the bullet comment which beyond the screen
            if (needUpdate || this.bulletComments.length !== beforeLength) {
                this.forceUpdate = !this.forceUpdate; // Trigger ui refresh
            }
        }, 16);
    }
    // [End StartBulletCommentAnimation]
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('100%');
            Stack.height('30%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showBulletComment) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                If.create();
                                if (item.isUserBulletComment) {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create(item.content);
                                            Text.fontSize(14);
                                            Text.fontColor(item.color);
                                            Text.translate({ x: `${item.translateX}vp`, y: 0 });
                                            Text.position({ y: `${item.positionY}%` });
                                            Text.backgroundColor('rgba(0,0,0,0.4)');
                                            Text.borderRadius(999);
                                            Text.borderWidth(1);
                                            Text.borderColor('rgba(255,255,255,0.6)');
                                            Text.padding({
                                                top: 4,
                                                left: 8,
                                                bottom: 4,
                                                right: 8
                                            });
                                            Text.opacity(0.5);
                                        }, Text);
                                        Text.pop();
                                    });
                                }
                                else {
                                    this.ifElseBranchUpdateFunction(1, () => {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create(item.content);
                                            Text.fontSize(14);
                                            Text.fontColor(item.color);
                                            Text.translate({ x: `${item.translateX}vp`, y: 0 });
                                            Text.position({ y: `${item.positionY}%` });
                                            Text.backgroundColor('rgba(0,0,0,0.4)');
                                            Text.borderRadius(999);
                                            Text.padding({
                                                top: 4,
                                                left: 8,
                                                bottom: 4,
                                                right: 8
                                            });
                                            Text.opacity(0.5);
                                        }, Text);
                                        Text.pop();
                                    });
                                }
                            }, If);
                            If.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.bulletComments, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.forceUpdate ? ' ' : '  ');
            Text.size({ width: 0, height: 0 });
        }, Text);
        Text.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
