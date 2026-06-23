import PiPWindow from "@ohos:PiPWindow";
import type common from "@ohos:app.ability.common";
import Logger from "@bundle:com.example.AVPlayerLongVideo/entry/ets/common/utils/Logger";
import type { AvPlayerController } from '../controller/AvPlayerController';
const TAG = '[PiPWindowController]';
// Picture in picture controller
export class PiPWindowController {
    pipController?: PiPWindow.PiPController;
    private context: common.UIAbilityContext | undefined = AppStorage.get('context');
    public avPlayerController?: AvPlayerController;
    private xComponentController?: XComponentController;
    private curState: string = '';
    constructor(avPlayerController: AvPlayerController, xComponentController: XComponentController) {
        this.avPlayerController = avPlayerController;
        this.xComponentController = xComponentController;
    }
    // [Start CreatePipController]
    // Create PIPWindows
    async createPipController() {
        if (!this.pipController) {
            try {
                this.pipController = await PiPWindow.create({
                    context: this.context,
                    componentController: this.xComponentController,
                    templateType: PiPWindow.PiPTemplateType.VIDEO_PLAY
                });
            }
            catch (exception) {
                Logger.error(TAG, `pipController init failed, Code:${exception.code}, message:${exception.message}`);
            }
        }
        this.pipController?.on('stateChange', (State: PiPWindow.PiPState, reason: string) => {
            this.onStateChange(State, reason);
        });
        this.pipController?.on('controlPanelActionEvent', (event: PiPWindow.PiPActionEventType, status?: number) => {
            this.onActionEvent(event, status);
        });
        this.pipController?.setAutoStartEnabled(true); // Key point:  Set the animation to start when the application returns to the desktop
    }
    // [End CreatePipController]
    // [Start DestroyPipController]
    // Destroy PIPWindows
    destroyPipController() {
        if (!this.pipController) {
            return;
        }
        this.pipController.setAutoStartEnabled(false);
        this.pipController.off('stateChange');
        this.pipController.off('controlPanelActionEvent');
        this.pipController = undefined;
    }
    // [End DestroyPipController]
    // [Start OnStateChange]
    onStateChange(state: PiPWindow.PiPState, reason: string) {
        switch (state) {
            case PiPWindow.PiPState.ABOUT_TO_START:
                this.curState = 'ABOUT_TO_START';
                break;
            case PiPWindow.PiPState.STARTED:
                this.curState = 'STARTED';
                let status: PiPWindow.PiPControlStatus = this.avPlayerController?.isPlaying ? PiPWindow.PiPControlStatus.PLAY : PiPWindow.PiPControlStatus.PAUSE;
                this.pipController?.updatePiPControlStatus(PiPWindow.PiPControlType.VIDEO_PLAY_PAUSE, status);
                break;
            case PiPWindow.PiPState.ABOUT_TO_STOP:
                this.curState = 'ABOUT_TO_STOP';
                break;
            case PiPWindow.PiPState.STOPPED:
                this.curState = 'STOPPED';
                break;
            case PiPWindow.PiPState.ABOUT_TO_RESTORE:
                this.curState = 'ABOUT_TO_RESTORE';
                break;
            case PiPWindow.PiPState.ERROR:
                this.curState = 'ERROR';
                break;
            default:
                break;
        }
    }
    // [End OnStateChange]
    // [Start OnActionEvent]
    onActionEvent(event: PiPWindow.PiPActionEventType, status?: number) {
        switch (event) {
            case 'playbackStateChanged':
                if (status === 0) {
                    this.avPlayerController?.videoPause();
                }
                else {
                    this.avPlayerController?.videoPlay();
                }
                break;
            default:
                break;
        }
    }
}
