import type common from "@ohos:app.ability.common";
import wantAgent from "@ohos:app.ability.wantAgent";
import avSession from "@ohos:multimedia.avsession";
import type { BusinessError } from "@ohos:base";
import type { VideoData } from '../model/VideoData';
import { BackgroundTaskManager } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/common/utils/BackgroundTaskManager";
import Logger from "@bundle:com.example.AVPlayerLongVideo/entry/ets/common/utils/Logger";
const TAG = 'AvSessionController';
export class AvSessionController {
    private static instance: AvSessionController | null;
    private context: common.UIAbilityContext | undefined = undefined;
    private avSession: avSession.AVSession | undefined = undefined;
    private avSessionMetadata: avSession.AVMetadata | undefined = undefined;
    constructor() {
        this.initAvSession();
    }
    public static getInstance(): AvSessionController {
        if (!AvSessionController.instance) {
            AvSessionController.instance = new AvSessionController();
        }
        return AvSessionController.instance;
    }
    // [Start InitAvSession]
    public initAvSession() {
        this.context = AppStorage.get('context');
        if (!this.context) {
            Logger.error(TAG, 'session create failed : context is undefined');
            return;
        }
        avSession.createAVSession(this.context, 'LONG_VIDEO_SESSION', 'video').then(async (avSession) => {
            this.avSession = avSession;
            BackgroundTaskManager.startContinuousTask(this.context);
            this.setLaunchAbility();
            this.avSession.activate().catch((err: BusinessError) => {
                Logger.error(TAG, `avSession activate failed, code is ${err.code}, message is ${err.message}`);
            });
        }).catch((err: BusinessError) => {
            Logger.error(TAG, `createAVSession failed, code is ${err.code}, message is ${err.message}`);
        });
    }
    // [End InitAvSession]
    public getAvSession() {
        return this.avSession;
    }
    public getAvSessionMetadata() {
        return this.avSessionMetadata;
    }
    // [Start SetAVMetadata]
    // Set video session metadata
    public async setAVMetadata(curSource: VideoData, duration: number) {
        if (curSource === undefined) {
            Logger.error(TAG, 'SetAVMetadata Error, curSource is null');
            return;
        }
        let metadata: avSession.AVMetadata = {
            assetId: `${curSource.index}`,
            title: curSource.name,
            duration: duration // Video duration
        };
        if (this.avSession) {
            this.avSession.setAVMetadata(metadata).then(() => {
                this.avSessionMetadata = metadata;
            }).catch((err: BusinessError) => {
                Logger.error(TAG, `SetAVMetadata BusinessError: code: ${err.code}, message: ${err.message}`);
            });
        }
    }
    // [End SetAVMetadata]
    // [Start SetLaunchAbility]
    private setLaunchAbility() {
        if (!this.context) {
            return;
        }
        const wantAgentInfo: wantAgent.WantAgentInfo = {
            wants: [
                {
                    bundleName: this.context.abilityInfo.bundleName,
                    abilityName: this.context.abilityInfo.name
                }
            ],
            operationType: wantAgent.OperationType.START_ABILITIES,
            requestCode: 0,
            wantAgentFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
        };
        wantAgent.getWantAgent(wantAgentInfo).then((agent) => {
            if (this.avSession) {
                this.avSession.setLaunchAbility(agent).catch((err: BusinessError) => {
                    Logger.error(TAG, `setLaunchAbility failed: code: ${err.code}, message: ${err.message}`);
                });
            }
        }).catch((err: BusinessError) => {
            Logger.error(TAG, `getWantAgent failed: code: ${err.code}, message: ${err.message}`);
        });
    }
    // [End SetLaunchAbility]
    // [Start SetAvSessionPlayState]
    public setAvSessionPlayState(playbackState: avSession.AVPlaybackState) {
        if (this.avSession) {
            this.avSession.setAVPlaybackState(playbackState, (err: BusinessError) => {
                if (err) {
                    Logger.error(TAG, `SetAVPlaybackState BusinessError: code: ${err.code}, message: ${err.message}`);
                }
                else {
                    Logger.info(TAG, 'SetAVPlaybackState successfully');
                }
            });
        }
    }
    // [End SetAvSessionPlayState]
    // [Start UnregisterSessionListener]
    async unregisterSessionListener() {
        if (!this.avSession) {
            return;
        }
        try {
            this.avSession.off('play');
            this.avSession.off('pause');
            this.avSession.off('playNext');
            this.avSession.off('playPrevious');
            this.avSession.off('setLoopMode');
            this.avSession.off('seek');
        }
        catch (exception) {
            Logger.error(TAG, `unregisterSessionListener failed: code: ${exception.code}, message: ${exception.message}`);
        }
        BackgroundTaskManager.stopContinuousTask(this.context);
    }
}
