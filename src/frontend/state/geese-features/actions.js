import * as actionTypes from '../action-types'

export const updateGeeseFeatures = (geeseFeatures) => ({
    type: actionTypes.GEESE_FEATURES_SET_GEESE_FEATURE,
    payload: geeseFeatures
})