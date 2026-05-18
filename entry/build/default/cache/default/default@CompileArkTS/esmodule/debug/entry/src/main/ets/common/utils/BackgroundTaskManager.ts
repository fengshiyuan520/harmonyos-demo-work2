import type common from "@ohos:app.ability.common";
import wantAgent from "@ohos:app.ability.wantAgent";
import backgroundTaskManager from "@ohos:resourceschedule.backgroundTaskManager";
import type { BusinessError } from "@ohos:base";
import Logger from "@bundle:com.example.AVPlayerLongVideo/entry/ets/common/utils/Logger";
const TAG = '[BackgroundTaskManager]';
export class BackgroundTaskManager {
    // [Start StartContinuousTask]
    public static startContinuousTask(context?: common.UIAbilityContext): void {
        if (!context) {
            return;
        }
        let wantAgentInfo: wantAgent.WantAgentInfo = {
            wants: [
                {
                    bundleName: context.abilityInfo.bundleName,
                    abilityName: context.abilityInfo.name
                }
            ],
            operationType: wantAgent.OperationType.START_ABILITY,
            requestCode: 0,
            wantAgentFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
        };
        wantAgent.getWantAgent(wantAgentInfo).then((wantAgentObj) => {
            if (canIUse('SystemCapability.ResourceSchedule.BackgroundTaskManager.Core')) {
                backgroundTaskManager.startBackgroundRunning(context, backgroundTaskManager.BackgroundMode.AUDIO_PLAYBACK, wantAgentObj).then(() => {
                }).catch((err: BusinessError) => {
                    Logger.error(TAG, `startBackgroundRunning failed, code is ${err.code}, message is ${err.message}`);
                });
            }
        }).catch((err: BusinessError) => {
            Logger.error(TAG, `getWantAgent failed, code is ${err.code}, message is ${err.message}`);
        });
    }
    // [End StartContinuousTask]
    // [Start StopContinuousTask]
    public static stopContinuousTask(context?: common.UIAbilityContext): void {
        if (!context) {
            return;
        }
        if (canIUse('SystemCapability.ResourceSchedule.BackgroundTaskManager.Core')) {
            backgroundTaskManager.stopBackgroundRunning(context).then(() => {
            }).catch((err: BusinessError) => {
                Logger.error(TAG, `stopBackgroundRunning failed, code is ${err.code}, message is ${err.message}`);
            });
        }
    }
}
