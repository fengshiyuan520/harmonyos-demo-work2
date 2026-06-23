// IndexPage.ets
import { window } from '@kit.ArkUI';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { emitter } from '@kit.BasicServicesKit';
import { ConfigurationConstant } from '@kit.AbilityKit';
import { SOURCES } from '../model/VideoSourceModel';
import { VideoData } from '../model/VideoData';
import { WindowUtil } from '../common/utils/WindowUtil';
import { CommonConstants } from '../common/constants/CommonConstants';
import { VideoList } from '../view/VideoList';
import { AVPlayer } from '../view/AVPlayer';
import mediaQuery from '@ohos.mediaquery';
import { distributedDeviceManager } from '@kit.DistributedServiceKit';
import { deviceManager } from '@kit.DistributedServiceKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { want } from '@kit.AbilityKit';
import { abilityManager } from '@kit.AbilityKit';

let screenListener = mediaQuery.matchMediaSync('(min-width:600vp)');

const TAG = '[IndexPage]';

@Entry
@Component
struct IndexPage {
  @Provide('pageInfo') pageInfo: NavPathStack = new NavPathStack();
  @State isFullLandscapeScreen: boolean = false;
  @State sources: VideoData[] = SOURCES;
  @State currentIndex: number = 0;
  @State isPageShow: boolean = false;
  @State showPopup: boolean = false;
  @State isLargeScreen: boolean = false;
  @State deviceList: deviceManager.DeviceInfo[] = [];
  @State showDeviceDialog: boolean = false;
  @State isDistributed: boolean = false;
  @State distributedDeviceId: string = '';

  private swiperController: SwiperController = new SwiperController();
  private windowUtil: WindowUtil = WindowUtil.getInstance();
  private deviceManagerInstance: deviceManager.DeviceManager | null = null;

  async aboutToAppear(): Promise<void> {
    let context = this.getUIContext().getHostContext() as Context;
    try {
      // Set dark color mode
      context.getApplicationContext().setColorMode(ConfigurationConstant.ColorMode.COLOR_MODE_DARK);
      // Set screen stay on during video play
      let windowClass = await window.getLastWindow(context);
      await windowClass.setWindowKeepScreenOn(true);
    } catch (exception) {
      hilog.error(0x0000, TAG, `setWindowKeepScreenOn failed: code: ${exception.code}, message: ${exception.message}`);
    }

    this.windowUtil.registerOnWindowSizeChange((size) => {
      if (size.width > size.height) {
        this.isFullLandscapeScreen = true;
      } else {
        this.isFullLandscapeScreen = false;
      }
    });

    emitter.on(CommonConstants.PLAY_PREVIOUS_EVENT_ID, () => {
      this.playPrevious();
    });
    emitter.on(CommonConstants.PLAY_NEXT_EVENT_ID, () => {
      this.playNext();
    });

    AppStorage.setOrCreate('isPIPShow', false);

    // 初始化分布式设备管理
    await this.initDistributedDeviceManager();

    // 监听屏幕大小变化
    screenListener.on('change', (result: mediaQuery.MediaQueryResult) => {
      this.isLargeScreen = result.matches;
    });
    this.isLargeScreen = screenListener.matches;
  }

  aboutToDisappear(): void {
    this.windowUtil.registerOffWindowSizeChange();
    emitter.off(CommonConstants.PLAY_PREVIOUS_EVENT_ID);
    emitter.off(CommonConstants.PLAY_NEXT_EVENT_ID);
    screenListener.off('change');
  }

  onPageHide(): void {
    this.isPageShow = false;
  }

  onPageShow(): void {
    this.isPageShow = true;
  }

  private handleFullScreenExit() {
    if (this.isFullLandscapeScreen) {
      this.windowUtil.enableWindowSystemBar();
      this.windowUtil.setLandscapeMultiWindow(false);
      this.windowUtil.setMainWindowOrientation(window.Orientation.USER_ROTATION_PORTRAIT);
    }
  }

  private animateFullscreen() {
    this.getUIContext().animateTo({
      duration: CommonConstants.ANIMATE_DURATION
    }, () => {
    });
  }

  private playPrevious() {
    if (this.currentIndex > 0) {
      this.swiperController.changeIndex(--this.currentIndex, false);
    }
  }

  private playNext() {
    if (this.currentIndex < this.sources.length - 1) {
      this.swiperController.changeIndex(++this.currentIndex, false);
    }
  }

  // ========== 自由流转相关功能 ==========

  /**
   * 初始化分布式设备管理器
   */
  private async initDistributedDeviceManager(): Promise<void> {
    try {
      // 创建设备管理器实例
      this.deviceManagerInstance = deviceManager.createDeviceManager();

      // 注册设备状态监听
      this.deviceManagerInstance.on('deviceStateChange', (data: deviceManager.DeviceStateChangeInfo) => {
        hilog.info(0x0000, TAG, `deviceStateChange: ${JSON.stringify(data)}`);
        // 设备状态变化时刷新设备列表
        this.getAvailableDevices();
      });

      // 获取可用设备列表
      await this.getAvailableDevices();
    } catch (error) {
      let err = error as BusinessError;
      hilog.error(0x0000, TAG, `initDistributedDeviceManager failed: code: ${err.code}, message: ${err.message}`);
    }
  }

  /**
   * 获取可用的分布式设备列表
   */
  private async getAvailableDevices(): Promise<void> {
    if (!this.deviceManagerInstance) {
      hilog.warn(0x0000, TAG, 'DeviceManager not initialized');
      return;
    }

    try {
      // 获取所有在线设备
      let devices = await this.deviceManagerInstance.getAvailableDeviceListSync();
      // 过滤掉本机设备
      this.deviceList = devices.filter(device => device.deviceType !== deviceManager.DeviceType.UNKNOWN);
      hilog.info(0x0000, TAG, `Available devices: ${this.deviceList.length}`);
    } catch (error) {
      let err = error as BusinessError;
      hilog.error(0x0000, TAG, `getAvailableDevices failed: code: ${err.code}, message: ${err.message}`);
    }
  }

  /**
   * 开始自由流转
   */
  private async startDistributedPlay(deviceId: string): Promise<void> {
    try {
      let context = this.getUIContext().getHostContext() as Context;

      // 构建流转参数
      let wantInfo: want.Want = {
        deviceId: deviceId,
        bundleName: context.applicationInfo.name,
        abilityName: 'EntryAbility',
        parameters: {
          // 传递当前播放信息
          'videoIndex': this.currentIndex,
          'videoSource': JSON.stringify(this.sources[this.currentIndex]),
          'isDistributed': true
        }
      };

      // 启动分布式迁移
      await abilityManager.startAbility(wantInfo);

      this.isDistributed = true;
      this.distributedDeviceId = deviceId;

      hilog.info(0x0000, TAG, `Start distributed play to device: ${deviceId}`);
    } catch (error) {
      let err = error as BusinessError;
      hilog.error(0x0000, TAG, `startDistributedPlay failed: code: ${err.code}, message: ${err.message}`);
      // 显示错误提示
      this.showToast('流转失败，请检查设备连接');
    }
  }

  /**
   * 停止自由流转（返回本机播放）
   */
  private async stopDistributedPlay(): Promise<void> {
    try {
      // 返回到本机播放
      let context = this.getUIContext().getHostContext() as Context;
      let wantInfo: want.Want = {
        bundleName: context.applicationInfo.name,
        abilityName: 'EntryAbility',
        parameters: {
          'isDistributed': false
        }
      };

      await abilityManager.startAbility(wantInfo);
      this.isDistributed = false;
      this.distributedDeviceId = '';

      hilog.info(0x0000, TAG, 'Stop distributed play');
    } catch (error) {
      let err = error as BusinessError;
      hilog.error(0x0000, TAG, `stopDistributedPlay failed: code: ${err.code}, message: ${err.message}`);
    }
  }

  /**
   * 显示Toast提示
   */
  private showToast(message: string): void {
    let toast = this.getUIContext().getToastController();
    toast.showToast({
      message: message,
      duration: 2000
    });
  }

  // ========== 自定义弹窗内容 ==========

  @Builder
  popupContent() {
    Column() {
      // 设置画中画
      Row() {
        Text($r('app.string.pip_start'))
          .width(160)
          .fontSize($r('app.float.size_15'))
          .fontWeight(FontWeight.Bold)
          .margin({ left: $r('app.float.size_8') })
          .fontColor($r('app.color.dialog_text_color'))
        Toggle({ type: ToggleType.Switch, isOn: AppStorage.get('isPIPShow') })
          .onChange((isOn: boolean) => {
            AppStorage.set('isPIPShow', isOn);
          })
          .height($r('app.float.size_20'))
          .margin({ right: $r('app.float.size_8') })
          .selectedColor($r('app.color.dialog_cancel_color'))
      }
      .width('95%')
      .height($r('app.float.size_44'))
      .borderRadius($r('app.float.size_20'))
      .justifyContent(FlexAlign.SpaceBetween)

      // 自由流转 - 设备选择按钮
      Row() {
        Text('自由流转')
          .width(160)
          .fontSize($r('app.float.size_15'))
          .fontWeight(FontWeight.Bold)
          .margin({ left: $r('app.float.size_8') })
          .fontColor($r('app.color.dialog_text_color'))

        Button('选择设备')
          .fontSize($r('app.float.size_14'))
          .height($r('app.float.size_32'))
          .padding({ left: 12, right: 12 })
          .onClick(() => {
            this.showDeviceDialog = !this.showDeviceDialog;
            this.getAvailableDevices();
          })
      }
      .width('95%')
      .height($r('app.float.size_44'))
      .borderRadius($r('app.float.size_20'))
      .justifyContent(FlexAlign.SpaceBetween)
      .margin({ top: 10 })
    }
  }

  // 设备选择弹窗
  @Builder
  deviceSelectDialog() {
    Column() {
      Text('选择流转设备')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 15 })

      if (this.deviceList.length === 0) {
        Text('未发现可用设备\n请确保设备已登录同一华为账号')
          .fontSize(14)
          .fontColor($r('app.color.dialog_text_color'))
          .textAlign(TextAlign.Center)
          .margin({ top: 20 })
      } else {
        List() {
          ForEach(this.deviceList, (device: deviceManager.DeviceInfo) => {
            ListItem() {
              Row() {
                Column() {
                  Text(device.deviceName || '未知设备')
                    .fontSize(16)
                    .fontWeight(FontWeight.Medium)
                  Text(this.getDeviceTypeName(device.deviceType))
                    .fontSize(12)
                    .fontColor('#999999')
                }
                .alignItems(HorizontalAlign.Start)
                .margin({ left: 10 })

                Blank()

                if (this.isDistributed && this.distributedDeviceId === device.deviceId) {
                  Text('已连接')
                    .fontSize(14)
                    .fontColor('#4CAF50')
                    .margin({ right: 10 })
                }

                Button(this.isDistributed && this.distributedDeviceId === device.deviceId ? '断开' : '流转')
                  .fontSize(14)
                  .height(32)
                  .padding({ left: 16, right: 16 })
                  .onClick(() => {
                    if (this.isDistributed && this.distributedDeviceId === device.deviceId) {
                      this.stopDistributedPlay();
                    } else {
                      this.startDistributedPlay(device.deviceId);
                    }
                    this.showDeviceDialog = false;
                  })
              }
              .width('100%')
              .padding(12)
            }
            .backgroundColor('#F5F5F5')
            .borderRadius(10)
            .margin({ bottom: 8 })
          }, (device: deviceManager.DeviceInfo) => device.deviceId)
        }
        .width('100%')
        .height(200)
        .scrollBar(BarState.Off)
      }
    }
    .width('85%')
    .padding(20)
    .backgroundColor(Color.White)
    .borderRadius(20)
  }

  /**
   * 获取设备类型名称
   */
  private getDeviceTypeName(type: number): string {
    switch(type) {
      case deviceManager.DeviceType.PHONE:
        return '手机';
      case deviceManager.DeviceType.TABLET:
        return '平板';
      case deviceManager.DeviceType.TV:
        return '智慧屏';
      case deviceManager.DeviceType.WATCH:
        return '手表';
      case deviceManager.DeviceType.CAR:
        return '车机';
      default:
        return '未知设备';
    }
  }

  build() {
    Navigation(this.pageInfo) {
      Stack() {
        Column() {
          if (this.isLargeScreen) {
            Row() {
              Column() {
                Swiper(this.swiperController) {
                  ForEach(this.sources, (item: VideoData, index: number) => {
                    Stack() {
                      AVPlayer({
                        isFullLandscapeScreen: this.isFullLandscapeScreen,
                        onFullScreenClick: (isLandscape?: boolean) => {
                          if (isLandscape) {
                            this.windowUtil.disableWindowSystemBar();
                            this.windowUtil.setLandscapeMultiWindow(true);
                            this.windowUtil.setMainWindowOrientation(window.Orientation.AUTO_ROTATION);
                          } else {
                            this.animateFullscreen();
                          }
                        },
                        curSource: item,
                        curIndex: this.currentIndex,
                        index: index,
                        isPageShow: this.isPageShow,
                      })
                    }
                  }, (item: VideoData, index: number) => JSON.stringify(item) + index)
                }
                .width(CommonConstants.WIDTH_FULL_PERCENT)
                .height(this.isFullLandscapeScreen ? CommonConstants.HEIGHT_FULL_PERCENT :
                  this.getUIContext().px2vp(AppStorage.get<number>('deviceWidth') ?? 0) / 2.2)
                .vertical(true)
                .loop(false)
                .indicator(false)
                .backgroundColor(Color.Black)
                .onAnimationStart((_index: number, targetIndex: number) => {
                  this.currentIndex = targetIndex;
                })
              }
              .width("48%")

              Column() {
                this.popupContent()
                // 设备选择按钮单独显示在大屏上
                Button('流转到其他设备')
                  .width('90%')
                  .height(40)
                  .margin({ top: 20 })
                  .onClick(() => {
                    this.showDeviceDialog = true;
                    this.getAvailableDevices();
                  })
              }
              .width("48%")
              .alignItems(HorizontalAlign.Center)
            }
            .width("100%")
            .justifyContent(FlexAlign.SpaceBetween)
          } else {
            Column() {
              Swiper(this.swiperController) {
                ForEach(this.sources, (item: VideoData, index: number) => {
                  Stack() {
                    AVPlayer({
                      isFullLandscapeScreen: this.isFullLandscapeScreen,
                      onFullScreenClick: (isLandscape?: boolean) => {
                        if (isLandscape) {
                          this.windowUtil.disableWindowSystemBar();
                          this.windowUtil.setLandscapeMultiWindow(true);
                          this.windowUtil.setMainWindowOrientation(window.Orientation.AUTO_ROTATION);
                        } else {
                          this.animateFullscreen();
                        }
                      },
                      curSource: item,
                      curIndex: this.currentIndex,
                      index: index,
                      isPageShow: this.isPageShow,
                    })
                  }
                }, (item: VideoData, index: number) => JSON.stringify(item) + index)
              }
              .width(CommonConstants.WIDTH_FULL_PERCENT)
              .height(this.isFullLandscapeScreen ? CommonConstants.HEIGHT_FULL_PERCENT :
                this.getUIContext().px2vp(AppStorage.get<number>('deviceWidth') ?? 0) / 2.2)
              .vertical(true)
              .loop(false)
              .indicator(false)
              .backgroundColor(Color.Black)
              .onAnimationStart((_index: number, targetIndex: number) => {
                this.currentIndex = targetIndex;
              })

              this.popupContent()
            }
          }
        }
        .width(CommonConstants.WIDTH_FULL_PERCENT)
        .height(CommonConstants.HEIGHT_FULL_PERCENT)

        // 全屏模式下的返回按钮和标题
        if (this.isFullLandscapeScreen) {
          Stack() {
            Button({ type: ButtonType.Circle }) {
              Image($r('sys.media.ohos_ic_public_arrow_left'))
                .fillColor(Color.White)
                .width($r('app.float.size_24'))
                .height($r('app.float.size_24'))
            }
            .width($r('app.float.button_back_size'))
            .height($r('app.float.button_back_size'))
            .backgroundColor('rgba(255,255,255,0.1)')
            .position({
              x: '2%',
              y: $r('app.float.back_position_y')
            })
            .onClick(() => {
              this.handleFullScreenExit();
            })

            Text(this.sources[this.currentIndex].name)
              .fontColor(Color.White)
              .fontWeight(FontWeight.Medium)
              .fontSize($r('app.float.size_24'))
              .position({
                x: $r('app.float.size_64'),
                y: $r('app.float.size_30')
              })
          }
        }

        // 更多按钮
        if (!this.isFullLandscapeScreen) {
          Text() {
            SymbolSpan($r('sys.symbol.dot_grid_2x2'))
              .fontSize($r('app.float.size_25'))
              .fontColor([Color.White])
          }
          .position({ x: '96%', y: $r('app.float.size_27') })
          .markAnchor({ x: '100%', y: 0 })
          .padding($r('app.float.size_10'))
          .zIndex(1)
          .borderRadius($r('app.float.size_25'))
          .backgroundColor('rgba(255,255,255,0.1)')
          .onClick(() => {
            this.showPopup = !this.showPopup;
          })
          .bindSheet(this.showPopup, this.popupContent(), {
            height: '170vp',
            title: { title: $r('app.string.more') },
            onDisappear: () => {
              this.showPopup = false;
            }
          })
        }

        // 设备选择自定义弹窗
        if (this.showDeviceDialog) {
          this.deviceSelectDialog()
            .position({ x: '50%', y: '50%' })
            .markAnchor({ x: '50%', y: '50%' })
            .zIndex(100)
            .onClick(() => {
              // 点击外部关闭
            })
        }

        // 视频列表
        VideoList({
          currentIndex: this.currentIndex,
          sources: this.sources,
          onItemClick: (index: number) => {
            this.swiperController.changeIndex(index, false);
            this.currentIndex = index;
          }
        })
          .width(CommonConstants.WIDTH_FULL_PERCENT)
          .height(CommonConstants.HEIGHT_FULL_PERCENT)
      }
    }
    .mode(NavigationMode.Stack)
    .hideToolBar(true)
    .hideTitleBar(true)
    .hideBackButton(true)
    .width(CommonConstants.WIDTH_FULL_PERCENT)
    .height(CommonConstants.HEIGHT_FULL_PERCENT)
  }
}