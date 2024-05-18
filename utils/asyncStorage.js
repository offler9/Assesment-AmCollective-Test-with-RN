import AsyncStorage from '@react-native-async-storage/async-storage'

export const USER_INFO = 'USER_INFO'
export const USER_COMMENT = 'USER_COMMENT'

export const ModAsyncStorage = {
  getValue: async (storageKey, callback) => {
    try {
      await AsyncStorage.getItem(storageKey).then((value) => {
        callback(value)
      })
    } catch (error) {
      // console.log(`AsycStorage:GetValue > Key=${storageKey} Error=`, error) // eslint-disable-line
    }
  },
  getBoolValue: async (storageKey) => {
    try {
      const result = await AsyncStorage.getItem(storageKey)
      const tmpBool = Boolean(parseInt(result, 10))
      return tmpBool
    } catch (error) {
      // console.log(`AsycStorage:GetBoolValue > Key=${storageKey} Error=`, error) // eslint-disable-line
      return false
    }
  },
  save: async (storageKey, value) => {
    console.log('st', storageKey, value)
    try {
      await AsyncStorage.setItem(storageKey, value)
    } catch (error) {
      // console.log(`AsycStorage:Save > Key=${storageKey} Error=`, error) // eslint-disable-line
    }
  },
  delete: async (storageKey) => {
    try {
      await AsyncStorage.removeItem(storageKey)
    } catch (error) {
      // console.log(`AsycStorage:Delete > Key=${storageKey} Error=`, error) // eslint-disable-line
    }
  },
}
