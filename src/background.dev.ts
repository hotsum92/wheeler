import { configureStore } from '~/store/background'
import saga from '~/process/background'

const store = configureStore()
store.runSaga(saga)
