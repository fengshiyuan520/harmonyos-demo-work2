import UIAbility from "@ohos:app.ability.UIAbility";
import hilog from "@ohos:hilog";
import type window from "@ohos:window";
import type { BusinessError } from "@ohos:base";
import { WindowUtil } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/common/utils/WindowUtil";
export default class EntryAbility extends UIAbility {
    onCreate(): void {
        AppStorage.setOrCreate('context', this.context);
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
    }
    onDestroy(): void {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
    }
    onWindowStageCreate(windowStage: window.WindowStage): void {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
        try {
            let windowClass: window.Window = windowStage.getMainWindowSync();
            WindowUtil.getInstance().setWindowStage(windowStage);
            AppStorage.setOrCreate('windowStage', windowStage);
            windowClass.setWindowLayoutFullScreen(true).catch((err: BusinessError) => {
                hilog.error(0x0000, 'testTag', `createAVSession failed, code is ${err.code}, message is ${err.message}`);
            });
            windowClass.setWindowSystemBarProperties({
                statusBarContentColor: '#e6ffffff'
            }).catch((err: BusinessError) => {
                hilog.error(0x0000, 'testTag', `createAVSession failed, code is ${err.code}, message is ${err.message}`);
            });
            windowStage.loadContent('pages/IndexPage', (err: BusinessError) => {
                AppStorage.setOrCreate('uiContext', windowStage.getMainWindowSync().getUIContext());
                if (err.code) {
                    hilog.error(0x0000, 'testTag', `Failed to load the content. code is ${err.code}, message is ${err.message}`);
                    return;
                }
                hilog.info(0x0000, 'testTag', 'Succeeded in loading the content.');
            });
        }
        catch (exception) {
            hilog.error(0x0000, 'testTag', `onWindowStageCreate failed, Code:${exception.code}, message:${exception.message}`);
        }
    }
    onWindowStageDestroy(): void {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
    }
    onForeground(): void {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');
    }
    onBackground(): void {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onBackground');
    }
}
