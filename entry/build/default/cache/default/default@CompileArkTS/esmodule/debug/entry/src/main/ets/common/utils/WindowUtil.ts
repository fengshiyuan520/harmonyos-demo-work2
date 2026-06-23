import window from "@ohos:window";
import hilog from "@ohos:hilog";
import type { BusinessError } from "@ohos:base";
const TAG: string = '[WindowUtil]';
const uiContext: UIContext | undefined = AppStorage.get('uiContext');
export class WindowUtil {
    private static instance: WindowUtil;
    private windowStage?: window.WindowStage;
    private mainWindowClass?: window.Window;
    public static getInstance() {
        if (!WindowUtil.instance) {
            WindowUtil.instance = new WindowUtil();
        }
        return WindowUtil.instance;
    }
    public setWindowStage(windowStage: window.WindowStage): void {
        this.windowStage = windowStage;
        this.windowStage.getMainWindow((err: BusinessError, windowClass: window.Window) => {
            if (err.code) {
                hilog.error(0x0000, TAG, `Failed to obtain the main window. Code:${err.code}, message:${err.message}`);
                return;
            }
            this.mainWindowClass = windowClass;
            try {
                const properties = windowClass.getWindowProperties();
                let area: window.AvoidArea = windowClass.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM);
                let naviBarArea: window.AvoidArea = windowClass.getWindowAvoidArea(window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR);
                AppStorage.setOrCreate('deviceWidth', properties.windowRect.width);
                AppStorage.setOrCreate('deviceHeight', properties.windowRect.height);
                AppStorage.setOrCreate('statusBarHeight', uiContext?.px2vp(area.topRect.height));
                AppStorage.setOrCreate('navBarHeight', uiContext?.px2vp(naviBarArea.bottomRect.height));
            }
            catch (exception) {
                hilog.error(0x0000, TAG, `Get windowClass data failed, code is ${exception.code}, message is ${exception.message}`);
            }
        });
    }
    // [Start SetMainWindowOrientation]
    setMainWindowOrientation(orientation: window.Orientation, callback?: Function): void {
        if (this.mainWindowClass === undefined) {
            hilog.error(0x0000, TAG, 'MainWindowClass is undefined');
            return;
        }
        this.mainWindowClass.setPreferredOrientation(orientation).then(() => {
            callback?.();
        }).catch((err: BusinessError) => {
            hilog.error(0x0000, TAG, `Failed to set the ${orientation} of main window. Code:${err.code}, message:${err.message}`);
        });
    }
    // [End SetMainWindowOrientation]
    disableWindowSystemBar(): void {
        if (this.mainWindowClass === undefined) {
            hilog.error(0x0000, TAG, 'MainWindowClass is undefined');
            return;
        }
        this.mainWindowClass.setWindowSystemBarEnable([]).catch((err: BusinessError) => {
            hilog.error(0x0000, TAG, `setWindowSystemBarEnable Failed. Code:${err.code}, message:${err.message}`);
        });
    }
    enableWindowSystemBar(): void {
        if (this.mainWindowClass === undefined) {
            hilog.error(0x0000, TAG, 'MainWindowClass is undefined');
            return;
        }
        this.mainWindowClass.setWindowSystemBarEnable(['status', 'navigation']).catch((err: BusinessError) => {
            hilog.error(0x0000, TAG, `setWindowSystemBarEnable Failed. Code:${err.code}, message:${err.message}`);
        });
    }
    setLandscapeMultiWindow(enable: boolean) {
        if (this.mainWindowClass === undefined) {
            hilog.error(0x0000, TAG, 'MainWindowClass is undefined');
            return;
        }
        if (enable) {
            this.mainWindowClass?.enableLandscapeMultiWindow().catch((err: BusinessError) => {
                hilog.error(0x0000, TAG, `enableLandscapeMultiWindow Failed. Code:${err.code}, message:${err.message}`);
            });
        }
        else {
            this.mainWindowClass?.disableLandscapeMultiWindow().catch((err: BusinessError) => {
                hilog.error(0x0000, TAG, `enableLandscapeMultiWindow Failed. Code:${err.code}, message:${err.message}`);
            });
        }
    }
    registerOnWindowSizeChange(callback?: (size: window.Size) => void) {
        if (this.mainWindowClass === undefined) {
            hilog.error(0x0000, TAG, 'MainWindowClass is undefined');
            return;
        }
        this.mainWindowClass.on('windowSizeChange', (size) => {
            AppStorage.setOrCreate('deviceHeight', size.height);
            callback?.(size);
        });
    }
    registerOffWindowSizeChange() {
        if (this.mainWindowClass === undefined) {
            hilog.error(0x0000, TAG, 'MainWindowClass is undefined');
            return;
        }
        this.mainWindowClass.off('windowSizeChange');
    }
}
