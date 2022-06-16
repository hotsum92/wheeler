import * as fromContentUiAction from '~/action/ui/content'
import * as fromInitializeAfterLoadBackgroundScriptBackgroundProcessAction from '~/action/process/background/initialize-after-load-background-script'
import * as fromLoadContentScriptBackgroundProcessAction from '~/action/process/background/load-content-script'
import * as fromLoadUrlSelectRangeBackgroundProcessAction from '~/action/process/background/load-url-select-range'
import * as fromInitializeContentContentProcessAction from '~/action/process/content/initialize-content'
import * as fromApplyPageInputContentProcess from '~/action/process/content/apply-page-input'
import * as fromSaveSelectRangeContentProcess from '~/action/process/content/save-select-range'
import * as fromSaveUrlSelectRangeBackgroundProcessAction from '~/action/process/background/save-url-select-range'
import * as fromHideExtentionBackgroundProcessAction from '~/action/process/content/hide-extention'
import * as fromDisplayExtentionContentProcessAction from '~/action/process/content/display-extention'
import * as fromChromeWebNavigationOnCommittedProcessChannelAction from '~/action/process/channel/chrome-web-navigation-on-committed'
import * as fromChromeActionOnClickedChannelProcessAction from '~/action/process/channel/chrome-action-on-clicked'
import * as fromChromeWindowsOnCreatedChannelProcessAction from '~/action/process/channel/chrome-windows-on-created'
import * as fromChromeTabsOnUpdatedProcessAction from '~/action/process/channel/chrome-tabs-on-updated'
import * as fromApplyTabUpdateContentProcessAction from '~/action/process/content/apply-tab-update'
import * as fromApplyUrlInputContentProcessAction from '~/action/process/content/apply-url-input'
import * as fromDetectUrlSelectRangeBackgroundProcessAction from '~/action/process/background/detect-url-select-range-update'

export const INITIAL = 'ACTION.INITIAL'

export interface Initial {
  type: typeof INITIAL
  payload: {
  }
}

export const initial =
  (): Initial =>
    ({
      type: INITIAL,
      payload: {
      }
    })

export type Action =
  | Initial
  | fromContentUiAction.OnLoadContentUi
  | fromContentUiAction.OnChangePageInput
  | fromContentUiAction.OnClickBackwardButton
  | fromContentUiAction.OnClickForwardButton
  | fromContentUiAction.OnWheelUp
  | fromContentUiAction.OnWheelDown
  | fromContentUiAction.OnChangeUrlInput
  | fromContentUiAction.OnSelectUrlInput
  | fromContentUiAction.OnFocusOutPageInput
  | fromContentUiAction.OnInputEnterKeyPageInput
  | fromContentUiAction.OnFocusOutUrlInput
  | fromContentUiAction.OnInputEnterKeyUrlInput
  | fromInitializeAfterLoadBackgroundScriptBackgroundProcessAction.LoadState
  | fromApplyPageInputContentProcess.ValidatedPageInput
  | fromInitializeContentContentProcessAction.LoadUrlSelectRangeSuccess
  | fromInitializeContentContentProcessAction.InitializeUrlSelectRange
  | fromLoadContentScriptBackgroundProcessAction.StopApp
  | fromLoadContentScriptBackgroundProcessAction.RunApp
  | fromLoadUrlSelectRangeBackgroundProcessAction.RequestLoadUrlSelectRange
  | fromLoadUrlSelectRangeBackgroundProcessAction.LoadUrlSelectRange
  | fromSaveUrlSelectRangeBackgroundProcessAction.SaveUrlSelectRange
  | fromSaveUrlSelectRangeBackgroundProcessAction.RequestSaveUrlSelectRange
  | fromSaveSelectRangeContentProcess.SaveSelectRange
  | fromHideExtentionBackgroundProcessAction.HidDivElement
  | fromDisplayExtentionContentProcessAction.DisplayedDivElement
  | fromChromeWebNavigationOnCommittedProcessChannelAction.TransitionTypeLink
  | fromChromeWebNavigationOnCommittedProcessChannelAction.TransitionTypeReload
  | fromChromeWebNavigationOnCommittedProcessChannelAction.TrasitionAutoBookmark
  | fromChromeWindowsOnCreatedChannelProcessAction.OnCreatedWindow
  | fromChromeTabsOnUpdatedProcessAction.TabStatusLoading
  | fromChromeTabsOnUpdatedProcessAction.TabStatusComplete
  | fromChromeActionOnClickedChannelProcessAction.OnClickExtention
  | fromApplyTabUpdateContentProcessAction.LoadedUrlSelect
  | fromApplyUrlInputContentProcessAction.ValidatedUrlInput
  | fromDetectUrlSelectRangeBackgroundProcessAction.DetectedUrlSelectRangeUpdate

