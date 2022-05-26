import * as fromContentUiAction from '~/action/ui/content'
import * as fromLoadContentScriptBackgroundProcessAction from '~/action/process/background/load-content-script'
import * as fromLoadUrlSelectRangeBackgroundProcessAction from '~/action/process/background/load-url-select-range'
import * as fromInitializeContentContentProcessAction from '~/action/process/content/initialize-content'
import * as fromApplyPageContentProcess from '~/action/process/content/apply-page'
import * as fromUpdateUrlContentProcess from '~/action/process/content/update-url'
import * as fromSaveSelectRangeContentProcess from '~/action/process/content/save-select-range'
import * as fromSaveUrlSelectRangeBackgroundProcessAction from '~/action/process/background/save-url-select-range'
import * as fromHideExtentionBackgroundProcessAction from '~/action/process/content/hide-extention'
import * as fromDisplayExtentionContentProcessAction from '~/action/process/content/display-extention'
import * as fromChromeWebNavigationOnCommittedProcessChannelAction from '~/action/process/channel/chrome-web-navigation-on-committed'
import * as fromChromeActionOnClickedChannelProcessAction from '~/action/process/channel/chrome-action-on-clicked'
import * as fromChromeTabsOnUpdatedProcessAction from '~/action/process/channel/chrome-tabs-on-updated'
import * as fromApplyTabUpdateContentProcessAction from '~/action/process/content/apply-tab-update'

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
  | fromApplyPageContentProcess.ApplyPage
  | fromInitializeContentContentProcessAction.LoadUrlSelectRangeSuccess
  | fromInitializeContentContentProcessAction.InitializeUrlSelectRange
  | fromUpdateUrlContentProcess.UpdateUrl
  | fromLoadContentScriptBackgroundProcessAction.StopApp
  | fromLoadContentScriptBackgroundProcessAction.RunApp
  | fromLoadContentScriptBackgroundProcessAction.HideApp
  | fromLoadUrlSelectRangeBackgroundProcessAction.RequestLoadUrlSelectRange
  | fromLoadUrlSelectRangeBackgroundProcessAction.LoadUrlSelectRange
  | fromSaveUrlSelectRangeBackgroundProcessAction.SaveUrlSelectRange
  | fromSaveUrlSelectRangeBackgroundProcessAction.RequestSaveUrlSelectRange
  | fromSaveSelectRangeContentProcess.SaveSelectRange
  | fromHideExtentionBackgroundProcessAction.RequestHideExtention
  | fromDisplayExtentionContentProcessAction.RequestDisplayExtention
  | fromChromeWebNavigationOnCommittedProcessChannelAction.TransitionTypeLink
  | fromChromeWebNavigationOnCommittedProcessChannelAction.TransitionTypeReload
  | fromChromeWebNavigationOnCommittedProcessChannelAction.TrasitionAutoBookmark
  | fromChromeTabsOnUpdatedProcessAction.TabStatusLoading
  | fromChromeTabsOnUpdatedProcessAction.TabStatusComplete
  | fromChromeActionOnClickedChannelProcessAction.OnClickExtention
  | fromApplyTabUpdateContentProcessAction.RequestApplyTabUpdate
  | fromApplyTabUpdateContentProcessAction.ApplyTabUpdate

